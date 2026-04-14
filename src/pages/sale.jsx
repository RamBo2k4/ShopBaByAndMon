import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Voucher from "../components/voucher";
import NotificationModal from "../components/NotificationModal"; // 1. Import Modal

import bannerImg from "../assets/img/banner_sale.jpg";
import logoImg from "../assets/img/logo.jpg";

// Thêm prop onOpenLogin vào function
function Sale({ onOpenLogin }) {
  const navigate = useNavigate();

  const [vouchers, setVouchers] = useState([]);
  const [savedVouchers, setSavedVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2. State quản lý thông báo
  const [notif, setNotif] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    actionType: null // Để phân biệt nhấn action thì đi đâu
  });

  const closeNotif = () => {
    setNotif({ ...notif, isOpen: false });
    // Nếu là lỗi chưa đăng nhập, sau khi đóng thông báo thì mở Modal đăng nhập
    if (notif.actionType === "NEED_LOGIN") {
      onOpenLogin();
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      try {
        const vRes = await fetch("http://localhost:5000/testDB/vourcher");
        const vData = await vRes.json();
        setVouchers(vData);

        if (user && user._id) {
          setIsLoggedIn(true);
          const savedRes = await fetch(`http://localhost:5000/api/users/saved-vouchers/${user._id}`);
          if (savedRes.ok) {
            const savedData = await savedRes.json(); 
            setSavedVouchers(savedData);
            localStorage.setItem("savedVouchers", JSON.stringify(savedData));
          }
        }
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveVoucher = async (code) => {
    const user = JSON.parse(localStorage.getItem("user"));

    // 3. Thay alert bằng NotificationModal cho trường hợp chưa đăng nhập
    if (!user || !user._id) {
      setNotif({
        isOpen: true,
        type: "error",
        title: "Chưa đăng nhập",
        message: "Bạn cần đăng nhập để lưu mã giảm giá vào ví nhé!",
        actionType: "NEED_LOGIN"
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/save-voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, voucherCode: code }),
      });

      const data = await response.json();

      if (data.success) {
        // 4. Thông báo thành công xịn xò
        setNotif({
          isOpen: true,
          type: "success",
          title: "Thành công!",
          message: `Mã ${code} đã được lưu vào ví của bạn.`,
          actionType: "GO_TO_CART"
        });
        
        const newSavedList = [...savedVouchers, code];
        setSavedVouchers(newSavedList);
        localStorage.setItem("savedVouchers", JSON.stringify(newSavedList));
      }
    } catch (err) {
      setNotif({
        isOpen: true,
        type: "error",
        title: "Lỗi kết nối",
        message: "Không thể kết nối đến máy chủ, vui lòng thử lại.",
        actionType: null
      });
    }
  };
  

  if (loading) return <div className="loading-state">🚀 Đang tải khuyến mãi...</div>;

  return (
    <section style={{ padding: "20px 40px", background: "#f8fbff", minHeight: "100vh" }}>
      {/* 5. ĐẶT COMPONENT THÔNG BÁO Ở ĐÂY */}
      <NotificationModal 
        isOpen={notif.isOpen}
        type={notif.type}
        title={notif.title}
        message={notif.message}
        onClose={closeNotif}
        // Nếu thành công thì cho nút đi tới giỏ hàng, nếu lỗi chưa đăng nhập thì hiện nút Đăng nhập
        onAction={notif.actionType === "GO_TO_CART" ? () => navigate("/cart") : null}
      />

      <img src={bannerImg} alt="Banner" style={{ width: "100%", borderRadius: "20px", marginBottom: "30px" }} />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ borderLeft: "5px solid #339BE5", paddingLeft: "15px", color:"black" }}>Mã Giảm Giá Độc Quyền</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "25px" }}>
        {vouchers.map((v) => (
          <Voucher
            key={v._id}
            data={{ ...v, img: v.img || logoImg }}
            mainColor="#339BE5"
            isSaved={savedVouchers.includes(v.code)}
            onSave={handleSaveVoucher}
          />
        ))}
      </div>
    </section>
  );
}

export default Sale;