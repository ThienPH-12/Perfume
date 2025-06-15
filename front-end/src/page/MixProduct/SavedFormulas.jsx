import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import "./SavedFormulas.scss"; // Import CSS for styling

const SavedFormulas = () => {
  const [formulas, setFormulas] = useState([]);
  const [productNames, setProductNames] = useState({});
  const navigate = useNavigate();

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

  const getFormulaNames = (compIds) => {
    return compIds
      .split("-")
      .map((id) => productNames[id] || `Unknown (${id})`)
      .join(" - ");
  };

  const deleteFormula = (index) => {
    const updatedFormulas = [...formulas];
    updatedFormulas.splice(index, 1);
    setFormulas(updatedFormulas);
    localStorage.setItem("savedFormulas", JSON.stringify(updatedFormulas));
  };

  const updateMixProdName = (index, newName) => {
    const updatedFormulas = [...formulas];
    updatedFormulas[index].mixProdName = newName;
    setFormulas(updatedFormulas);
    localStorage.setItem("savedFormulas", JSON.stringify(updatedFormulas));
  };

  const navigateToDetail = (formula, index) => {
    const mixProdName = formula.mixProdName.trim() || `Sản Phẩm Mix ${index + 1}`; // Default name if blank
    navigate("/mix-product-detail", {
      state: {
        compIds: formula.compIds.split("-").map((id) => ({ productId: id })),
        mixProdName, // Pass mixProdName to the detail page
      },
    });
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
                <input
                  type="text"
                  className="mix-name-input"
                  placeholder="Đặt tên cho sản phẩm mix"
                  value={formula.mixProdName}
                  onChange={(e) => updateMixProdName(index, e.target.value)}
                />
                <span className="formula-names">{getFormulaNames(formula.compIds)}</span>
                <button
                  className="select-capacity-button"
                  onClick={() => navigateToDetail(formula, index)}
                >
                  Chọn dung tích và nồng độ
                </button>
                <button
                  className="delete-formula-button"
                  onClick={() => deleteFormula(index)}
                >
                  Xóa
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
