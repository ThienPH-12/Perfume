import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrrorToastify } from "../../components/Toastify";
import OtpPopup from "../../components/OtpPopup"; // Import the new OTP popup component
import "./Register.scss";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const [otp, setOtp] = useState(""); // State to store the generated OTP
  const [showOtpPopup, setShowOtpPopup] = useState(false); // State to toggle OTP popup
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setCredentials({ ...credentials, gender: e.target.value });
  };

  const validateInputs = () => {
    if (!credentials.username.trim()) {
      ErrrorToastify("Tên không được để trống.");
    }
    if (!credentials.email.trim() || !/\S+@\S+\.\S+/.test(credentials.email)) {
      ErrrorToastify("Email không hợp lệ.");
    }
    if (!credentials.password.trim() || credentials.password.length < 6) {
      ErrrorToastify("Mật khẩu phải có ít nhất 6 ký tự.");
    }
    if (!credentials.gender) {
      ErrrorToastify("Vui lòng chọn giới tính.");
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      return; // Removed setError(validationError)
    }
    try {
      const response = await apiClient.post(apiPaths.sendOtp, credentials);
      console.log(response.data);
      setOtp(response.data); // Store the generated OTP in the state
      setShowOtpPopup(true); // Show OTP popup after sending OTP
    } catch (error) {
      ErrrorToastify("Không thể gửi OTP. Vui lòng thử lại." + error);
    }
  };

  const handleOtpSubmit = async (userInputOtp) => {
    if (userInputOtp == otp) {
      try {
        await apiClient.post(apiPaths.saveUser, credentials); // Call saveUser API
        navigate("/"); // Navigate after successful user registration
      } catch (error) {
        ErrrorToastify("Không thể lưu thông tin người dùng. Vui lòng thử lại." + error);
      }
    } else {
      ErrrorToastify("OTP không chính xác. Vui lòng thử lại.");
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(apiPaths.sendOtp, credentials); // Use the same payload as the first submit
      setOtp(response.data.otp); // Update the generated OTP in the state
    } catch (error) {
      ErrrorToastify("Không thể gửi lại OTP. Vui lòng thử lại." + error);
    }
  };

  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false); // Close the OTP popup
  };

  return (
    <div id="Register" style={{ marginTop: "50px" }}>
      <div className="register-container">
        <h2>Đăng ký</h2>
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
          <button type="submit" className="register-button">
            Đăng ký
          </button>
        </form>
      </div>

      {showOtpPopup && (
        <OtpPopup
          email={credentials.email}
          onSubmit={handleOtpSubmit}
          onResend={handleResendOtp}
          onClose={handleCloseOtpPopup} // Pass the close handler
        />
      )}
    </div>
  );
};

export default Register;
