import React, { useState, useRef } from "react";
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
  const [otp, setOtp] = useState(""); // State to store the generated OTP
  const userInputOtpRef = useRef(null); // Ref to store the user input OTP
  const [showOtpPopup, setShowOtpPopup] = useState(false); // State to toggle OTP popup
  const [error, setError] = useState(""); // Error message for form submission
  const [otpMessage, setOtpMessage] = useState({ text: "", isError: false }); // State for OTP-related messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setCredentials({ ...credentials, gender: e.target.value });
  };

  const validateInputs = () => {
    if (!credentials.name.trim()) return "Tên không được để trống.";
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
      setError(validationError); // Display validation error
      return;
    }

    try {
      const response = await axios.post(apiPaths.sendOtp, credentials);
      setOtp(response.data.otp); // Store the generated OTP in the state
      setShowOtpPopup(true); // Show OTP popup after sending OTP
      setOtpMessage({ text: "OTP đã được gửi đến email của bạn.", isError: false }); // Success message
      setError(""); // Clear any previous error
    } catch (error) {
      setError("Không thể gửi OTP. Vui lòng thử lại."); // Display error if email cannot be sent
      console.error("Registration failed:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (userInputOtpRef.current.value === otp) {
      try {
        await axios.post(apiPaths.saveUser, credentials); // Call saveUser API
        navigate("/"); // Navigate after successful user registration
      } catch (error) {
        setOtpMessage({ text: "Không thể lưu thông tin người dùng. Vui lòng thử lại.", isError: true }); // Error message
        console.error("Failed to save user:", error);
      }
    } else {
      setOtpMessage({ text: "OTP không chính xác. Vui lòng thử lại.", isError: true }); // Error message
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiPaths.sendOtp, credentials); // Use the same payload as the first submit
      setOtp(response.data.otp); // Update the generated OTP in the state
      setOtpMessage({ text: "OTP đã được gửi lại đến email của bạn.", isError: false }); // Success message
    } catch (error) {
      setOtpMessage({ text: "Không thể gửi lại OTP. Vui lòng thử lại.", isError: true }); // Error message
      console.error("Failed to resend OTP:", error);
    }
  };

  return (
    <div id="Register" style={{ marginTop: "50px" }}>
      <div className="register-container">
        <h2>Đăng ký</h2>
        <div className="error-message">{error}</div> {/* Display error */}
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

      {showOtpPopup && (
        <div className="otp-popup">
          <div className="otp-popup-content">
            <p>
              OTP đã được gửi đến email {credentials.email} của bạn. Vui lòng
              nhập OTP để tiếp tục.
            </p>
            <form onSubmit={handleOtpSubmit}>
              <input
                type="text"
                placeholder="Nhập OTP"
                ref={userInputOtpRef} // Use ref for user input
                className="otp-input"
              />
              <button type="submit" className="otp-submit-button">
                Xác nhận
              </button>
            </form>
            <button onClick={handleResendOtp} className="resend-button">
              Gửi lại OTP
            </button>
            <p className={`otp-message ${otpMessage.isError ? "error" : ""}`}>
              {otpMessage.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
