// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Publisher from "./pages/Publisher";
import LoginPage from "./components/LoginPage";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
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
      <Navbar isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/admin" element={<PrivateRoute component={Admin} />} />
        <Route path="/publisher" element={<PrivateRoute component={Publisher} />} />
      </Routes>
    </div>
  );
}

export default App;
