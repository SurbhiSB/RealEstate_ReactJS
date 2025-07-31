import mongoose from 'mongoose';

const HeadMasterSchema = new mongoose.Schema({
  HeadMasterName: {
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

const AddHeadMasters = mongoose.model('AddHeadMaster', HeadMasterSchema);
export default AddHeadMasters;
