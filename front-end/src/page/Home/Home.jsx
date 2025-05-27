import "./Home.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Carousel from "react-bootstrap/Carousel";
import { ArrowRightSquare } from "react-bootstrap-icons";
import image1 from "../../img/slide.jpg";
import image2 from "../../img/slide2.webp";
import image3 from "../../img/slide3.jpg";
import logo from "../../img/logo.png";

const products = [
  {
    id: 1,
    name: "CODEDECO Midnight Rose",
    type: "Mùi hương cho nữ",
    price: "195.000 đ",
    rating: "5 / 5 (1237 đánh giá)",
    image:
      "https://codedeco.art/sp/tinh-https://codedeco.art/wp-content/uploads/2024/03/lady-xit.jpg-nuoc-hoa-codedeco-1101-10ml-dang-xit/",
  },
  {
    id: 2,
    name: "CODEDECO Miss Di",
    type: "Mùi hương cho nữ",
    price: "195.000 đ",
    rating: "5 / 5 (1267 đánh giá)",
    image:
      "https://codedeco.art/sp/tinh-https://codedeco.art/wp-content/uploads/2024/03/lady-xit.jpg-nuoc-hoa-codedeco-1101-10ml-dang-xit/",
  },
  {
    id: 3,
    name: "CODEDECO Good Girl",
    type: "Mùi hương cho nữ",
    price: "195.000 đ",
    rating: "5 / 5 (1207 đánh giá)",
    image:
      "https://codedeco.art/sp/tinh-https://codedeco.art/wp-content/uploads/2024/03/lady-xit.jpg-nuoc-hoa-codedeco-1101-10ml-dang-xit/",
  },
  {
    id: 4,
    name: "CODEDECO Sweet And Spicy",
    type: "Mùi hương cho nam",
    price: "350.000 đ",
    rating: "5 / 5 (1520 đánh giá)",
    image:
      "https://codedeco.art/sp/tinh-https://codedeco.art/wp-content/uploads/2024/03/lady-xit.jpg-nuoc-hoa-codedeco-1101-10ml-dang-xit/",
  },
];
const slides = [
  { img: image1, caption: "Tự do sáng tạo & cá nhân hóa" },
  { img: image2, caption: "Sản phẩm tự nhiên & an toàn" },
  { img: image3, caption: "Quà tặng độc đáo" },
];
export default function Home() {
  return (
    <div
      id="Home"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div className="hero-section">
        <Carousel>
          {slides.map((slide, index) => (
            <Carousel.Item interval={3000}>
              <img
                style={{ height: "85vh" }}
                className="
                d-block w-100"
                src={slide.img}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3> {slide.caption}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="section">
        <h1>Bộ Sưu Tập Cá Nhân</h1>
        <p>
          Câu Chuyện Thương Hiệu Shine Aura – Hương Thơm, Cá Tính, Dấu Ấn Riêng
          Shine Aura ra đời từ một niềm tin rằng mỗi con người đều có một "hào
          quang" độc nhất – một phong cách, một cảm xúc, một bản sắc riêng không
          trộn lẫn. Và hương thơm chính là cách tinh tế nhất để khắc họa dấu ấn
          ấy.
        </p>
      </div>

      <div className="section2">
        <div className="d-flex justify-content-center">
          <img
            style={{ height: "50%", width: "45%", paddingRight: "10px" }}
            className=""
            src={logo}
            alt="Logo"
          />
          <div
            className="d-flex flex-column align-items-center"
            style={{ backgroundColor: "rgb(250, 249, 245)" }}
          >
            <h1>SHINE AURA</h1>
            <p>
              Câu Chuyện Thương Hiệu Shine Aura – Hương Thơm, Cá Tính, Dấu Ấn
              Riêng Shine Aura ra đời từ một niềm tin rằng mỗi con người đều có
              một "hào quang" độc nhất – một phong cách, một cảm xúc, một bản
              sắc riêng không trộn lẫn. Và hương thơm chính là cách tinh tế nhất
              để khắc họa dấu ấn ấy.
            </p>
            <button className="watch-more">
              <a href="/about">
                Xem chi tiết <ArrowRightSquare></ArrowRightSquare>
              </a>{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="section3">
        <h2>Sản phẩm bán chạy</h2>
        <div className="products-container">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.type}</h3>
                <p>{product.name}</p>
                <p>{product.rating}</p>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
