import mongoose from 'mongoose';

const AddAgentSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits']
  },
  panNo: { type: String, required: true, trim: true },
  referByMobile: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, 'Refer By Mobile number must be 10 digits']
  },
  commission: { type: String, trim: true, default: '0.00' },
  activeFlag: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    trim: true
  },
  aadhar: { type: String, trim: true },
  referByName: { type: String, trim: true },
  remarkNotes: { type: String, trim: true },
  gender: { type: String, trim: true },
  joiningDate: { type: String, trim: true },
  dob: { type: String, trim: true },
  anniversaryDate: { type: String, trim: true },
  education: { type: String, trim: true },
  nomineeName: { type: String, trim: true },
  nomineeRelation: { type: String, trim: true },
  nomineeDob: { type: String, trim: true },
  nomineeContact: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, 'Nominee contact must be 10 digits']
  },
  paymentTerms: { type: String, trim: true },
  profilePic: { type: String, trim: true },
  idProof: { type: String, trim: true },
  addressProof: { type: String, trim: true },
  otherDoc: { type: String, trim: true },

  // Address
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  pinCode: { type: String, trim: true },

  // Bank Details
  beneficiaryName: { type: String, trim: true },
  accountNumber: { type: String, trim: true },
  bankName: { type: String, trim: true },
  ifsc: { type: String, trim: true }

}, { timestamps: true });

const AddAgent = mongoose.model('AddAgent', AddAgentSchema);
export default AddAgent;