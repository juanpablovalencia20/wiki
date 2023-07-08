import React, { useReducer, createContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null
};

const token = localStorage.getItem('jwtToken');

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 > Date.now()) {
    initialState.user = JSON.parse(localStorage.getItem('user')) || decodedToken;
  } else {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => { },
  logout: () => { }
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const access_token = localStorage.getItem('jwtToken');
    if (access_token) {
      const decodedToken = jwtDecode(access_token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      }
    }
  }, []);

  function login(userData) {
    const { access_token, user } = userData;
    localStorage.setItem('jwtToken', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      payload: user
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
