import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../auth/auth";
import "./Login.scss";
import apiPaths from "../../api/apiPath";
import apiClient from "../../api/apiClient";
import axios from "axios"; // Add axios import

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate if username and password are not empty
    if (!credentials.username || !credentials.password) {
      setError("Username and password cannot be empty.");
      return;
    }
    try {
      setError("");
      const response = await apiClient.post(
         apiPaths.login,
        credentials
      );
      const data = response.data;
      const accessToken = data.accessToken;
      console.log(accessToken);
      setToken(accessToken);
      window.location.reload();
    } catch (err) {
      setError("Invalid username/email or password.");
    }
  };

  return (
    <div id="Login" className="d-flex" style={{ marginTop: "50px" }}>
      <div className="container">
        <h2>Đăng nhập</h2>
        <div className="error-message">{error}</div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Tên tài khoản hoặc địa chỉ email *"
              value={credentials.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div className="input-container">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Mật khẩu *"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
          <button className="button" type="submit">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
