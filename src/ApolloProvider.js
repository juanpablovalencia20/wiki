import React from 'react';
import App from './App';
import './index.css';
import { DarkModeContextProvider } from './context/darkModeContext';
import { ApolloProvider, createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { AuthProvider } from './context/authContext';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3002/graphql'
});


const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  console.log(token);
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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