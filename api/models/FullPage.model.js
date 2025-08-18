import mongoose from "mongoose";

const BranchOfficeSchema = new mongoose.Schema({
  // 🏢 Branch Office Details
  branchName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  managerName: {
    type: String,
    required: true,
    trim: true,
  },
  managerMobile: {
    type: String,
    required: true,
    trim: true,
  },
  managerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },

  // 📑 KYC Details
  aadharNo: {
    type: String,
    required: false,
  },
  aadharFront: {
    type: String, // will store file path or URL
    required: false,
  },
  aadharBack: {
    type: String,
    required: false,
  },
  passportPhoto: {
    type: String,
    required: false,
  },
  panNo: {
    type: String,
    required: false,
  },
  panFile: {
    type: String,
    required: false,
  },
  otherDoc: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BranchOffice = mongoose.model("BranchOffice", BranchOfficeSchema);

export default BranchOffice;
