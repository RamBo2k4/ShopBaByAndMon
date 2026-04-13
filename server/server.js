import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/shopdb")
  .then(() => console.log("MongoDB OK"))
  .catch((err) => console.log(err));

const User = mongoose.model("User", {
  fullName: String,
  phone: String,
  password: String,
});

app.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone, password });

  if (!user) {
    return res.json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
  }

  res.json({ success: true, user });
});

app.post("/register", async (req, res) => {
  const { fullName, phone, password } = req.body;

  const exist = await User.findOne({ phone });

  if (exist) {
    return res.json({ success: false, message: "Số điện thoại đã tồn tại" });
  }

  const newUser = await User.create({ fullName, phone, password });

  res.json({ success: true, user: newUser });
});

app.listen(5000, () => console.log("Server chạy 5000"));