import React, { useEffect, useState } from "react";
import "./Formula.scss"; // Import the Formula styles
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { Link } from "react-router-dom";
import { ErrorToastify } from "../../components/Toastify"; // Import Toastify

function Formula() {
  const [formulas, setFormulas] = useState([]);

  const fetchFormulas = async () => {
    try {
      const response = await apiClient.get(apiPaths.getAllMixProducts);
      setFormulas(response.data);
    } catch (error) {
      ErrorToastify(error.message); // Display error using Toastify
    }
  };

  useEffect(() => {
    fetchFormulas();
  }, []);

  return (
    <div id="FormulaPage">
      <div className="formula-page">
        <h1 className="formula-page__title">Công thức</h1>
        <div className="formula-container">
          <div className="grid">
            <div className="rowCustom">
              {formulas.length === 0 ? (
                <h2 className="text-center no-formulas">Hiện không có công thức nào</h2>
              ) : (
                formulas.map((formula) => {
                  const { id, name, description, createDateTime } = formula;
                  return (
                    <Link
                      to={`/formula/${id}`}
                      key={id}
                      className="formula-link"
                    >
                      <div className="formula-item">
                        <div className="card-body">
                          <div>
                            <h5 className="card-title">{name}</h5>
                            <div style={{ width: "100%" }}>
                              <p className="card-text">{description}</p>
                            </div>
                          </div>
                          <div>
                            <p className="card-text">
                              <small className="text-muted">
                                {new Date(createDateTime).toLocaleString()}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formula;
