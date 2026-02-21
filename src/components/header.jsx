import "./header.css";

function Header() {
  return (
    <header className="header-wrapper">

      <div className="top-banner">
        <a href="#">
          <img
            src="/img/banner.jpg"
            alt="banner"
          />
        </a>
      </div>

      <div className="main-header">
        <div className="logo">
          <img src="/img/logo.jpg" alt="logo" />
        </div>

        <div className="header-actions">
          <button>
            <span className="icon">🏠</span>
            <span>Trang chủ</span>
          </button>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Bạn muốn tìm gì?" />
        </div>

              <div className="header-actions">
                <button>
                  <span className="icon">🛒</span>
                  <span>Giỏ hàng</span>
                </button>

                <button>
                  <span className="icon">🔔</span>
                  <span>Thông báo</span>
                </button>

                <button>
                  <span className="icon">👤</span>
                  <span>Đăng nhập</span>
                </button>
              </div>

      </div>

    </header>
  );
}

export default Header;