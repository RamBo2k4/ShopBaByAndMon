import React from "react";
import "../assets/css/NotificationModal.css";

function NotificationModal({ isOpen, type, title, message, onClose, onAction, actionText }) {
  if (!isOpen) return null;

  return (
    <div className="notif-overlay">
      <div className={`notif-modal ${type}`}>
        <div className="notif-icon">
          {type === "success" ? "✔️" : "⚠️"}
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        
        <div className="notif-buttons">
          <button className="btn-close-notif" onClick={onClose}>
            Để sau
          </button>
          {onAction && (
            <button className="btn-action-notif" onClick={onAction}>
              {actionText || "Xem giỏ hàng"} {/* Nếu không truyền thì mặc định là Xem giỏ hàng */}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;