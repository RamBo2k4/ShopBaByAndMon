import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Voucher from "../components/voucher";

// Import hình ảnh tài nguyên
import bannerImg from "../assets/img/banner_sale.jpg";
import logoImg from "../assets/img/logo.jpg";

/**
 * COMPONENT: Sale (Trang khuyến mãi)
 * Chức năng: Hiển thị danh sách Voucher và cho phép người dùng thu thập mã vào tài khoản.
 */
function Sale() {
  const navigate = useNavigate();

  // --- QUẢN LÝ STATE ---
  const [vouchers, setVouchers] = useState([]);       // Danh sách tất cả voucher hệ thống
  const [savedVouchers, setSavedVouchers] = useState([]); // Danh sách mã code user đã lưu
  const [loading, setLoading] = useState(true);        // Trạng thái chờ tải dữ liệu
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

  // --- FETCH DATA (Lấy dữ liệu khi vào trang) ---
  useEffect(() => {
    // Lấy thông tin user từ localStorage để kiểm tra đăng nhập
    const user = JSON.parse(localStorage.getItem("user"));
    
    const fetchData = async () => {
      try {
        // 1. Lấy tất cả Voucher hiện có trong database để hiển thị lên màn hình
        const vRes = await fetch("http://localhost:5000/testDB/vourcher");
        const vData = await vRes.json();
        setVouchers(vData);

        // 2. Nếu đã đăng nhập, lấy danh sách mã voucher user NÀY đã lưu trong DB
        if (user && user._id) {
          setIsLoggedIn(true);
          const savedRes = await fetch(`http://localhost:5000/api/users/saved-vouchers/${user._id}`);
          
          if (savedRes.ok) {
            const savedData = await savedRes.json(); 
            setSavedVouchers(savedData); // Ví dụ: ["WELCOME10", "MILK20K"]
            
            // Cập nhật lại localStorage để các trang khác (như Giỏ hàng) dùng được ngay
            localStorage.setItem("savedVouchers", JSON.stringify(savedData));
          }
        }
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu từ Server:", err);
      } finally {
        setLoading(false); // Tắt màn hình chờ
      }
    };

    fetchData();
  }, []);

  // --- XỬ LÝ LƯU VOUCHER ---
  const handleSaveVoucher = async (code) => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Kiểm tra đăng nhập trước khi cho phép lưu
    if (!user || !user._id) {
      alert("⚠️ Bạn cần đăng nhập để thu thập mã giảm giá!");
      return;
    }

    try {
      // Gửi yêu cầu lưu mã lên Server
      const response = await fetch("http://localhost:5000/api/users/save-voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: user._id, 
          voucherCode: code 
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("🎉 Đã thêm vào túi voucher thành công!");
        
        // Cập nhật State tại chỗ để nút bấm đổi trạng thái "Đã thu thập" ngay lập tức
        const newSavedList = [...savedVouchers, code];
        setSavedVouchers(newSavedList);
        
        // Đồng bộ vào localStorage
        localStorage.setItem("savedVouchers", JSON.stringify(newSavedList));
      } else {
        alert(data.message || "Không thể lưu mã.");
      }
    } catch (err) {
      console.error("❌ Lỗi kết nối Server:", err);
      alert("Lỗi kết nối, vui lòng thử lại sau!");
    }
  };

  // --- GIAO DIỆN CHỜ ---
  if (loading) {
    return (
      <div style={{ padding: "100px", textAlign: "center", fontSize: "18px", color: "#666" }}>
        🚀 Đang tải khuyến mãi hấp dẫn...
      </div>
    );
  }

  // --- GIAO DIỆN CHÍNH ---
  return (
    <section style={{ padding: "20px 40px", background: "#f8fbff", minHeight: "100vh" }}>
      {/* Banner Khuyến mãi */}
      <img 
        src={bannerImg} 
        alt="Banner Sale" 
        style={{ 
          width: "100%", 
          aspectRatio: "400/168", 
          objectFit: "cover", 
          borderRadius: "20px", 
          marginBottom: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }} 
      />

      {/* Tiêu đề trang */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#333", borderLeft: "5px solid #339BE5", paddingLeft: "15px", margin: 0 }}>
          Mã Giảm Giá Độc Quyền
        </h2>
        {!isLoggedIn && (
          <span style={{ color: "#ff4d4d", fontSize: "14px", fontWeight: "bold" }}>
            * Đăng nhập để lưu mã vào ví của bạn
          </span>
        )}
      </div>

      {/* Danh sách Voucher Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", 
        gap: "25px" 
      }}>
        {vouchers.length > 0 ? (
          vouchers.map((v) => (
            <Voucher
              key={v._id}
              data={{ ...v, img: v.img || logoImg }}
              mainColor="#339BE5"
              // Kiểm tra xem mã code này đã nằm trong danh sách ĐÃ LƯU chưa
              isSaved={savedVouchers.includes(v.code)}
              onSave={handleSaveVoucher}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1/-1", color: "#999" }}>
            Hiện tại chưa có mã giảm giá nào mới.
          </p>
        )}
      </div>
    </section>
  );
}

export default Sale;