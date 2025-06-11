import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import "./SavedFormulas.scss"; // Import CSS for styling

const SavedFormulas = () => {
  const [formulas, setFormulas] = useState([]);
  const [productNames, setProductNames] = useState({});

  useEffect(() => {
    const savedFormulas = JSON.parse(localStorage.getItem("savedFormulas")) || [];
    setFormulas(savedFormulas);

    const fetchProductNames = async () => {
      try {
        const productResponse = await apiClient.get(apiPaths.getAllProducts);
        const namesMap = productResponse.data.reduce((acc, product) => {
          acc[product.productId] = product.productName;
          return acc;
        }, {});
        setProductNames(namesMap);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    };

    fetchProductNames();
  }, []);

  const getFormulaNames = (formula) => {
    return formula
      .split("-")
      .map((id) => productNames[id] || `Unknown (${id})`)
      .join(" - ");
  };

  return (
    <div id="SavedFormulas">
      <div className="saved-formulas-page">
        <h1>Công thức đã lưu</h1>
        {formulas.length === 0 ? (
          <p>Không có công thức nào được lưu.</p>
        ) : (
          <div className="formula-list">
            {formulas.map((formula, index) => (
              <div key={index} className="formula-item">
                <span className="formula-index">{index + 1}</span>
                <span className="formula-names">{getFormulaNames(formula)}</span>
                <button className="select-capacity-button">
                  Chọn dung tích và nồng độ
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedFormulas;
