// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Publisher from "./pages/Publisher";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute component={Admin} />} />
        <Route path="/publisher" element={<PrivateRoute component={Publisher} />} />
      </Routes>
    </div>
  );
}

export default App;
