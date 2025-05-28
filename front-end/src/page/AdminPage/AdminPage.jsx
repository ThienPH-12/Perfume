import React, { useState, useEffect } from "react";
import "./AdminPage.scss";
import ProductModal from "../../components/ProductModal";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const listProduct = await apiClient.get(apiPaths.getAllProducts);
        const updatedProducts = await Promise.all(
          listProduct.data.map(async (product) => {
            const imageResponse = await apiClient.get(
              apiPaths.getProductImageById(product.productId),
              { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(imageResponse.data);
            return { ...product, imageUrl };
          })
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductAddedOrUpdated = () => {
    window.location.reload();
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await apiClient.delete(apiPaths.deleteProduct(productId));
      setProducts(products.filter((product) => product.productId !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <button onClick={() => handleOpenModal()} className="add-button">
        Add Product
      </button>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Expiration Date</th>
            <th>CreateDateTime</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>
                <img src={product.imageUrl} alt={product.productName} className="product-image" />
              </td>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td>{new Date(product.expirationDate).toLocaleDateString()}</td>
              <td>{product.createDateTime}</td>
              <td>
                <button onClick={() => handleOpenModal(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onProductAddedOrUpdated={handleProductAddedOrUpdated}
        product={selectedProduct}
      />
    </div>
  );
}

export default AdminPage;
