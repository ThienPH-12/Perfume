import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Header.scss";
import Logo from "../img/logo2.png";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";
import { Bag, Search,PersonCircle } from "react-bootstrap-icons";
import { CartContext } from "../utils/CartContext";
import { useAuth } from "../utils/AuthContext"; // Import useAuth

function AuthIcons({ user, handleLogout, navigate, cartCount, closeSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {user ? (
        <div className="auth-logged-in">
          <span
            className="username"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Chào mừng {user.sub}
          </span>
          <div> ▼</div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/user/info" onClick={() => setIsDropdownOpen(false)}>
                Thông tin cá nhân
              </Link>
              <button
                onClick={(e) => {
                  handleLogout(e);
                  setIsDropdownOpen(false);
                  closeSidebar && closeSidebar();
                }}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      ) : (
        <PersonCircle
          className="person-icon"
          onClick={() => {
            navigate("/login");
            closeSidebar && closeSidebar();
          }}
          style={{ fontSize: "1.5rem", cursor: "pointer", color: "azure" }}
        />
      )}
      <Link
        to="/cart"
        onClick={() => {
          closeSidebar && closeSidebar();
        }}
      >
        <div className="cart-icon-container">
          <Bag className="cart-icon" />
          <span className="cart-count">{cartCount}</span>
        </div>
      </Link>
    </>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const { token, setToken } = useAuth(); // Use token and setToken from AuthContext
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        setIsAdmin(decodedToken.authority[1] === "1");
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, [token]); // Trigger effect when token changes

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".toggle-sidebar-btn")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const handleLogout = async (e) => {
    e.preventDefault();
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
      setToken(null); // Update token in AuthContext
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  };

  return (
    <div id="Header">
      <div className="header-container">
        <button
          className="toggle-sidebar-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
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
          <div className="dropdown">
            <span>SẢN PHẨM</span>
            <div className="dropdown-content">
              <Link to="/product">Tinh dầu đơn</Link>
              <Link to="/mix-product">Mix nước hoa</Link>
            </div>
          </div>
          <Link to="/formula">CÔNG THỨC ĐỀ CỬ</Link>
          <Link to="/blog">BLOG</Link>
          <Link to="/contact">LIÊN HỆ</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
        </div>
        <div className="search-container">
          <Search className="search-icon" />
          <input type="text" placeholder="Tìm kiếm..." className="search-input" />
        </div>
        <div className="auth-container">
          <AuthIcons
            user={user}
            handleLogout={handleLogout}
            navigate={navigate}
            cartCount={cartCount}
          />
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button
          className="close-sidebar-btn"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✖
        </button>
        <Link to="/about" onClick={() => setIsSidebarOpen(false)}>
          CÂU CHUYỆN THƯƠNG HIỆU
        </Link>
        <Link to="/product" onClick={() => setIsSidebarOpen(false)}>
          TINH DẦU ĐƠN
        </Link>
        <Link to="/mix-product" onClick={() => setIsSidebarOpen(false)}>
          MIX NƯỚC HOA
        </Link>
        <Link to="/formula" onClick={() => setIsSidebarOpen(false)}>
          CÔNG THỨC ĐỀ CỬ
        </Link>
        <Link to="/blog" onClick={() => setIsSidebarOpen(false)}>
          BLOG
        </Link>
        <Link to="/contact" onClick={() => setIsSidebarOpen(false)}>
          LIÊN HỆ
        </Link>
        {isAdmin && (
          <Link to="/admin" onClick={() => setIsSidebarOpen(false)}>
            Admin
          </Link>
        )}
        <div className="sidebar-icons">
          <AuthIcons
            user={user}
            handleLogout={handleLogout}
            navigate={navigate}
            cartCount={cartCount}
            closeSidebar={() => setIsSidebarOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}