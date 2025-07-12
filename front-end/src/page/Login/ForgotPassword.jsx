import React, { useState } from "react";
import "./ForgotPassword.scss";
import apiPaths from "../../api/apiPath";
import apiClient from "../../api/apiClient";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      ErrorToastify("Email không được để trống.");
      return;
    }
    try {
      await apiClient.post(`${apiPaths.forgotPassword}?email=${email}`);
      SuccessToastify("OTP đã được gửi đến email của bạn.");
      navigate("/reset-password", { state: { email } }); // Forward to Reset Password page with email
    } catch (err) {
      const errorMessage = err.response?.data || "Lỗi mạng.";
      ErrorToastify(errorMessage);
    }
  };

  return (
    <div id="ForgotPassword" className="d-flex" style={{ marginTop: "50px" }}>
      <div className="container">
        <h1>Quên mật khẩu</h1>
        <form onSubmit={handleSubmit} className="inputForm">
          <div className="input-container">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email *"
              value={email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <button className="button" type="submit">
            Gửi OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
