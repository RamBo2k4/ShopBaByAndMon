import React from 'react';

const CartSummary = ({ subtotal, discount, total }) => {
  const formatPrice = (price) => {
    return (price || 0).toLocaleString('vi-VN') + ' VND';
  };

  return (
    <div className="cart-summary" style={{
      background: "#fff", 
      padding: "20px", 
      borderRadius: "8px", 
      // marginTop: "15px", 
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "15px", color:"black"}}>Tóm tắt đơn hàng</h3>
      
      <div className="summary-row" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
        <span style={{color: "#666"}}>Tạm tính:</span>
        <span style={{fontWeight: "500",color: "#666"}}>{formatPrice(subtotal)}</span>
      </div>
      
      <div className="summary-row" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
        <span style={{color: "#666"}}>Giảm giá voucher:</span>
        <span className="discount" style={{ fontWeight: "500"}}>-{formatPrice(discount)}</span>
      </div>

      <div className="summary-row" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
        <span style={{color: "#666"}}>Phí vận chuyển:</span>
        <span style={{color: "green", fontWeight: "500"}}>Miễn phí</span>
      </div>
      
      <hr style={{border: "none", borderTop: "1px dashed #eee", margin: "15px 0"}} />
      
      <div className="summary-row total" style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
        <span style={{fontWeight: "bold", fontSize: "18px"}}>CẦN THANH TOÁN:</span>
        <span style={{color: "#e44d26", fontWeight: "bold", fontSize: "20px"}}>{formatPrice(total)}</span>
      </div>
      
      <button className="checkout-btn" style={{
        width: "100%",
        padding: "12px",
        background: "#e44d26",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s"
      }}
      onMouseOver={(e) => e.target.style.background = "#c63a1a"}
      onMouseOut={(e) => e.target.style.background = "#e44d26"}
      >
        TIẾN HÀNH THANH TOÁN
      </button>

      <p style={{fontSize: "12px", color: "#888", textAlign: "center", marginTop: "10px"}}>
        (Đã bao gồm thuế VAT nếu có)
      </p>
    </div>
  );
};

export default CartSummary;