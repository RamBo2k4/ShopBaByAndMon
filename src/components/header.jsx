import "../assets/css/header.css";
import bannerImg from "../assets/img/banner.jpg";
import logoImg from "../assets/img/logo.jpg";

function Header({ onOpenLogin, user, onNavigate }) {
  return (
    <header className="header-wrapper">
      <div className="top-banner">
        <a href="#">
          <img src={bannerImg} alt="banner" />
        </a>
      </div>

      <div className="main-header">
        <div className="logo" onClick={() => onNavigate('sale')} style={{cursor: 'pointer'}}>
          <img src={logoImg} alt="logo" />
        </div>

        <div className="header-actions">
          <button className="btn-home" onClick={() => onNavigate('sale')}>
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
          <button onClick={() => onNavigate('cart')}>
            <span className="icon">🛒</span>
            <span>Giỏ hàng</span>
          </button>

          <button onClick={() => onNavigate('thongbao')}>
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