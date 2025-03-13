import React from "react";
import "./Product.css"; // Import CSS for styling

const products = [
  {
    id: 1,
    name: "Sôcôla CODEDECO 20g - đẹp dụng cho CTKM",
    price: "100.000đ",
    rating: "5 / 5 (1155 đánh giá)",
    image: "path/to/image1.jpg",
  },
  {
    id: 2,
    name: "Combo 03 chai tinh dầu nước hoa CODEDECO 2.5ml collection 03",
    price: "119.000đ",
    rating: "5 / 5 (1537 đánh giá)",
    image: "path/to/image2.jpg",
  },
  // ...add more products as needed
];

const Product = () => {
  return (
    <div className="product-page">
      <h1>Product Page</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">{product.price}</p>
            <p className="product-rating">{product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
