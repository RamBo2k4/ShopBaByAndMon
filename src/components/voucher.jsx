function Voucher({ data, mainColor }) {

  const cardStyle = {
    display: "flex",
    width: "100%",
    border: `2px solid ${mainColor}`,
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff"
  };

  const iconBox = {
    width: "120px",
    background: "#d6ecff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px"
  };

  const infoStyle = {
    flex: 1,
    padding: "15px"
  };

  const progressBar = {
    height: "6px",
    background: "#eee",
    borderRadius: "5px",
    margin: "10px 0"
  };

  const progress = {
    width: data.used + "%",
    height: "100%",
    background: mainColor,
    borderRadius: "5px"
  };

  const bottom = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const button = {
    background: mainColor,
    border: "none",
    color: "white",
    padding: "6px 18px",
    borderRadius: "20px",
    cursor: "pointer"
  };
  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%"
  };
  return (
    <div style={cardStyle}>

      <div style={iconBox}>
        <img
          src={data.img} alt="logo"
          style={{
            imgStyle
          }}
        />
      </div>
      <div style={infoStyle}>
        <h4 style={{ color: mainColor, margin: "0" }}>
          {data.title}
        </h4>

        <p>{data.minOrder}</p>

        <div style={progressBar}>
          <div style={progress}></div>
        </div>

        <div style={bottom}>
          <span style={{ fontSize: "12px", color: "#777" }}>
            Đã dùng {data.used}% • Hết hạn: {data.expire}
          </span>

          <button style={button}>Lưu</button>
        </div>

      </div>

    </div>
  );
}

export default Voucher;