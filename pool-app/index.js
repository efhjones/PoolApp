// @flow
import React from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ApolloClient } from 'apollo-client';
import AsyncStorage from 'AsyncStorage';

import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import reducer from './reducer';
import { SIMPLE_API } from './api';
import Navigator from './navigation/navigator';

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

const Navigation = ({ dispatch, nav }) => (
  <Navigator navigation={addNavigationHelpers({
    dispatch,
    state: nav
  })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav
});

const NavigationContainer = connect(mapStateToProps)(Navigation);

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  </ApolloProvider>
);


export default App;
