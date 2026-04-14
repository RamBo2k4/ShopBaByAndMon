import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Header from "./components/header";
import MenuMain from "./components/MenuMain";
import Footer from "./components/Footer";
import Sale from "./pages/sale";
import Chinhsach from "./pages/chinhsach";
import FAQ from "./pages/FAQ";
import Cart from "./pages/Cart";
import ProductList_nha from "./pages/ProductList";
import ProductList_nam from "./components/ProductList";
import ProductDetail from "./pages/ProductDetail"; // 👉 Bước 1: Import trang chi tiết
import LoginModal from "./components/LoginModal";
import Notification from "./components/Notification";
import Home from "./components/Home";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // 1. Khởi tạo: Đọc nhanh từ localStorage để có _id thực hiện fetch dữ liệu
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return (saved && saved !== "undefined") ? JSON.parse(saved) : null;
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewCategory, setPreviewCategory] = useState(null);

  // 2. Hiệu ứng đồng bộ với MongoDB khi load trang
  useEffect(() => {
    const syncUserWithDB = async () => {
      // Chỉ fetch nếu user đã đăng nhập và có _id trong localStorage
      if (user && user._id) {
        try {
          const res = await fetch(`http://localhost:5000/api/users/${user._id}`);
          if (res.ok) {
            const freshUserData = await res.json();
            // Cập nhật lại State và LocalStorage với dữ liệu mới nhất từ MongoDB
            setUser(freshUserData);
            localStorage.setItem("user", JSON.stringify(freshUserData));
            console.log("✅ Đã đồng bộ dữ liệu User từ MongoDB");
          }
        } catch (err) {
          console.error("❌ Lỗi đồng bộ User:", err);
        }
      }
    };

    syncUserWithDB();
  }, []); 

  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);

  const handleLogin = (userData) => {
    // Lưu user có kèm _id từ server trả về
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <Header
          onOpenLogin={handleOpenLogin}
          user={user}
          onLogout={handleLogout}
        />

        <div className="layout">
          <MenuMain
            onSelectCategory={setSelectedCategory}
            onPreviewCategory={setPreviewCategory}
          />

          <div className="content">
            <Routes>
              {/* Trang chủ */}
              <Route path="/" element={<Home />} />
              <Route path="/chu" element={<Home />} />
              
              {/* Trang khuyến mãi & Thông báo */}
              <Route path="/sale" element={<Sale />} />
              <Route path="/thongbao" element={<Notification />} />
              
              <Route path="/search" element={<ProductList_nha />} />
              {/* Trang danh sách sản phẩm theo danh mục (slug) */}
              <Route path="/collection/:slug" element={<ProductList_nha />} /> 
              <Route path="/special/:slug" element={<ProductList_nam />} />
              
              {/* 👉 Bước 2: Route chi tiết sản phẩm (Dùng tham số :id) */}
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* Giỏ hàng */}
              <Route path="/cart" element={<Cart />} />
              {/* Sale & Thông báo */}
              <Route path="/sale" element={<Sale onOpenLogin={handleOpenLogin} />} />
              
              {/* Chính sách & FAQ */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/chinhsach" element={<Chinhsach />} />
              
              {/* Nếu link sai, tự động về trang Sale */}
              <Route path="*" element={<Navigate to="/thongbao" />} />
            </Routes>
          </div>
        </div>

        <Footer />

        <LoginModal
          isOpen={isLoginOpen}
          onClose={handleCloseLogin}
          onLogin={handleLogin}
        />
      </div>
    </Router>
  );
}

export default App;