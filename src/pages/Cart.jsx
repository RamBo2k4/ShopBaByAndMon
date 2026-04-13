import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import AddressForm from "../components/AddressForm";
import CartSummary from "../components/CartSummary";
import Map from "../components/Map";
import "../assets/css/Cart.css";
import imgProduct from "../assets/img/sanpham_card.jpg";


const formatPrice = (price) => {
  return price.toLocaleString("vi-VN") + " VND";
};


const Cart = () => {
  const [vouchers, setVouchers] = useState([]);

useEffect(() => {
  fetch("/vouchers.json")
    .then((res) => res.json())
    .then((data) => setVouchers(data))
    .catch((err) => console.error("Lỗi load vouchers:", err));
}, []);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Sữa bột dielac alpha gold 800 gram",
      brand: "Alpha",
      price: 360000,
      quantity: 1,
      image: imgProduct,
    },
    {
      id: 2,
      name: "Sữa bột dielac alpha gold 800 gram",
      brand: "Alpha",
      price: 360000,
      quantity: 1,
      image: imgProduct,
    },
    {
      id: 3,
      name: "Sữa bột dielac alpha gold 800 gram",
      brand: "Alpha",
      price: 360000,
      quantity: 1,
      image: imgProduct,
    },
  ]);

  const [address, setAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [voucherError, setVoucherError] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const validateVoucher = (voucher, currentSubtotal) => {
    if (!voucher) {
      return {
        valid: false,
        message: "Mã giảm giá không tồn tại.",
      };
    }

    const expireDate = new Date(`${voucher.expire}T23:59:59`);
    const today = new Date();

    if (Number.isNaN(expireDate.getTime()) || expireDate < today) {
      return {
        valid: false,
        message: "Mã giảm giá đã hết hạn.",
      };
    }

    if (currentSubtotal < voucher.minOrder) {
      return {
        valid: false,
        message: `Đơn hàng tối thiểu ${formatPrice(
          voucher.minOrder
        )} để dùng mã này.`,
      };
    }

    return { valid: true, message: "" };
  };

  const getDiscountAmount = (voucher, currentSubtotal) => {
    if (!voucher) return 0;

    const validation = validateVoucher(voucher, currentSubtotal);
    if (!validation.valid) return 0;

    if (voucher.type === "fixed") {
      return Math.min(voucher.value, currentSubtotal);
    }

    if (voucher.type === "percent") {
      let discountValue = Math.round((currentSubtotal * voucher.value) / 100);

      if (voucher.maxDiscount) {
        discountValue = Math.min(discountValue, voucher.maxDiscount);
      }

      return Math.min(discountValue, currentSubtotal);
    }

    return 0;
  };

  const discount = getDiscountAmount(appliedVoucher, subtotal);
  const total = Math.max(subtotal - discount, 0);

  useEffect(() => {
    if (!appliedVoucher) return;

    const validation = validateVoucher(appliedVoucher, subtotal);

    if (!validation.valid) {
      setVoucherMessage(
        `Mã ${appliedVoucher.code} đã bị gỡ. ${validation.message}`
      );
      setVoucherError(true);
      setAppliedVoucher(null);
    }
  }, [subtotal, appliedVoucher]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const saveAddress = (addressData) => {
    setAddress(addressData);
    setShowForm(false);
  };

  const handleApplyVoucher = (e) => {
    e.preventDefault();

    const normalizedCode = voucherCode.trim().toUpperCase();

    if (!normalizedCode) {
      setVoucherMessage("Vui lòng nhập mã giảm giá.");
      setVoucherError(true);
      return;
    }

    const foundVoucher = vouchers.find(
      (voucher) => voucher.code.toUpperCase() === normalizedCode
    );

    const validation = validateVoucher(foundVoucher, subtotal);

    if (!validation.valid) {
      setAppliedVoucher(null);
      setVoucherMessage(validation.message);
      setVoucherError(true);
      return;
    }

    const discountValue = getDiscountAmount(foundVoucher, subtotal);

    setAppliedVoucher(foundVoucher);
    setVoucherCode(normalizedCode);
    setVoucherMessage(
      `Áp dụng thành công mã ${foundVoucher.code}. Bạn được giảm ${formatPrice(
        discountValue
      )}.`
    );
    setVoucherError(false);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode("");
    setVoucherMessage("Đã bỏ mã giảm giá.");
    setVoucherError(false);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Giỏ hàng trống</h2>
            <p>Hãy thêm sản phẩm vào giỏ hàng</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-content">
          <div className="cart-items-section">
            <h2>Giỏ hàng</h2>

            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div>
            <Map />

            <div className="address-section">
              <h3>Địa chỉ nhận hàng</h3>

              {address ? (
                <div className="address-info">
                  <p>
                    {address.fullName} - {address.phone}
                    <br />
                    {address.address}, {address.city}
                  </p>
                  <button onClick={() => setShowForm(true)}>Thay đổi</button>
                </div>
              ) : (
                <button
                  style={{ background: "#339be5", color: "white" }}
                  onClick={() => setShowForm(true)}
                >
                  + Thêm địa chỉ
                </button>
              )}

              {showForm && (
                <AddressForm
                  onSave={saveAddress}
                  onCancel={() => setShowForm(false)}
                />
              )}
            </div>

            <div
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ marginBottom: "12px" }}>Mã giảm giá</h3>

              <form
                onSubmit={handleApplyVoucher}
                style={{ display: "flex", gap: "10px", marginBottom: "12px" }}
              >
                <input
                  type="text"
                  placeholder="Nhập mã voucher"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#339be5",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 16px",
                    cursor: "pointer",
                  }}
                >
                  Áp dụng
                </button>
              </form>

              {appliedVoucher && (
                <div
                  style={{
                    background: "#e9f5fc",
                    border: "1px solid #339be5",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <p style={{ margin: "0 0 6px 0", fontWeight: "bold" }}>
                    {appliedVoucher.code} - {appliedVoucher.title}
                  </p>
                  <p style={{ margin: "0 0 6px 0" }}>
                    Giảm: {formatPrice(discount)}
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    Đơn tối thiểu: {formatPrice(appliedVoucher.minOrder)}
                  </p>

                  <button
                    type="button"
                    onClick={handleRemoveVoucher}
                    style={{
                      background: "#ff6b6b",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Bỏ mã
                  </button>
                </div>
              )}

              {voucherMessage && (
                <p
                  style={{
                    margin: 0,
                    color: voucherError ? "#d32f2f" : "#2e7d32",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {voucherMessage}
                </p>
              )}

              <p style={{ marginTop: "12px", color: "#666", fontSize: "14px" }}>
                Mã test nhanh: MILK20K, BABY50K, COMBO15, MOMBABY8
              </p>
            </div>

            <CartSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;