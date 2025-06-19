import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../api/apiClient";
import apiPaths from "../api/apiPath";
import { ErrorToastify } from "./Toastify";

function CapacityModal({ isOpen, onClose, onCapacityAddedOrUpdated, capacity }) {
  const [capacityReq, setCapacityReq] = useState({
    capacityId: "",
    capacity: "",
    defaultPrice: "",
  });

  const clearForm = () => {
    setCapacityReq({
      capacityId: "",
      capacity: "",
      defaultPrice: "",
    });
  };

  useEffect(() => {
    if (isOpen) {
      if (capacity) {
        setCapacityReq({
          capacityId: capacity.capacityId,
          capacity: capacity.capacity,
          defaultPrice: capacity.defaultPrice,
        });
      } else {
        clearForm();
      }
    } else {
      clearForm();
    }
  }, [isOpen, capacity]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "capacity" && !/^\d*$/.test(value)) {
      return; // Prevent non-integer input for capacity
    }
    if (name === "defaultPrice" && !/^\d*\.?\d{0,2}$/.test(value)) {
      return; // Prevent invalid decimal input for defaultPrice
    }
    setCapacityReq({ ...capacityReq, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (capacity) {
        await apiClient.put(apiPaths.capacitySave, capacityReq);
        onCapacityAddedOrUpdated("Capacity updated successfully!");
      } else {
        await apiClient.post(apiPaths.capacitySave, capacityReq);
        onCapacityAddedOrUpdated("Capacity added successfully!");
      }
      onClose();
    } catch (error) {
      ErrorToastify("Error saving capacity: " + error.message);
    }
  };

  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <div id="CapacityModal">
        <Modal.Header closeButton>
          <Modal.Title>{capacity ? "Update Capacity" : "Add Capacity"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="text"
                name="capacity"
                value={capacityReq.capacity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDefaultPrice">
              <Form.Label>Default Price (VND)</Form.Label> {/* Add VND to label */}
              <Form.Control
                type="text"
                name="defaultPrice"
                value={capacityReq.defaultPrice}
                onChange={handleInputChange}
                placeholder="Enter price in VND (e.g., 100000)"
                required
              />
            </Form.Group>
            <button type="submit" className="add-button">
              {capacity ? "Update" : "Add"}
            </button>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default CapacityModal;
