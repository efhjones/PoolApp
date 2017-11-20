// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ApolloClient } from 'apollo-client';

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import reducer from './reducer/index';
import NavigationContainer from './navigation/NavigationContainer';


const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cja6b9y0y07q50129zgdjekpk' }),
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
