// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducer/index.js'
import AppContainer from './app/AppContainer.js';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

const enhancer = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

const store = createStore(reducer, /* preloadedState, */ enhancer);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
