import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import Login from "../page/Login/Login.jsx";
import Register from "../page/Register/Register.jsx";
import Home from "../page/Home/Home.jsx";
import About from "../page/About/About.jsx";
import ContactPage from "../page/ContactPage/ContactPage.jsx"; // Import ContactPage
import BlogPage from "../page/BlogPage/BlogPage.jsx"; // Import BlogPage
import BlogDetail from "../page/BlogPage/BlogDetail.jsx"; // Update Blog import
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx"; // Import Footer
import Product from "../page/Product/Product.jsx"; // Import Product
import ProductDetail from "../page/Product/ProductDetail.jsx"; // Import ProductDetail
import AdminPage from "../page/AdminPage/AdminPage.jsx"; // Import AdminPage
import CategoryManage from "../page/AdminPage/CategoryManage.jsx"; // Import CategoryManage
import CapacityManage from "../page/AdminPage/CapacityManage.jsx"; // Import CapacityManage
import ProductManage from "../page/AdminPage/ProductManage.jsx"; // Import ProductManage
import MixProductManage from "../page/AdminPage/MixProductManage.jsx"; // Updated import
import PriceManage from "../page/AdminPage/PriceManage.jsx"; // Import PriceManage
import Cart from "../page/Cart/Cart.jsx"; // Import Cart
import MixProduct from "../page/MixProduct/MixProduct.jsx"; // Import MixProduct
import Success from "../page/Payment/Success.jsx"; // Import Success page
import Cancel from "../page/Payment/Cancel.jsx"; // Import Cancel page
import SavedFormulas from "../page/MixProduct/SavedFormulas.jsx"; // Import SavedFormulas
import Payment from "../page/Payment/Payment.jsx"; // Import Payment page
import MixProductDetail from "../page/MixProduct/MixProductDetail.jsx"; // Import MixProductDetail
import ConfirmActivated from "../page/Register/ConfirmActivated.jsx"; // Import ConfirmActivated
import { ToastContainer } from "react-toastify";
import { CartProvider } from "../utils/CartContext.jsx";

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
    <CartProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path="/blog" element={<BlogPage />} /> 
        <Route path="/blog/:id" element={<BlogDetail />} /> 
        <Route path="/product" element={<Product />} /> 
        <Route path="/product/:id" element={<ProductDetail />} /> 
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/mix-product" element={<MixProduct />} /> {/* Add MixProduct route */}
        <Route path="/payment/success" element={<Success />} /> {/* Add Success route */}
        <Route path="/payment/cancel" element={<Cancel />} /> {/* Add Cancel route */}
        <Route path="/saved-formulas" element={<SavedFormulas />} /> {/* Add SavedFormulas route */}
        <Route path="/payment" element={<Payment />} /> {/* Add Payment route */}
        <Route path="/mix-product-detail" element={<MixProductDetail />} /> {/* Add MixProductDetail route */}
        <Route path="/user/activateUser" element={<ConfirmActivated />} /> {/* Add ConfirmActivated route */}
        <Route
          path="/admin/*"
          element={
            <PrivateAdminRoute>
              <AdminPage />
            </PrivateAdminRoute>
          }
        >
          <Route path="categories" element={<CategoryManage />} /> {/* Matches /admin/categories */}
          <Route path="capacities" element={<CapacityManage />} /> {/* Matches /admin/capacities */}
          <Route path="products" element={<ProductManage />} /> {/* Matches /admin/products */}
          <Route path="mix-products" element={<MixProductManage />} /> {/* Updated from sell-products */}
          <Route path="prices" element={<PriceManage />} /> {/* Matches /admin/prices */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer limit={3} />
      <Footer /> {/* Add Footer */}
    </Router>
    </CartProvider>
  );
}

export default AppRoute;
