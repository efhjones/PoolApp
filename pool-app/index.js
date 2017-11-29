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

const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cja6b9y0y07q50129zgdjekpk'
});

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('UserAuthToken');
    return token;
  } catch (error) {
    return error;
  }
};

const middlewareLink = setContext(async () => {
  const authToken = await getAuthToken();
  return ({
    headers: {
      authorization: `Bearer ${authToken}` || null
    }
  });
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
