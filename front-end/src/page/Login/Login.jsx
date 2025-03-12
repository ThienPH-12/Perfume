import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../auth/auth";
import "./Login.scss";
import apiPaths from "../../api/apiPath";
import apiClient from "../../api/apiClient";

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
      const response = await fetch(
        "http://localhost:8080/api" + apiPaths.login,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const accessToken = data.accessToken;
      console.log(accessToken);
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
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
