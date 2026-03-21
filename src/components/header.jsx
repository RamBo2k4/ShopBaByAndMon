import "../assets/css/header.css";

function Header() {
  return (
    <header className="header-wrapper">
      <div className="top-banner">
        <a href="https://concung.com/" target="_blank">
          <img src="../src/assets/img/banner.jpg" alt="banner" />
        </a>
      </div>

      <div className="main-header">
        <div className="logo">
          <img src="../src/assets//img/sanpham_card.jpg" alt="logo" />
        </div>

        <div className="header-actions">
          <button className="btn-home">
            <span className="icon">
              <i class="fi fi-rs-house-chimney"></i>
            </span>
            <span>Trang chủ</span>
          </button>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Bạn muốn tìm gì?" />
        </div>

        <div className="header-actions">
          <button>
            <span className="icon">
              <i class="fi fi-rr-shopping-cart"></i>
            </span>
            <span>Giỏ hàng</span>
          </button>

          <button>
            <span className="icon">
              <i class="fi fi-rr-bell"></i>
            </span>
            <span>Thông báo</span>
          </button>

          <button>
            <span className="icon">
              <i class="fi fi-br-user"></i>
            </span>
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
