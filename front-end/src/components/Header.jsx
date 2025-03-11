import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.scss";

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
              <img src="/src/img/logo.png" alt="Logo" className="logo" />
            </div>
            {/* the item in the header,had an optional format when mobile user use it */}
            <div className="link-container">
              <a href="/">Home</a>
              <a href="/products">Products</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
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
