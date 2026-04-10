import { useState } from "react";
import "../assets/css/productDetail.css";

import dielacMain from "../assets/img/dielac-main.jpg";
import dielac1 from "../assets/img/dielac-1.jpg";
import dielac2 from "../assets/img/dielac-2.jpg";
import dielac3 from "../assets/img/dielac-3.jpg";
import dielac4 from "../assets/img/dielac-4.jpg";
import dielac5 from "../assets/img/dielac-5.jpg";
import dielac6 from "../assets/img/dielac-6.jpg";

function ProductDetail() {
  const productImages = [
    dielac1,
    dielac2,
    dielac3,
    dielac4,
    dielac5,
    dielac6,
  ];

  const variants = [
    {
      id: 1,
      weight: "400gr",
      price: "360.000 VND",
      image: dielac1,
    },
    {
      id: 2,
      weight: "800gr",
      price: "720.000 VND",
      image: dielacMain,
    },
  ];

  const [mainImage, setMainImage] = useState(dielacMain);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);
    setMainImage(variant.image);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="product-detail-content">
      <div className="breadcrumb">Các loại sữa &gt; Chi tiết sản phẩm</div>

      <div className="product-top">
        <div className="product-image-box">
          <img
            src={mainImage}
            alt="Sữa bột Dielac Alpha Gold"
            className="main-product-image"
          />
          {/* <button className="zoom-btn">🔍</button> */}
        </div>

        <div className="product-info-box">
          <h1 className="product-price">{selectedVariant.price}</h1>

          <h2 className="product-title">
            Sữa bột Dielac Alpha Gold 800gr
            <br />
            (6-12 tháng)
          </h2>

          <p className="sold-count">Đã bán 3.6k</p>

          <div className="variant-list">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className={
                  selectedVariant.id === variant.id
                    ? "variant-card active"
                    : "variant-card"
                }
                onClick={() => handleSelectVariant(variant)}
              >
                <img src={variant.image} alt={variant.weight} />
                <p className="variant-weight">{variant.weight}</p>
                <p className="variant-price">{variant.price}</p>
              </div>
            ))}
          </div>

          <button className="add-cart-btn">Thêm vào giỏ hàng</button>
        </div>
      </div>

      <div className="thumbnail-list">
        {productImages.map((image, index) => (
          <div
            className="thumb-item"
            key={index}
            onClick={() => handleThumbnailClick(image)}
          >
            <img src={image} alt={`thumb-${index}`} />
          </div>
        ))}
      </div>

      <div className="product-bottom">
        <div className="detail-info-box">
          <h3>Thông tin chi tiết</h3>

          <div className="detail-content">
            <p><strong>Đặc điểm nổi bật</strong></p>
            <ul>
              <li>Bổ sung DHA hỗ trợ phát triển trí não</li>
              <li>Có Omega 3 hỗ trợ phát triển toàn diện</li>
              <li>Tăng cường hấp thu dưỡng chất</li>
              <li>Có canxi giúp xương thêm chắc khỏe</li>
            </ul>

            <p><strong>Nơi sản xuất</strong></p>
            <ul>
              <li>Việt Nam</li>
            </ul>

            <p>Ngày sản xuất: 03/06/2018</p>
            <p>Hạn sử dụng: dùng 12 tháng từ khi mở nắp</p>
          </div>
        </div>

        <div className="policy-box">
          <p>100% sản phẩm chính hãng</p>
          <p>1 đổi 1 trong vòng 1 tháng</p>
          <p>Miễn phí vận chuyển</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;