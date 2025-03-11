import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import Login from "../page/Login/Login.jsx";
import Register from "../page/Register/Register.jsx";
import Home from "../page/Home/Home.jsx";
import About from "../page/About/About.jsx";
import Header from "../components/Header.jsx";
function useAuth() {
  return React.useContext(AuthContext);
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoute() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />  */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoute;
