import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { AuthProvider, useAuth } from "./AuthContext";

function App() {
  const { instance } = useMsal();
  const { isInitialized, account } = useAuth();
    
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
              <Navbar isAuthenticated={!!account} handleLogin={handleLogin} handleLogout={handleLogout} />
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
