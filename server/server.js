import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// --- 1. CẤU HÌNH MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 

// --- 2. KẾT NỐI DATABASE (MongoDB) ---
mongoose.connect("mongodb://127.0.0.1:27017/testDB")
  .then(() => console.log("✅ MongoDB Kết nối thành công"))
  .catch(err => console.error("❌ Lỗi kết nối Mongo:", err));

// --- 3. ĐỊNH NGHĨA MODELS ---

const Category = mongoose.model("Category", new mongoose.Schema({
  id: Number,
  label: String,
  category: String
}), "categories");

const User = mongoose.model("User", new mongoose.Schema({
  fullName: String,
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedVouchers: { type: [String], default: [] } 
}), "users");

const Voucher = mongoose.model("Voucher", new mongoose.Schema({
  code: String,
  title: String,
  minOrder: Number,
  type: String,
  value: Number,
}), "vourcher");

// Cập nhật Model Cart để lưu thêm userName
const Cart = mongoose.model("Cart", new mongoose.Schema({
  userPhone: String,
  userName: String,
  items: Array,
}), "cart");

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

const Order = mongoose.model("Order", new mongoose.Schema({
  userPhone: { type: String, required: true },
  userName: String,
  // Lưu Object địa chỉ (gồm người nhận, sđt nhận, địa chỉ chi tiết)
  address: {
    fullName: String,
    phone: String,
    address: String
  },
  // Lưu mảng các sản phẩm đã mua
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  total: Number,
  status: { 
    type: String, 
    default: "Chờ xác nhận",
    enum: ["Chờ xác nhận", "Đang chuẩn bị", "Đang giao", "Đã giao", "Đã hủy"] 
  },
  orderDate: { type: Date, default: Date.now }
}), "orders");


// --- 4. ĐỊNH NGHĨA ROUTES ---
// [PRODUCT] API Lấy 8 gợi ý tìm kiếm nhanh
app.get("/api/products/suggestions", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const suggestions = await Product.find({
      description: { $regex: q, $options: "i" }
    })
    .select("id description image newPrice") 
    .limit(8);

    res.json(suggestions);
  } catch (err) {
    res.status(500).json([]);
  }
});
app.get("/api/products/suggestions", async (req, res) => {
  try {
    const { q } = req.query;
    console.log("🔍 Từ khóa nhận được:", q); // Xem nó có bị dính ký tự lạ không

    const suggestions = await Product.find({
      name: { $regex: q, $options: "i" }
    }).limit(8);

    console.log("📦 Số lượng tìm thấy:", suggestions.length);
    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});
/**
 * [PRODUCT] API Lấy danh sách sản phẩm (có lọc)
 */
/**
 * [PRODUCT] API Lấy danh sách sản phẩm
 * Hỗ trợ: Tìm kiếm theo từ khóa (q) và Lọc theo danh mục (category)
 */
app.get("/api/products", async (req, res) => {
  try {
    const { category, q } = req.query;
    let filter = {};

    // 1. Logic Tìm kiếm: Quét từ khóa trong cả trường 'name' và 'description'
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },       // Tìm trong tên
        { description: { $regex: q, $options: "i" } } // Tìm trong mô tả
      ];
    }

    // 2. Logic Lọc theo Category (Giữ nguyên và tích hợp)
    if (category && category !== "all") {
      if (category === "flash-deals") {
        filter.discount = { $gte: 25 };
      } else if (category === "top-ban-chay") {
        filter.sold = { $gte: 1000 };
      } else if (category === "san-qua-ta-sua") {
        filter.category = { $in: ["Các loại sữa", "Các loại tã"] };
      } else if (category === "mua-nhanh-giam-ngay") {
        filter.newPrice = { $lte: 300000 };
      } else {
        // Mapping slug từ URL sang tiếng Việt trong Database
        const categoryMap = {
          "milk": "Các loại sữa",
          "diaper": "Các loại tã",
          "toy": "Đồ chơi học tập",
          "bath": "Phấn và sữa tắm",
          "food": "Đồ ăn dặm",
          "fashion": "Thời trang, phụ kiện",
          "mom": "Đồ dùng mẹ và bé"
        };
        // Nếu không có trong map thì lấy chính cái slug đó
        filter.category = categoryMap[category] || category;
      }
    }

    // Thực hiện truy vấn và ưu tiên hàng bán chạy lên đầu
    const products = await Product.find(filter).sort({ sold: -1 });
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: "Lỗi Server: " + err.message });
  }
});
/**
 * [PRODUCT] API Lấy chi tiết 1 sản phẩm theo ID
 */
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server: " + err.message });
  }
});

/**
 * [CART] API Thêm sản phẩm vào giỏ hàng (MỚI)
 * Xử lý: Cộng dồn số lượng nếu trùng ID, lưu userName
 */
