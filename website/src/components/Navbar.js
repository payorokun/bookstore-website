import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import PropTypes from 'prop-types';

const Navbar = ({ isAuthenticated, handleLogin, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <button className="navbar-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="navbar-button" onClick={handleLogin}>Login</button>
        )}
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Navbar;
