import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./Header.scss";
import Logo from "../img/logo2.png";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        console.log(token);
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
      const response = await apiClient.post(
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

      console.log(response.data);
      setUser(null);
      setIsAdmin(false);
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
          <Link to="/about">CÂU TRUYỆN THƯƠNG HIỆU</Link>
          <Link to="/product">SẢN PHẨM</Link>
          <Link to="/blog">BLOG</Link>
          <Link to="/contact">LIÊN HỆ</Link>
          {isAdmin && <Link to="/admin">Admin</Link>} {/* Show Admin link if authority=1 */}
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
        </div>
      </div>
    </div>
  );
}
