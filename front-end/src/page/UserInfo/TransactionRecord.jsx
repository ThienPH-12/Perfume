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
                })
            );
            //clear the paymentInfo state after fetching
            setRecords(updatedRecords);
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
                        <tr key={order.index}>
                            <td>{order.orderCode}</td>
                            <td>{order.amount}</td>
                            <td>{order.amountPaid}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.transactions}</td>
                            <td>{order.status}</td>
                            <td>{order.items &&
                                order.items.split(";").map((item, i) => {
                                    const [name, price, quantity] = item.split("|");
                                    return (
                                        <div key={i}>
                                            {name} x{quantity}x{Number(price).toLocaleString("vi-VN")}VND
                                        </div>
                                    );
                                })}</td>
                            <td>{order.canceledAt}</td>
                            <td>{order.cancellationReason}</td>
                            <td>
                                <button onClick={() => handleCancelOrder(order.orderCode)} >Hủy giao dịch</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionRecord;
