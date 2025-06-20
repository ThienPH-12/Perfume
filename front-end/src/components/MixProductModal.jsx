import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";
import { ErrorToastify, SuccessToastify } from "./Toastify";
import "./MixProductModal.scss";

function MixProductModal({ isOpen, onClose, onMixProductAdded }) {
  const [mixProdReq, setMixProdReq] = useState({
    compIds: [], // Kept as an array of integers
    mixProdName: "",
    description: "",
    potentialCus: "",
  });
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({}); // Track products for each category
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories for each mix item
  const [mixItemCount, setMixItemCount] = useState(1);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(apiPaths.getAllCategories);
      setCategories(response.data);
    } catch (error) {
      ErrorToastify("Error fetching categories: " + error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCategories()]);
    };
    fetchData();
  }, []);

  const handleCategoryChange = async (e, index) => {
    const categoryId = e.target.value;

    if (!categoryId) {
      // If "Select a category" is chosen, clear products for this category
      const updatedCategories = [...selectedCategories];
      updatedCategories[index] = "";
      setSelectedCategories(updatedCategories);

      const updatedProductsByCategory = { ...productsByCategory };
      delete updatedProductsByCategory[index];
      setProductsByCategory(updatedProductsByCategory);
      return;
    }

    const updatedCategories = [...selectedCategories];
    updatedCategories[index] = categoryId;
    setSelectedCategories(updatedCategories);

    try {
      const response = await apiClient.get(apiPaths.getProductsByCategory(categoryId));
      setProductsByCategory((prev) => ({
        ...prev,
        [index]: response.data,
      }));
    } catch (error) {
      ErrorToastify("Error fetching products: " + error);
    }
  };

  const handleMixItemCountChange = (e) => {
    setMixItemCount(parseInt(e.target.value, 10));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMixProdReq({ ...mixProdReq, [name]: value });
  };

  const clearForm = () => {
    setMixProdReq({
      compIds: [], // Kept as an array of integers
      mixProdName: "",
      description: "",
      potentialCus: "",
    });
    setSelectedCategories([]);
    setMixItemCount(1);
  };

  useEffect(() => {
    if (!isOpen) {
      clearForm();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const compIds = [];
    for (let i = 0; i < mixItemCount; i++) {
      const productSelect = document.getElementById(`formProductIds${i}`);
      if (productSelect) {
        compIds.push(...Array.from(productSelect.selectedOptions, (option) => parseInt(option.value, 10)));
      }
    }

    const requestPayload = {
      ...mixProdReq,
      compIds, // Send as a list of integers
    };

    try {
      await apiClient.post(apiPaths.mixProductSave, requestPayload);
      SuccessToastify("Mix Product added successfully!");
      onMixProductAdded();
      onClose();
    } catch (error) {
      ErrorToastify("Error adding mix product: " + error);
    }
  };

  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <div id="MixProductModal">
        <Modal.Header closeButton>
          <Modal.Title>Add Mix Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMixProdName">
              <Form.Label>Mix Product Name</Form.Label>
              <Form.Control
                type="text"
                name="mixProdName"
                value={mixProdReq.mixProdName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={mixProdReq.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPotentialCus">
              <Form.Label>Potential Customer</Form.Label>
              <Form.Control
                type="text"
                name="potentialCus"
                value={mixProdReq.potentialCus}
                onChange={handleChange}
                required
              />
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
                      multiple
                      required
                    >
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
            <Form.Group controlId="formMixItemCount">
              <Form.Label>Number of Mix Items</Form.Label>
              <Form.Control
                as="select"
                value={mixItemCount}
                onChange={handleMixItemCountChange}
                required
              >
                {[1, 2, 3, 4].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <button type="submit" className="add-button">
              Add Mix Product
            </button>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default MixProductModal;