import React, { useState, useEffect } from "react";
import "./ResetPassword.scss";
import apiPaths from "../../api/apiPath";
import apiClient from "../../api/apiClient";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate

const ResetPassword = () => {
  const location = useLocation(); // Get location state
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    email: location.state?.email || "", // Pre-fill email from ForgotPassword
    otp: "",
    newPassword: "",
  });

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/forgotpassword"); // Redirect to ForgotPassword if email is null
    }
  }, [location.state?.email, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReSend = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(`${apiPaths.forgotPassword}?email=${formData.email}`);
      SuccessToastify("OTP đã được gửi lại đến email của bạn.");
    } catch (err) {
      const errorMessage = err.response?.data || "Lỗi mạng.";
      ErrorToastify(errorMessage);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, otp, newPassword } = formData;
    if (!otp || !newPassword) {
      ErrorToastify("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (!newPassword.trim() || newPassword.length < 6) {
      ErrorToastify("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    try {
      await apiClient.post(apiPaths.resetPassword, { email, otp, newPassword });
      SuccessToastify("Mật khẩu đã được đặt lại thành công.");
      navigate("/login"); // Redirect to login after successful reset
    } catch (err) {
      const errorMessage = err.response?.data || "Lỗi mạng.";
      ErrorToastify(errorMessage);
    }
  };

  return (
    <div id="ResetPassword" className="d-flex text-break" style={{ marginTop: "50px" }}>
      <div className="container">
        <h1>Đặt lại mật khẩu</h1>
        <form className="inputForm">
          <div className="input-container">
            <p>Email: <strong>{formData.email}</strong></p> {/* Display email */}
          </div>
          <div className="input-container">
            <input
              className="input"
              type="text"
              name="otp"
              placeholder="OTP *"
              value={formData.otp}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              className="input"
              type="password"
              name="newPassword"
              placeholder="Mật khẩu mới *"
              value={formData.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <div className="d-flex justify-content-between">
            <button className="button" onClick={handleReSend}>Gửi lại OTP</button>
            <button className="button" onClick={handleSubmit} type="submit">
              Đặt lại mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
