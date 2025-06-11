import React, { useState, useEffect } from "react";
import ProductModal from "../../components/ProductModal";
import ConfirmModal from "../../components/ConfirmModal";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";

function ProductManage() {
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

          const categoryResponse = await apiClient.get(
            apiPaths.getCategoryById(product.categoryId)
          );
          const categoryName = categoryResponse.data.category;

          return { ...product, imageUrl, categoryName };
        })
      );
      setProducts(updatedProducts);
    } catch (error) {
      ErrorToastify("Error fetching products:" + error);
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
    <div className="productCrud">
      <h2>Products</h2>
      <button onClick={() => handleOpenModal()} className="add-button">
        Add Product
      </button>
      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Expiration Date</th>
            <th>CreateDateTime</th>
            <th>Potential Customer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.productId}>
              <td>{index + 1}</td>
              <td>
                <img style ={{height:400,width:400}}src={product.imageUrl} alt={product.productName} className="product-image" />
              </td>
              <td>{product.productName}</td>
              <td  className="text-start"> {product.description}</td>
              <td>{product.categoryName}</td>
              <td>{new Date(product.expirationDate).toLocaleDateString()}</td>
              <td>{new Date(product.createDateTime).toLocaleString()}</td>
              <td>{product.potentialCus}</td>
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

export default ProductManage;
