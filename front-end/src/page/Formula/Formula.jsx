import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Formula.scss";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify } from "../../components/Toastify";

const Formula = () => {
  const [formulas, setFormulas] = useState([]);
  const navigate = useNavigate();

  const fetchFormulas = async () => {
    try {
      const response = await apiClient.get(apiPaths.getAllMixProducts);
      const formulasWithImages = await Promise.all(
        response.data.map(async (formula) => {
          const imageResponse = await apiClient.get(
            apiPaths.getMixProductImageByCompIds(formula.compIds),
            { responseType: "blob" }
          );
          const imageUrl = URL.createObjectURL(imageResponse.data);
          return { ...formula, imageUrl };
        })
      );
      setFormulas(formulasWithImages);
    } catch (error) {
      ErrorToastify("Error fetching formulas: " + error.message);
    }
  };

  useEffect(() => {
    fetchFormulas();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".formula-grid");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, []);

  return (
    <div id="FormulaPage">
      <div className="formula-page">
        <h1>FORMULAS</h1>
        <p className="title">Công thức đề cử</p>
        <div className="formula-container">
          <div className="formula-grid">
            {formulas.map((formula) => (
              <div
                key={formula.compIds}
                className="formula-card"
                onClick={() =>
                  navigate("/mix-product-detail", {
                    state: {
                      compIds: formula.compIds.split("-").map((id) => ({ productId: id })),
                      mixProdName: formula.mixProdName,
                    },
                  })
                }
              >
                <img
                  src={formula.imageUrl}
                  alt={formula.mixProdName}
                  className="formula-image"
                />
                <h3 className="formula-name">{formula.mixProdName}</h3>
                <div className="descBtn">mô tả</div>
                <div className="formula-description-box">
                  <p>{formula.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formula;
