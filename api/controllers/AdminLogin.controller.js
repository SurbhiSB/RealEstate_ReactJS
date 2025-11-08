import AdminLogin from "../models/AdminLogin.model.js"; // adjust path if needed
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey"; // better to use .env

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await AdminLogin.findOne({ email });
  if (!admin) return res.status(400).json({ success: false, message: "Invalid email" });

  if (admin.password !== password) {
    return res.status(400).json({ success: false, message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: admin._id, email: admin.email, isAdmin: admin.isAdmin },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

 res.json({
  success: true,
  message: "Login successful",
  data: {
    id: admin._id,
    email: admin.email,
    isAdmin: admin.isAdmin,
    token: token
  }
});
};
