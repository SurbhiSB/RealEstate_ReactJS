import mongoose from 'mongoose';

const AddCustomerchema = new mongoose.Schema({
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
}, { timestamps: true });

const AddMember = mongoose.model('AddMember', AddCustomerchema);
export default AddMember;