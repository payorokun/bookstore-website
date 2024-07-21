// src/pages/LoginPage.js
import React from "react";
import { useMsal } from "@azure/msal-react";

const LoginPage = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const handleLogin = () => {
    instance.loginPopup().catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  return (
    <div>
      <h2>Login Page</h2>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login with Azure AD</button>
      )}
    </div>
  );
};

export default LoginPage;
