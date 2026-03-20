import Voucher from "../components/voucher";

function Sale() {

  const mainColor = "#339BE5";

  const bannerStyle = {
  width: "100%",
  aspectRatio: "400 / 168",
  objectFit: "cover",
  borderRadius: "20px",
  marginBottom: "25px"
};

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "30px"
  };

  const voucherList = [
  {
    title: "Giảm 36% tối đa 100k",
    minOrder: "Đơn từ 360.000 VND",
    used: 68,
    expire: "01/28",
    img: "../img/logo.jpg"
  },
  {
    title: "Giảm 20% tối đa 50k",
    minOrder: "Đơn từ 200.000 VND",
    used: 40,
    expire: "02/10",
    img: "../img/logo.jpg"
  },
  {
    title: "Giảm 36% tối đa 100k",
    minOrder: "Đơn từ 360.000 VND",
    used: 68,
    expire: "01/28",
    img: "../img/logo.jpg"
  },
  {
    title: "Giảm 20% tối đa 50k",
    minOrder: "Đơn từ 200.000 VND",
    used: 40,
    expire: "02/10",
    img: "../img/logo.jpg"
  }
];

  return (
    <section style={{ padding: "20px 40px", background: "#eef6ff" }}>

      <img
        src="../img/banner_sale.jpg"
        style={bannerStyle}
      />

      <div style={gridStyle}>
        {voucherList.map((v, i) => (
          <Voucher
            key={i}
            data={v}
            mainColor={mainColor}
          />
        ))}
      </div>

    </section>
  );
}

export default Sale;