import mongoose from 'mongoose';

// Define owner subdocument schema
const OwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  mobile: { type: String },
  pan: { type: String },
  aadhar: { type: String },
  address: { type: String }
}, { _id: false }); // _id false if you don't want separate _id for each owner

// Define main schema
const LandPurchaseSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  panNo: { type: String },
  tanNo: { type: String },
  khasraNo: { type: String },
  mouza: { type: String },
  hector: { type: String },
  areaInAcre: { type: String },
  saleDeedDate: { type: Date },
  saleDeedValue: { type: Number },
  stampDuty: { type: Number },
  registrationFees: { type: Number },
  financialYear: { type: String },
  owners: [OwnerSchema] // Embedded owner array
}, { timestamps: true });

// Create model
const LandPurchase = mongoose.model('LandPurchase', LandPurchaseSchema);

export default LandPurchase;
