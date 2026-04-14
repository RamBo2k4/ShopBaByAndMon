import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// --- 1. CẤU HÌNH MIDDLEWARE ---
app.use(cors()); // Cho phép Frontend truy cập API từ domain khác
app.use(express.json()); // Hỗ trợ đọc dữ liệu JSON từ body request

// --- 2. KẾT NỐI DATABASE (MongoDB) ---
mongoose.connect("mongodb://127.0.0.1:27017/testDB")
  .then(() => console.log("✅ MongoDB Kết nối thành công"))
  .catch(err => console.error("❌ Lỗi kết nối Mongo:", err));

// --- 3. ĐỊNH NGHĨA MODELS (Cấu trúc dữ liệu) ---

// Model Danh mục (Menu chính)
const Category = mongoose.model("Category", new mongoose.Schema({
  id: Number,
  label: String,
  category: String
}), "categories");

// Model Người dùng (Lưu tài khoản và Voucher đã săn)
const User = mongoose.model("User", new mongoose.Schema({
  fullName: String,
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedVouchers: { type: [String], default: [] } // Mảng chứa các mã code voucher
}), "users");

// Model Voucher hệ thống (Dữ liệu gốc các mã giảm giá)
const Voucher = mongoose.model("Voucher", new mongoose.Schema({
  code: String,
  title: String,
  minOrder: Number,
  type: String,
  value: Number,
}), "vourcher");

// Model Giỏ hàng (Lưu sản phẩm khách đã chọn)
const Cart = mongoose.model("Cart", new mongoose.Schema({
  userPhone: String,
  items: Array,
}), "cart");

// Model Sản phẩm (Thông tin chi tiết hàng hóa)
const Product = mongoose.model("Product", new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  oldPrice: Number,
  newPrice: Number,
  discount: Number,
  image: String,
  category: String,
  sold: Number,
  rating: Number,
  age: String,
  description: String
}), "products");


// --- 4. ĐỊNH NGHĨA ROUTES (APIs) ---

/**
 * [PRODUCT] API Lấy danh sách sản phẩm
 * Hỗ trợ lọc theo: Danh mục (Sữa, Tã...) hoặc Bộ sưu tập (Flash Sale, Bán chạy...)
 */
app.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category && category !== "all") {
      // Xử lý các nút "Xem tất cả" từ trang chủ
      if (category === "flash-deals") {
        filter.discount = { $gte: 25 }; // Giảm trên 25%
      } 
      else if (category === "top-ban-chay") {
        filter.sold = { $gte: 1000 }; // Đã bán trên 1000
      } 
      else if (category === "san-qua-ta-sua") {
        filter.category = { $in: ["Các loại sữa", "Các loại tã"] };
      }
      else if (category === "mua-nhanh-giam-ngay") {
        filter.newPrice = { $lte: 300000 }; // Giá dưới 300k
      }
      else {
        // Ánh xạ slug từ URL sang tên Category chính xác trong DB
        const categoryMap = {
          "milk": "Các loại sữa",
          "diaper": "Các loại tã",
          "toy": "Đồ chơi học tập",
          "bath": "Phấn và sữa tắm",
          "food": "Đồ ăn dặm",
          "fashion": "Thời trang, phụ kiện",
          "mom": "Đồ dùng mẹ và bé"
        };
        filter.category = categoryMap[category] || category;
      }
    }

    const products = await Product.find(filter).sort({ sold: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy sản phẩm: " + err.message });
  }
});

/**
 * [CATEGORY] API Lấy danh sách menu danh mục
 */
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ id: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json([]);
  }
});

/**
 * [USER] API Đăng nhập
 */
app.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone, password });
    if (!user) return res.status(401).json({ success: false, message: "Sai số điện thoại hoặc mật khẩu" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi hệ thống đăng nhập" });
  }
});

/**
 * [USER] API Lấy thông tin chi tiết User theo ID
 */
app.get("/api/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * [VOUCHER] API Lưu mã giảm giá vào tài khoản người dùng
 */
app.post("/api/users/save-voucher", async (req, res) => {
  const { userId, voucherCode } = req.body;
  try {
    // Sử dụng $addToSet để đảm bảo mã không bị lưu trùng lặp
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedVouchers: voucherCode } }, 
      { returnDocument: 'after' } // Trả về data mới nhất sau khi cập nhật
    );

    if (!updatedUser) return res.status(404).json({ success: false, message: "Không tìm thấy User" });

    res.json({ success: true, message: "Đã thu thập mã thành công!", data: updatedUser.savedVouchers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi khi lưu voucher" });
  }
});

/**
 * [VOUCHER] API Lấy danh sách mã giảm giá đã lưu của một User
 */
app.get("/api/users/saved-vouchers/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user ? (user.savedVouchers || []) : []);
  } catch (err) {
    res.status(500).json([]);
  }
});

/**
 * [VOUCHER] API Lấy tất cả voucher đang có trên hệ thống (Trang Sale)
 */
app.get("/testDB/vourcher", async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json(vouchers);
  } catch (err) {
    res.status(500).json([]);
  }
});

/**
 * [CART] API Lấy giỏ hàng theo số điện thoại người dùng
 */
app.get("/api/cart/:phone", async (req, res) => {
  try {
    const cartData = await Cart.findOne({ userPhone: req.params.phone });
    res.json(cartData ? cartData.items : []);
  } catch (err) {
    res.status(500).json([]);
  }
});


// --- 5. KHỞI CHẠY SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`
  🚀 Server BaByAndMon đang chạy tại:
  🔗 URL: http://localhost:${PORT}
  📂 Database: testDB
  -------------------------------------------
  `);
});