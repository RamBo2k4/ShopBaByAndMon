import { useRef, useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/home.css";
import { getCollectionProducts } from "../utils/collectionConfig";

const listBanners = [
  "/img/Banner6.png",
  "/img/Banner5.png",
  "/img/Banner7.png",
  "/img/Banner8.png",
];

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: 1, m: 32, s: 54 });

  const scrollRefFlash = useRef(null);
  const scrollRefGifts = useRef(null);
  const scrollRefQuickBuy = useRef(null);
  const scrollRefBrands = useRef(null);
  const scrollRefBestSeller = useRef(null);

  // 1. Logic đếm ngược Flash Sale
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        if (s > 0) s -= 1;
        else if (m > 0) { s = 59; m -= 1; }
        else if (h > 0) { s = 59; m = 59; h -= 1; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Tự động chuyển Banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev === listBanners.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // 3. Lấy dữ liệu sản phẩm
  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  // 4. Hàm cuộn ngang carousel
  const handleScroll = (ref, direction) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  // 5. Lọc sản phẩm theo collection (Dùng useMemo để tối ưu)
  const flashSaleProducts = useMemo(() => getCollectionProducts(products, "flash-deals", 10), [products]);
  const giftProducts = useMemo(() => getCollectionProducts(products, "san-qua-ta-sua", 10), [products]);
  const cheapestProducts = useMemo(() => getCollectionProducts(products, "mua-nhanh-giam-ngay", 10), [products]);
  const brandDeals = useMemo(() => getCollectionProducts(products, "uu-dai-thuong-hieu", 10), [products]);
  const bestSellers = useMemo(() => getCollectionProducts(products, "top-ban-chay", 10), [products]);

  return (
    <div className="home-body">
      {/* SECTION BANNER */}
      <section className="main-banner-container">
        <div className="banner-slider" style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
          {listBanners.map((banner, index) => (
            <img key={index} src={banner} alt="Banner" className="banner-item" />
          ))}
        </div>
        <div className="banner-dots">
          {listBanners.map((_, i) => (
            <div
              key={i}
              className={`dot ${currentIdx === i ? "active" : ""}`}
              onClick={() => setCurrentIdx(i)}
            />
          ))}
        </div>
      </section>

      {/* SECTION FLASH DEALS */}
      <section className="sync-section flash-bg">
        <div className="sync-header-row">
          <div className="header-left-group">
            <h3 className="sync-title white-text">Flash Deals</h3>
            <div className="countdown-timer">
              <span>{String(timeLeft.h).padStart(2, "0")}</span>:
              <span>{String(timeLeft.m).padStart(2, "0")}</span>:
              <span>{String(timeLeft.s).padStart(2, "0")}</span>
            </div>
          </div>
          <Link to="/collection/flash-deals" className="sync-view-all white-text">
            Xem tất cả {">"}
          </Link>
        </div>
        <div className="sync-carousel-wrapper">
          <button className="nav-btn-sync prev flash-nav-btn" onClick={() => handleScroll(scrollRefFlash, "left")}>{"<"}</button>
          <div className="sync-card-list" ref={scrollRefFlash}>
            {flashSaleProducts.map((p) => (
              <div key={`flash-${p.id}`} className="sync-card" onClick={() => navigate(`/product/${p.id}`)}>
                <div className="sync-img-box">
                  <img src={p.image} alt="product" />
                  <span className="sync-badge red-badge">-{p.discount}%</span>
                </div>
                <div className="sync-info">
                  <div className="sync-price-row">
                    <b className="price-now">{p.newPrice?.toLocaleString()}đ</b>
                    <del className="price-old">{p.oldPrice?.toLocaleString()}đ</del>
                  </div>
                  <p className="sync-name">{p.description?.substring(0, 35)}...</p>
                  <div className="sync-progress-box">
                    <div className="sync-progress-bar" style={{ width: "60%" }} />
                    <span className="sync-sold-text">Đã bán {p.sold}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="nav-btn-sync next flash-nav-btn" onClick={() => handleScroll(scrollRefFlash, "right")}>{">"}</button>
        </div>
      </section>

      {/* SECTION SĂN QUÀ TÃ SỮA */}
      <section className="sync-section blue-bg">
        <div className="sync-header-row">
          <h3 className="sync-title blue-text">Săn quà tã sữa</h3>
          <Link to="/collection/san-qua-ta-sua" className="sync-view-all blue-text">Xem tất cả {">"}</Link>
        </div>
        <div className="sync-carousel-wrapper">
          <button className="nav-btn-sync prev" onClick={() => handleScroll(scrollRefGifts, "left")}>{"<"}</button>
          <div className="sync-card-list" ref={scrollRefGifts}>
            {giftProducts.map((p) => (
              <div key={`gift-${p.id}`} className="sync-card" onClick={() => navigate(`/product/${p.id}`)}>
                <div className="sync-img-box">
                  <img src={p.image} alt="product" />
                  <span className="sync-badge green-badge">CÓ QUÀ</span>
                </div>
                <div className="sync-info">
                  <b className="p-price-blue">{p.newPrice?.toLocaleString()}đ</b>
                  <p className="sync-name">{p.description?.substring(0, 35)}...</p>
                  <div className="sync-sub-bottom">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
          <button className="nav-btn-sync next" onClick={() => handleScroll(scrollRefGifts, "right")}>{">"}</button>
        </div>
      </section>

      {/* SECTION MUA NHANH GIẢM NGAY */}
      <section className="sync-section blue-bg">
        <div className="sync-header-row">
          <h3 className="sync-title blue-text">Mua nhanh giảm ngay</h3>
          <Link to="/collection/mua-nhanh-giam-ngay" className="sync-view-all blue-text">Xem tất cả {">"}</Link>
        </div>
        <div className="sync-carousel-wrapper">
          <button className="nav-btn-sync prev" onClick={() => handleScroll(scrollRefQuickBuy, "left")}>{"<"}</button>
          <div className="sync-card-list" ref={scrollRefQuickBuy}>
            {cheapestProducts.map((p) => (
              <div key={`quick-${p.id}`} className="sync-card" onClick={() => navigate(`/product/${p.id}`)}>
                <div className="sync-img-box">
                  <img src={p.image} alt="product" />
                  <span className="sync-badge blue-badge">-{p.discount}%</span>
                </div>
                <div className="sync-info">
                  <b className="p-price-blue">{p.newPrice?.toLocaleString()}đ</b>
                  <p className="sync-name">{p.description?.substring(0, 35)}...</p>
                  <div className="sync-sub-bottom">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
          <button className="nav-btn-sync next" onClick={() => handleScroll(scrollRefQuickBuy, "right")}>{">"}</button>
        </div>
      </section>

      {/* SECTION ƯU ĐÃI THƯƠNG HIỆU */}
      <section className="sync-section blue-bg">
        <div className="sync-header-row">
          <h3 className="sync-title blue-text">Ưu đãi thương hiệu</h3>
          <Link to="/collection/uu-dai-thuong-hieu" className="sync-view-all blue-text">Xem tất cả {">"}</Link>
        </div>
        <div className="sync-carousel-wrapper">
          <button className="nav-btn-sync prev" onClick={() => handleScroll(scrollRefBrands, "left")}>{"<"}</button>
          <div className="sync-card-list" ref={scrollRefBrands}>
            {brandDeals.map((p) => (
              <div key={`brand-${p.id}`} className="sync-card" onClick={() => navigate(`/product/${p.id}`)}>
                <div className="sync-img-box">
                  <img src={p.image} alt="product" />
                  <div className="sync-badge green-badge">{p.discount}% OFF</div>
                </div>
                <div className="sync-info">
                  <b className="p-price-blue" style={{ textAlign: "center", display:'block' }}>Giảm {p.discount}%</b>
                  <p className="sync-name" style={{ textAlign: "center" }}>Sản phẩm chính hãng</p>
                </div>
              </div>
            ))}
          </div>
          <button className="nav-btn-sync next" onClick={() => handleScroll(scrollRefBrands, "right")}>{">"}</button>
        </div>
      </section>

      {/* SECTION TOP BÁN CHẠY */}
      <section className="sync-section pink-bg">
        <div className="sync-header-row">
          <h3 className="sync-title white-text">Top bán chạy</h3>
          <Link to="/collection/top-ban-chay" className="sync-view-all white-text">Xem tất cả {">"}</Link>
        </div>
        <div className="sync-carousel-wrapper">
          <button className="nav-btn-sync prev" onClick={() => handleScroll(scrollRefBestSeller, "left")}>{"<"}</button>
          <div className="sync-card-list" ref={scrollRefBestSeller}>
            {bestSellers.map((p, index) => (
              <div key={`best-${p.id}`} className="sync-card" onClick={() => navigate(`/product/${p.id}`)}>
                <div className="sync-img-box">
                  <img src={p.image} alt="product" />
                  <span className="sync-badge red-badge">Top {index + 1}</span>
                </div>
                <div className="sync-info">
                  <b className="price-now">{p.newPrice?.toLocaleString()}đ</b>
                  <p className="sync-name">{p.description?.substring(0, 35)}...</p>
                  <div className="sync-progress-box" style={{ background: "#f8d7da", height: "14px" }}>
                    <div className="sync-progress-bar" style={{ width: "85%", background: "#2196f3" }} />
                    <span className="sync-sold-text">Sắp cháy hàng</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="nav-btn-sync next" onClick={() => handleScroll(scrollRefBestSeller, "right")}>{">"}</button>
        </div>
      </section>
    </div>
  );
}

export default Home;