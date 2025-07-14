import React from "react";
import "./ConfirmModal.scss";

function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div id="ConfirmModal">
            <div className="confirm-modal">
                <div className="modal-content">
                    <p>{message}</p>
                    <div className="modal-actions">
                        <button className="confirm-button" onClick={onConfirm}>
                            Xác nhận
                        </button>
                        <button className="cancel-button" onClick={onCancel}>
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
