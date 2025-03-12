import React from "react";
import './Footer.scss'; // Update to import SCSS file

function Footer() {
  return (
    <footer id="Footer" className="footer footer-fixed">
      <div className="footer-section">
        <h3>CODEDECO FRAGRANCE</h3>
        <p>Người đại diện: Dương Thị Uyên Nhung</p>
        <p>Địa chỉ trụ sở: Số 70 ngõ 445 Đ.Lạc Long Quân, Q.Tây Hồ, Hà Nội</p>
        <p>Số đăng kí kinh doanh: 01B8021029</p>
        <p>Đăng kí lần đầu ngày: 15/03/2022</p>
        <p>Đăng kí thay đổi lần thứ 1: 21/04/2023</p>
        <p>MST: 8364994183</p>
        <p>Hotline: 05678.83.111 - CSKH: 05678.82.111</p>
        <div className="social-icons">
          <a href="#"><img src="https://th.bing.com/th/id/OIP.TYjMA7L6TmW-aMKd6KY8iwHaEo?rs=1&pid=ImgDetMain" alt="Facebook" /></a>
          <a href="#"><img src="https://th.bing.com/th/id/R.6287255214805d04b927ee0c53c88f64?rik=Hajf3OR9ipXMdQ&riu=http%3a%2f%2ffreelogopng.com%2fimages%2fall_img%2f1656180674shopee-logo-transparent.png&ehk=9Uim1JMb9bW6YMwQi6SDKsI56jFiz6E4jvDwKPNcx8M%3d&risl=&pid=ImgRaw&r=0" alt="Shopee" /></a>
          <a href="#"><img src="https://freelogopng.com/images/all_img/1685525042lazada-app-logo.png" alt="Lazada" /></a>
          <a href="#"><img src="https://p16-va-tiktok.ibyteimg.com/obj/musically-maliva-obj/4c979aba3f8853a8fcf5940648972f35" alt="TikTok" /></a>
        </div>
      </div>
      <div className="footer-section">
        <h3>CHĂM SÓC KHÁCH HÀNG</h3>
        <p>Hỏi đáp - FAQs</p>
        <p>Blogs</p>
        <p>Trải nghiệm mua sắm hài lòng</p>
        <p>Group mật mã về mùi hương</p>
      </div>
      <div className="footer-section">
        <h3>CHÍNH SÁCH BÁN HÀNG</h3>
        <p>Hướng dẫn mua hàng</p>
        <p>Chính sách đổi trả hàng</p>
        <p>Liên kết đại lý</p>
        <p>Điều khoản sử dụng</p>
        <p>Chính sách giao hàng, nhận hàng, kiểm hàng và hoàn hàng</p>
        <p>Chính sách bảo mật thông tin cá nhân</p>
        <p>Quy định chung</p>
      </div>
      <div className="footer-section">
        <h3>PHƯƠNG THỨC THANH TOÁN</h3>
        <img src="payment-methods.png" alt="Payment Methods" />
      </div>
    </footer>
  );
}

export default Footer;
