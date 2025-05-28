import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductModal.scss";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";
import {jwtDecode} from "jwt-decode";

function ProductModal({ isOpen, onClose, onProductAddedOrUpdated, product }) {
  const [productReq, setProductReq] = useState({
    productId:"",
    productName: "",
    description: "",
    expirationDate: "",
    createUserId: "",
    createDateTime: "",
    updateUserId: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product) {
      setProductReq({
        productId: product.productId,
        productName: product.productName,
        description: product.description,
        expirationDate: product.expirationDate.split("T")[0],
        createUserId: product.createUserId,
        createDateTime: product.createDateTime,
        updateUserId: product.updateUserId,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductReq({ ...productReq, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    console.log("Decoded Token:", decodedToken.userId);
    if (product) {
        setProductReq({ ...productReq, updateUserId: decodedToken.userId });
    } else {
        setProductReq({ ...productReq, createUserId: decodedToken.userId });
    }
  
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "productReq",
      new Blob([JSON.stringify(productReq)], { type: "application/json" })
    );

    try {
      if (product) {    
        await apiClient.put(apiPaths.productSave, formData);
      } else {
        console.log("Product Request:", productReq);
        await apiClient.post(apiPaths.productSave, formData);
      }
      onProductAddedOrUpdated();
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
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
                value={productReq.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
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
