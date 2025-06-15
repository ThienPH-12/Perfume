import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify"; // Fixed import
import "./ProductDetail.scss"; // Import CSS for styling
import { CartContext } from "../../utils/CartContext";

const ProductDetail = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate(); // Add navigation hook
    const [product, setProduct] = useState(null);
    const { updateCartCount } = useContext(CartContext);
    const [capacities, setCapacities] = useState([]);
    const [selectedCapacity, setSelectedCapacity] = useState(null);
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(1); // State for product quantity
    const priceRef = useRef(null); // Reference to price input field
    const [level, setLevel] = useState("Thấp"); // State for level selection

    const formatPrice = (price) => `${price} VND`; // Helper function to format price

    const fetchProductDetail = async () => {
        try {
            const productResponse = await apiClient.get(apiPaths.getProductById(id));
            const imageResponse = await apiClient.get(
                apiPaths.getProductImageById(id),
                { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(imageResponse.data);
            setProduct({ ...productResponse.data, imageUrl });
        } catch (error) {
            ErrorToastify("Error fetching product details: " + error);
        }
    };

    const fetchCapacities = async () => {
        try {
            const response = await apiClient.get(apiPaths.getPriceListByProductId(id));
            const capacitiesData = response.data;
            setCapacities(capacitiesData);
            if (capacitiesData.length > 0) {
                const defaultCapacity = capacitiesData[0];
                setSelectedCapacity(defaultCapacity.capacityId);
                setPrice(defaultCapacity.price); // Set price for the default capacity
                priceRef.current = defaultCapacity.price; // Initialize priceRef with the default capacity price
            }
        } catch (error) {
            ErrorToastify("Error fetching capacities: " + error);
        }
    };

    const handleIncreaseQuantity = () => {
        if (quantity < 10) {
            setQuantity((prevQuantity) => prevQuantity + 1);
            if (priceRef.current) {
                priceRef.current = price * (quantity + 1); // Update priceRef without triggering re-render
            }
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
            if (priceRef.current) {
                priceRef.current = price * (quantity - 1); // Update priceRef without triggering re-render
            }
        }
    };

    const handleCapacityClick = (capacityId) => {
        setSelectedCapacity(capacityId); // Update the selected capacity
        const selected = capacities.find((capacity) => capacity.capacityId === capacityId);
        if (selected) {
            const effectivePrice = selected.price || selected.defaultPrice; // Use default price if price is null
            setPrice(effectivePrice); // Update the price state
            priceRef.current = effectivePrice * quantity; // Update priceRef with the selected capacity price
        }
    };

    const handleLevelChange = (newLevel) => {
        setLevel(newLevel); // Update the selected level
    };

    useEffect(() => {
        fetchProductDetail();
        fetchCapacities();
    }, [id]);

    const handleAddToCart = (e) => {
        e.preventDefault();

        // Create a new cart item including only capacityId and level
        const newCartItem = {
            productId: id,
            productName: product.productName, // Include product name
            capacityId: selectedCapacity, // Only store capacityId
            quantity: quantity, // Store the quantity
            level: level, // Include selected level
        };

        // Retrieve the existing cart from local storage
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the item already exists in the cart
        const existingItemIndex = existingCart.findIndex(
            (item) =>
                item.productId === newCartItem.productId &&
                item.capacityId === newCartItem.capacityId &&
                item.level === newCartItem.level
        );

        if (existingItemIndex !== -1) {
            ErrorToastify("Sản phẩm với dung tích và nồng độ này đã có trong giỏ hàng.");
            return; // Exit the function
        }

        // If the item does not exist, add it to the cart
        existingCart.push(newCartItem);

        // Save the updated cart back to local storage
        localStorage.setItem("cart", JSON.stringify(existingCart));
        updateCartCount(); // Update cart count in context

        SuccessToastify("Item added to cart successfully!");
    };

    const handleBuyNow = (e) => {
        e.preventDefault();

        if (!selectedCapacity) {
            ErrorToastify("Sản phẩm chưa tồn tại dung tích");
            return;
        }

        const selectedCapacityData = capacities.find((capacity) => capacity.capacityId === selectedCapacity);

        if (!selectedCapacityData) {
            ErrorToastify("Invalid capacity selected.");
            return;
        }

        const effectivePrice = selectedCapacityData.price || selectedCapacityData.defaultPrice; // Use default price if price is null

        const paymentData = {
            description: "Mua ngay sản phẩm", // Updated description
            totalPrice: priceRef.current, // Send original price only
            items: [
                {
                    name: product.productName + " " + selectedCapacityData.capacity + "ml " + level,
                    price: effectivePrice,
                    quantity: quantity,
                },
            ], // Include items with quantity
        };

        navigate("/payment", { state: paymentData }); // Navigate to Payment page with data
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div id="ProductDetail">
            <h1>Sản Phẩm</h1>
            <p className="title">Tinh dầu đơn</p>
            <div className="container">
                <div className="product-detail-image">
                    <img
                        src={product.imageUrl}
                        alt={product.productName}
                    />
                </div>
                <div className="product-detail-info">
                    <p className="product-name">{product.productName}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="item-selection">
                        <label>Chọn dung tích:</label>
                        <div className="item-buttons">
                            {capacities.map((capacity) => (
                                <button
                                    key={capacity.capacityId}
                                    className={`item-button ${selectedCapacity === capacity.capacityId ? "active" : ""}`}
                                    onClick={() => handleCapacityClick(capacity.capacityId)}
                                >
                                    {capacity.capacity}ml
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="item-selection">
                        <label>Chọn nồng độ:</label>
                        <div className="item-buttons">
                            {["Thấp", "Vừa", "Cao"].map((lvl) => (
                                <button
                                    key={lvl}
                                    className={`item-button ${level === lvl ? "active" : ""}`}
                                    onClick={() => handleLevelChange(lvl)}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                    </div>
                    {priceRef.current !== null && <p className="product-price">Price: {formatPrice(priceRef.current)}</p>}
                    <div className="quantity-selection">
                        <label>Quantity:</label>
                        <div className="quantity-buttons">
                            <button className="quantity-button" onClick={handleDecreaseQuantity}>-</button>
                            <span className="quantity-display" >{quantity}</span>
                            <button className="quantity-button" onClick={handleIncreaseQuantity}>+</button>
                        </div>
                    </div>
                    <div className="item-selection">
                        <button onClick={handleAddToCart} className="add-to-cart">
                            Thêm vào giỏ hàng
                        </button>
                        <button onClick={handleBuyNow} className="add-to-cart">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
