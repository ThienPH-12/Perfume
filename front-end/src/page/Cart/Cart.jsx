import React, { useState, useEffect, useContext } from "react"; // Added useContext
import { useNavigate } from "react-router-dom";
import "./Cart.scss";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify } from "../../components/Toastify";
import { CartContext } from "../../utils/CartContext"; // Import CartContext

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [mixCartItems, setMixCartItems] = useState([]); // State for mixCart items
  const [capacities, setCapacities] = useState([]); // State for capacities
  const navigate = useNavigate(); // Add navigation hook
  const { updateCartCount } = useContext(CartContext); // Access updateCartCount from context

  const fetchCartItems = async () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = await Promise.all(
      storedCart.map(async (item) => {
        try {
          const imageResponse = await apiClient.get(apiPaths.getProductImageById(item.productId), {
            responseType: "blob",
          });
          const imageUrl = URL.createObjectURL(imageResponse.data);
          const priceId = { productId: item.productId, capacityId: item.capacityId };
          const capacity = capacities.find((cap) => cap.capacityId === item.capacityId);
          const priceResponse = await apiClient.post(apiPaths.getPriceById, priceId);
          const price = priceResponse.data; // Fetch price directly from API response

          // Return the updated cart item with the image URL, price, and capacity
          return {
            ...item,
            imageUrl,
            price,
            capacity: capacity ? capacity.capacity : "Unknown"
          };
        } catch (error) {
          ErrorToastify(`Failed to fetch data for productId ${item.productId}: ${error.message}`);
          console.error(`Failed to fetch data for productId ${item.productId}:`, error);
          return { ...item, imageUrl: null, price: null, capacity: "Unknown" }; // Fallback if fetch fails
        }
      })
    );

    setCartItems(updatedCart);
  };

  const fetchMixCartItems = async () => {
    const storedMixCart = JSON.parse(localStorage.getItem("mixCart")) || [];
    const updatedMixCart = await Promise.all(
      storedMixCart.map(async (item) => {
        try {
          const productDetails = await Promise.all(
            item.compIds.map(async (comp) => {
              const productResponse = await apiClient.get(apiPaths.getProductById(comp.productId));
              return { productId: comp.productId, productName: productResponse.data.productName };
            })
          );

          const capacity = capacities.find((cap) => cap.capacityId == item.capacityId);

          return {
            ...item,
            capacity: capacity ? capacity.capacity : "Unknown",
            price: capacity ? capacity.defaultPrice : 0,
            productDetails, // Include product details with productName
          };
        } catch (error) {
          console.error("Error fetching product details for mixCart:", error);
          return { ...item, productDetails: [] }; // Fallback if fetch fails
        }
      })
    );

    setMixCartItems(updatedMixCart);
  };

  const fetchCapacities = async () => {
    try {
      const response = await apiClient.get(apiPaths.getAllCapacities);
      setCapacities(response.data);
    } catch (error) {
      console.error("Error fetching capacities:", error);
    }
  };

  const calculateTotalPrice = () => {
    const normalCartTotal = cartItems.reduce((total, item) => {
      const price = item.price || 0; // Use 0 if price is not available
      return total + price * item.quantity;
    }, 0);

    const mixCartTotal = mixCartItems.reduce((total, item) => {
      const price = item.price || 0; // Use 0 if price is not available
      return total + price * item.quantity;
    }, 0);

    return normalCartTotal + mixCartTotal;
  };

  const handleIncreaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item };
          updatedItem.quantity += 1; // Increase quantity
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDecreaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => {
        if (i === index && item.quantity > 1) {
          const updatedItem = { ...item };
          updatedItem.quantity -= 1; // Decrease quantity
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDeleteItem = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index); // Remove the item at the specified index
      localStorage.setItem("cart", JSON.stringify(updatedItems)); // Update local storage
      updateCartCount(); // Update cart count in context
      return updatedItems;
    });
  };

  const handleIncreaseMixQuantity = (index) => {
    setMixCartItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item };
          updatedItem.quantity += 1; // Increase quantity
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem("mixCart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDecreaseMixQuantity = (index) => {
    setMixCartItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => {
        if (i === index && item.quantity > 1) {
          const updatedItem = { ...item };
          updatedItem.quantity -= 1; // Decrease quantity
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem("mixCart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDeleteMixItem = (index) => {
    setMixCartItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index); // Remove the item at the specified index
      localStorage.setItem("mixCart", JSON.stringify(updatedItems)); // Update local storage
      updateCartCount(); // Update cart count in context
      return updatedItems;
    });
  };

  const handleCheckout = () => {
    const totalPrice = calculateTotalPrice();
    navigate("/payment", {
      state: {
        description: "Mua theo giỏ hàng", // Updated description
        totalPrice: totalPrice,
        items: [
          ...cartItems.map((item) => ({
            name: `${item.productName} ${item.capacity}ml ${item.level}`,
            price: item.price,
            quantity: item.quantity,
          })),
          ...mixCartItems.map((item) => ({
            name: `${item.mixProdName} (${item.productDetails.map((p) => p.productName).join("-")}) (${Object.values(item.levels).join("-")}) ${item.capacity}ml`,
            price: item.price,
            quantity: item.quantity,
          })),
        ], // Include items with quantity
      },
    });
  };

  useEffect(() => {
    fetchCapacities();
  }, []);

  useEffect(() => {
    fetchCartItems();
    fetchMixCartItems();
  }, [capacities]);

  return (
    <div id="Cart">
      <h1>Your Cart</h1>
      <div className="total-price">
        Tổng giá: {calculateTotalPrice()} VND
      </div>
      <h2>Sản phẩm đơn</h2> {/* Title for normal cart */}
      <div className="cart-container">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-col">
                <img
                  src={item.imageUrl || "placeholder-image-url.jpg"}
                  alt={`Product ${item.productName}`}
                  className="cart-item-image"
                />
              </div>
              <div className="cart-col">
                <h3>{item.productName}</h3>
              </div>
              <div className="cart-col">
                <p>Dung tích: {item.capacity} ml</p>
              </div>
              <div className="cart-col">
                <p>
                  Giá: {item.price ? `${item.price * item.quantity} VND` : "Price not available"}
                </p>
              </div>
              <div className="quantity-selection">
                <label>Số Lượng:</label>
                <div className="quantity-buttons">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecreaseQuantity(index)}
                    disabled={item.quantity <= 1}>
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncreaseQuantity(index)}
                    disabled={item.quantity >= 10}>
                    +
                  </button>
                </div>
              </div>
              <div className="cart-col">
                <p>Level: {item.level}</p> {/* Display the level */}
              </div>
              <div className="cart-col">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteItem(index)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Giỏ hàng của bạn đang trống.</p>
        )}
      </div>
      <h2>Sản phẩm mix</h2> {/* Title for mixCart */}
      <div className="cart-container">
        {mixCartItems.length > 0 ? (
          mixCartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-col">
                <h3>{item.mixProdName}</h3>
              </div>
              <div className="cart-col">
                <p>Dung tích: {item.capacity} ml</p>
              </div>
              <div className="cart-col">
                <p>Giá: {item.price ? `${item.price * item.quantity} VND` : "Price not available"}</p>
              </div>
              <div className="quantity-selection">
                <label>Số Lượng:</label>
                <div className="quantity-buttons">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecreaseMixQuantity(index)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncreaseMixQuantity(index)}
                    disabled={item.quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-col">
                <p>Nồng độ:</p>
                <ul>
                  {Object.entries(item.levels).map(([productId, level]) => {
                    const product = item.productDetails.find((p) => p.productId === productId);
                    const productName = product ? product.productName : `Product ID ${productId}`;
                    return (
                      <li key={productId}>
                        {productName}: {level}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="cart-col">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteMixItem(index)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm mix trong giỏ hàng.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <button className="checkout-button" onClick={handleCheckout}>
          Thanh toán
        </button>
      )}
    </div>
  );
};

export default Cart;