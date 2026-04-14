import React from "react";

function Voucher({ data, mainColor, isSaved, onSave }) {
  const progressPercent = data.type === "percent" ? data.value : 50;

  return (
    <div style={{
      display: "flex",
      width: "100%",
      border: `2px solid ${mainColor}`,
      borderRadius: "12px",
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
    }}>
      {/* Cột trái: Ảnh logo */}
      <div style={{
        width: "110px",
        background: "#f0f8ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px"
      }}>
        <img 
          src={data.img} 
          alt="Brand" 
          style={{ 
            width: "70px", 
            height: "70px", 
            borderRadius: "50%", 
            objectFit: "contain", 
            border: "1px solid #eee", 
            background: "#fff" 
          }}
          // Fix lỗi nếu link ảnh die
          onError={(e) => { e.target.src = "https://via.placeholder.com/80"; }}
        />
      </div>

      {/* Cột phải: Thông tin */}
      <div style={{ flex: 1, padding: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h4 style={{ color: mainColor, margin: "0 0 5px 0", fontSize: "16px" }}>{data.title}</h4>
          <p style={{ margin: "0", fontSize: "13px", color: "#555" }}>
            Đơn tối thiểu: <b>{data.minOrder?.toLocaleString()}đ</b>
          </p>
        </div>

        {/* Thanh Progress */}
        <div style={{ height: "6px", background: "#eee", borderRadius: "5px", margin: "12px 0" }}>
          <div style={{ width: `${progressPercent}%`, height: "100%", background: mainColor, borderRadius: "5px", transition: "width 0.5s" }}></div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "11px", color: "#999" }}>Mã: <b>{data.code}</b></span>
            <span style={{ fontSize: "11px", color: "#ff4d4d" }}>Hết hạn: {data.expire}</span>
          </div>

          <button 
            style={{ 
              background: isSaved ? "#bdc3c7" : mainColor, 
              color: "#fff", 
              border: "none", 
              padding: "7px 18px", 
              borderRadius: "20px",
              cursor: isSaved ? "default" : "pointer",
              fontWeight: "600",
              fontSize: "13px"
            }}
            onClick={() => !isSaved && onSave(data.code)}
            disabled={isSaved}
          >
            {isSaved ? "Đã lưu" : "Lưu mã"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Voucher;