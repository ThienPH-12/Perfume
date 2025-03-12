import React from "react";
import "./ContactPage.scss"; // Import the CSS file for styling

const ContactPage = () => {
  return (
    <div id="ContactPage">
      <div className="contact-page">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.902214019322!2d105.7631013153324!3d21.0362377929178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3c0c6b1b3d%3A0x4b1e8b8b8b8b8b8b!2sV%C4%83n%20ph%C3%B2ng%20nh%E1%BA%ADn%20h%C3%A0ng%20CODEDECO!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s"
            width="600"
            height="850"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="contact-info">
          <h1>THÔNG TIN LIÊN HỆ</h1>
          <p>Địa chỉ chúng tôi</p>
          <p>Số 60+ 62/435 Đ. Xuân Đỉnh, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội</p>
          <p>Email: Info.codedeco@gmail.com</p>
          <p>Điện thoại: 05678.82.111 (CSKH: 05678.83.111)</p>
          <p>Thời gian làm việc: Thứ 2 đến Thứ 7 từ 8h đến 17h</p>
          <p>
            Nhập thông tin của bạn vào Form dưới đây để được hỗ trợ tốt nhất.
          </p>
          <form>
            <input type="text" placeholder="Tên của bạn" />
            <input type="text" placeholder="Số điện thoại" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Nội dung chi tiết..."></textarea>
            <button type="submit">GỬI ĐI</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
