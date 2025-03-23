import React from "react";
import "./About.scss";
import Logo from "./logo.png";
import Img2 from "./about2.jpg";

export default function About() {
  return (
    <div id="About" className="container" style={{ marginTop: "50px" }}>
      <div className="article">
        <h2>VỀ CHÚNG TÔI </h2>{" "}
        <p>
          Câu Chuyện Thương Hiệu Shine Aura – Hương Thơm, Cá Tính, Dấu Ấn Riêng
          Shine Aura ra đời từ một niềm tin rằng mỗi con người đều có một "hào
          quang" độc nhất – một phong cách, một cảm xúc, một bản sắc riêng không
          trộn lẫn. Và hương thơm chính là cách tinh tế nhất để khắc họa dấu ấn
          ấy. 
          ✨ Từ đam mê cá nhân đến thương hiệu nước hoa DIY Chúng tôi bắt
          đầu từ niềm yêu thích với nước hoa – không chỉ là một mùi hương, mà là
          một trải nghiệm, một nghệ thuật, một câu chuyện. Nhưng thay vì tìm
          kiếm một mùi hương mang dấu ấn cá nhân – một thứ độc nhất vô nhị, phản
          ánh phong cách và cảm xúc riêng của mỗi người.
        </p>
      </div>
      <div></div>
      <img
        src={Logo}
        style={{
          width: "100%",
          height: "600px",
          objectFit: "cover",
          padding: "5px",
          margin: "0",
        }}
        alt=""
      />
      <div className="article">
      <h2> VISION</h2>{" "}
        <p>
         Mong muốn mang đến cho khách hàng sản phẩm nước hoa mang mùi
          hương độc nhất, unique, thể hiện rõ ràng tính cách, cá tính của người
          sử dụng. Motivation: Hiện nay, hầu hết người dùng nước hoa chỉ có thể
          lựa chọn từ những mùi hương có sẵn, chưa có nhiều cơ hội để tự tạo ra
          hương thơm theo sở thích cá nhân. Shine Aura mong muốn mang đến cho
          người dùng trải nghiệm độc đáo, nơi họ có thể tự do pha trộn và sáng
          tạo nên mùi nước hoa riêng, thể hiện cá tính và phong cách của mình.
        </p>
      </div>
      <img
        src={Img2 }
        style={{
          width: "100%",
          height: "600px",
          objectFit: "cover",
          padding: "5px",
          margin: "0",
        }}
        alt=""
      />
    </div>
  );
}
