import React, { useState, useEffect } from "react";
import "./AdminPage.scss";
import ProductModal from "../../components/ProductModal";
import ConfirmModal from "../../components/ConfirmModal";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrrorToastify as ErrorToastify, SuccessToastify } from "../../components/Toastify";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

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
      ErrorToastify("Error fetching products:"+ error);
    }
  };

  useEffect(() => {
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

  const handleProductAddedOrUpdated = (message) => {
    fetchProducts();
    handleCloseModal();
    SuccessToastify(message);
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await apiClient.delete(apiPaths.deleteProduct(productToDelete));
      setProducts(products.filter((product) => product.productId !== productToDelete));
      SuccessToastify("Product deleted successfully");
    } catch (error) {
      ErrorToastify("Error deleting product: " + error);
    } finally {
      setIsConfirmModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
    setProductToDelete(null);
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
              <td>{new Date(product.createDateTime).toLocaleString()}</td>
              <td>
                <button onClick={() => handleOpenModal(product)}>Edit</button>
                <button onClick={() => handleDeleteClick(product.productId)}>Delete</button>
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
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message="Are you sure you want to delete this product?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default AdminPage;
