import { useState } from "react";

import "./App.css";
import Header from "./components/header";
import MenuMain from "./components/MenuMain";
import Footer from "./components/Footer";
import Sale from "./pages/sale";
import Chinhsach from "./pages/chinhsach";
import FAQ from "./pages/FAQ";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import LoginModal from "./components/LoginModal";
import Notification from "./components/Notification";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const [currentPage, setCurrentPage] = useState("sale");

  // ✅ THÊM: lưu category được chọn từ Menu
  const [selectedCategory, setSelectedCategory] = useState("all");

  const renderPage = () => {
    switch (currentPage) {
      case "thongbao":
        return <Notification />;

      case "cart":
        return <Cart />;

      // ✅ THÊM: bật lại productlist và truyền category
      case "productlist":
        return <ProductList category={selectedCategory} />;

      case "faq":
        return <FAQ />;

      case "chinhsach":
        return <Chinhsach />;

      case "sale":
        return <Sale />;

      // ❌ SỬA: default nên về sale (trước bạn để ProductList là sai logic)
      default:
        return <Sale />;
    }
  };

  return (
    <div className="app">
      <Header
        onOpenLogin={handleOpenLogin}
        user={user}
        onNavigate={setCurrentPage}
      />

      <div className="layout">
        {/* ✅ SỬA: truyền 2 props xuống MenuMain */}
        <MenuMain
          onNavigate={setCurrentPage}
          onSelectCategory={setSelectedCategory}
        />

        <div className="content">{renderPage()}</div>
      </div>

      <Footer onNavigate={setCurrentPage} />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleCloseLogin}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
