import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import "./MixProductDetail.scss"; // Import CSS for styling

const MixProductDetail = () => {
    const { state } = useLocation();
    const { selectedProducts } = state || { selectedProducts: [] };
    const [productDetails, setProductDetails] = useState([]);
    const [capacities, setCapacities] = useState([]);
    const [levels, setLevels] = useState({});
    const [selectedCapacity, setSelectedCapacity] = useState(""); // Add state for global capacity selection

    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = await Promise.all(
                selectedProducts.map(async (product) => {
                    const productResponse = await apiClient.get(apiPaths.getProductById(product.productId));
                    const imageResponse = await apiClient.get(apiPaths.getProductImageById(product.productId), {
                        responseType: "blob",
                    });
                    const imageUrl = URL.createObjectURL(imageResponse.data);
                    return { ...productResponse.data, imageUrl };
                })
            );
            setProductDetails(details);
        };

        const fetchCapacities = async () => {
            try {
                const response = await apiClient.get(apiPaths.getAllCapacities);
                setCapacities(response.data);
            } catch (error) {
                console.error("Error fetching capacities:", error);
            }
        };

        fetchProductDetails();
        fetchCapacities();
    }, [selectedProducts]);

    const handleLevelChange = (productId, level) => {
        setLevels((prev) => ({ ...prev, [productId]: level }));
    };

    return (
        <div id="MixProductDetail">
            <h1>FRAGRANCES</h1>
            <p className="title">MIX Nước Hoa</p>
            <div className="capacity-selection-global">
                <label>Chọn dung tích cho hỗn hợp:</label>
                <select
                    value={selectedCapacity}
                    onChange={(e) => setSelectedCapacity(e.target.value)}
                >
                    <option value="" disabled>
                        Select Capacity
                    </option>
                    {capacities.map((capacity) => (
                        <option key={capacity.capacityId} value={capacity.capacityId}>
                            {capacity.capacity}ml - {capacity.defaultPrice} VND
                        </option>
                    ))}
                </select>
            </div>
            <div className="product-detail-container">
                {productDetails.map((product) => (
                    <div key={product.productId} className="product-detail-card">
                        <img src={product.imageUrl} alt={product.productName} className="product-image" />
                        <h2>{product.productName}</h2>
                        <div className="level-selection">
                            <label>Chọn nồng độ:</label>
                            {["Thấp", "Vừa", "Cao"].map((level) => (
                                <button
                                    key={level}
                                    className={`level-button ${levels[product.productId] === level ? "active" : ""}`}
                                    onClick={() => handleLevelChange(product.productId, level)}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MixProductDetail;
