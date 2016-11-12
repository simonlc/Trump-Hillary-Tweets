import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import ViewPort from './components/viewport';

const store = configureStore(window.PRELOADED_STATE);

const Root = () =>
  <Provider store={store}>
    <ViewPort />
  </Provider>

render(
  <Root />,
  document.getElementById('root')
);
