import { useState } from "react";
import loginImg from "../assets/img/login.jpg";
import "../assets/css/loginModal.css";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");
  };

  const switchMode = () => {
    setIsRegisterMode((prev) => !prev);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.phone.trim() || !formData.password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (isRegisterMode) {
      if (!formData.confirmPassword.trim()) {
        setError("Vui lòng nhập lại mật khẩu.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu nhập lại không khớp.");
        return;
      }

      setSuccess("Đăng kí thành công giả lập. Bạn có thể đăng nhập.");
      setIsRegisterMode(false);
      setFormData({
        phone: formData.phone,
        password: "",
        confirmPassword: "",
      });
      return;
    }

    if (formData.phone === "0123456789" && formData.password === "123456") {
      setSuccess("");
      onLogin({ phone: formData.phone });
      onClose();
      resetForm();
    } else {
      setError("Sai số điện thoại hoặc mật khẩu.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "login-modal-overlay") {
      onClose();
      resetForm();
      setIsRegisterMode(false);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal-box">
         <button className="login-close-btn" onClick={onClose}>
        ×
      </button>

        <div className="login-left">
          <img src={loginImg} alt="login" className="login-image" />
        </div>

        <div className="login-right">
          <h2>{isRegisterMode ? "Đăng kí" : "Đăng nhập"}</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Mật khẩu:</label>
            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />

            {isRegisterMode && (
              <>
                <label>Nhập lại mật khẩu:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </>
            )}

            {!isRegisterMode && (
              <p className="forgot-text">Quên mật khẩu?</p>
            )}

            {error && <p className="login-error">{error}</p>}
            {success && <p className="login-success">{success}</p>}

            <button type="submit" className="login-submit-btn">
              {isRegisterMode ? "Đăng kí" : "Đăng nhập"}
            </button>

            <p className="register-text">
              {isRegisterMode ? "Bạn đã có tài khoản?" : "Bạn chưa có tài khoản?"}{" "}
              <span onClick={switchMode}>
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