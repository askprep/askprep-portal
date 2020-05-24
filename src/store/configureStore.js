import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import appReducer from '../redux/index';

export default function configureStore(history) {
  const middleware = [thunk, routerMiddleware(history)];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(require('redux-logger').default);
  }

  const store = createStore(appReducer, applyMiddleware(...middleware));

  return store;
}
