import React from 'react';

const CartSummary = ({ subtotal, discount, total }) => {
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VND';
  };

  return (
    <div className="cart-summary">
      <h3>Đơn hàng</h3>
      
      <div className="summary-row">
        <span>Tạm tính:</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      
      <div className="summary-row">
        <span>Giảm giá:</span>
        <span className="discount">-{formatPrice(discount)}</span>
      </div>
      
      <div className="summary-row total">
        <span>Tổng tiền:</span>
        <span>{formatPrice(total)}</span>
      </div>
      
      <button className="checkout-btn">Thanh toán</button>
    </div>
  );
};

export default CartSummary;