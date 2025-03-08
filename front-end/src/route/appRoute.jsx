import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../page/Login/Login.jsx";
import Register from "../page/Register/Register.jsx";

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default AppRoute;
