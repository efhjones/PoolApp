// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './reducer/index';
import NavigationContainer from './navigation/NavigationContainer';

// this might not be right, need to double check '__DEV__'
const loggerMiddleware = createLogger({ predicate: () => '__DEV__' });

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

const App = () => (
  <Provider store={store}>
    <NavigationContainer />
  </Provider>
);


export default App;
