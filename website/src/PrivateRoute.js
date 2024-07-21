import React from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
