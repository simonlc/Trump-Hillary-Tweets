import React from 'react';
import Tweet from './tweet';

const Tweets = ({ tweets }) =>
  <div className="tweets-wrap">
    {tweets.map(tweet =>
      <Tweet {...tweet} key={tweet.id} />
    )}
  </div>

export default Tweets;
