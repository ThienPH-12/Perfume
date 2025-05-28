import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import Login from "../page/Login/Login.jsx";
import Register from "../page/Register/Register.jsx";
import Home from "../page/Home/Home.jsx";
import About from "../page/About/About.jsx";
import ContactPage from "../page/ContactPage/ContactPage.jsx"; // Import ContactPage
import BlogPage from "../page/BlogPage/BlogPage.jsx"; // Import BlogPage
import Blog from "../page/BlogPage/Blog.jsx"; // Import Blog
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx"; // Import Footer
import Product from "../page/Product/Product.jsx"; // Import Product
import AdminPage from "../page/AdminPage/AdminPage.jsx"; // Import AdminPage
import { ToastContainer} from 'react-toastify';

function PrivateAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.authority[1] === "1") {
        return children;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  return <Navigate to="/login" />;
}

function AppRoute() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} /> {/* Add ContactPage route */}
        <Route path="/blog" element={<BlogPage />} /> {/* Add BlogPage route */}
        <Route path="/blog/:id" element={<Blog />} /> {/* Add Blog route */}
        <Route path="/product" element={<Product />} /> {/* Add Product route */}
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminPage />
            </PrivateAdminRoute>
          }
        /> {/* Restrict AdminPage route */}
        <Route path="*" element={<Navigate to="/" />} />  
      </Routes>
      <ToastContainer
      limit={3} />
      <Footer /> {/* Add Footer */}
    </Router>
  );
}

export default AppRoute;
