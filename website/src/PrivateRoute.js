import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;