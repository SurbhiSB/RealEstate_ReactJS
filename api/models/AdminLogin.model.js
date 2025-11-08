import mongoose from 'mongoose';

const AdminLoginSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: true, // mark this as admin
    },
  },
  { timestamps: true }
);

// ✅ Fix OverwriteModelError
const AdminLogin =
  mongoose.models.AdminLogin || mongoose.model('adminlogins', AdminLoginSchema);

export default AdminLogin;
