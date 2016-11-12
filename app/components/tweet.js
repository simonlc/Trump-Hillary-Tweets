import React from 'react';

const Tweet = ({ text, profilePic, name, screenName }) =>
  <div className="tweet">
    <img className="tweet__profile-pic" src={profilePic} />
    <div className="tweet__text">
      <div className="tweet__header">
        <span className="name">{name}</span> <span className="screen-name">@{screenName}</span>
      </div>
      {text}
    </div>
  </div>

export default Tweet;
