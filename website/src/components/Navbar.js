// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const Navbar = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/admin">Admin</Link>
          <Link to="/publisher">Publisher</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
