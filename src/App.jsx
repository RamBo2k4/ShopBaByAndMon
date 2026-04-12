import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/header'
import MenuMain from './components/MenuMain'
import Footer from './components/Footer'
import Sale from './pages/sale'
import Chinhsach from './pages/chinhsach'
import FAQ from './pages/FAQ'
import Cart from "./pages/Cart"
import ProductList from "./components/ProductList"
import ProductDetail from "./pages/ProductDetail"
import LoginModal from "./components/LoginModal"
import Notification from "./components/Notification"
import Home from './components/Home';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);
  const handleLogin = (userData) => setUser(userData);

  return (
    <Router> {/* Bọc toàn bộ ứng dụng trong Router */}
      <div className="app">
        {/* Header thường chứa các Link điều hướng */}
        <Header onOpenLogin={handleOpenLogin} user={user} />

        <div className="layout">
          <MenuMain />

          <div className="content">
            {/* Thay thế hàm renderPage() bằng Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/thongbao" element={<Notification />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/collection/:type" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/chinhsach" element={<Chinhsach />} />
              <Route path="/sale" element={<Sale />} />
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
