import "./Home.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../img/slide.jpg";
import image2 from "../../img/slide2.webp";
import image3 from "../../img/slide3.jpg";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify } from "../../components/Toastify";
import { useNavigate } from "react-router-dom"; // Add useNavigate

const slides = [
  { img: image1, caption: "Tự do sáng tạo & cá nhân hóa" },
  { img: image2, caption: "Sản phẩm tự nhiên & an toàn" },
  { img: image3, caption: "Quà tặng độc đáo" },
];

export default function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  const fetchLatestProducts = async () => {
    try {
      const response = await apiClient.get(apiPaths.getTwoLatestProducts);
      const productsWithImages = await Promise.all(
        response.data.map(async (product) => {
          const imageResponse = await apiClient.get(
            apiPaths.getProductImageById(product.productId),
            { responseType: "blob" }
          );
          const imageUrl = URL.createObjectURL(imageResponse.data);
          return { ...product, imageUrl };
        })
      );
      setLatestProducts(productsWithImages);
    } catch (error) {
      ErrorToastify("Error fetching latest products: " + error);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(
      ".section, .home-1-section, .latest-products-section, .faq-section"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, []);

  return (
    <div
      id="Home"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div className="hero-section">
        <Carousel>
          {slides.map((slide, index) => (
            <Carousel.Item key={index} interval={3000}>
              <img
                className="d-block w-100"
                src={slide.img}
                alt={`Slide ${index + 1}`}
              />
              <Carousel.Caption>
                <h3>{slide.caption}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="section">
        <h1 style={{ fontWeight: "bold", textAlign: "center", fontSize: "2rem", marginBottom: "50px" }}>GIỚI THIỆU</h1> {/* Reduced margin */}
        <p style={{ textAlign: "center" }}>
          Shine Aura – nơi nghệ thuật mùi hương gặp gỡ với cá tính riêng biệt. Lấy cảm hứng từ hai khái niệm “Shine” – sự tỏa sáng từ bên trong và “Aura” – vầng hào quang mang dấu ấn cá nhân, chúng tôi tin rằng mỗi người đều có một khí chất không thể sao chép, và hương thơm chính là cách dịu dàng nhất để thể hiện điều đó. Chúng tôi mang đến một khái niệm hoàn toàn mới về nước hoa: DIY Perfume từ những tinh dầu nguyên chất được chọn lọc kỹ lưỡng, hoà quyện cùng cảm xúc và cá tính độc nhất của chính bạn. Mỗi bộ kit của Shine Aura không chỉ là một sản phẩm, mà là một hành trình: hành trình khám phá bản thân qua từng tầng hương – từ nốt đầu nhẹ nhàng mở lối, đến nốt giữa mềm mại êm dịu, và kết lại bằng nốt hương sâu lắng đầy ấn tượng.
        </p>
        <p style={{ textAlign: "center" }}>
        Chúng tôi tin rằng: mỗi người là một bản thể tỏa sáng, và mỗi mùi hương là một dấu chấm than đầy kiêu hãnh cho bản ngã ấy. Dù bạn là ai – dịu dàng như hoa nhài, sắc sảo như hổ phách, hay tươi mát như mâm xôi chín mọng – Shine Aura đều có thể giúp bạn ghi dấu bằng chính mùi hương do bạn tạo nên.</p>
      </div>

      <div className="home-1-section">
        <img
          src={require("../../img/home1.jpg")} // Replace with the correct path to the image
          alt="Home 1"
          style={{ width: "100vw", height: "400px", objectFit: "cover" }} // Set width to 100vw for full screen
        />
      </div>

      <div className="latest-products-section">
        {latestProducts.map((product, index) => (
          <div
            key={product.productId}
            className={`latest-product-row ${index % 2 === 0 ? "row-normal" : "row-reverse"
              }`}
            onClick={() => navigate(`/product/${product.productId}`)} // Navigate to ProductDetail
            style={{ cursor: "pointer" }} // Add pointer cursor for better UX
          >
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="latest-product-image"
            />
            <div className="latest-product-description">
              <strong className="product-title">SẢN PHẨM MỚI</strong>
              <p style={{width:"90%"}}>{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-section">
        <h2>Câu hỏi thường gặp</h2>
        {[ 
          { question: " Shine Aura là gì?", answer: "Shine Aura không chỉ là một thương hiệu nước hoa DIY – mà là một hành trình khám phá mùi hương cá nhân. Với đội ngũ đam mê sáng tạo và kinh nghiệm trong ngành mùi hương thủ công, Shine Aura mang đến trải nghiệm độc đáo, tinh tế và mang đậm dấu ấn cá nhân cho mỗi khách hàng." },
          { question: " Tại Shine Aura, tôi sẽ trải nghiệm gì?", answer: "Tại Shine Aura, bạn không chỉ mua nước hoa – bạn tự tay làm nên mùi hương riêng biệt qua các buổi workshop ấm cúng và cá nhân hóa. Đội ngũ hỗ trợ 1-1 giúp bạn chọn tone mùi phù hợp với cá tính – từ nhẹ nhàng nữ tính đến cá tính phá cách." },
          { question: " Shine Aura khác gì so với nước hoa công nghiệp?", answer: "Khác với nước hoa công nghiệp đại trà, Shine Aura sử dụng nguyên liệu thiên nhiên an toàn, không cồn gắt, không gây dị ứng. Thêm vào đó, bạn được tự thiết kế mùi hương – điều mà các thương hiệu lớn không thể cá nhân hóa theo từng người." },
          { question: " Tự làm nước hoa có khó không?", answer: "Bạn nghĩ tự làm nước hoa sẽ khó? Không đâu! Tại Shine Aura, dù bạn chưa từng thử, bạn vẫn dễ dàng tạo được mùi hương riêng nhờ hướng dẫn chi tiết và công thức sẵn có. Workshop vui – dễ – thư giãn, ai cũng làm được!" }
        ].map((faq, index) => (
          <div key={index} className="faq-item">
            <h4
              onClick={(e) => {
                const answerElement = e.target.nextElementSibling;
                answerElement.style.display = answerElement.style.display === "none" ? "block" : "none";
              }}
            >
              {faq.question}
            </h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
