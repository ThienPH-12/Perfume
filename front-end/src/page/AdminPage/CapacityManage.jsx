import React, { useState, useEffect } from "react";
import CapacityModal from "../../components/CapacityModal";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";

function CapacityManage() {
  const [capacities, setCapacities] = useState([]);
  const [isCapacityModalOpen, setIsCapacityModalOpen] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState(null);

  const fetchCapacities = async () => {
    try {
      const response = await apiClient.get(apiPaths.getAllCapacities);
      setCapacities(response.data);
    } catch (error) {
      ErrorToastify("Error fetching capacities: " + error);
    }
  };

  useEffect(() => {
    fetchCapacities();
  }, []);

  const handleCapacityAddedOrUpdated = (message) => {
    fetchCapacities();
    setIsCapacityModalOpen(false);
    setSelectedCapacity(null); // Reset selected capacity
    SuccessToastify(message);
  };

  const handleAddCapacity = () => {
    setSelectedCapacity(null); // Reset selected capacity
    setIsCapacityModalOpen(true); // Open modal for adding
  };

  const handleEditCapacity = (capacity) => {
    setSelectedCapacity(capacity);
    setIsCapacityModalOpen(true);
  };

  const handleDeleteCapacity = async (capacityId) => {
    try {
      await apiClient.delete(apiPaths.deleteCapacity(capacityId));
      setCapacities(capacities.filter((capacity) => capacity.capacityId !== capacityId));
      SuccessToastify("Capacity deleted successfully");
    } catch (error) {
      ErrorToastify("Error deleting capacity: " + error);
    }
  };

  return (
    <div className="crudContainer"> {/* Updated class name */}
      <h2>Capacities</h2>
      <button onClick={() => handleAddCapacity()} className="add-button">
        Add Capacity
      </button>
      <table className="crud-table"> {/* Updated class name */}
        <thead>
          <tr>
            <th>No</th>
            <th>Capacity(ml)</th>
            <th>Default Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {capacities.map((capacity, index) => (
            <tr key={capacity.capacityId}>
              <td>{index + 1}</td>
              <td>{capacity.capacity}</td>
              <td>{capacity.defaultPrice} VND</td> 
              <td>
                <button onClick={() => handleEditCapacity(capacity)}>Edit</button>
                <button onClick={() => handleDeleteCapacity(capacity.capacityId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CapacityModal
        isOpen={isCapacityModalOpen}
        onClose={() => setIsCapacityModalOpen(false)}
        onCapacityAddedOrUpdated={handleCapacityAddedOrUpdated}
        capacity={selectedCapacity}
      />
    </div>
  );
}

export default CapacityManage;
