import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";
import { ErrorToastify } from "./Toastify";
import { jwtDecode } from "jwt-decode";

function CategoryModal({ isOpen, onClose, onCategoryAddedOrUpdated, category }) {
  const [categoryReq, setCategoryReq] = useState({
    categoryId: "",
    category: "",
    createUserId: "",
    updateUserId: "",
  });

  const clearForm = () => {
    setCategoryReq({
      categoryId: "",
      category: "",
      createUserId: "",
      updateUserId: "",
    });
  };

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setCategoryReq({
          categoryId: category.categoryId,
          category: category.category,
          createUserId: category.createUserId,
          updateUserId: category.updateUserId,
        });
      }
      else {
        clearForm();
      }
    }
    else{
      clearForm();
    }
  }, [isOpen, category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryReq({ ...categoryReq, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
console.log(decodedToken.userId)
    if (category) {
      setCategoryReq({ ...categoryReq, updateUserId: decodedToken.userId });
    } else {
      setCategoryReq({ ...categoryReq, createUserId: decodedToken.userId });
    }

    try {
      if (category) {
        await apiClient.put(apiPaths.categorySave, categoryReq);
        onCategoryAddedOrUpdated("Category updated successfully!"); // Success message for update
      } else {
        await apiClient.post(apiPaths.categorySave, categoryReq);
        onCategoryAddedOrUpdated("Category added successfully!"); // Success message for addition
      }
      onClose();
    } catch (error) {
      ErrorToastify("Error saving category: " + error); // Error message
    }
  };

  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <div id="CategoryModal">
        <Modal.Header closeButton>
          <Modal.Title>{category ? "Update Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCategory">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={categoryReq.category}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <button type="submit" className="add-button">
              {category ? "Update" : "Add"}
            </button>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default CategoryModal;
