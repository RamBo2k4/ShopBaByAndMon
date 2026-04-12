import "../assets/css/header.css";
import bannerImg from "../assets/img/banner.jpg";
import logoImg from "../assets/img/logo.jpg";
import { Link, useNavigate } from 'react-router-dom';
function Header({ onOpenLogin, user, onNavigate }) {
  const navigate = useNavigate();
  return (
    <header className="header-wrapper">
      <div className="top-banner">
        <Link to="/">
          <img src={bannerImg} alt="banner" />
        </Link>
      </div>

      <div className="main-header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logoImg} alt="logo" />
        </div>

        <div className="header-actions">
          <button className="btn-home" onClick={() => navigate('home')}>
            <span className="icon">
              <i className="fi fi-rs-house-chimney"></i>
            </span>
            <span>Trang chủ</span>
          </button>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Bạn muốn tìm gì?" />
        </div>

        <div className="header-actions">
          <button onClick={() => navigate('cart')}>
            <span className="icon">🛒</span>
            <span>Giỏ hàng</span>
          </button>

          <button onClick={() => navigate('thongbao')}>
            <span className="icon">🔔</span>
            <span>Thông báo</span>
          </button>

          <button onClick={onOpenLogin}>
            <span className="icon">👤</span>
            <span>{user ? user.name : "Đăng nhập"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;