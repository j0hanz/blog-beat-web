import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

/* PrivateRoute component to protect routes */
const PrivateRoute = ({ children }) => {
  const currentUser = useCurrentUser();
  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
