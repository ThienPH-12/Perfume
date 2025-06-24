import React, { useState, useEffect } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import MixProductModal from "../../components/MixProductModal";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";

function MixProductManage() {
  const [mixProducts, setMixProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMixProduct, setSelectedMixProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [mixProductToDelete, setMixProductToDelete] = useState(null);

  const fetchMixProducts = async () => {
    try {
      const response = await apiClient.get(apiPaths.getAllMixProducts);
      const mixProductsWithDetails = await Promise.all(
        response.data.map(async (mixProduct) => {
          const compIds = mixProduct.compIds.split("-").map(Number);
          const productDetails = await Promise.all(
            compIds.map(async (compId) => {
              const productResponse = await apiClient.get(apiPaths.getProductById(compId));
              return {
                productName: productResponse.data.productName,
                categoryId: productResponse.data.categoryId,
              };
            })
          );

          const productNames = productDetails.map((detail) => detail.productName);
          const categoryIds = productDetails.map((detail) => detail.categoryId);

          // Fetch the image for the mix product
          const imageResponse = await apiClient.get(
            apiPaths.getMixProductImageByCompIds(mixProduct.compIds),
            { responseType: "blob" }
          );
          const imageUrl = URL.createObjectURL(imageResponse.data);

          return { ...mixProduct, productNames, categoryIds, imageUrl }; // Include imageUrl
        })
      );
      setMixProducts(mixProductsWithDetails);
    } catch (error) {
      ErrorToastify("Error fetching mix products: " + error);
    }
  };

  useEffect(() => {
    fetchMixProducts();
  }, []);

  const handleOpenModal = (mixProduct = null) => {
    setSelectedMixProduct(mixProduct);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMixProduct(null);
  };

  const handleMixProductAddedOrUpdated = (message) => {
    fetchMixProducts();
    setIsModalOpen(false);
    setSelectedMixProduct(null);
    SuccessToastify(message);
  };

  const handleDeleteClick = (mixProductId) => {
    setMixProductToDelete(mixProductId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await apiClient.delete(apiPaths.deleteMixProduct(mixProductToDelete));
      setMixProducts(mixProducts.filter((mp) => mp.mixProdId !== mixProductToDelete));
      SuccessToastify("Mix Product deleted successfully");
    } catch (error) {
      ErrorToastify("Error deleting mix product: " + error);
    } finally {
      setIsConfirmModalOpen(false);
      setMixProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
    setMixProductToDelete(null);
  };

  return (
    <div className="crudContainer">
      <h2>Mix Products</h2>
      <button onClick={() => handleOpenModal()} className="add-button">
        Add Mix Product
      </button>
      <table className="crud-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Mix Product Name</th>
            <th>Description</th>
            <th>Potential Customer</th>
            <th>Product Names</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mixProducts.map((mixProduct, index) => (
            <tr key={mixProduct.mixProdId}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={mixProduct.imageUrl}
                  alt={mixProduct.mixProdName}
                  style={{ height: 400, width: 400 }} // Updated styling to match ProductManage
                  className="product-image"
                />
              </td>
              <td>{mixProduct.mixProdName}</td>
              <td>{mixProduct.description}</td>
              <td>{mixProduct.potentialCus}</td>
              <td>{mixProduct.productNames.join(", ")}</td>
              <td>
                <button onClick={() => handleOpenModal(mixProduct)}>Edit</button>
                <button onClick={() => handleDeleteClick(mixProduct.mixProdId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MixProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onMixProductAddedOrUpdated={handleMixProductAddedOrUpdated}
        mixProduct={selectedMixProduct}
        categoryIds={selectedMixProduct?.categoryIds || []} // Pass categoryIds to the modal
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message="Are you sure you want to delete this mix product?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default MixProductManage;
