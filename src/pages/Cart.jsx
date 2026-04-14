import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import AddressForm from "../components/AddressForm";
import CartSummary from "../components/CartSummary";
import Map from "../components/Map";
import NotificationModal from "../components/NotificationModal"; // 👉 Đã thêm import
import "../assets/css/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [allVouchers, setAllVouchers] = useState([]);
  const [savedCodes, setSavedCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  // 👉 1. Thêm State quản lý thông báo (Notification)
  const [notif, setNotif] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    actionType: null
  });

  const fetchItems = async () => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) { navigate("/"); return; }
    const loggedInUser = JSON.parse(rawUser);

    try {
      const [cartRes, vRes, savedRes] = await Promise.all([
        fetch(`http://localhost:5000/api/cart/${loggedInUser.phone}`),
        fetch("http://localhost:5000/testDB/vourcher"),
        fetch(`http://localhost:5000/api/users/saved-vouchers/${loggedInUser._id}`)
      ]);

      if (cartRes.ok) setItems(await cartRes.json());
      if (vRes.ok) setAllVouchers(await vRes.json());
      if (savedRes.ok) setSavedCodes(await savedRes.json());
    } catch (err) {
      console.error("Lỗi tải dữ liệu giỏ hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [navigate]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPhone: user.phone, productId, quantity: newQuantity })
      });
      if (res.ok) {
        setItems(prev => prev.map(i => i.id === productId ? { ...i, quantity: newQuantity } : i));
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) { console.error(err); }
  };

  const handleRemoveItem = async (productId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPhone: user.phone, productId })
      });
      if (res.ok) {
        setItems(prev => prev.filter(i => i.id !== productId));
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) { console.error(err); }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price || item.newPrice || 0) * item.quantity, 0);

  useEffect(() => {
    if (appliedVoucher && subtotal < appliedVoucher.minOrder) {
      setAppliedVoucher(null);
      alert(`Voucher ${appliedVoucher.code} đã bị gỡ vì đơn hàng không đủ điều kiện tối thiểu.`);
    }
  }, [subtotal, appliedVoucher]);

  const discount = appliedVoucher
    ? (appliedVoucher.type === 'percent' ? (subtotal * appliedVoucher.value / 100) : appliedVoucher.value)
    : 0;

  const myVouchers = allVouchers.filter(v => savedCodes.includes(v.code));

  // 👉 2. Hàm Thanh Toán (Checkout)
  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }
    if (!address) {
      alert("📍 Vui lòng chọn địa chỉ giao hàng trước!");
      setShowForm(true); 
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const orderData = {
      userPhone: user.phone,
      userName: user.fullName,
      address: address,
      items: items,
      total: subtotal - discount
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        setNotif({
          isOpen: true,
          type: "success",
          title: "Đặt hàng thành công!",
          message: "Cảm ơn bạn đã tin dùng BaByAndMon. Đơn hàng đang được xử lý!",
          actionType: "GO_HOME"
        });
        setItems([]); // Xóa list hàng hiển thị
        window.dispatchEvent(new Event("cartUpdated")); // Sync Header về 0
      }
    } catch (err) {
      console.error("Lỗi đặt hàng:", err);
    }
  };

  if (loading) return <div className="container" style={{ padding: "100px", textAlign: "center" }}>Đang tải...</div>;

  return (
    <div className="cart-page" style={{ background: "#f5f5f5", padding: "20px 0" }}>
      {/* 👉 3. Hiển thị Modal thông báo */}
      <NotificationModal 
        isOpen={notif.isOpen}
        type={notif.type}
        title={notif.title}
        message={notif.message}
        onClose={() => {
            setNotif({ ...notif, isOpen: false });
            if(notif.actionType === "GO_HOME") navigate("/");
        }}
        onAction={notif.actionType === "GO_HOME" ? () => navigate("/") : null}
      />

      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {/* --- KHỐI ĐỊA CHỈ & MAP --- */}
        <div style={{ display: "flex", gap: "20px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <div style={{ flex: 2, height: "300px", borderRadius: "8px", overflow: "hidden", border: "1px solid #eee" }}>
            <Map />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px", color: "black" }}>📍 Địa chỉ giao hàng</h3>
            {address ? (
              <div style={{ padding: "15px", border: "1px solid #339be5", borderRadius: "8px", background: "#f0f9ff" }}>
                <small style={{ color: "#339be5", fontWeight: "bold", fontSize: "11px", display: "block", marginBottom: "4px" }}>👤 NGƯỜI NHẬN</small>
                <p style={{ margin: 0, color: "#333", fontSize: "15px" }}><b>{address.fullName}</b> | <b>{address.phone}</b></p>
                <small style={{ color: "#339be5", fontWeight: "bold", fontSize: "11px", display: "block", marginTop: "12px", marginBottom: "4px" }}>🏠 ĐỊA CHỈ</small>
                <p style={{ color: "#444", margin: 0, fontSize: "14px" }}>{address.address}</p>
                <button onClick={() => setShowForm(true)} style={{ marginTop: "10px", color: "#339be5", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "13px" }}>Thay đổi</button>
              </div>
            ) : (
              <button onClick={() => setShowForm(true)} style={{ padding: "20px", border: "2px dashed #ddd", borderRadius: "8px", cursor: "pointer", background: "#fafafa", color: "#888", width: "100%" }}>+ Chọn địa chỉ nhận hàng</button>
            )}
            {showForm && <AddressForm onSave={(d) => { setAddress(d); setShowForm(false) }} onCancel={() => setShowForm(false)} />}
          </div>
        </div>

        {/* --- DANH SÁCH SẢN PHẨM --- */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "black", marginBottom: "20px" }}>🛒 Giỏ hàng ({items.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {items.length > 0 ? items.map((item) => (
              <div key={item._id || item.id} style={{ borderBottom: "1px solid #eee", paddingBottom: "15px" }}>
                <CartItem
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
                <div style={{ textAlign: "right", fontSize: "13px", color: "#333", marginTop: "5px" }}>
                  Thành tiền: <b>{((item.price || item.newPrice) * item.quantity).toLocaleString()}đ</b>
                </div>
              </div>
            )) : <p style={{textAlign: 'center', padding: '20px'}}>Giỏ hàng của bạn đang trống.</p>}
          </div>
        </div>

        {/* --- VOUCHER & TỔNG TIỀN --- */}
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div style={{ flex: 1.5, background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "20px", color: "#333" }}>🎟️ Ví Voucher của bạn</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "400px", overflowY: "auto" }}>
              {myVouchers.length > 0 ? myVouchers.map((v) => {
                const isEligible = subtotal >= v.minOrder;
                const isSelected = appliedVoucher?.code === v.code;
                const saving = v.type === 'percent' ? (subtotal * v.value / 100) : v.value;

                return (
                  <div
                    key={v._id}
                    onClick={() => isEligible && setAppliedVoucher(v)}
                    style={{
                      display: "flex", minHeight: "90px",
                      border: isSelected ? "2px solid #e44d26" : "1px solid #eee",
                      borderRadius: "10px",
                      cursor: isEligible ? "pointer" : "not-allowed",
                      background: isSelected ? "#fff5f4" : (isEligible ? "#fff" : "#f8f8f8"),
                      opacity: isEligible ? 1 : 0.7
                    }}
                  >
                    <div style={{ width: "80px", background: isEligible ? "#e44d26" : "#bbb", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <b style={{ fontSize: "20px" }}>{v.type === 'percent' ? `${v.value}%` : `${v.value / 1000}k`}</b>
                      <span style={{ fontSize: "10px" }}>GIẢM</span>
                    </div>
                    <div style={{ padding: "12px 15px", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: "bold", color: "#333" }}>{v.code}</span>
                        {isSelected && <span style={{ color: "#e44d26" }}>✔</span>}
                      </div>
                      <div style={{ fontSize: "13px", color: "#e44d26", fontWeight: "bold", margin: "4px 0" }}>
                        {isEligible ? `Giảm ngay: -${saving.toLocaleString()}đ` : `Thiếu ${(v.minOrder - subtotal).toLocaleString()}đ`}
                      </div>
                      <div style={{ fontSize: "11px", color: "#888" }}>Đơn từ: {v.minOrder.toLocaleString()}đ</div>
                    </div>
                  </div>
                );
              }) : <p style={{ color: "#999", textAlign: "center" }}>Ví voucher trống.</p>}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {/* 👉 4. Truyền hàm handleCheckout vào CartSummary */}
            <CartSummary 
                subtotal={subtotal} 
                discount={discount} 
                total={subtotal - discount} 
                onCheckout={handleCheckout} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;