import React from 'react';

export const userContext = {
  isAuthenticated: false,
  username: '',
};

export const UserContext = React.createContext(
  userContext,
);
