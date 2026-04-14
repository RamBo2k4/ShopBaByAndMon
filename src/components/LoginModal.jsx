import { useState } from "react";
import loginImg from "../assets/img/login.jpg";
import "../assets/css/loginModal.css";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API = "http://localhost:5000";

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ fullName: "", phone: "", password: "", confirmPassword: "" });
    setError("");
    setSuccess("");
  };

  const switchMode = () => {
    setIsRegisterMode((prev) => !prev);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.phone || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const endpoint = isRegisterMode ? "/register" : "/login";
    const body = isRegisterMode 
      ? { fullName: formData.fullName, phone: formData.phone, password: formData.password }
      : { phone: formData.phone, password: formData.password };

    try {
      console.log(`--- Đang thực hiện ${isRegisterMode ? "Đăng ký" : "Đăng nhập"} ---`);
      
      const res = await fetch(API + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!data.success) {
        console.error("❌ Thất bại:", data.message);
        setError(data.message);
        return;
      }

      if (isRegisterMode) {
        console.log("✅ Đăng ký thành công!");
        setSuccess("Đăng kí thành công! Hãy đăng nhập.");
        setIsRegisterMode(false);
      } else {
        // --- ĐOẠN LOG KIỂM TRA ID QUAN TRỌNG ---
        console.log("✅ Đăng nhập thành công!");
        console.log("📦 Dữ liệu User trả về từ Server:", data.user);
        
        if (data.user && data.user._id) {
          console.log("🆔 Tìm thấy ID người dùng:", data.user._id);
          // Lưu vào localStorage để các trang khác (như Cart/Sale) sử dụng
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          console.warn("⚠️ Cảnh báo: Server trả về user nhưng KHÔNG CÓ trường _id!");
        }
        
        onLogin(data.user);
        onClose();
        resetForm();
      }
    } catch (err) {
      console.error("💥 Lỗi kết nối:", err);
      setError("Lỗi kết nối đến server.");
    }
  };

  return (
    <div className="login-modal-overlay" onClick={(e) => e.target.className === "login-modal-overlay" && onClose()}>
      <div className="login-modal-box">
        <button className="login-close-btn" onClick={onClose}>×</button>
        <div className="login-left">
          <img src={loginImg} alt="login" className="login-image" />
        </div>
        <div className="login-right">
          <h2>{isRegisterMode ? "Đăng kí" : "Đăng nhập"}</h2>
          <form onSubmit={handleSubmit} className="login-form">
            {isRegisterMode && (
              <input type="text" name="fullName" placeholder="Họ tên" value={formData.fullName} onChange={handleChange} />
            )}
            <input type="text" name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
            <input type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} />
            {isRegisterMode && (
              <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu" value={formData.confirmPassword} onChange={handleChange} />
            )}
            {error && <p className="login-error">{error}</p>}
            {success && <p className="login-success">{success}</p>}
            <button type="submit" className="login-submit-btn">
              {isRegisterMode ? "Đăng kí" : "Đăng nhập"}
            </button>
            <p className="register-text">
              {isRegisterMode ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
              <span onClick={switchMode} style={{cursor: "pointer", color: "blue"}}>
                {isRegisterMode ? "Đăng nhập" : "Đăng kí"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;