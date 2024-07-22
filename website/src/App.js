// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { useAuth } from "./AuthContext";

function App() {
  const { instance, accounts } = useMsal();
  const { isInitialized } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(accounts.length > 0);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(accounts.length > 0);
    };

    handleAuthChange();
    const callbackId = instance.addEventCallback((message) => {
      if (message.eventType === 'msal:loginSuccess' || message.eventType === 'msal:logoutSuccess') {
        handleAuthChange();
      }
    });

    return () => {
      instance.removeEventCallback(callbackId);
    };
  }, [instance, accounts]);

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
      isInitialized ? (
          <div>
              <Navbar isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} />
              <Routes>
                  <Route path="/" element={<Home />} />
              </Routes>
          </div>
      ) : (
          <div>Loading...</div>
      )
  );
}

export default App;
