import { useState } from "react";

import "./App.css";
import Header from "./components/header";
import MenuMain from "./components/MenuMain";
import Footer from "./components/Footer";
import Sale from "./pages/sale";
import Chinhsach from "./pages/chinhsach";
import FAQ from "./pages/FAQ";
import Cart from "./pages/Cart";
import LoginModal from "./components/LoginModal";
import Notification from "./components/Notification";
import ProductDetail from "./pages/ProductDetail";

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

  const renderPage = () => {
    switch (currentPage) {
      case "thongbao":
        return <Notification />;
      case "cart":
        return <Cart />;
      case "faq":
        return <FAQ />;
      case "chu":
        return <ProductDetail />;
      case "chinhsach":
        return <Chinhsach />;
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
        <MenuMain />
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