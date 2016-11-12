import { combineReducers } from 'redux';

function trumpTweets(state = [], action) {
  if (action.type === 'TRUMP_TWEET_EVENT') {
    let newState = state.concat([action.data]);
    if (newState.length > 100) {
      newState = newState.slice(1, -1);
    }
    return newState;
  }
  return state;
}

function hillaryTweets(state = [], action) {
  if (action.type === 'HILLARY_TWEET_EVENT') {
    let newState = state.concat([action.data]);
    if (newState.length > 100) {
      newState = newState.slice(1, -1);
    }
    return newState;
  }
  return state;
}

function view(state = 'trump', action) {
  if (action.type === 'VIEW_TOGGLE') {
    if (state === 'trump') {
      return 'hillary';
    }
    return 'trump';
  }
  return state;
}

export default combineReducers({
  trumpTweets,
  hillaryTweets,
  view,
});
