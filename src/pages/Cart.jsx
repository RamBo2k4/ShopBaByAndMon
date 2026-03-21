import React, { useState } from "react";
import CartItem from "../components/CartItem";
import AddressForm from "../components/AddressForm";
import CartSummary from "../components/CartSummary";
import Map from "../components/Map";
import "../assets/css/Cart.css";
import imgProduct from "../assets/img/sanpham_card.jpg";

const Cart = () => {
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

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = 20000;
  const total = subtotal - discount;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const saveAddress = (addressData) => {
    setAddress(addressData);
    setShowForm(false);
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
        {/* Banner khuyến mãi */}
        {/* <div className="promo-banner">
          <span className="promo-tag">SIÊU DEAL 40%</span>
          <span>100% đơn hàng giáo trước Tết "Khi đặt hàng từ 1-7/2/2023"</span>
        </div> */}

        {/* Nội dung chính */}
        <div className="cart-content">
          <div className="cart-items-section">
            <h2>Giỏ hàng</h2>

            {/* Danh sách sản phẩm */}
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
            {/* Bản đồ */}
            <Map />
            {/* Địa chỉ nhận hàng */}
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
            {/* Tóm tắt đơn hàng */}
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
