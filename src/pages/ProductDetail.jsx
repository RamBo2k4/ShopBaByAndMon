import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotificationModal from "../components/NotificationModal"; // Đảm bảo đã import
import "../assets/css/productDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (err) {
        console.error("Lỗi fetch sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "plus") setQuantity(prev => prev + 1);
    else if (type === "minus" && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = async () => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) {
      alert("Vui lòng đăng nhập để thực hiện tính năng này!");
      return;
    }
    const user = JSON.parse(rawUser);

    const payload = {
      userPhone: user.phone,
      userName: user.fullName,
      item: {
        id: product.id,
        name: product.description,
        price: product.newPrice,
        quantity: quantity,
        image: product.image
      }
    };

    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowNotif(true); // Kích hoạt hiện Modal
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      console.error("Lỗi thêm giỏ hàng:", err);
    }
  };

  if (loading) return <div className="loading-state">✨ Đang tải sản phẩm...</div>;
  if (!product) return <div className="error-state">Sản phẩm không tồn tại</div>;

  return (
    <div className="product-detail-layout">
      {/* 👉 QUAN TRỌNG: Phải đặt Component Modal ở đây */}
      <NotificationModal 
        isOpen={showNotif}
        type="success"
        title="Thêm thành công!"
        message={`Sản phẩm "${product.description}" đã nằm trong giỏ hàng.`}
        onClose={() => setShowNotif(false)}
        onAction={() => navigate("/cart")}
      />

      <div className="detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb-wrapper">
          <div className="breadcrumb-links">
            <span className="b-link" onClick={() => navigate("/")}>Trang chủ</span>
            <span className="b-sep">/</span>
            <span className="b-link active">{product.category}</span>
            <span className="b-sep">/</span>
            <span className="b-text">Chi tiết</span>
          </div>
          <span className="b-back-end" onClick={() => navigate(-1)}>Quay lại ⬅</span>
        </div>

        <div className="product-main-section">
          {/* Panel Ảnh */}
          <div className="image-panel">
            <div className="image-card">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Panel Thông tin */}
          <div className="info-panel">
            <div className="info-content">
              <div className="stars">{"⭐".repeat(product.rating || 5)}</div>
              <h1 className="p-title">{product.description}</h1>
              
              <div className="p-price-box">
                <span className="current-price">{product.newPrice?.toLocaleString()} VND</span>
                <span className="old-price">{product.oldPrice?.toLocaleString()} VND</span>
              </div>

              <div className="status-tag">Còn hàng</div>

              <div className="purchase-actions">
                <div className="quantity-selector">
                  <button onClick={() => handleQuantity("minus")} style={{color:"black"}}>-</button>
                  <input type="text" value={quantity} readOnly />
                  <button onClick={() => handleQuantity("plus")}style={{color:"black"}}>+</button>
                </div>
                <button className="p-add-cart-btn" onClick={handleAddToCart}>
                  <i className="fi fi-rr-shopping-cart-add"></i> THÊM VÀO GIỎ HÀNG
                </button>
              </div>

              <div className="p-footer-back">
                <span>Bạn muốn tìm sản phẩm khác? <u onClick={() => navigate(-1)}>Quay lại</u></span>
              </div>
            </div>
          </div>
        </div>

        {/* Khối dưới */}
        <div className="product-bottom-section">
          <div className="desc-card">
            <h3>Mô tả sản phẩm</h3>
            <p className="desc-text">
              {product.description}. Sản phẩm chất lượng cao, an toàn tuyệt đối cho bé yêu.
            </p>
          </div>

          <div className="policy-sidebar">
            <div className="policy-card-item">🛡️ Bảo hành chính hãng</div>
            <div className="policy-card-item">🚚 Miễn phí vận chuyển</div>
            <div className="policy-card-item">🔄 Đổi trả trong 7 ngày</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;