// src/components/LoginPage.js
import React from "react";

const LoginPage = ({ handleLogin }) => {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
