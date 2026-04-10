import React from "react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + " VND";
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="item-info">
        <div className="item-brand">{item.brand}</div>
        <div className="item-name">{item.name}</div>
        <div className="item-price">{formatPrice(item.price)}</div>
      </div>

      <div className="item-quantity">
        <button
          className="btn-minus"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          className="btn-add"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>

      <div className="item-total">
        {formatPrice(item.price * item.quantity)}
      </div>

      <button className="remove-btn" onClick={() => onRemove(item.id)}>
        ×
      </button>
    </div>
  );
};

export default CartItem;
