import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import "./MixProductDetail.scss"; // Import CSS for styling
import { SuccessToastify, ErrorToastify } from "../../components/Toastify"; // Import SuccessToastify
import { CartContext } from "../../utils/CartContext";

const MixProductDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) {
            navigate("/formula"); // Redirect to Formula page if state is null
        }
    }, [state, navigate]);

    const { compIds, mixProdName } = state || { compIds: [], mixProdName: "" }; // Receive mixProdName
    const [productDetails, setProductDetails] = useState([]);
    const [capacities, setCapacities] = useState([]);
    const [levels, setLevels] = useState({});
    const [selectedCapacity, setSelectedCapacity] = useState(""); // Add state for global capacity selection
    const [quantity, setQuantity] = useState(1); // Add state for quantity
    const { updateCartCount } = useContext(CartContext);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = await Promise.all(
                compIds.map(async ({ productId }) => { // Destructure productId from compIds
                    const productResponse = await apiClient.get(apiPaths.getProductById(productId));
                    const imageResponse = await apiClient.get(apiPaths.getProductImageById(productId), {
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
    }, [compIds]);

    const handleLevelChange = (productId, level) => {
        setLevels((prev) => ({ ...prev, [productId]: level }));
    };

    const handleIncreaseQuantity = () => {
        if (quantity < 10) setQuantity((prev) => prev + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        const mixCart = JSON.parse(localStorage.getItem("mixCart")) || [];
        const newMixItem = {
            compIds,
            mixProdName,
            capacityId: selectedCapacity, // Only store capacityId
            quantity,
            levels,
        };
        mixCart.push(newMixItem);
        localStorage.setItem("mixCart", JSON.stringify(mixCart));
        updateCartCount(); // Update cart count in context
        SuccessToastify("Sản phẩm đã được thêm vào giỏ hàng!");
    };

    const handleBuyNow = () => {
        const selectedCapacityData = capacities.find((cap) => cap.capacityId == selectedCapacity); // Correctly find capacity

        if (!selectedCapacityData) {
            ErrorToastify("Invalid capacity selected.");
            return;
        }

        const effectivePrice = selectedCapacityData.defaultPrice; // Use default price for the selected capacity

        const paymentData = {
            description: "Mua ngay sản phẩm Mix", // Updated description
            totalPrice: effectivePrice * quantity, // Calculate total price
            items: [
                {
                    name: `${mixProdName} (${productDetails.map((p) => p.productName).join("-")}) (${Object.values(levels).join("-")}) ${selectedCapacityData.capacity}ml`,
                    price: effectivePrice,
                    quantity: quantity,
                },
            ], // Include items with quantity
        };

        navigate("/payment", { state: paymentData }); // Navigate to Payment page with data
    };

    const isActionEnabled = selectedCapacity && Object.keys(levels).length === productDetails.length;

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    };

    return (
        <div id="MixProductDetail">
            <h1>FRAGRANCES</h1>
            <p className="title">MIX Nước Hoa</p>
            <h1 className="mix-prod-name-display">Tên sản phẩm mix: {mixProdName}</h1> {/* Display mixProdName */}
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
                            {capacity.capacity}ml - {formatPrice(capacity.defaultPrice)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="product-detail-container">
                {productDetails.map((product) => (
                    <div key={product.productId} className="product-detail-card">
                        <img src={product.imageUrl} alt={product.productName} className="product-image" />
                        <div className="level-selection">
                            <h2>{product.productName}</h2>
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
            <div className="quantity-selection">
                <label>Số lượng:</label>
                <div className="quantity-buttons">
                    <button onClick={handleDecreaseQuantity} disabled={!isActionEnabled || quantity <= 1}>
                        -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={handleIncreaseQuantity} disabled={!isActionEnabled || quantity >= 10}>
                        +
                    </button>
                </div>
            </div>
            <div className="mix-product-actions">
                <button
                    className="add-to-cart"
                    disabled={!isActionEnabled}
                    onClick={handleAddToCart}
                >
                    Thêm vào giỏ hàng
                </button>
                <button
                    className="add-to-cart"
                    disabled={!isActionEnabled}
                    onClick={handleBuyNow}
                >
                    Mua ngay
                </button>
            </div>
        </div>
    );
};

export default MixProductDetail;
