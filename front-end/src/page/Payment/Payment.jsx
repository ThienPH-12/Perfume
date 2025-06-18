import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify"; // Fixed import
import Cookies from "js-cookie"; // Import js-cookie for cookie management
import "./Payment.scss"; // Import CSS for styling

const Payment = () => {
    const { state } = useLocation(); // Get product data from navigation state
    const [name, setName] = useState(Cookies.get("paymentName") || "");
    const [contactNumber, setContactNumber] = useState(Cookies.get("paymentContactNumber") || "");
    const [address, setAddress] = useState(Cookies.get("paymentAddress") || "");
    const [discount, setDiscount] = useState(Number(Cookies.get("paymentDiscount")) || 0);
    const [buyerEmail, setBuyerEmail] = useState(Cookies.get("paymentBuyerEmail") || "");

    const shippingCost = 30000; // Default shipping cost
    const totalPrice = state.totalPrice + shippingCost - discount; // Add shipping cost and subtract discount

    const FRONTEND_BASE_URL = process.env.REACT_APP_API_BASE_URL_FE || "http://localhost:3000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Set cookies when the form is submitted
            Cookies.set("paymentName", name, { expires: 1 });
            Cookies.set("paymentContactNumber", contactNumber, { expires: 1 });
            Cookies.set("paymentAddress", address, { expires: 1 });
            Cookies.set("paymentDiscount", discount, { expires: 1 });
            Cookies.set("paymentBuyerEmail", buyerEmail, { expires: 1 });

            const orderReq = {
                description: `${state.description}`,
                returnUrl: FRONTEND_BASE_URL + "/payment/success",
                cancelUrl: FRONTEND_BASE_URL + "/payment/cancel",
                price: totalPrice,
                buyerName: name,
                buyerEmail: buyerEmail,
                buyerPhone: contactNumber,
                buyerAddress: address,
                items: state.items.map((item) => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })), // Include all items from state.items
            };

            const response = await apiClient.post(apiPaths.payment, orderReq);
            if (response.data.error === 0) {
                SuccessToastify(response.data.message);
                window.location.replace(response.data.data.checkoutUrl);
            } else {
                ErrorToastify(response.data.message);
            }
            console.log(response.data.data);
        } catch (error) {
            ErrorToastify("Failed to create order: " + error.message);
        }
    };

    return (
        <div id="Payment">
            <h1>Thanh Toán</h1>
            <div className="payment-container">
                <div className="product-info">
                    <h2>Thông tin sản phẩm</h2>
                    <p>Mô tả: {state.description}</p>
                    <ul>
                        {state.items.map((item, index) => (
                            <li key={index}>
                                {item.name} - Giá: {item.price} VND - Số lượng: {item.quantity} - Tổng: {item.price * item.quantity} VND
                            </li>
                        ))}
                    </ul>
                    <p>Phí vận chuyển: {shippingCost} VND</p>
                    <p>Tổng cộng: {totalPrice} VND</p>
                </div>
                <form onSubmit={handleSubmit} className="payment-form">
                    <h2>Thông tin khách hàng</h2>
                    <label>
                        Tên:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Số điện thoại:
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Địa chỉ:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Mã giảm giá:
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                            disabled // Disable the discount input field
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={buyerEmail}
                            onChange={(e) => setBuyerEmail(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className="submit-payment">
                        Thanh toán
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
