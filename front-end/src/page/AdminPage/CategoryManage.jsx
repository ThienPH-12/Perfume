import React, { useState, useEffect } from "react";
import CategoryModal from "../../components/CategoryModal";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";

function CategoryManage() {
  const [categories, setCategories] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(apiPaths.getAllCategories);
      setCategories(response.data);
    } catch (error) {
      ErrorToastify("Error fetching categories: " + error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryAddedOrUpdated = (message) => {
    fetchCategories();
    setIsCategoryModalOpen(false);
    SuccessToastify(message);
  };
const handleAddCategory = () => {
  setSelectedCategory(null);
  setIsCategoryModalOpen(true);
}
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await apiClient.delete(apiPaths.deleteCategory(categoryId));
      setCategories(categories.filter((category) => category.categoryId !== categoryId));
      SuccessToastify("Category deleted successfully");
    } catch (error) {
      ErrorToastify("Error deleting category: " + error);
    }
  };

  return (
    <div className="crudContainer"> {/* Updated class name */}
      <h2>Categories</h2>
      <button onClick={() => handleAddCategory()} className="add-button">
        Add Category
      </button>
      <table className="crud-table"> {/* Updated class name */}
        <thead>
          <tr>
            <th>No</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.categoryId}>
              <td>{index + 1}</td>
              <td>{category.category}</td>
              <td>
                <button onClick={() => handleEditCategory(category)}>Edit</button>
                <button onClick={() => handleDeleteCategory(category.categoryId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryAddedOrUpdated={handleCategoryAddedOrUpdated}
        category={selectedCategory}
      />
    </div>
  );
}

export default CategoryManage;
