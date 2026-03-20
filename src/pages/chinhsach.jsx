function ChinhSach() {

  const mainColor = "#339BE5";

  const sectionStyle = {
    padding: "40px",
    background: "#eef6ff",
    minHeight: "100%"
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px 25px",
    marginBottom: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "0.3s",
    borderLeft: "5px solid #339BE5"
  };

  const titleStyle = {
    textAlign: "center",
    color: "#ff2d55",
    marginBottom: "12px",
    fontSize: "20px",
    fontWeight: "600",
    letterSpacing: "0.5px"
  };

  const textStyle = {
    fontSize: "15px",
    color: "#444",
    lineHeight: "1.8",
    letterSpacing: "0.3px",
    whiteSpace: "pre-line"
  };

  const policyList = [
  {
    title: "Chính sách bảo mật",
    content: `
      Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng. 
      Mọi dữ liệu như họ tên, số điện thoại, email và địa chỉ sẽ chỉ được sử dụng 
      cho mục đích xử lý đơn hàng và nâng cao trải nghiệm người dùng.

      Chúng tôi không chia sẻ, buôn bán hoặc trao đổi thông tin khách hàng 
      với bên thứ ba khi chưa có sự đồng ý. Hệ thống luôn được bảo vệ bằng 
      các tiêu chuẩn bảo mật cao nhằm đảm bảo an toàn dữ liệu.

      Khách hàng có quyền yêu cầu kiểm tra, chỉnh sửa hoặc xoá thông tin cá nhân 
      bất cứ lúc nào bằng cách liên hệ với bộ phận chăm sóc khách hàng.
          `
        },
        {
          title: "Chính sách đổi trả hàng",
          content: `
      Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng 
      nếu sản phẩm bị lỗi kỹ thuật, hư hỏng hoặc không đúng mô tả.

      Điều kiện đổi trả:
      - Sản phẩm còn nguyên vẹn, chưa qua sử dụng
      - Có đầy đủ hóa đơn hoặc thông tin mua hàng
      - Bao bì, phụ kiện đi kèm còn đầy đủ

      Quy trình đổi trả:
      Khách hàng liên hệ bộ phận CSKH để được hướng dẫn chi tiết. 
      Sau khi xác nhận, chúng tôi sẽ tiến hành đổi sản phẩm mới hoặc hoàn tiền 
      trong thời gian sớm nhất.

      Chi phí vận chuyển đổi trả sẽ được miễn phí nếu lỗi thuộc về chúng tôi.
          `
        },
        {
          title: "Chính sách vận chuyển",
          content: `
      Chúng tôi cung cấp dịch vụ giao hàng toàn quốc với thời gian linh hoạt: 

      - Nội thành: 1 - 2 ngày
      - Ngoại thành: 2 - 4 ngày

      Đơn hàng sẽ được xử lý trong vòng 24h sau khi xác nhận. 
      Khách hàng có thể theo dõi trạng thái đơn hàng thông qua hệ thống.

      Phí vận chuyển sẽ được hiển thị rõ ràng trước khi thanh toán. 
      Một số chương trình khuyến mãi sẽ hỗ trợ miễn phí vận chuyển.
          `
        },
        {
          title: "Chính sách thanh toán",
          content: `
      Chúng tôi hỗ trợ nhiều hình thức thanh toán tiện lợi:

      - Thanh toán khi nhận hàng (COD)
      - Chuyển khoản ngân hàng
      - Ví điện tử (Momo, ZaloPay, VNPay,...)

      Mọi giao dịch đều được bảo mật và xác nhận nhanh chóng. 
      Khách hàng sẽ nhận được thông báo ngay sau khi thanh toán thành công.
          `
      }
    ];

  return (
    <section style={sectionStyle}>

      {policyList.map((item, index) => (
        <div key={index} style={cardStyle}>

          <h3 style={titleStyle}>
            {item.title}
          </h3>

          <p style={{ ...textStyle, whiteSpace: "pre-line" }}>
            {item.content}
          </p>

        </div>
      ))}

    </section>
  );
}

export default ChinhSach;