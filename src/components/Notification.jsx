import "../assets/css/notification.css";
import { useState } from "react";

const data = [
    { id: 1, title: "Đơn hàng #123 đã được xác nhận", desc: "Shop đang chuẩn bị hàng cho bạn", time: "2 phút trước", type: "order", isRead: false },
    { id: 2, title: "Đơn hàng #124 đang được giao", desc: "Shipper đang trên đường đến bạn", time: "10 phút trước", type: "order", isRead: false },
    { id: 3, title: "Đơn hàng #120 đã giao thành công", desc: "Cảm ơn bạn đã mua hàng", time: "1 giờ trước", type: "order", isRead: true },
    { id: 4, title: "Voucher giảm 50k", desc: "Áp dụng cho đơn từ 300k", time: "30 phút trước", type: "sale", isRead: false },
    { id: 5, title: "Flash Sale 40%", desc: "Nhiều sản phẩm mẹ & bé đang giảm mạnh", time: "2 giờ trước", type: "sale", isRead: true },
    { id: 6, title: "Freeship toàn quốc", desc: "Áp dụng cho đơn từ 199k", time: "Hôm nay", type: "sale", isRead: false },
    { id: 7, title: "Cập nhật hệ thống", desc: "Chúng tôi đã nâng cấp trải nghiệm người dùng", time: "Hôm qua", type: "system", isRead: true },
    { id: 8, title: "Bảo trì hệ thống", desc: "Hệ thống sẽ bảo trì từ 2h - 4h sáng", time: "2 ngày trước", type: "system", isRead: true },
    { id: 9, title: "Tài khoản của bạn đã được cập nhật", desc: "Thông tin cá nhân đã được lưu thành công", time: "3 ngày trước", type: "system", isRead: false },
];

const Notification = () => {
    const [tab, setTab] = useState("all");

    const filterData = tab === "all" ? data : data.filter((item) => item.type === tab);

    const getIcon = (type) => {
        if (type === "order") return "🛒";
        if (type === "sale") return "🔥";
        return "🔔";
    };

    return (
        <div className="noti-container">
            {/* Header Tabs */}
            <div className="tabs">
                <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>Hoạt động</button>
                <button className={tab === "order" ? "active" : ""} onClick={() => setTab("order")}>Đơn hàng</button>
                <button className={tab === "sale" ? "active" : ""} onClick={() => setTab("sale")}>Ưu đãi</button>
            </div>

            {/* List thông báo */}
            <div className="noti-list">
                {filterData.map((item) => (
                    <div key={item.id} className={`noti-item ${item.isRead ? "read" : "unread"}`}>
                        <div className="noti-left-group">
                            <div className="icon-circle">
                                {getIcon(item.type)}
                            </div>
                            <div className="content">
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                                <span className="time">{item.time}</span>
                            </div>
                        </div>

                        {!item.isRead && <span className="blue-status-dot"></span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;