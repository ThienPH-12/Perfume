import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import "./Home.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
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

export default function Home() {
  const { user, logout, checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div id="Home">
      <Header />
      <div className="hero-section">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="/front-end/src/logo.png" alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="/front-end/src/logo.png" alt="Second slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="/front-end/src/logo.png" alt="Third slide" />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
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
