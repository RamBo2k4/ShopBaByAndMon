import { Link } from "react-router-dom"; // Import Link để điều hướng
import IconGrid from "./IconGrid";

// Không cần prop onNavigate nữa
function Footer() {

  const colStyle = {
    flex: "1 1 300px",
    padding: "20px",
    color: "white",
    boxSizing: "border-box",
    textAlign: "left",
    borderRight: "2px solid white"
  };

  const linkStyle = {
    cursor: "pointer",
    display: "block",
    marginBottom: "4px",
    textDecoration: "underline",
    color: "white" 
  };

  const ListPay = [
    { src: "../src/assets/img/momo.png", link: "https://demo-momo.com" },
    { src: "../src/assets/img/vietcombank.jpg", link: "https://demo-vietcombank.com" },
    { src: "../src/assets/img/Agribank.png", link: "https://demo-agribank.com" },
    { src: "../src/assets/img/vnpay.png", link: "https://demo-vnpay.com" },
    { src: "../src/assets/img/jcb.png", link: "https://demo-jcb.com" },
    { src: "../src/assets/img/zalopay.png", link: "https://demo-zalopay.com" },
    { src: "../src/assets/img/tec.png", link: "https://demo-techcombank.com" },
    { src: "../src/assets/img/bi.png", link: "https://demo-bidv.com" }
  ];
  const Listlogictic = [
    { src: "../src/assets/img/grap.png", link: "https://demo-momo.com" },
    { src: "../src/assets/img/be.jpg", link: "https://demo-vietcombank.com" },
    { src: "../src/assets/img/shope.png", link: "https://demo-agribank.com" }
  ];

  return (
    <footer>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "#339BE5",
        width: "100%",
        alignItems: "stretch"
      }}>
        {/* Cột 1: Thông tin liên hệ */}
        <div style={colStyle}>
          <h3 style={{ textAlign: "center" }}>Thông tin liên hệ</h3>
          <p><b><br /> Thành viên Trường Đại Học Công Nghiệp TP.HCM</b></p>
          <p><b>Email: qnhax2845@gmail.com</b></p>
          <p><b>Điện thoại: 0123456789</b></p>
          <p><b>Địa chỉ: 12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM</b></p>
          <p><b>CSKH: 1900 1000</b></p>
        </div>

        {/* Cột 2: Hỗ trợ khách hàng - Đã chuyển sang Link */}
        <div style={{ ...colStyle, textAlign: "center" }}>
          <h3>Hỗ trợ khách hàng</h3>
          <p><b><br /> Tra cứu hóa đơn</b></p>
          
          <Link to="/faq" style={linkStyle}>
            <b>FAQ</b>
          </Link>
          
          <p><b>Bảo hành &amp; bảo trì</b></p>
          <p><b>Tin khuyến mãi</b></p>
          
          <Link to="/chinhsach" style={linkStyle}>
            <b>Chính sách giao hàng</b>
          </Link>
          
          <Link to="/chinhsach" style={linkStyle}>
            <b>Chính sách thanh toán</b>
          </Link>
        </div>

        {/* Cột 3: Về thương hiệu */}
        <div style={colStyle}>
          <h3 style={{ textAlign: "center" }}>Về thương hiệu</h3>
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1 1 50px", textAlign: "center" }}>
              <p><b>Giới thiệu website</b></p>
              <p><b>Tuyển dụng</b></p>
              <p><b>Chính sách bảo mật</b></p>
              <p><b>Điều khoản sử dụng</b></p>
            </div>
            <div style={{ flex: "1 1 50px", textAlign: "center" }}>
              <p><b>Chấp nhận thanh toán</b></p>
              <IconGrid icons={ListPay} rows={2} cols={4} />
              <p><b>Đối tác vận chuyển </b></p>
              <IconGrid icons={Listlogictic} rows={1} cols={3} />
            </div>
          </div>
        </div>

        {/* Cột 4: Kết nối */}
        <div style={{ ...colStyle, borderRight: "none" }}>
          <h3 style={{ textAlign: "center" }}>Kết nối với chúng tôi</h3>
          <br />
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "25px"
          }}>
            <img src="../src/assets/img/QR.png" style={{ width: "120px", height: "120px" }} alt="QR" />
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <img src="../src/assets/img/app.png" style={{ width: "160px" }} alt="App" />
              <img src="../src/assets/img/ggl.png" style={{ width: "160px" }} alt="Google" />
            </div>
          </div>
          <IconGrid icons={Listlogictic} rows={1} cols={3} size={60} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;