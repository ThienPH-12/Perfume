import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.scss";
import Logo from "../img/logo2.png";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    //the header,can style all item in Header.scss
    <div id="Header">
      {/* //make the header sticky */}
      <header className="header has-sticky stickly-jump">
        {/* made the entire header is black */}
        <div className="header-wrapper">
          {/* display the header in row,all item is white color*/}
          <div className="header-container">
            <div id="logo" className="flex-col logo">
              <img style={{height:55}} src={Logo} alt="Perfume" className="logo" />
            </div>
            {/* the item in the header,had an optional format when mobile user use it */}
            <div className="link-container">
              <a href="/about">CÂU TRUYỆN THƯƠNG HIỆU</a>
              <a href="/products">SẢN PHẨM</a>
              <a href="/">BLOG</a>
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
                  <button onClick={() => navigate("/register")}>
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
