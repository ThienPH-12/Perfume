import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductModal.scss";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";
import { ErrorToastify } from "./Toastify";

function ProductModal({ isOpen, onClose, onProductAddedOrUpdated, product }) {
  const [productReq, setProductReq] = useState({
    productId: "",
    productName: "",
    description: "",
    expirationDate: "",
    categoryId: "",
    potentialCus: "",
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]); // State for categories

  const clearForm = () => {
    setProductReq({
      productId: "",
      productName: "",
      description: "",
      expirationDate: "",
      categoryId: "",
      potentialCus: "",
    });
    setImage(null);
  };

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setProductReq({
          productId: product.productId,
          productName: product.productName,
          description: product.description,
          expirationDate: product.expirationDate.split("T")[0],
          categoryId: product.categoryId || "",
          potentialCus: product.potentialCus || "",
        });
      } else {
        clearForm();
      }
    } else {
      clearForm();
    }
  }, [isOpen, product]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductReq({ ...productReq, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    var message = "";
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "productReq",
      new Blob([JSON.stringify(productReq)], { type: "application/json" })
    );

    try {
      if (product) {
        await apiClient.put(apiPaths.productSave, formData);
        message = "Product updated successfully!";
      } else {
        await apiClient.post(apiPaths.productSave, formData);
        message = "Product added successfully!";
      }
      onProductAddedOrUpdated(message);
      onClose();
      clearForm();
    } catch (error) {
     ErrorToastify("Error saving product:"+ error);
    }
  };

  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <div id="ProductModal">
        <Modal.Header closeButton>
          <Modal.Title>{product ? "Update Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                MaxLength={50}
                value={productReq.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCategoryId">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={productReq.categoryId}
                onChange={handleChange}
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
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                MaxLength={200}
                value={productReq.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formExpirationDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="date"
                name="expirationDate"
                value={productReq.expirationDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPotentialCus">
              <Form.Label>Potential Customer</Form.Label>
              <Form.Control
                type="text"
                name="potentialCus"
                value={productReq.potentialCus}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <button type="submit" className="add-button">
              {product ? "Update" : "Add"}
            </button>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default ProductModal;
