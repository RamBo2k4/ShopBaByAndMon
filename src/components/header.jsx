import { Link, useNavigate } from "react-router-dom"; 
import { useState, useEffect, useRef } from "react";
import NotificationModal from "./NotificationModalwaring"; 
import "../assets/css/header.css";
import bannerImg from "../assets/img/banner.jpg";
import logoImg from "../assets/img/logo_new.png";

function Header({ onOpenLogin, user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0); 
  const [showLoginNotif, setShowLoginNotif] = useState(false);
  
  // States cho tính năng Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Lấy số lượng giỏ hàng
  const fetchCartCount = async () => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser || rawUser === "undefined") {
      setCartCount(0);
      return;
    }
    const loggedInUser = JSON.parse(rawUser);
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${loggedInUser.phone}`);
      if (res.ok) {
        const items = await res.json();
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      }
    } catch (err) {
      console.error("Lỗi lấy giỏ hàng:", err);
    }
  };

  // Logic Tìm kiếm gợi ý (Debounce 300ms)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        try {
          const res = await fetch(`http://localhost:5000/api/products/suggestions?q=${searchTerm.trim()}`);
          if (res.ok) {
            const data = await res.json();
            setSuggestions(data);
            setShowSearchDropdown(true);
          }
        } catch (err) {
          console.error("Lỗi gợi ý:", err);
        }
      } else {
        setSuggestions([]);
        setShowSearchDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    fetchCartCount();
    window.addEventListener("cartUpdated", fetchCartCount);
    
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, [user]);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/cart");
    } else {
      setShowLoginNotif(true);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      e.preventDefault();
      navigate(`/search?q=${searchTerm.trim()}`); 
      setShowSearchDropdown(false);
    }
  };

  const handleLogoutClick = () => {
    onLogout(); 
    localStorage.removeItem("user");
    setShowDropdown(false);
    setCartCount(0); 
    navigate("/");
    window.location.reload(); 
  };

  return (
    <header className="header-wrapper">
      <NotificationModal 
        isOpen={showLoginNotif}
        type="error"
        title="Yêu cầu đăng nhập"
        message="Vui lòng đăng nhập để xem giỏ hàng và thanh toán nhé!"
        actionText="Đăng nhập ngay"
        onClose={() => setShowLoginNotif(false)}
        onAction={() => {
          setShowLoginNotif(false);
          onOpenLogin();
        }}
      />

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

        {/* Ô TÌM KIẾM TỐI GIẢN */}
        <div className="search-box" ref={searchRef}>
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Bạn muốn tìm gì cho bé? (Enter để tìm)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => searchTerm.length >= 2 && setShowSearchDropdown(true)}
            />
            
            {showSearchDropdown && suggestions.length > 0 && (
              <div className="search-results-dropdown">
                {suggestions.map((item) => (
                  <Link 
                    to={`/product/${item.id}`} 
                    key={item.id} 
                    className="search-item-link"
                    onClick={() => {
                      setShowSearchDropdown(false);
                      setSearchTerm("");
                    }}
                  >
                    <img src={item.image} alt="" />
                    <div className="search-item-info">
                      {/* 🎯 ĐỔI TỪ item.name THÀNH item.description */}
                      <p className="search-item-name">{item.description}</p> 
                      <p className="search-item-price">{item.newPrice.toLocaleString()}đ</p>
                    </div>
                  </Link>
                ))}
                <div className="search-view-all" onClick={() => navigate(`/search?q=${searchTerm}`)}>
                   Nhấn Enter để xem tất cả kết quả
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="header-actions">
          <div onClick={handleCartClick} className="nav-link-item" style={{ cursor: "pointer" }}>
            <button style={{ position: "relative" }}>
              <span className="icon"><i className="fi fi-rr-shopping-cart"></i></span>
              <span>Giỏ hàng</span>
              {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
            </button>
          </div>

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
                    <div className="dropdown-item logout-btn" onClick={handleLogoutClick}>
                      Đăng xuất
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="login-trigger-btn" onClick={onOpenLogin}>
                <span className="icon"><i className="fi fi-br-user"></i></span>
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