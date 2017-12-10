// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ApolloClient } from 'apollo-client';
import AsyncStorage from 'AsyncStorage';

import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import reducer from './reducer/index';
import NavigationContainer from './navigation/NavigationContainer';
import { SIMPLE_API } from './api';

const httpLink = createHttpLink({
  uri: SIMPLE_API
});

const middlewareLink = setContext(async () => {
  try {
    const token = await AsyncStorage.getItem('UserAuthToken');
    return ({
      headers: {
        authorization: `Bearer ${token}` || null
      }
    });
  } catch (err) {
    return ({
      headers: {
        authorization: null
      }
    });
  }
});

const link = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// this might not be right, need to double check '__DEV__'
const loggerMiddleware = createLogger({ predicate: () => '__DEV__' });

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  </ApolloProvider>
);


export default App;
