import { useState } from "react";

const menuData = [
  { id: 1, label: "Các loại sữa", icon: "🍼" },
  { id: 2, label: "Các loại tã", icon: "👶" },
  { id: 3, label: "Đồ chơi học tập", icon: "🧸" },
  { id: 4, label: "Phấn và sữa tắm", icon: "🛁" },
  { id: 5, label: "Đồ ăn dặm", icon: "🥣" },
  { id: 6, label: "Thời trang, phụ kiện", icon: "👗" },
  { id: 7, label: "Đồ dùng mẹ và bé", icon: "🤱" },
];

const brands = [
  { name: "Bobby", img: "../src/assets/img/bobby.png" },
  { name: "Dielac", img: "../src/assets/img/dielac.png" },
  { name: "Pigeon", img: "../src/assets/img/pigeon.png" },
  { name: "Vinamilk", img: "../src/assets/img/vinamilk.png" },
  { name: "Huggies", img: "../src/assets/img/Huggies.png" },
  { name: "Moony", img: "../src/assets/img/moony.png" },
];

export default function MainMenu() {
  const [hoverId, setHoverId] = useState(null);

  return (
    <div
      style={{
        width: "260px",
        background: "#ddeefd",
        padding: "10px",
        fontFamily: "Arial",
        boxSizing: "border-box",
        marginLeft: "0",
        marginRight: "auto",
        display: "block",
        paddingTop: "30px",
      }}
    >
      {/* Header nguyen */}
      <div
        style={{
          background: "#0084ff",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          fontWeight: "bold",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        <span style={{ marginRight: "10px" }}>☰</span> Danh mục
        <span style={{ marginLeft: "auto" }}>▼</span>
      </div>

      {/* Menu  list nguyen*/}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {menuData.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoverId(item.id)}
            onMouseLeave={() => setHoverId(null)}
            style={{
              background: hoverId === item.id ? "#0074e0" : "#0084ff",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "13px",
              transition: "0.2s",
            }}
          >
            <span style={{ marginRight: "10px" }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            <span>▶</span>
          </div>
        ))}
      </div>

      {/* Box Thương hiệu */}
      <div
        style={{
          background: "#fff",
          marginTop: "15px",
          borderRadius: "15px",
          overflow: "hidden",
          border: "1px solid #cce5ff",
        }}
      >
        <div
          style={{
            background: "#0084ff",
            color: "#fff",
            textAlign: "center",
            padding: "8px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Top thương hiệu
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            padding: "12px",
          }}
        >
          {brands.map((brand, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
                height: "60px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                boxSizing: "border-box",
                background: "#fff",
              }}
            >
              <img
                src={brand.img}
                alt={brand.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Banner Khuyến Mãi*/}
      <div style={{ marginTop: "15px", cursor: "pointer" }}>
        <img
          src="../src/assets/img/banner-menu.jpg"
          alt="Siêu deal banner"
          style={{
            width: "100%",
            borderRadius: "15px",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
