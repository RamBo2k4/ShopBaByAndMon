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

  const loginUser = async (phone, password) => {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });
    return await res.json();
  };

  const registerUser = async (fullName, phone, password) => {
    const res = await fetch(API + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, phone, password }),
    });
    return await res.json();
  };

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
      fullName: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.phone || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (isRegisterMode) {
      if (!formData.fullName) {
        setError("Vui lòng nhập họ tên.");
        return;
      }

      if (!formData.confirmPassword) {
        setError("Vui lòng nhập lại mật khẩu.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu không khớp.");
        return;
      }

      const res = await registerUser(
        formData.fullName,
        formData.phone,
        formData.password
      );

      if (!res.success) {
        setError(res.message);
        return;
      }

      setSuccess("Đăng kí thành công");
      setIsRegisterMode(false);
      setFormData({
        fullName: "",
        phone: formData.phone,
        password: "",
        confirmPassword: "",
      });
      return;
    }

    const res = await loginUser(formData.phone, formData.password);

    if (!res.success) {
      setError(res.message);
      return;
    }

    onLogin(res.user);
    onClose();
    resetForm();
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
            {isRegisterMode && (
              <>
                <label>Họ tên:</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nhập họ tên"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </>
            )}

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

            {!isRegisterMode && <p className="forgot-text">Quên mật khẩu?</p>}

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