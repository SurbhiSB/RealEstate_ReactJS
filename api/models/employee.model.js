import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  anniversaryDate: Date,
  dob: Date,
  address: String,
  gender: String,
  city: String,
  state: String,
  pinCode: String,
  joiningDate: Date,
  education: String,
  department: String,
  designation: String,
  jobProfile: String,
  allowances: String,
  weeklyOff: String,
  checkInTime: String,
  checkOutTime: String,
  salary: Number,
  password: String,
  status: String,

  aadharNumber: String,
  panNumber: String,
  pfNumber: String,
  esiNumber: String,
  bankName: String,
  accountName: String,
  accountNumber: String,
  bankIFSC: String,

  profilePicture: String,
  idProof: String,
  addressProof: String,
  passportPhoto: String,
  otherDocument: String,
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
