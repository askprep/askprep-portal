import React from 'react';

const UserDetailsContext = React.createContext();

export const UserDetailsProvider = UserDetailsContext.Provider;
export const UserDetailsConsumer = UserDetailsContext.Consumer;

export default UserDetailsContext;
