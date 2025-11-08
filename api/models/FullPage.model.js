import mongoose from "mongoose";

const FullPageSchema = new mongoose.Schema({
  branchName: String,
  address: String,
  state: String,
  city: String,
  managerName: String,
  managerMobile: String,
  managerEmail: String,
  password: String,
  aadharNo: String,
  aadharFront: String,
  aadharBack: String,
  passportPhoto: String,
  panNo: String,
  panFile: String,
  otherDoc: String,
});

export default mongoose.model("FullPage", FullPageSchema);
