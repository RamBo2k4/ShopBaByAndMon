// import "../assets/css/productcard.css";
// import imgProduct from "../assets/img/sanpham_card.jpg";

// function ProductCard() {
//   return (
//     <div className="product-card">
//       {/* IMAGE */}
//       <div className="product-image">
//         <img src={imgProduct} alt="product" />
//       </div>

//       {/* INFO */}
//       <div className="product-info">
//         <div className="price-row">
//           <span className="old-price">36.000.000 VND</span>
//           <span className="discount">-50%</span>
//         </div>

//         <div className="new-price">18.000.000 VND</div>

//         <p className="description">
//           Mô tả gì đó về tên, chi tiết sản phẩm, công dụng của nó..........
//         </p>

//         {/* OPTIONS */}
//         <div className="options">
//           <span>Hộp 300g</span>
//           <span>Hộp 600g</span>
//           <span>Combo 3 hộp</span>
//         </div>

//         {/* SOLD + RATING */}
//         <div className="meta">
//           <div>
//             <span>Đã bán 36k+</span>
//             {/* 👉 THÊM ĐỘ TUỔI Ở ĐÂY */}
//             <div className="age">6-12</div>
//             <div className="stars">⭐⭐⭐⭐⭐</div>
//           </div>
//         </div>
//       </div>

//       {/* CART BUTTON */}
//       <button className="cart-btn">🛒</button>
//     </div>
//   );
// }

// export default ProductCard;
import "../assets/css/productcard.css";
import imgProduct from "../assets/img/sanpham_card.jpg";
function ProductCard({
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
  return (
    <div className="product-card">
      {/* IMAGE */}
      <div className="product-image">
        <img src={image || imgProduct} alt="product" />
      </div>

      {/* INFO */}
      <div className="product-info">
        {/* PRICE */}
        <div className="price-row">
          <span className="old-price">{oldPrice?.toLocaleString()} VND</span>
          <span className="discount">-{discount}%</span>
        </div>

        <div className="new-price">{newPrice?.toLocaleString()} VND</div>

        {/* DESCRIPTION */}
        <p className="description">{description}</p>

        {/* 👉 ĐỘ TUỔI */}
        {/* neu dieu kien dung thi hien gia tri sau &&*/}
        <div className="age">
          Phù hợp cho trẻ
          {age === "0-6" && " từ 0 - 6 tháng"}
          {age === "6-12" && "từ 6 - 12 tháng"}
          {age === "1-2" && " từ 1 - 2 tuổi"}
          {age === "2-6" && " từ 2 - 6 tuổi"}
          {age === "6+" && " trên 6 tuổi"}
        </div>

        {/* OPTIONS */}
        <div className="options">
          {options?.map((opt, index) => (
            <span key={index}>{opt}</span>
          ))}
        </div>

        {/* META */}
        <div className="meta">
          <div>
            {/* ⭐ RATING */}
            <div className="stars">{"⭐".repeat(rating || 0)}</div>
          </div>

          {/* SOLD */}
          <div>
            <span>Đã bán {sold?.toLocaleString()}+</span>
          </div>
        </div>
      </div>

      {/* CART BUTTON */}
      <button className="cart-btn">
        <i class="fi fi-rr-shopping-cart-add"></i>
      </button>
    </div>
  );
}

export default ProductCard;
