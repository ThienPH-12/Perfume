import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";

const ConfirmActivated = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(0); // 0: Not expired, 1: Expired, 2: Resent successfully, 3: Data error
  const [token, setToken] = useState(null); // Store the token

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    setToken(tokenParam);
    if (tokenParam) {
      apiClient
        .post(`${apiPaths.activateUser}?token=${tokenParam}`)
        .then(() => {
          SuccessToastify("Tài khoản đã được kích hoạt thành công!");
          navigate("/login");
        })
        .catch((error) => {
          if (error.response?.data === "Lỗi trong lúc xác nhận: Link này đã hết hạn") {
            setExpired(1); // Show resend button if the token is expired
          } else {
            ErrorToastify(
              error.response?.data || "Kích hoạt tài khoản không thành công."
            );
            setExpired(3);
          }
        })
        .finally(() => setLoading(false));
    } else {
      ErrorToastify("Token không hợp lệ.");
      setLoading(false);
    }
  }, [searchParams, navigate]);

  const handleResend = () => {
    if (token) {
      apiClient
        .post(`${apiPaths.resendActivation}?token=${token}`)
        .then(() => {
          SuccessToastify("Email kích hoạt đã được gửi lại!");
          setExpired(2); // Show success message after successful resend
        })
        .catch((error) => {
          ErrorToastify(
            error.response?.data || "Không thể gửi lại email kích hoạt."
          );
        });
    }
  };

  if (loading) {
    return <div>Đang xử lý kích hoạt tài khoản...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {expired === 1 ? (
        <div>
          <p style={{ color: "red" }}>Link này đã hết hạn.</p>
          <button onClick={handleResend} style={{ padding: "10px 20px" }}>
            Gửi lại email kích hoạt
          </button>
        </div>
      ) : expired === 2 ? (
        <p style={{ color: "blue" }}>Đã gửi lại link mới.</p>
      ) : expired === 3 ? (
        <p style={{ color: "red" }}>Dữ liệu gửi đi bị lỗi.</p>
      ) : (
        <p style={{ color: "green" }}>Tài khoản đã được kích hoạt thành công!</p>
      )}
    </div>
  );
};

export default ConfirmActivated;
