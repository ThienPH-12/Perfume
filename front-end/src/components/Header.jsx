import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./Header.scss";
import Logo from "../img/logo2.png";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";
import { Bag, Search } from "react-bootstrap-icons";
import { CartContext } from "../utils/CartContext";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        setIsAdmin(decodedToken.authority[1] === "1");
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.reload();
      return;
    }
    try {
      await apiClient.post(
        apiPaths.logout,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      delete apiClient.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");

      setUser(null);
      setIsAdmin(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  };

  return (
    <div id="Header">
      <div className="header-container">
        <div id="logo" className="flex-col logo">
          <a href="/">
            <img
              style={{ height: 55 }}
              src={Logo}
              alt="Perfume"
              className="logo"
            />
          </a>
        </div>
        <div className="link-container">
          <Link to="/about">CÂU CHUYỆN THƯƠNG HIỆU</Link>
          <Link to="/product">SẢN PHẨM</Link>
          <Link to="/blog">BLOG</Link>
          <Link to="/contact">LIÊN HỆ</Link>
          <Link to="/mix-product">MIX SẢN PHẨM</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
        </div>
        <div className="search-container">
          <Search className="search-icon" />
          <input type="text" placeholder="Tìm kiếm..." className="search-input" />
        </div>
        <div className="auth-container">
          {user ? (
            <>
              <span>Chào mừng {user.sub}!</span>
              <button className="buttonCus" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button className="buttonCus" onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
              <button
                className="buttonCus"
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </button>
            </>
          )}
          <Link to="/cart">
            <div className="cart-icon-container">
              <Bag className="cart-icon" />
              <span className="cart-count">{cartCount}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}