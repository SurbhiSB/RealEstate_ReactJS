import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  pinCode: String,
});

const AddMemberSchema = new mongoose.Schema({
  memberType: String,
  fullName: String,
  email: String,
  phone: String,
  remarks: String,
  companyName: String,
  displayName: String,
  mobile: String,
  tds: {
    type: String,
    default: '0.00',
  },
  status: {
    type: String,
    default: 'Active',
  },

  // Other Tab Fields
  gst: String,
  panNo: String,
  paymentTerms: String,

  // Address
  billingAddress: AddressSchema,
  shippingAddress: AddressSchema,

  // Contact
  contactPerson: String,
  contactNumber: String,
  contactEmail: String,

  // Bank
  beneficiaryName: String,
  accountNumber: String,
  bankName: String,
  ifsc: String,
}, { timestamps: true });

const AddMember = mongoose.model('AddMember', AddMemberSchema);
export default AddMember;