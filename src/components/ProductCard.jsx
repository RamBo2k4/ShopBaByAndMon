import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotificationModal from "../components/NotificationModal"; // Import component thông báo
import "../assets/css/productcard.css";
import imgProduct from "../assets/img/sanpham_card.jpg";

function ProductCard({
  id,
  oldPrice,
  newPrice,
  discount,
  description,
  sold,
  rating,
  options,
  image,
  age,
}) {
  const navigate = useNavigate();
  
  // 👉 THÊM STATE ĐỂ QUẢN LÝ THÔNG BÁO
  const [showNotif, setShowNotif] = useState(false);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const rawUser = localStorage.getItem("user");
    if (!rawUser) {
      alert("Vui lòng đăng nhập để mua hàng!");
      return;
    }
    const user = JSON.parse(rawUser);

    const payload = {
      userPhone: user.phone,
      userName: user.fullName,
      item: {
        id: id,
        name: description,
        price: newPrice,
        quantity: 1, // Mặc định là 1 khi add nhanh
        image: image || imgProduct
      }
    };

    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // 👉 HIỆN THÔNG BÁO THAY VÌ ALERT
        setShowNotif(true);
        
        // Cập nhật số lượng trên Header
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      console.error("Lỗi thêm nhanh:", err);
    }
  };

  return (
    <div className="product-card">
      {/* GỌI COMPONENT THÔNG BÁO Ở ĐÂY */}
      <NotificationModal 
        isOpen={showNotif}
        type="success"
        title="Đã thêm vào giỏ!"
        message={`Sản phẩm "${description}" đã được thêm vào giỏ hàng.`}
        onClose={() => setShowNotif(false)}
        onAction={() => navigate("/cart")}
      />

      <Link to={`/product/${id}`} className="product-image">
        <img src={image || imgProduct} alt={description} />
      </Link>

      <div className="product-info">
        <div className="price-row">
          <span className="old-price">{oldPrice?.toLocaleString()} VND</span>
          <span className="discount">-{discount}%</span>
        </div>

        <div className="new-price">{newPrice?.toLocaleString()} VND</div>

        <p className="description">{description}</p>

        <div className="age">
          Phù hợp cho trẻ 
          {age === "0-6" && " từ 0 - 6 tháng"}
          {age === "6-12" && " từ 6 - 12 tháng"}
          {age === "1-2" && " từ 1 - 2 tuổi"}
          {age === "2-6" && " từ 2 - 6 tuổi"}
          {age === "6+" && " trên 6 tuổi"}
        </div>

        <div className="options">
          {options?.map((opt, index) => (
            <span key={index}>{opt}</span>
          ))}
        </div>

        <div className="meta">
          <div>
            <div className="stars">
              {"⭐".repeat(rating || 0)}
            </div>
          </div>
          <div>
            <span>Đã bán {sold?.toLocaleString()}+</span>
          </div>
        </div>
      </div>

      <button className="cart-btn" onClick={handleQuickAdd}>
        <i className="fi fi-rr-shopping-cart-add"></i>
      </button>
    </div>
  );
}

export default ProductCard;