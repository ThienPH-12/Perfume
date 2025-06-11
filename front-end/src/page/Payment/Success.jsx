import React from "react";
import "./Success.scss"; // Import the CSS file for styling

function Success() {
  return (
    <div id="Success">
      <div className="main-box">
        <h4 className="payment-title">
          Thanh toán thành công. Cảm ơn bạn đã sử dụng payOS!
        </h4>
        <p>
          Nếu có bất kỳ câu hỏi nào, hãy gửi email tới{" "}
          <a href="mailto:support@payos.vn">support@payos.vn</a>
        </p>
        <a href="/" id="return-page-btn">
          Trở về trang Tạo Link thanh toán
        </a>
      </div>
    </div>
  );
}

export default Success;
