import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, 'Phone number must be 10 digits'] 
  },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  pinCode: { type: String, required: true, trim: true },
});

const AddAgentSchema = new mongoose.Schema({
  memberType: { type: String, required: true, trim: true },
  fullName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phone: { 
    type: String, 
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  remarks: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  displayName: { type: String, required: true, trim: true },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits']
  },
  tds: {
    type: String,
    required: true,
    default: '0.00',
    trim: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
    required: true,
  },

  // Other Tab Fields
  gst: { type: String, required: true, trim: true },
  panNo: { type: String, required: true, trim: true },
  paymentTerms: { type: String, required: true, trim: true },

  // Address
  billingAddress: { type: AddressSchema, required: false },
  shippingAddress: { type: AddressSchema, required: false },

  // Contact
  contactPerson: { type: String, required: true, trim: true },
  contactNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Contact number must be 10 digits']
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid contact email']
  },

  // Bank
  beneficiaryName: { type: String, required: true, trim: true },
  accountNumber: { type: String, required: true, trim: true },
  bankName: { type: String, required: true, trim: true },
  ifsc: { type: String, required: true, trim: true },

}, { timestamps: true });

const AddAgent = mongoose.model('AddAgent', AddAgentSchema);
export default AddAgent;
