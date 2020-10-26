/* eslint-disable import/prefer-default-export */
import { createStore, applyMiddleware } from 'redux';
import { useMemo } from 'react';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import combineReducers from './reducers';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);

let store;

export const initStore = (initialState = {}) => {
  const str = createStore(
    combineReducers,
    initialState,
    composeWithDevTools(middlewares)
  );
  sagaMiddleware.run(rootSaga);
  return str;
};

export const initializeStore = (preloadedState) => {
  let str = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    str = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return str;
  // Create the store once in the client
  if (!store) store = str;

  return str;
};

export function useStore(initialState) {
  const str = useMemo(() => initializeStore(initialState), [initialState]);
  return str;
}
