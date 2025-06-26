import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";
import { ErrorToastify, SuccessToastify } from "./Toastify";
import "./MixProductModal.scss";

function MixProductModal({ isOpen, onClose, onMixProductAddedOrUpdated, mixProduct }) {
  const [mixProdReq, setMixProdReq] = useState({
    compIds: [],
    mixProdName: "",
    description: "",
    potentialCus: "",
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mixItemCount, setMixItemCount] = useState(2);

  const clearForm = () => {
    setMixProdReq({
      compIds: [],
      mixProdName: "",
      description: "",
      potentialCus: "",
    });
    setSelectedCategories([]);
    setMixItemCount(2);
    setImage(null);
  };

  useEffect(() => {
    if (isOpen) {
      if (mixProduct) {
        const compIds = mixProduct.compIds.split("-").map(Number);
        setMixProdReq({
          compIds,
          mixProdName: mixProduct.mixProdName,
          description: mixProduct.description,
          potentialCus: mixProduct.potentialCus,
        });
        setMixItemCount(compIds.length);

        const fetchPreSelectedData = async () => {
          const updatedProductsByCategory = {};
          for (let i = 0; i < compIds.length; i++) {
            const categoryId = mixProduct.categoryIds[i];
            const categoryProductsResponse = await apiClient.get(apiPaths.getProductsByCategory(categoryId));
            updatedProductsByCategory[i] = categoryProductsResponse.data;
          }
          setSelectedCategories(mixProduct.categoryIds);
          setProductsByCategory(updatedProductsByCategory);
        };

        fetchPreSelectedData();
      } else {
        clearForm();
      }
    } else {
      clearForm();
    }
  }, [isOpen, mixProduct]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get(apiPaths.getAllCategories);
        setCategories(response.data);
      } catch (error) {
        ErrorToastify("Error fetching categories: " + error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (e, index) => {
    const categoryId = e.target.value;
    const updatedCategories = [...selectedCategories];
    updatedCategories[index] = categoryId || "";
    setSelectedCategories(updatedCategories);

    if (categoryId) {
      try {
        const response = await apiClient.get(apiPaths.getProductsByCategory(categoryId));
        setProductsByCategory((prev) => ({ ...prev, [index]: response.data }));
      } catch (error) {
        ErrorToastify("Error fetching products: " + error);
      }
    } else {
      const updatedProductsByCategory = { ...productsByCategory };
      delete updatedProductsByCategory[index];
      setProductsByCategory(updatedProductsByCategory);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const compIds = Array.from({ length: mixItemCount }, (_, i) => {
      const productSelect = document.getElementById(`formProductIds${i}`);
      return productSelect ? Array.from(productSelect.selectedOptions, (option) => parseInt(option.value, 10)) : [];
    }).flat();

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append("mixProdReq", new Blob([JSON.stringify({ ...mixProdReq, compIds })], { type: "application/json" }));

    try {
      if (mixProduct) {
        await apiClient.put(apiPaths.mixProductSave, formData);
        SuccessToastify("Mix Product updated successfully!");
      } else {
        await apiClient.post(apiPaths.mixProductSave, formData);
        SuccessToastify("Mix Product added successfully!");
      }
      onMixProductAddedOrUpdated();
      onClose();
    } catch (error) {
      ErrorToastify("Error saving mix product: " + error);
    }
  };

  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <div id="MixProductModal">
        <Modal.Header closeButton>
          <Modal.Title>{mixProduct ? "Update Mix Product" : "Add Mix Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMixProdName">
              <Form.Label>Mix Product Name</Form.Label>
              <Form.Control
                type="text"
                name="mixProdName"
                value={mixProdReq.mixProdName}
                onChange={(e) => setMixProdReq({ ...mixProdReq, mixProdName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={mixProdReq.description}
                onChange={(e) => setMixProdReq({ ...mixProdReq, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPotentialCus">
              <Form.Label>Potential Customer</Form.Label>
              <Form.Control
                type="text"
                name="potentialCus"
                value={mixProdReq.potentialCus}
                onChange={(e) => setMixProdReq({ ...mixProdReq, potentialCus: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image(Tối đa 100Kb)</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
            <Form.Group controlId="formMixItemCount">
              <Form.Label>Number of Mix Items</Form.Label>
              <Form.Control
                as="select"
                value={mixItemCount}
                onChange={(e) => setMixItemCount(parseInt(e.target.value, 10))}
                required
              >
                {[2, 3].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="mix-item-forms">
              {[...Array(mixItemCount)].map((_, index) => (
                <div key={index} className="mix-item-form">
                  <Form.Group controlId={`formCategoryId${index}`}>
                    <Form.Label>Category for Mix Item {index + 1}</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedCategories[index] || ""}
                      onChange={(e) => handleCategoryChange(e, index)}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>
                          {category.category}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId={`formProductIds${index}`}>
                    <Form.Label>Products for Mix Item {index + 1}</Form.Label>
                    <Form.Control
                      as="select"
                      value={mixProdReq.compIds[index] || ""}
                      onChange={(e) => {
                        const updatedCompIds = [...mixProdReq.compIds];
                        updatedCompIds[index] = parseInt(e.target.value, 10);
                        setMixProdReq({ ...mixProdReq, compIds: updatedCompIds });
                      }}
                      required
                      disabled={!selectedCategories[index]} // Disable dropdown if no category is selected
                    >
                      <option value="">Select a product</option>
                      {(productsByCategory[index] || []).map((product) => (
                        <option key={product.productId} value={product.productId}>
                          {product.productName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              ))}
            </div>
            <button type="submit" className="add-button">
              {mixProduct ? "Update Mix Product" : "Add Mix Product"}
            </button>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default MixProductModal;