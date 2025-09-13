import mongoose from 'mongoose';

const HeadMasterSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  address: String,
  state: String,
  city: String,
  pinCode: String,
  phoneNumber: String,
  email: String,
  website: String,
  message: String,
  jurisdiction: String,
  status: {
    type: String,
    default: 'Active'
  }
}, { timestamps: true });

const AddHeadMasters = mongoose.model('addcompanies', HeadMasterSchema);
export default AddHeadMasters;
