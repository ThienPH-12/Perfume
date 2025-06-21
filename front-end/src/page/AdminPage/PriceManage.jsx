import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify"; // Fixed import
import PriceModal from "../../components/PriceModal";

function PriceManage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prices, setPrices] = useState([]);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(apiPaths.getAllCategories);
      setCategories(response.data);
    } catch (error) {
      ErrorToastify("Error fetching categories: " + error.message);
    }
  };

  const fetchProducts = async (categoryId) => {
    try {
      const response = await apiClient.get(apiPaths.getProductsByCategory(categoryId));
      setProducts(response.data);
    } catch (error) {
      ErrorToastify("Error fetching products: " + error.message);
    }
  };

  const fetchPrices = async (productId) => {
    try {
      const response = await apiClient.get(apiPaths.getPriceListByProductId(productId));
      setPrices(response.data);
    } catch (error) {
      ErrorToastify("Error fetching prices: " + error.message);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedProduct(null);
    setProducts([]); // Clear products list
    setPrices([]); // Clear prices list
    fetchProducts(categoryId);
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
    setPrices([]); // Clear prices list
    fetchPrices(productId);
  };

  const handlePriceAddedOrUpdated = (message) => {
    fetchPrices(selectedProduct);
    setIsPriceModalOpen(false);
    setSelectedPrice(null); // Reset selected price
    SuccessToastify(message);
  };

  const handleAddPrice = () => {
    setSelectedPrice(null); // Reset selected price
    setIsPriceModalOpen(true); // Open modal for adding
  };

  const handleEditPrice = (price) => {
    setSelectedPrice(price);
    setIsPriceModalOpen(true);
  };

  const handleDeletePrice = async (capacityId) => {
    try {
      const priceId = { productId: selectedProduct, capacityId: capacityId };
      await apiClient.delete(apiPaths.deletePrice, { data: priceId }); // Ensure the request body contains the priceId structure
      setPrices(prices.filter((price) => price.capacityId !== capacityId));
      SuccessToastify("Price deleted successfully");
    } catch (error) {
      ErrorToastify("Error deleting price: " + error.message);
    }
  };

  return (
    <div className="crudContainer"> {/* Updated class name */}
      <h2>Manage Prices</h2>
      <div className="dropdowns">
        <select onChange={handleCategoryChange} value={selectedCategory || ""}>
          <option value="" disabled>Select Category</option>
          {categories.map((item) => (
            <option key={item.categoryId} value={item.categoryId}>
              {item.category}
            </option>
          ))}
        </select>
        <select
          onChange={handleProductChange}
          value={selectedProduct || ""}
          disabled={!selectedCategory}
        >
          <option value="" disabled>Select Product</option>
          {products.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.productName}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => handleAddPrice()}
        className="add-button"
        disabled={!selectedProduct}
      >
        Add Price
      </button>
      <table className="crud-table"> {/* Updated class name */}
        <thead>
          <tr>
            <th>Capacity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.capacityId}>
              <td>{price.capacity}</td>
              <td>{price.price}</td>
              <td>
                <button onClick={() => handleEditPrice(price)}>Edit</button>
                <button onClick={() => handleDeletePrice(price.capacityId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPriceModalOpen && (
        <PriceModal
          isOpen={isPriceModalOpen}
          onClose={() => setIsPriceModalOpen(false)}
          onPriceAddedOrUpdated={handlePriceAddedOrUpdated}
          price={selectedPrice}
          productId={selectedProduct}
          capacityId={selectedPrice?.capacityId}
        />
      )}
    </div>
  );
}

export default PriceManage;
