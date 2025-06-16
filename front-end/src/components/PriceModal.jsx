import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";
import { ErrorToastify } from "./Toastify";
import { jwtDecode } from "jwt-decode";

function PriceModal({ isOpen, onClose, onPriceAddedOrUpdated, price, productId, capacityId }) {
  const [priceReq, setPriceReq] = useState({
    productId: productId || "",
    capacityId: capacityId || "",
    price: "",
    createUserId: "",
    updateUserId: "",
  });

  const [capacities, setCapacities] = useState([]);

  const fetchCapacities = async () => {
    try {
      const response = await apiClient.get(apiPaths.getAllCapacities);
      setCapacities(response.data);
    } catch (error) {
      ErrorToastify("Error fetching capacities: " + error);
    }
  };

  const clearForm = () => {
    setPriceReq({
      productId: "",
      capacityId: "",
      price: "",
      createUserId: "",
      updateUserId: "",
    });
  };

  useEffect(() => {
    fetchCapacities();
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (price) {
        setPriceReq({
          productId: productId,
          capacityId: price.capacityId,
          price: price.price,
          createUserId: price.createUserId,
          updateUserId: price.updateUserId,
        });
      } else {
        setPriceReq((prev) => ({
          ...prev,
          productId,
          capacityId,
        }));
      }
    } else {
      clearForm();
    }
  }, [isOpen, price, productId, capacityId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPriceReq({ ...priceReq, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;

    const updatedPriceReq = {
      ...priceReq,
      createUserId: price ? priceReq.createUserId : decodedToken?.userId,
      ...(price && { updateUserId: decodedToken?.userId }), // Set updateUserId only in update case
    };
    console.log("Updated Price Request:", updatedPriceReq);
    try {
      if (price) {
        await apiClient.put(apiPaths.priceSave, updatedPriceReq);
        onPriceAddedOrUpdated("Price updated successfully!");
      } else {
        await apiClient.post(apiPaths.priceSave, updatedPriceReq);
        onPriceAddedOrUpdated("Price added successfully!");
      }
      onClose();
    } catch (error) {
      ErrorToastify("Error saving price: " + error);
    }
  };

  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <div id="PriceModal">
        <Modal.Header closeButton>
          <Modal.Title>{price ? "Update Price" : "Add Price"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCapacityId">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                as="select"
                name="capacityId"
                value={priceReq.capacityId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a capacity</option>
                {capacities.map((capacity) => (
                  <option key={capacity.capacityId} value={capacity.capacityId}>
                    {capacity.capacity}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={priceReq.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <button type="submit" className="add-button">
              {price ? "Update" : "Add"}
            </button>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default PriceModal;
