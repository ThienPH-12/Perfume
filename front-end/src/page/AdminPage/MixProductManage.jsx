import React, { useState, useEffect } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import MixProductModal from "../../components/MixProductModal"; // Updated import
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify"; // Fixed import

function MixProductManage() { // Updated from SellProductManage
  const [mixProducts, setMixProducts] = useState([]); // Updated from sellProducts
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [mixProductToDelete, setMixProductToDelete] = useState(null); // Updated from sellProductToDelete
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMixProducts = async () => { // Updated from fetchSellProducts
    try {
      const response = await apiClient.get(apiPaths.getAllMixProducts); // Updated API path
      const mixProductsWithNames = await Promise.all(
        response.data.map(async (mixProduct) => {
          const compIds = mixProduct.compIds.split("-").map(Number); // Convert string to list of integers
          const productNames = await Promise.all(
            compIds.map(async (compId) => {
              const productResponse = await apiClient.get(apiPaths.getProductById(compId));
              return productResponse.data.productName;
            })
          );
          return { ...mixProduct, productNames };
        })
      );
      setMixProducts(mixProductsWithNames);
    } catch (error) {
      ErrorToastify("Error fetching mix products: " + error); // Updated error message
    }
  };

  useEffect(() => {
    fetchMixProducts(); // Updated function call
  }, []);

  const handleDeleteClick = (mixProductId) => { // Updated from sellProductId
    setMixProductToDelete(mixProductId); // Updated state setter
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await apiClient.delete(apiPaths.deleteMixProduct(mixProductToDelete)); // Updated API path
      setMixProducts(mixProducts.filter((mp) => mp.mixProdId !== mixProductToDelete)); // Updated state setter
      SuccessToastify("Mix Product deleted successfully"); // Updated success message
    } catch (error) {
      ErrorToastify("Error deleting mix product: " + error); // Updated error message
    } finally {
      setIsConfirmModalOpen(false);
      setMixProductToDelete(null); // Updated state setter
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
    setMixProductToDelete(null); // Updated state setter
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMixProductAdded = () => { // Updated from handleSellProductAdded
    fetchMixProducts(); // Updated function call
  };

  return (
    <div className="mixProductCrud"> {/* Updated class name */}
      <h2>Mix Products</h2> {/* Updated heading */}
      <button onClick={handleOpenModal} className="add-button">
        Add Mix Product {/* Updated button text */}
      </button>
      <table className="mix-product-table"> {/* Updated class name */}
        <thead>
          <tr>
            <th>No</th>
            {/* Removed capacityId column */}
            <th>Mix Product Name</th> {/* New field */}
            <th>Description</th> {/* New field */}
            <th>Potential Customer</th> {/* New field */}
            <th>Product Names</th> {/* New field */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mixProducts.map((mixProduct, index) => ( // Updated from sellProducts
            <tr key={mixProduct.mixProdId}> {/* Updated key */}
              <td>{index + 1}</td>
              {/* Removed capacityId field */}
              <td>{mixProduct.mixProdName}</td> {/* New field */}
              <td>{mixProduct.description}</td> {/* New field */}
              <td>{mixProduct.potentialCus}</td> {/* New field */}
              <td>{mixProduct.productNames.join(", ")}</td> {/* Display product names as a list */}
              <td>
                <button onClick={() => handleDeleteClick(mixProduct.mixProdId)}>Delete</button> {/* Updated ID */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message="Are you sure you want to delete this mix product?" // Updated message
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <MixProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onMixProductAdded={handleMixProductAdded} // Updated callback
      />
    </div>
  );
}

export default MixProductManage; // Updated export
