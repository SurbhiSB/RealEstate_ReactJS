import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pinCode: { type: String, required: true },
});

const AddMemberSchema = new mongoose.Schema({
  memberType: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  remarks: { type: String, required: true },
  companyName: { type: String, required: true },
  displayName: { type: String, required: true },
  mobile: { type: String, required: true },
  tds: {
    type: String,
    required: true,
    default: '0.00',
  },
  status: {
    type: String,
    required: true,
    default: 'Active',
  },

  // Other Tab Fields
  gst: { type: String, required: true },
  panNo: { type: String, required: true },
  paymentTerms: { type: String, required: true },

  // Address
  billingAddress: { type: AddressSchema, required: false },
  shippingAddress: { type: AddressSchema, required: false },

  // Contact
  contactPerson: { type: String, required: true },
  contactNumber: { type: String, required: true },
  contactEmail: { type: String, required: true },

  // Bank
  beneficiaryName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  ifsc: { type: String, required: true },

}, { timestamps: true });

const AddMember = mongoose.model('AddMember', AddMemberSchema);
export default AddMember;
