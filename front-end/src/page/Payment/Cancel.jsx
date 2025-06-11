import React from "react";
import "./Cancel.scss"; // Import the CSS file for styling

function Cancel() {
  return (
    <div id="Cancel">
      <div className="main-box">
        <h4 className="payment-title">
          Thanh toán đã bị hủy. Vui lòng thử lại hoặc liên hệ hỗ trợ!
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

export default Cancel;
