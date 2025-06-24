import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Product.scss"; // Import CSS for styling
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify } from "../../components/Toastify";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  const fetchCategoriesAndProducts = async () => {
    try {
      const [categoryResponse, productResponse] = await Promise.all([
        apiClient.get(apiPaths.getAllCategories),
        apiClient.get(apiPaths.getAllProducts),
      ]);

      const updatedProducts = await Promise.all(
        productResponse.data.map(async (product) => {
          const imageResponse = await apiClient.get(
            apiPaths.getProductImageById(product.productId),
            { responseType: "blob" }
          );
          const imageUrl = URL.createObjectURL(imageResponse.data);
          return { ...product, imageUrl };
        })
      );

      setCategories(categoryResponse.data);
      setProducts(updatedProducts);
    } catch (error) {
      ErrorToastify("Error fetching data: " + error);
    }
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  return (
    <div id="Product">
      <div className="product-page">
        <h1>FRAGRANCES</h1>
        <p className="title">Tinh dầu đơn</p>
        <div className="container">
          {categories.map((category) => (
            <div key={category.categoryId} className="category-section">
              <div className="catHeader">
                <div className="category-box">
                  <h2 className="category-name">{category.category}</h2>
                </div>
                {/* <div style={{ justifySelf: "flex-end", marginBottom: 15 }}>
                  Xem thêm
                </div> */}
              </div>
              <div className="product-grid">
                {products
                  .filter((product) => product.categoryId === category.categoryId)
                  .map((product) => (
                    <div
                      key={product.productId}
                      className="product-card"
                      onClick={() => navigate(`/product/${product.productId}`)} // Navigate to ProductDetail
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="product-image"
                        width="350"
                        height="350"
                      />
                      <h3 className="product-name">{product.productName}</h3>
                      <p className="product-price">{product.price}</p>
                      <p className="product-rating">{product.rating}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
