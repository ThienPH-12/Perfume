import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MixProduct.scss"; // Import CSS for styling
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { SuccessToastify, ErrorToastify } from "../../components/Toastify";

const MixProduct = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

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

  const toggleSelectProduct = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.find((item) => item.productId === product.productId)) {
        return prevSelected.filter((item) => item.productId !== product.productId);
      }
      if (prevSelected.length < 4) {
        return [...prevSelected, product];
      }
      return prevSelected;
    });
  };

  const isProductSelected = (productId) =>
    selectedProducts.some((item) => item.productId === productId);

  const saveFormula = () => {
    const compIds = selectedProducts
      .map((product) => product.productId)
      .sort((a, b) => a - b)
      .join("-");
    const updatedFormulas = JSON.parse(localStorage.getItem("savedFormulas")) || [];

    if (updatedFormulas.some((item) => item.compIds === compIds)) {
      ErrorToastify("trùng công thức");
      return;
    }

    updatedFormulas.push({ compIds, mixProdName: "" });
    localStorage.setItem("savedFormulas", JSON.stringify(updatedFormulas));
    SuccessToastify("đã lưu công thức");
  };

  return (
    <div id="MixProduct">
      <div className="mix-product-page">
        <h1>FRAGRANCES</h1>
        <p className="title">MIX Nước Hoa</p>
        <div className="btnContainer">
          <button
            className="saved-formulas-button"
            onClick={() => navigate("/saved-formulas")}
          >
            Công thức đã lưu
          </button>
        </div>
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
                      className={`product-card ${isProductSelected(product.productId) ? "selected glow" : ""
                        }`}
                      onClick={() => toggleSelectProduct(product)}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="product-image"
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
        <div className="selected-products-section">
          <h2>Sản phẩm đã chọn:</h2>
          <div className="selected-products-grid">
            <div style={{ width: "70%" }}>
              {selectedProducts.length === 0 ? (
                <p>Hãy chọn sản phẩm để mix(tối thiểu 2 sản phẩm)</p>
              ) : (
                selectedProducts.map((product) => (
                  <div key={product.productId} className="selected-product-card">
                    <h3 className="selected-product-name">{product.productName}</h3>
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="selected-product-image"
                    />
                  </div>
                ))
              )}
            </div>
            <div className="btnContainer">
              <button
                className="mix-button"
                disabled={selectedProducts.length < 2}
                onClick={() =>
                  navigate("/mix-product-detail", {
                    state: {
                      compIds: selectedProducts.map((product) => ({ productId: product.productId })), // Parse compIds
                      mixProdName: "Sản phẩm Mix", // Add "San pham Mix" field
                    },
                  })
                }
              >
                Mix các mùi hương
              </button>
              <button
                className="save-formula-button"
                disabled={selectedProducts.length < 2}
                onClick={saveFormula}
              >
                Lưu công thức
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixProduct;
