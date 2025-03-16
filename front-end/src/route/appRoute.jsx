import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
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
        {/* <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />  */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer /> {/* Add Footer */}
    </Router>
  );
}

export default AppRoute;
