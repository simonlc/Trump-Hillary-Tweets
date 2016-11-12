import path from 'path';
import express from 'express';
import Twitter from 'twitter';

import configureStore from '../configureStore';

/**
 * Express and socket.io setup
 */
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 6000;

/**
 * Setup tweet stream
 */
const cfg = require('./config.json');

const tw = new Twitter(cfg);

/**
 * Set templates and views folder
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', true);

app.use(express.static(path.join(__dirname, '../../public')));

/**
 * Filter unwanted tweets
 */
function filterTweets(tweets) {
  return tweets.filter(tweet => {
    if (
      tweet.retweeted_status ||
      tweet.in_reply_to_screen_name ||
      tweet.quoted_status_id_str ||
      (tweet.lang !== 'en' && tweet.lang !== 'und') ||
      (tweet.entities.media && tweet.entities.media.length) ||
      tweet.entities.urls.length
    ) {
      return false;
    }
    return true;
  });
}

/**
 * Clean up tweets for our app
 */
function normalizeTweets(tweets) {
  return tweets.map(tweet => ({
    text: tweet.text.replace(/&amp;/g, '&'),
    name: tweet.user.name,
    screenName: tweet.user.screen_name,
    profilePic: tweet.user.profile_image_url,
    id: tweet.id_str,
  }));
}

/**
 * Wrap our callbacks in a promise so we can easily call them at the same time.
 */
function searchTweets(query) {
  return new Promise((resolve, reject) => {
    tw.get('search/tweets', { q: query, count: 100 }, (error, tweets) => {
      if (error !== null) return reject(error);
      return resolve(tweets);
    });
  });
}

/**
 * Serve our application with preloaded state
 */
app.use((req, res) => {
  Promise.all([
    searchTweets('#trump'),
    searchTweets('#hillary'),
  ]).then(values => {
    const store = configureStore({
      trumpTweets: normalizeTweets(filterTweets(values[0].statuses)),
      hillaryTweets: normalizeTweets(filterTweets(values[1].statuses)),
    });
    res.status(200).render('index.ejs', {
      preloadedState: JSON.stringify(store.getState()),
    });
  });
});

/**
 * Socket streams for live tweets
 */
tw.stream('statuses/filter', { track: '#trump' }, stream => {
  stream.on('data', tweet => {
    if (filterTweets([tweet]).length === 0) return;
    const [data] = normalizeTweets([tweet]);
    io.emit('action', { type: 'TRUMP_TWEET_EVENT', data });
  });
});

tw.stream('statuses/filter', { track: '#hillary' }, stream => {
  stream.on('data', tweet => {
    if (filterTweets([tweet]).length === 0) return;
    const [data] = normalizeTweets([tweet]);
    io.emit('action', { type: 'HILLARY_TWEET_EVENT', data });
  });
});

/**
 * Start server
 */
http.listen(port);
