import React from "react";
import './Footer.scss'; // Update to import SCSS file

function Footer() {
  return (
    <footer id="Footer" className="footer footer-fixed">
     
      <div className="footer-section">
        <h3>CHĂM SÓC KHÁCH HÀNG</h3>
        <a style={{color:"black"}}href="/blog">Blogs</a>
      </div>
      <div className="footer-section">
        <h3>SHINE AURA</h3>
        <p>Người đại diện: Đỗ Quang Trường</p>
        <p>Địa chỉ trụ sở: Km29 Đại lộ Thăng Long, huyện Thạch Thất, Hà Nội</p>
        <p>MST: 8364994183</p>
        <p>Hotline: 0338.220.364 - CSKH: 0932.712.418</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/shineaura.perfume"><img src="https://th.bing.com/th/id/OIP.TYjMA7L6TmW-aMKd6KY8iwHaEo?rs=1&pid=ImgDetMain" alt="Facebook" /></a>
        </div>
      </div>
      <div className="footer-section">
        <h3>CHÍNH SÁCH BÁN HÀNG</h3>
        <p>Quy định chung</p>
      </div>
    </footer>
  );
}

export default Footer;
