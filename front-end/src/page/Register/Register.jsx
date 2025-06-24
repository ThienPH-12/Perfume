import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify"; // Fixed import
import "./Register.scss";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setCredentials({ ...credentials, gender: e.target.value });
  };

  const validateInputs = () => {
    if (!credentials.username.trim()) return "Tên không được để trống.";
    if (!credentials.email.trim() || !/\S+@\S+\.\S+/.test(credentials.email))
      return "Email không hợp lệ.";
    if (!credentials.password.trim() || credentials.password.length < 6)
      return "Mật khẩu phải có ít nhất 6 ký tự.";
    if (!credentials.gender) return "Vui lòng chọn giới tính.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      ErrorToastify(validationError);
      return;
    }
    try {
      await apiClient.post(apiPaths.register, credentials); // Call the register API
      SuccessToastify("Đăng ký thành công!,vui lòng chờ email để xác nhận tài khoản.");
      navigate("/"); // Navigate after successful registration
    } catch (error) {
      ErrorToastify( error.response.data ?error.response.data: "Đăng ký không thành công. Vui lòng thử lại sau.");
    }
  };

  return (
    <div id="Register" style={{ marginTop: "50px" }}>
      <div className="register-container">
        <h1>Đăng ký</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            placeholder="Nhập tên của bạn*"
            value={credentials.username}
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
          <div className="login-link">
            <span>Đã có tài khoản? </span>
            <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>
              Đăng nhập
            </a>
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
