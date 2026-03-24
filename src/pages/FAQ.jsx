import { useState } from "react";

const faqData = [
  {
    category: "Đặt hàng & Thanh toán",
    icon: "🛒",
    items: [
      {
        q: "Làm thế nào để đặt hàng trên website?",
        a: "Bạn chọn sản phẩm cần mua, nhấn 'Thêm vào giỏ hàng', sau đó vào giỏ hàng và tiến hành thanh toán. Điền đầy đủ thông tin giao hàng và chọn phương thức thanh toán phù hợp."
      },
      {
        q: "Website hỗ trợ những hình thức thanh toán nào?",
        a: "Chúng tôi hỗ trợ: Thanh toán khi nhận hàng (COD), Chuyển khoản ngân hàng, Ví điện tử (Momo, ZaloPay, VNPay). Mọi giao dịch đều được bảo mật."
      },
      {
        q: "Tôi có thể thay đổi hoặc hủy đơn hàng sau khi đặt không?",
        a: "Bạn có thể hủy hoặc thay đổi đơn hàng trong vòng 1 giờ sau khi đặt hàng thành công. Sau thời gian này, đơn hàng đã được xử lý và không thể thay đổi. Vui lòng liên hệ CSKH ngay nếu cần hỗ trợ."
      },
      {
        q: "Làm sao tôi biết đơn hàng đã được xác nhận?",
        a: "Sau khi đặt hàng thành công, hệ thống sẽ gửi email xác nhận đến địa chỉ bạn đã đăng ký. Bạn cũng có thể kiểm tra trạng thái đơn hàng trong mục 'Đơn hàng của tôi' trên tài khoản."
      }
    ]
  },
  {
    category: "Giao hàng & Vận chuyển",
    icon: "🚚",
    items: [
      {
        q: "Thời gian giao hàng là bao lâu?",
        a: "Nội thành TP.HCM và Hà Nội: 1 - 2 ngày làm việc. Các tỉnh thành khác: 2 - 4 ngày làm việc. Đơn hàng được xử lý trong 24h sau khi xác nhận."
      },
      {
        q: "Phí vận chuyển được tính như thế nào?",
        a: "Phí vận chuyển hiển thị rõ trước khi thanh toán, tùy thuộc khu vực và trọng lượng đơn hàng. Đơn hàng trên 500.000 VND được miễn phí vận chuyển nội thành."
      },
      {
        q: "Tôi có thể theo dõi đơn hàng không?",
        a: "Có, sau khi đơn hàng được giao cho đơn vị vận chuyển, bạn sẽ nhận được mã vận đơn qua email/SMS. Dùng mã này để tra cứu trên website của đơn vị vận chuyển hoặc trực tiếp trên hệ thống của chúng tôi."
      }
    ]
  },
  {
    category: "Đổi trả & Hoàn tiền",
    icon: "🔄",
    items: [
      {
        q: "Chính sách đổi trả hàng như thế nào?",
        a: "Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi kỹ thuật, hư hỏng hoặc không đúng mô tả. Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng và có đầy đủ hóa đơn."
      },
      {
        q: "Thời gian hoàn tiền mất bao lâu?",
        a: "Sau khi nhận lại hàng và kiểm tra, chúng tôi sẽ hoàn tiền trong vòng 3 - 5 ngày làm việc. Tiền hoàn về tài khoản ngân hàng hoặc ví điện tử tùy theo phương thức thanh toán ban đầu."
      },
      {
        q: "Chi phí vận chuyển khi đổi trả có được hoàn không?",
        a: "Nếu lỗi thuộc về chúng tôi (sản phẩm hỏng, sai mô tả), chi phí vận chuyển đổi trả sẽ được miễn phí hoàn toàn. Nếu lý do từ phía khách hàng, phí vận chuyển sẽ do khách hàng chịu."
      }
    ]
  },
  {
    category: "Tài khoản & Bảo mật",
    icon: "🔐",
    items: [
      {
        q: "Làm thế nào để đăng ký tài khoản?",
        a: "Nhấn vào nút 'Đăng nhập' ở góc trên cùng bên phải. Tại giao diện 'Đăng Nhập', nhấn vào 'Đăng ký' phía dưới nút 'Đăng nhập', sau đó điền thông tin cần thiết và xác nhận qua email. Quá trình chỉ mất khoảng 1 phút."
      },
      {
        q: "Thông tin cá nhân của tôi có được bảo mật không?",
        a: "Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân. Dữ liệu được mã hóa và bảo vệ theo tiêu chuẩn cao nhất. Chúng tôi không chia sẻ thông tin khách hàng với bên thứ ba khi chưa có sự đồng ý."
      },
      {
        q: "Tôi quên mật khẩu, phải làm thế nào?",
        a: "Trên trang đăng nhập, nhấn 'Quên mật khẩu', nhập email đã đăng ký. Hệ thống sẽ gửi link đặt lại mật khẩu về email của bạn trong vài phút."
      }
    ]
  },
  {
    category: "Sản phẩm & Khuyến mãi",
    icon: "🎁",
    items: [
      {
        q: "Sản phẩm trên website có chính hãng không?",
        a: "Tất cả sản phẩm trên ShopBabyAndMon đều là hàng chính hãng, được nhập khẩu hoặc phân phối chính thức từ các thương hiệu uy tín. Chúng tôi cam kết 100% hàng thật."
      },
      {
        q: "Làm thế nào để sử dụng voucher giảm giá?",
        a: "Trong bước thanh toán, bạn sẽ thấy ô nhập mã voucher. Dán mã vào và nhấn 'Áp dụng'. Hệ thống sẽ tự động trừ số tiền giảm. Lưu ý kiểm tra điều kiện áp dụng của từng voucher."
      },
      
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState({});

  const toggle = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenIndex(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const mainColor = "#339BE5";

  return (
    <section style={{ padding: "30px 40px", background: "#eef6ff", minHeight: "100%" }}>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <h2 style={{
          color: mainColor,
          fontSize: "26px",
          fontWeight: "700",
          margin: "0 0 8px 0"
        }}>
          ❓ Câu Hỏi Thường Gặp (FAQ)
        </h2>
        <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
          Tìm câu trả lời nhanh cho các thắc mắc phổ biến nhất
        </p>
        <div style={{
          width: "60px", height: "4px",
          background: mainColor,
          borderRadius: "2px",
          margin: "12px auto 0"
        }} />
      </div>

      {/* FAQ Categories */}
      {faqData.map((cat, catIdx) => (
        <div key={catIdx} style={{ marginBottom: "28px" }}>

          {/* Category Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: mainColor,
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "14px 14px 0 0",
            fontSize: "15px",
            fontWeight: "700"
          }}>
            <span style={{ fontSize: "20px" }}>{cat.icon}</span>
            {cat.category}
          </div>

          {/* Items */}
          <div style={{
            background: "#fff",
            borderRadius: "0 0 14px 14px",
            border: `1px solid #cce5ff`,
            borderTop: "none",
            overflow: "hidden"
          }}>
            {cat.items.map((item, itemIdx) => {
              const key = `${catIdx}-${itemIdx}`;
              const isOpen = !!openIndex[key];
              const isLast = itemIdx === cat.items.length - 1;

              return (
                <div key={itemIdx} style={{
                  borderBottom: isLast ? "none" : "1px solid #e8f4ff"
                }}>
                  {/* Question row */}
                  <div
                    onClick={() => toggle(catIdx, itemIdx)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px 20px",
                      cursor: "pointer",
                      background: isOpen ? "#f0f9ff" : "#fff",
                      transition: "background 0.2s"
                    }}
                  >
                    <span style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: isOpen ? mainColor : "#333",
                      flex: 1,
                      paddingRight: "10px"
                    }}>
                      {item.q}
                    </span>
                    <span style={{
                      color: mainColor,
                      fontSize: "18px",
                      fontWeight: "bold",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s",
                      flexShrink: 0
                    }}>
                      ＋
                    </span>
                  </div>

                  {/* Answer */}
                  {isOpen && (
                    <div style={{
                      padding: "0 20px 16px 20px",
                      fontSize: "14px",
                      color: "#555",
                      lineHeight: "1.8",
                      background: "#f0f9ff",
                      borderTop: `2px solid ${mainColor}`
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Contact CTA */}
      <div style={{
        textAlign: "center",
        marginTop: "36px",
        background: "#fff",
        borderRadius: "16px",
        padding: "28px 20px",
        border: `1px solid #cce5ff`,
        boxShadow: "0 4px 14px rgba(51,155,229,0.1)"
      }}>
        <p style={{ fontSize: "16px", fontWeight: "600", color: "#333", margin: "0 0 6px 0" }}>
          Nếu không tìm thấy câu trả lời bạn cần?
        </p>
        <p style={{ fontSize: "13px", color: "#777", margin: "0 0 16px 0" }}>
          Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <button style={{
            background: mainColor,
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "20px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "600"
          }}>
            📞 Gọi: 1900 1000
          </button>
         
        </div>
      </div>

    </section>
  );
}