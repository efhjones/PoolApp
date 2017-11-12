// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer/index';
import AppContainer from './app/AppContainer';

// this might not be right, need to double check '__DEV__'
const loggerMiddleware = createLogger({ predicate: () => '__DEV__' });

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware));

const store = createStore(reducer, enhancer);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
