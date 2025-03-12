import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import Logo from "../img/logo2.png";
import { logout } from "../api/apiClient";
import { getUserInfoFromToken } from "../auth/auth";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = getUserInfoFromToken();
    setUser(userInfo);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    //the header,can style all item in Header.scss
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
        {/* the item in the header,had an optional format when mobile user use it */}
        <div className="link-container">
          <a href="/about">CÂU TRUYỆN THƯƠNG HIỆU</a>
          <a href="/product">SẢN PHẨM</a>
          <a href="/blog">BLOG</a>
          <a href="/contact">LIÊN HỆ</a>
        </div>
        <div className="auth-container">
          {user ? (
            <>
              <span>{user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
