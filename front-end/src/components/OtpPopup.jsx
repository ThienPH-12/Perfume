import React, { useRef } from "react";
import "./OtpPopup.scss"; // Add a corresponding SCSS file if needed

const OtpPopup = ({ email, onSubmit, onResend, onClose }) => {
  const userInputOtpRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userInputOtpRef.current.value);
  };

  return (
    <div id="OtpPopup">
      <div className="otp-popup">
        <div className="otp-popup-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <p>
            OTP đã được gửi đến email {email} của bạn. Vui lòng nhập OTP để tiếp
            tục.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nhập OTP"
              ref={userInputOtpRef}
              className="otp-input"
            />
            <button type="submit" className="otp-submit-button">
              Xác nhận
            </button>
          </form>
          <button onClick={onResend} className="resend-button">
            Gửi lại OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;
