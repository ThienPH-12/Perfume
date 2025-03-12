import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Carousel from "react-bootstrap/Carousel";
import { ArrowRightSquare } from 'react-bootstrap-icons';
import image1 from "../../img/R.jpg";
import image2 from "../../img/R - Copy.jpg";
import image3 from "../../img/R - Copy (2).jpg";

const products = [
  {
    id: 1,
    name: "CODEDECO Midnight Rose",
    type: "Mùi hương cho nữ",
    price: "195.000 đ",
    rating: "5 / 5 (1237 đánh giá)",
    image: "path/to/midnight-rose.jpg",
  },
  {
    id: 2,
    name: "CODEDECO Miss Di",
    type: "Mùi hương cho nữ",
    price: "195.000 đ",
    rating: "5 / 5 (1267 đánh giá)",
    image: "path/to/miss-di.jpg",
  },
  {
    id: 3,
    name: "CODEDECO Good Girl",
    type: "Mùi hương cho nữ",
    price: "195.000 đ",
    rating: "5 / 5 (1207 đánh giá)",
    image: "path/to/good-girl.jpg",
  },
  {
    id: 4,
    name: "CODEDECO Sweet And Spicy",
    type: "Mùi hương cho nam",
    price: "350.000 đ",
    rating: "5 / 5 (1520 đánh giá)",
    image: "path/to/sweet-and-spicy.jpg",
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
                style={{ height: "75vh" }}
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
      <div className="products-section">
        <h1>Bộ Sưu Tập Cá Nhân</h1>
        <p>
          Mỗi vùng đất mỗi vùng văn hóa đều có những nét đặc trưng riêng điều ấy
          không chỉ phác thảo bằng những giá trị hữu hình mà còn ẩn chứa trong
          đó những giá trị vô hình, và ta cảm nhận bằng tâm hồn, trái tim trong
          đó nổi bật có thể kể đến đó là mùi hương. Tại CODEDECO chúng tôi tạo
          ra các mùi hương đa dạng theo phong cách của bạn. CODEDECO cố gắng lột
          tả hình ảnh văn hóa, tính cách mang đến giá trị cho khách hàng sử
          dụng.
        </p>
     
      </div>
      <div className="products-section">
        <h1>CODEDECO</h1>
        <p>
          Mỗi vùng đất mỗi vùng văn hóa đều có những nét đặc trưng riêng điều ấy
          không chỉ phác thảo bằng những giá trị hữu hình mà còn ẩn chứa trong
          đó những giá trị vô hình, và ta cảm nhận bằng tâm hồn, trái tim trong
          đó nổi bật có thể kể đến đó là mùi hương. Tại CODEDECO chúng tôi tạo
          ra các mùi hương đa dạng theo phong cách của bạn. CODEDECO cố gắng lột
          tả hình ảnh văn hóa, tính cách mang đến giá trị cho khách hàng sử
          dụng.
        </p>
        <button className="watch-more" ><a href="/about">Xem chi tiết <ArrowRightSquare></ArrowRightSquare></a> </button>
      </div>
      <div className="products-section">
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
