import { connect } from 'react-redux';
import Tweets from './tweets';

export default connect(
  state => ({
    tweets: state.hillaryTweets,
  })
)(Tweets);
