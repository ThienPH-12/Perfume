import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";
import "./TransactionRecord.scss";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const TransactionRecord = () => {
    const { token } = useAuth(); // Use token and setToken from AuthContext
    const [Records, setRecords] = useState([]);
    const navigate = useNavigate();

    const fetchRecords = async () => {
        try {
            if (!token) {
                navigate("/login"); // Redirect to login if token is not available
                return;
            }

            const response = await apiClient.get(apiPaths.getUserOrders, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedRecords = await Promise.all(
                response.data.map(async (order) => {
                    const Record = await apiClient.get(apiPaths.getOrderById(order.orderCode)
                    );
                    return {
                        ...order, id: Record.data.data.id || "",
                        amount: Record.data.data.amount || 0,
                        amountPaid: Record.data.data.amountPaid || 0,
                        amountRemaining: Record.data.data.amountRemaining || 0,
                        status: Record.data.data.status || "",
                        createdAt: Record.data.data.createdAt || "",
                        transactions: Record.data.data.transactions || [],
                        cancellationReason: Record.data.data.cancellationReason ?? null,
                        canceledAt: Record.data.data.canceledAt ?? null
                    };
                }, 5000)//add delay to avoid rate limit issues,the fetch image is not met this issue because it heavier
            );
            //clear the paymentInfo state after fetching
            const sortedRecords = [...updatedRecords].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecords(sortedRecords);
        } catch (error) {
            ErrorToastify("Lỗi: " + error.response?.data || "Lỗi mạng.");
        }
    };
    const handleCancelOrder = async (orderCode) => {
        try {
            if (!token) {
                navigate("/login"); // Redirect to login if token is not available
                return;
            }
            await apiClient.put(apiPaths.getOrderById(orderCode));
            SuccessToastify("Đơn hàng đã được hủy thành công.");
            fetchRecords(); // Refresh records after cancellation
        } catch (error) {
            ErrorToastify("Lỗi khi hủy đơn hàng: " + error.response?.data || "Lỗi mạng.");
        }
    };
    useEffect(() => {
        fetchRecords();
    }, []);

    const formatted = (date) => {
        return new Date(date).toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short" // optional
        });
    }
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    };
    return (
        <div className="crudContainer">
            <h2>Giao dịch</h2>
            <table className="crud-table">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Tổng tiền đơn hàng</th>
                        <th>Tổng tiền thanh toán</th>
                        <th>Ngày tạo</th>
                        <th>Ngày thanh toán</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>Chi tiết đơn hàng</th>
                        <th>Ngày hủy</th>
                        <th>Lý do hủy</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {Records.map((order, index) => (
                        <tr key={index}>
                            <td>{order.orderCode}</td>
                            <td>{formatPrice(order.amount)}</td>
                            <td>{formatPrice(order.amountPaid)}</td>
                            <td className="text-start">{formatted(order.createdAt)}</td>
                            <td>{order.transactions}</td>
                            <td>{order.status}</td>
                            <td className="text-start">{order.items &&
                                order.items.split(";").map((item, i) => {
                                    const [name, price, quantity] = item.split("|");
                                    return (
                                        <div key={i}>
                                            -{name} x Số lượng:{quantity} x Giá:{Number(price).toLocaleString("vi-VN")}VND
                                        </div>
                                    );
                                })}</td>
                            <td className="text-start">{order.canceledAt&&formatted(order.canceledAt)}</td>
                            <td className="text-start">{order.cancellationReason}</td>
                            <td>
                                <button
                                    onClick={() => window.location.replace(order.link)}
                                    disabled={order.status === "CANCELLED"}
                                >
                                    Tiếp tục thanh toán
                                </button>
                                <button onClick={() => handleCancelOrder(order.orderCode)
                                } disabled={order.status === "CANCELLED" || order.status === "COMPLETED"
                                } >Hủy giao dịch</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionRecord;
