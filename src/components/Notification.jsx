import { useEffect, useState } from "react";
import "../assets/css/notification.css";

const Notification = () => {
    const [notifications, setNotifications] = useState([]); 
    const [tab, setTab] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            try {
                const res = await fetch(`http://localhost:5000/api/notifications/${user.phone}`);
                if (res.ok) {
                    const data = await res.json();
                    setNotifications(data);
                }
            } catch (err) {
                console.error("Lỗi lấy thông báo:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const filterData = tab === "all" ? notifications : notifications.filter((item) => item.type === tab);

    const getIcon = (type) => {
        if (type === "order") return "🛒";
        if (type === "sale") return "🔥";
        return "🔔";
    };

    // Hàm xử lý đánh dấu đã đọc
    const handleMarkAsRead = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/notifications/read/${id}`, {
                method: "PUT",
            });

            if (res.ok) {
                // Cập nhật State cục bộ ngay lập tức để UI thay đổi (mất chấm xanh)
                setNotifications((prev) =>
                    prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
                );
            }
        } catch (err) {
            console.error("Lỗi khi đánh dấu đã đọc:", err);
        }
    };

    if (loading) return <div style={{textAlign: "center", padding: "50px"}}>Đang tải thông báo...</div>;

    return (
        <div className="noti-container">
            <div className="tabs">
                <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>Hoạt động</button>
                <button className={tab === "order" ? "active" : ""} onClick={() => setTab("order")}>Đơn hàng</button>
                <button className={tab === "sale" ? "active" : ""} onClick={() => setTab("sale")}>Ưu đãi</button>
            </div>

            <div className="noti-list">
                {filterData.length > 0 ? filterData.map((item) => (
                    <div 
                        key={item._id} 
                        // Thêm class dựa trên trạng thái isRead
                        className={`noti-item ${item.isRead ? "read" : "unread"}`}
                        // 👉 BƯỚC QUAN TRỌNG: Gắn sự kiện Click ở đây
                        onClick={() => !item.isRead && handleMarkAsRead(item._id)}
                        style={{ cursor: item.isRead ? "default" : "pointer" }}
                    >
                        <div className="noti-left-group">
                            <div className="icon-circle">{getIcon(item.type)}</div>
                            <div className="content">
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                                <span className="time">{new Date(item.createdAt).toLocaleString('vi-VN')}</span>
                            </div>
                        </div>
                        {/* Hiển thị chấm xanh nếu chưa đọc */}
                        {!item.isRead && <span className="blue-status-dot"></span>}
                    </div>
                )) : (
                    <p style={{textAlign: "center", padding: "20px", color: "#999"}}>Không có thông báo nào.</p>
                )}
            </div>
        </div>
    );
};

export default Notification;