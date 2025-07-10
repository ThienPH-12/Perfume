import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import apiPaths from "../../api/apiPath";
import apiClient from "../../api/apiClient";
import { ErrorToastify } from "../../components/Toastify"; // Import ErrorToastify

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "", // Changed from email to username
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate if username and password are not empty
    if (!credentials.username || !credentials.password) {
      ErrorToastify("Username and password cannot be empty.");
      return;
    }
    try {
      const response = await apiClient.post(apiPaths.login, credentials);
      const data = response.data;
      const accessToken = data.accessToken;
      console.log(accessToken);
      localStorage.setItem("token", accessToken);
      window.location.reload(); // Reload the page to apply the new token
    } catch (err) {  
        const errorMessage = err.response?.data?.message || "Lỗi mạng.";
        ErrorToastify(errorMessage);
    }
  };

  return (
    <div id="Login" className="d-flex" style={{ marginTop: "50px" }}>
      <div className="container">
        <h1>Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="inputForm">
          <div className="input-container">
            <input
              className="input"
              type="text" // Changed type from email to text
              name="username" // Changed name from email to username
              placeholder="Tên đăng nhập *" // Updated placeholder
              value={credentials.username} // Changed from email to username
              onChange={handleChange}
              autoComplete="username" // Updated autoComplete
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
          <div className="register-link">
            <span>Chưa có tài khoản? </span>
            <a href="/register" style={{ color: "#007bff", textDecoration: "none" }}>
              Đăng ký
            </a>
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
