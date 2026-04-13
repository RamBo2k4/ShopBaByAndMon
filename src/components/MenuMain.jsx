import { useState } from "react";
import "../assets/css/MenuMain.css";

const menuData = [
  { id: 1, label: "Các loại sữa", category: "milk" },
  { id: 2, label: "Các loại tã", category: "diaper" },
  { id: 3, label: "Đồ chơi học tập", category: "toy" },
  { id: 4, label: "Phấn và sữa tắm", category: "bath" },
  { id: 5, label: "Đồ ăn dặm", category: "food" },
  { id: 6, label: "Thời trang, phụ kiện", category: "fashion" },
  { id: 7, label: "Đồ dùng mẹ và bé", category: "mom" },
];

const brands = [
  { name: "Bobby", img: "../src/assets/img/bobby.png" },
  { name: "Dielac", img: "../src/assets/img/dielac.png" },
  { name: "Pigeon", img: "../src/assets/img/pigeon.png" },
  { name: "Vinamilk", img: "../src/assets/img/vinamilk.png" },
  { name: "Huggies", img: "../src/assets/img/Huggies.png" },
  { name: "Moony", img: "../src/assets/img/moony.png" },
];

export default function MainMenu({
  onNavigate,
  onSelectCategory,
  onPreviewCategory,
}) {
  const [hoverId, setHoverId] = useState(null);
  // doi mau khi chon
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="main-menu">
      <div className="main-menu__header">
        <span>Danh mục sản phẩm</span>
      </div>

      <div className="main-menu__list">
        {menuData.map((item) => (
          <div
            key={item.id}
            className={`main-menu__item
  ${hoverId === item.id ? "main-menu__item--hover" : ""}
  ${activeId === item.id ? "main-menu__item--active" : ""}
`}
            onMouseEnter={() => {
              setHoverId(item.id);
              onPreviewCategory(item.category);
            }}
            onMouseLeave={() => {
              setHoverId(null);
              onPreviewCategory(null);
            }}
            onClick={() => {
              setActiveId(item.id); // 👈 lưu item đã chọn
              onSelectCategory(item.category);
              onPreviewCategory?.(null);
              onNavigate("productlist");
            }}
          >
            <span className="main-menu__item-label">{item.label}</span>
            <span className="main-menu__item-arrow">▶</span>
          </div>
        ))}
      </div>

      <div className="main-menu__brand-box">
        <div className="main-menu__brand-title">Top thương hiệu</div>

        <div className="main-menu__brand-grid">
          {brands.map((brand, i) => (
            <div key={i} className="main-menu__brand-item">
              <img
                src={brand.img}
                alt={brand.name}
                className="main-menu__brand-img"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="main-menu__banner">
        <img
          src="../src/assets/img/banner-menu.jpg"
          alt="Siêu deal banner"
          className="main-menu__banner-img"
        />
      </div>
    </div>
  );
}
