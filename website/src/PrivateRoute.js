// src/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useIsAuthenticated();
  
  return (
    <Route 
      {...rest} 
      render={props => 
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      } 
    />
  );
};

export default PrivateRoute;
