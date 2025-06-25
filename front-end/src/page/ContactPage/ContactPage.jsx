import React from "react";
import "./ContactPage.scss"; // Import the CSS file for styling

const ContactPage = () => {
  return (
    <div id="ContactPage">
      <div className="contact-page">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3724.5063419425246!2d105.52271427608831!3d21.012416680632814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1750877683607!5m2!1sen!2sus"
            title="Google Map Location"
            className="map-iframe"
            allowFullScreen=""
            loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div className="contact-info">
          <h1>THÔNG TIN LIÊN HỆ</h1>
          <p>Địa chỉ chúng tôi</p>
          <p>Km29 Đại lộ Thăng Long, huyện Thạch Thất, Hà Nội</p>
          <p>Email: Shineaura.perfume@gmail.com</p>
          <p>Điện thoại: 0338.220.364 (CSKH: 0932.712.418)</p>
          <p>Thời gian làm việc: Thứ 2 đến Thứ 7 từ 8h đến 17h</p>
          <p>
            Nhập thông tin của bạn vào Form dưới đây để được hỗ trợ tốt nhất.
          </p>
          <form>
            <input type="text" placeholder="Tên của bạn" disabled />
            <input type="text" placeholder="Số điện thoại" disabled />
            <input type="email" placeholder="Email" disabled />
            <textarea placeholder="Nội dung chi tiết..." disabled></textarea>
            <button type="submit" disabled>GỬI ĐI</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
