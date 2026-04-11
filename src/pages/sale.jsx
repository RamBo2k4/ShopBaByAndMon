import { useEffect, useState } from "react";
import Voucher from "../components/voucher";
import bannerImg from "../assets/img/banner_sale.jpg";
import logoImg from "../assets/img/logo.jpg";

function Sale() {
  const bannerStyle = {
    width: "100%",
    aspectRatio: "400 / 168",
    objectFit: "cover",
    borderRadius: "20px",
    marginBottom: "25px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "30px",
  };

  const [savedVouchers, setSavedVouchers] = useState([]);

  const voucherList = [
    {
      code: "SALE36A",
      title: "Giảm 36% tối đa 100k",
      minOrder: 360000,
      used: 68,
      expire: "01/28",
      img: logoImg,
    },
    {
      code: "SALE20A",
      title: "Giảm 20% tối đa 50k",
      minOrder: 200000,
      used: 40,
      expire: "02/10",
      img: logoImg,
    },
    {
      code: "SALE36B",
      title: "Giảm 36% tối đa 100k",
      minOrder: 360000,
      used: 68,
      expire: "01/28",
      img: logoImg,
    },
    {
      code: "SALE20B",
      title: "Giảm 20% tối đa 50k",
      minOrder: 200000,
      used: 40,
      expire: "02/10",
      img: logoImg,
    },
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedVouchers") || "[]");
    setSavedVouchers(saved);
  }, []);

  const handleSaveVoucher = (code) => {
    if (!code) return;
    if (savedVouchers.includes(code)) return;

    const updatedSaved = [...savedVouchers, code];
    setSavedVouchers(updatedSaved);
    localStorage.setItem("savedVouchers", JSON.stringify(updatedSaved));
  };

  return (
    <section style={{ padding: "20px 40px", background: "#eef6ff" }}>
      <img src={bannerImg} alt="banner sale" style={bannerStyle} />

      <div style={gridStyle}>
        {voucherList.map((v, i) => (
          <Voucher
            key={i}
            data={v}
            mainColor="#339BE5"
            isSaved={savedVouchers.includes(v.code)}
            onSave={handleSaveVoucher}
          />
        ))}
      </div>
    </section>
  );
}

export default Sale;