app.post("/api/cart/add", async (req, res) => {
  const { userPhone, userName, item } = req.body;
  try {
    let cart = await Cart.findOne({ userPhone });

    if (!cart) {
      // Nếu chưa có giỏ hàng -> Tạo mới
      cart = new Cart({ userPhone, userName, items: [item] });
    } else {
      // Nếu đã có -> Kiểm tra xem item đã tồn tại chưa
      const existingItemIndex = cart.items.findIndex(i => i.id === item.id);

      if (existingItemIndex > -1) {
        // Tồn tại rồi -> Cộng dồn số lượng
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        // Chưa có -> Thêm mới vào mảng
        cart.items.push(item);
      }
      cart.userName = userName; // Cập nhật lại tên nếu cần
    }

    cart.markModified('items'); // Quan trọng: Đánh dấu mảng items đã thay đổi
    await cart.save();
    res.json({ success: true, message: "Thêm giỏ hàng thành công", data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi giỏ hàng: " + err.message });
  }
});

/**
 * [CART] API Lấy giỏ hàng theo SĐT
 */
app.get("/api/cart/:phone", async (req, res) => {
  try {
    const cartData = await Cart.findOne({ userPhone: req.params.phone });
    res.json(cartData ? cartData.items : []);
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
    if (!user) return res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/**
 * [VOUCHER] Các API liên quan Voucher
 */
app.get("/testDB/vourcher", async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json(vouchers);
  } catch (err) { res.status(500).json([]); }
});

app.post("/api/users/save-voucher", async (req, res) => {
  const { userId, voucherCode } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedVouchers: voucherCode } }, 
      { returnDocument: 'after' }
    );
    res.json({ success: true, data: updatedUser.savedVouchers });
  } catch (err) { res.status(500).json({ success: false }); }
});

app.get("/api/users/saved-vouchers/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user ? (user.savedVouchers || []) : []);
  } catch (err) { res.status(500).json([]); }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ id: 1 });
    res.json(categories);
  } catch (err) { res.status(500).json([]); }
});

// [CART] API Cập nhật số lượng
app.put("/api/cart/update", async (req, res) => {
  const { userPhone, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userPhone });
    if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    const itemIndex = cart.items.findIndex(i => i.id === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.markModified('items');
      await cart.save();
      res.json({ success: true, items: cart.items });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// [CART] API Xóa sản phẩm
app.delete("/api/cart/remove", async (req, res) => {
  const { userPhone, productId } = req.body; // Gửi data qua body
  try {
    const cart = await Cart.findOne({ userPhone });
    if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    cart.items = cart.items.filter(i => i.id !== productId);
    cart.markModified('items');
    await cart.save();
    res.json({ success: true, items: cart.items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 1. Model Thông báo
const Notification = mongoose.model("Notification", new mongoose.Schema({
  userPhone: String,
  title: String,
  desc: String,
  type: { type: String, default: "order" }, // 'order', 'sale', 'system'
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}), "notifications");

// --- [NOTIFICATION] API Lấy thông báo ---
app.get("/api/notifications/:phone", async (req, res) => {
  try {
    const notis = await Notification.find({ userPhone: req.params.phone }).sort({ createdAt: -1 });
    res.json(notis);
  } catch (err) {
    res.status(500).json([]);
  }
});

// --- [ORDER] API Checkout (Cập nhật mới) ---
app.post("/api/orders/checkout", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    // 👉 TỰ ĐỘNG TẠO THÔNG BÁO SAU KHI ĐẶT HÀNG
    const newNoti = new Notification({
      userPhone: req.body.userPhone,
      title: "Đặt hàng thành công! 🎉",
      desc: `Đơn hàng #${newOrder._id.toString().slice(-6)} của bạn đã được xác nhận và đang chờ xử lý.`,
      type: "order"
    });
    await newNoti.save();

    // Xóa giỏ hàng
    await Cart.findOneAndDelete({ userPhone: req.body.userPhone });
    
    res.json({ success: true, message: "Đặt hàng thành công!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/// [DEBUG] API Cưỡng bức đồng bộ: Xóa hết thông báo cũ và tạo mới theo đơn hàng
app.get("/api/test/force-sync-notifications", async (req, res) => {
  try {
    // 1. Xóa sạch bảng thông báo cũ để làm lại từ đầu
    await Notification.deleteMany({});

    // 2. Lấy tất cả đơn hàng đang có
    const orders = await Order.find().sort({ orderDate: -1 });

    if (orders.length === 0) {
      return res.send("⚠️ Không tìm thấy đơn hàng nào trong database để đồng bộ!");
    }

    // 3. Duyệt qua từng đơn hàng và tạo thông báo tương ứng
    const newNotifications = orders.map(order => {
      const shortId = order._id.toString().slice(-6).toUpperCase();
      return {
        userPhone: order.userPhone,
        title: `Cập nhật đơn hàng #${shortId}`,
        desc: `Đơn hàng của bạn đang ở trạng thái: ${order.status}`,
        type: "order",
        isRead: true, // Để là true cho nó đỡ hiện chấm xanh đầy màn hình
        createdAt: order.orderDate // Lấy luôn ngày đặt hàng làm ngày thông báo
      };
    });

    // 4. Lưu tất cả vào Database
    await Notification.insertMany(newNotifications);

    res.send(`✅ Thành công! Đã tạo ${newNotifications.length} thông báo cho ${orders.length} đơn hàng.`);
  } catch (err) {
    res.status(500).send("❌ Lỗi: " + err.message);
  }
});

// [NOTIFICATION] API Đánh dấu thông báo đã đọc
app.put("/api/notifications/read/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Tìm thông báo theo ID và đổi isRead thành true
    await Notification.findByIdAndUpdate(id, { isRead: true });
    
    res.json({ success: true, message: "Đã cập nhật trạng thái đọc" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



// --- 5. KHỞI CHẠY SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`
  🚀 Server BaByAndMon đang chạy tại:
  🔗 URL: http://localhost:${PORT}
  📂 Database: testDB (Collection: cart, products, users, vourcher, categories)
  -------------------------------------------
  `);
});