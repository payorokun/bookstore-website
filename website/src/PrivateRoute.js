import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};
export default PrivateRoute;