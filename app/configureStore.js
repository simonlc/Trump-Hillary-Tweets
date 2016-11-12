import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import rootReducer from './reducers';

const socket = io.connect('http://localhost:3000');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      socketIoMiddleware,
    ),
  );
}
