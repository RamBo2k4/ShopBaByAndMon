import { Link, useNavigate } from "react-router-dom"; 
import { useState, useEffect, useRef } from "react";
import "../assets/css/header.css";
import bannerImg from "../assets/img/banner.jpg";
import logoImg from "../assets/img/logo_new.png";

function Header({ onOpenLogin, user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hàm Logout chuẩn: Xóa dữ liệu và Refresh trang
  const handleLogoutClick = () => {
    onLogout(); 
    localStorage.removeItem("user");
    setShowDropdown(false);
    navigate("/");
    window.location.reload(); // Xóa sạch state giỏ hàng cũ trong RAM
  };

  return (
    <header className="header-wrapper">
      <div className="top-banner">
        <Link to="/"><img src={bannerImg} alt="banner" /></Link>
      </div>

      <div className="main-header">
        <Link to="/" className="logo">
          <img src={logoImg} alt="logo" />
        </Link>

        <div className="header-actions">
          <Link to="/" className="nav-link-item">
            <button className="btn-home">
              <span className="icon"><i className="fi fi-rs-house-chimney"></i></span>
              <span>Trang chủ</span>
            </button>
          </Link>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Bạn muốn tìm gì?" />
        </div>

        <div className="header-actions">
          <Link to="/cart" className="nav-link-item">
            <button>
              <span className="icon"><i className="fi fi-rr-shopping-cart"></i></span>
              <span>Giỏ hàng</span>
            </button>
          </Link>

          <Link to="/thongbao" className="nav-link-item">
            <button>
              <span className="icon"><i className="fi fi-rr-bell"></i></span>
              <span>Thông báo</span>
            </button>
          </Link>

          <div className="user-menu-container" ref={dropdownRef}>
            {user ? (
              <div className="user-logged-in">
                <button className="user-info-btn" onClick={() => setShowDropdown(!showDropdown)}>
                  <span className="icon"><i className="fi fi-br-user"></i></span>
                  <span className="user-name">{user.fullName}</span>
                </button>
                
                {showDropdown && (
                  <div className="dropdown-content">
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                       Tài khoản của tôi
                    </Link>
                    <div className="dropdown-divider"></div>
                    <div 
                      style={{ color: "red", cursor: "pointer" }} 
                      className="dropdown-item logout-btn" 
                      onClick={handleLogoutClick}
                    >
                      Đăng xuất
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="login-trigger-btn" onClick={onOpenLogin}>
                <span className="icon">👤</span>
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;