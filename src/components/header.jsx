import "../assets/css/header.css";

function Header({ onOpenLogin, user, onNavigate }) {
  return (
    <header className="header-wrapper">
      <div className="top-banner">
        <a href="#">
          <img src="../src/assets/img/banner.jpg" alt="banner" />
        </a>
      </div>

      <div className="main-header">
        <div className="logo">
          <img src="../src/assets/img/logo.jpg" alt="logo" />
        </div>

        <div className="header-actions">
          <button className="btn-home" onClick={() => onNavigate("sale")}>
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
          <button onClick={() => onNavigate("cart")}>
            <span className="icon">
              <i className="fi fi-rr-shopping-cart"></i>
            </span>
            <span>Giỏ hàng</span>
          </button>

          <button onClick={() => onNavigate("thongbao")}>
            <span className="icon">
              <i className="fi fi-rr-bell"></i>
            </span>
            <span>Thông báo</span>
          </button>

          <button onClick={onOpenLogin}>
            <span className="icon">
              <i className="fi fi-br-user"></i>
            </span>
            <span>{user ? user.name : "Đăng nhập"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
