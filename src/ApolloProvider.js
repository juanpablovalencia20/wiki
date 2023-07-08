import React from 'react';
import App from './App';
import './index.css';
import { DarkModeContextProvider } from './context/darkModeContext';
import { ApolloProvider, createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { AuthProvider } from './context/authContext';

const httpLink = createHttpLink({
  uri: 'http://localhost:3002/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default (

  <DarkModeContextProvider>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </DarkModeContextProvider>
);