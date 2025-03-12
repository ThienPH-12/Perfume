import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiPaths from "../../api/apiPath";
import "./Register.scss"; // Add this line to import the CSS file

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setCredentials({ ...credentials, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiPaths.REGISTER, credentials);
      navigate("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div id="Register" style={{ marginTop: "50px" }}>
      <div className="register-container">
        <h2>Đăng ký</h2>
        <div className="error-message">{error}</div>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Nhập tên của bạn*"
            value={credentials.name}
            onChange={handleChange}
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Nhập Email*"
            value={credentials.email}
            onChange={handleChange}
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu*"
            value={credentials.password}
            onChange={handleChange}
            className="register-input"
          />
          <div className="gender-container">
            <label>
              <input
                type="radio"
                name="gender"
                value="0"
                checked={credentials.gender === "0"}
                onChange={handleGenderChange}
              />
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="1"
                checked={credentials.gender === "1"}
                onChange={handleGenderChange}
              />
              Nữ
            </label>
          </div>
          <button type="submit" className="register-button">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
