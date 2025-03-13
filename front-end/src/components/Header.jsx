import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Header.scss";
import Logo from "../img/logo2.png";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState({
    token: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUser(decodedToken);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setToken({ token: localStorage.getItem("token") });
      const response = await apiClient.post(apiPaths.logout, token);
      delete apiClient.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");

      console.log(response.data);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
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
              <span>Welcome {user.sub}!</span>
              <button className="buttonCus" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="buttonCus" onClick={() => navigate("/login")}>
                Login
              </button>
              <button
                className="buttonCus"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
