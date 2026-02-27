import "./productCard.css";

function ProductCard() {
  return (
    <div className="product-card">

      {/* IMAGE */}
      <div className="product-image">
        <img src="/img/sanpham_card.jpg" alt="product" />
      </div>

      {/* INFO */}
      <div className="product-info">

        <div className="price-row">
          <span className="old-price">36.000.000 VND</span>
          <span className="discount">-50%</span>
        </div>

        <div className="new-price">18.000.000 VND</div>

        <p className="description">
          Mô tả gì đó về tên, chi tiết sản phẩm, công dụng của nó..........
        </p>

        {/* OPTIONS */}
        <div className="options">
          <span>Hộp 300g</span>
          <span>Hộp 600g</span>
          <span>Combo 3 hộp</span>
        </div>

        {/* SOLD + RATING */}
        <div className="meta">
          <span>Đã bán 36k+</span>
          <div className="stars">⭐⭐⭐⭐⭐</div>
        </div>

      </div>

      {/* CART BUTTON */}
      <button className="cart-btn">🛒</button>

    </div>
  );
}

export default ProductCard;