import React, { useRef } from 'react';
import '../assets/css/home.css';

const HomeContent = () => {

    const scrollRef = useRef(null);


    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            if (direction === 'left') {
                scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="home-body">
            {/* 1. Banner Khuyến Mãi Lớn */}
            <div className="main-banner">
                {/* Thay đường dẫn ảnh  */}
                <img src="/assets/img/banner_sale_1.jpg" alt="Mẹ săn deal đỉnh" />
            </div>

            {/* 2. Phần Top Sản Phẩm Ưu Đãi */}
            <div className="top-deals-section">
                <h3 className="section-title">TOP CÁC SẢN PHẨM ĐANG CÓ ƯU ĐÃI LỚN</h3>
                <div className="carousel-container">
                    <button className="nav-btn prev" onClick={() => handleScroll('left')}>❮</button>

                    {/* Danh sách mini-card */}
                    <div className="mini-card-list" ref={scrollRef}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <div key={i} className="mini-card-placeholder">
                                <div className="img-temp">
                                    <img src="/assets/img/bobby-icon.png" alt="Tã" />
                                </div>
                                <p>Tã Bobby {i}</p>
                                <span>Giảm tới 35%...</span>
                            </div>
                        ))}
                    </div>

                    <button className="nav-btn next" onClick={() => handleScroll('right')}>❯</button>
                </div>
            </div>

            {/* 3. Lưới Sản Phẩm Chính  */}
            <div className="main-product-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="product-card-slot">
                        <div className="empty-card">
                            <div className="image-placeholder">Card của Nhã</div>
                            <div className="info-placeholder">
                                <div className="line-1"></div>
                                <div className="line-2"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeContent;