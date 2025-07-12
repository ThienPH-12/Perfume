import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import { useAuth } from "../../utils/AuthContext"; // Import useAuth
import "./UserInfo.scss";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
    const { token, setToken } = useAuth(); // Use token and setToken from AuthContext
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (!token) {
                    navigate("/login"); // Redirect to login if token is not available
                    return;
                }

                const response = await apiClient.get(apiPaths.initUserInfo, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserInfo(response.data);
                setEditedInfo(response.data);
            } catch (error) {
                ErrorToastify(error?.response?.data || "Lỗi mạng.");
            }
        };
        fetchUserInfo();
    }, [token,navigate]); // Trigger effect when token changes

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (field, value) => {
        setEditedInfo({ ...editedInfo, [field]: value });
    };

    const handleSaveChanges = async () => {
        try {
            if (!token) {
                navigate("/login"); // Redirect to login if token is not available
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId; // Extract userId from the token

            const payload = {
                userId,
                username: editedInfo.username,
                gender: editedInfo.gender,
                age: editedInfo.age,
                address: editedInfo.address,
            }; // Match InitUserReq attributes

            const response = await apiClient.post(apiPaths.updateUserInfo, payload);
            if (response.status === 200) {
                SuccessToastify(response.data.message || "Chỉnh sửa thông tin thành công!");
                setUserInfo({ ...userInfo, ...payload });
                setIsEditing(false);

                // Update token in AuthContext
                const newToken = response.data.token; // Assuming the new token is returned in response.data.token
                setToken(newToken);
                localStorage.setItem("token", newToken);
            }
        } catch (error) {
            ErrorToastify("Failed to update user info: " + error.response.data);
        }
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div id="UserInfo">
            <h1>Thông Tin Người Dùng</h1>
            <div className="user-info-container">
                <button className="edit-button" onClick={handleEditToggle}>
                    {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
                </button>
                <div className="user-info-fields">
                    <label>
                        <strong>Tên:</strong>
                        <input
                            type="text"
                            value={editedInfo.username}
                            disabled={!isEditing}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                        />
                    </label>
                    <label>
                        <strong>Email:</strong>
                        <input
                            type="email"
                            value={editedInfo.email}
                            disabled // Email field remains disabled
                        />
                    </label>
                    <label>
                        <strong>Giới tính:</strong>
                        <select
                            value={editedInfo.gender}
                            disabled={!isEditing}
                            onChange={(e) => handleInputChange("gender", e.target.value)}
                        >
                            <option value={0}>Nam</option>
                            <option value={1}>Nữ</option>
                        </select>
                    </label>
                    <label>
                        <strong>Tuổi:</strong>
                        <input
                            type="number"
                            value={editedInfo.age}
                            disabled={!isEditing}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                        />
                    </label>
                    <label>
                        <strong>Địa chỉ:</strong>
                        <input
                            type="text"
                            value={editedInfo.address}
                            disabled={!isEditing}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                    </label>
                    <label>
                        <strong>Quyền hạn:</strong>
                        <input
                            type="text"
                            value={editedInfo.authority === "1" ? "Admin" : "User"}
                            disabled
                        />
                    </label>
                    <label>
                        <strong>Kích hoạt:</strong>
                        <input
                            type="text"
                            value={editedInfo.activation}
                            disabled
                        />
                    </label>
                </div>
                {isEditing && (
                    <button className="save-button" onClick={handleSaveChanges}>
                        Xác nhận thay đổi
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
