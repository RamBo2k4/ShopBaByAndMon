import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../assets/css/MenuMain.css";

// Dữ liệu mặc định để hiển thị ngay khi App load (Tránh bị trắng menu)
const defaultMenu = [
  { id: 1, label: "Các loại sữa", category: "milk" },
  { id: 2, label: "Các loại tã", category: "diaper" },
  { id: 3, label: "Đồ chơi học tập", category: "toy" },
  { id: 4, label: "Phấn và sữa tắm", category: "bath" },
  { id: 5, label: "Đồ ăn dặm", category: "food" },
  { id: 6, label: "Thời trang, phụ kiện", category: "fashion" },
  { id: 7, label: "Đồ dùng mẹ và bé", category: "mom" },
];

const brands = [
  { name: "Bobby", img: "/src/assets/img/bobby.png" },
  { name: "Dielac", img: "/src/assets/img/dielac.png" },
  { name: "Pigeon", img: "/src/assets/img/pigeon.png" },
  { name: "Vinamilk", img: "/src/assets/img/vinamilk.png" },
  { name: "Huggies", img: "/src/assets/img/Huggies.png" },
  { name: "Moony", img: "/src/assets/img/moony.png" },
];

export default function MainMenu({ onSelectCategory, onPreviewCategory }) {
  const navigate = useNavigate(); 
  const [hoverId, setHoverId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [menuItems, setMenuItems] = useState(defaultMenu);

  // Lấy danh mục từ MongoDB khi component mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) setMenuItems(data);
        }
      } catch (err) {
        console.warn("⚠️ Không kết nối được Server, đang dùng menu mặc định.");
      }
    };
    fetchMenu();
  }, []);

  const handleCategoryClick = (item) => {
    setActiveId(item.id);
    
    // Cập nhật state nếu cần (dùng cho logic preview ở Home)
    onSelectCategory?.(item.category);
    onPreviewCategory?.(null);
    
    // Điều hướng sang trang ProductList theo slug
    navigate(`/collection/${item.category}`);
  };

  return (
    <div className="main-menu">
      {/* Tiêu đề danh mục */}
      <div className="main-menu__header">
        <span>Danh mục sản phẩm</span>
      </div>

      {/* Danh sách Menu từ MongoDB */}
      <div className="main-menu__list">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`main-menu__item
              ${hoverId === item.id ? "main-menu__item--hover" : ""}
              ${activeId === item.id ? "main-menu__item--active" : ""}
            `}
            onMouseEnter={() => {
              setHoverId(item.id);
              onPreviewCategory?.(item.category);
            }}
            onMouseLeave={() => {
              setHoverId(null);
              onPreviewCategory?.(null);
            }}
            onClick={() => handleCategoryClick(item)}
          >
            <span className="main-menu__item-label">{item.label}</span>
            <span className="main-menu__item-arrow">▶</span>
          </div>
        ))}
      </div>

      {/* Box thương hiệu */}
      <div className="main-menu__brand-box">
        <div className="main-menu__brand-title">Top thương hiệu</div>
        <div className="main-menu__brand-grid">
          {brands.map((brand, i) => (
            <div key={i} className="main-menu__brand-item">
              <img
                src={brand.img}
                alt={brand.name}
                className="main-menu__brand-img"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Banner Khuyến mãi */}
      <div 
        className="main-menu__banner" 
        onClick={() => navigate("/sale")}
        style={{ cursor: "pointer" }}   
      >
        <img
          src="/src/assets/img/banner-menu.jpg"
          alt="Siêu deal banner"
          className="main-menu__banner-img"
        />
      </div>
    </div>
  );
}