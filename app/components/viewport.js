import React from 'react';
import { connect } from 'react-redux';
import TrumpTweets from './trump-tweets';
import HillaryTweets from './hillary-tweets';
import Toggle from './toggle';

const ViewPort = ({ view }) =>
  <div className={view === 'trump' ? 'trump' : 'hillary'}>
    <Toggle />
    { view === 'trump' ?
      <div className="trump-tweets tweets-container">
        <TrumpTweets />
      </div>
        :
      <div className="hillary-tweets tweets-container">
        <HillaryTweets />
      </div>
    }
  </div>

export default connect(state => ({
  view: state.view,
}))(ViewPort);
