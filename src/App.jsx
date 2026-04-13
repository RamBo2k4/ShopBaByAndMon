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
import Home from "./components/Home";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("sale");

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };
  const [selectedCategory, setSelectedCategory] = useState("all");

  // thêm state hover tạm
  const [previewCategory, setPreviewCategory] = useState(null);

  const renderPage = () => {
    // nếu đang hover menu thì hiện ProductList tạm
    if (previewCategory) {
      return <ProductList category={previewCategory} />;
    }

    switch (currentPage) {
      case "thongbao":
        return <Notification />;

      case "cart":
        return <Cart />;

      case "productlist":
        return <ProductList category={selectedCategory} />;

      case "faq":
        return <FAQ />;

      case "chinhsach":
        return <Chinhsach />;

      case "chu":
        return <Home />;

      case "sale":
        return <Sale />;

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
        onLogout={handleLogout}
      />

      <div className="layout">
        <MenuMain
          onNavigate={setCurrentPage}
          onSelectCategory={setSelectedCategory}
          onPreviewCategory={setPreviewCategory}
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
