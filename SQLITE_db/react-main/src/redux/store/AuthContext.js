import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from '../slices/testUserSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const currentUser = useSelector((state) => state.user);
  console.log('auth CurrentUser',currentUser)
  const dispatch = useDispatch();

  const loginHandler = (user) => {
    dispatch(loginUser(user));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const value = { currentUser, loginUser: loginHandler, logout: logoutHandler };

  return <AuthContext.Provider value={{value}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
