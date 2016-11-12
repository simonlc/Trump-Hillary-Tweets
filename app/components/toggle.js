import React from 'react';
import { connect } from 'react-redux';

const Toggle = ({ view, handleToggle }) =>
  <div className="toggle" onClick={(e) => {
    e.preventDefault();
    handleToggle();
  }}>
    <h1 className={view === 'trump' ? 'hashtag hashtag--trump hashtag--active' : 'hashtag'}>Trump</h1>
    <h1 className={view === 'hillary' ? 'hashtag hashtag--hillary hashtag--active' : 'hashtag'}>Hillary</h1>
  </div>

export default connect(state => ({
  view: state.view,
}), dispatch => ({
  handleToggle: () => {
    dispatch({ type: 'VIEW_TOGGLE' });
  },
}))(Toggle);
