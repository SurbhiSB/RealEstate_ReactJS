import mongoose from 'mongoose';

const labourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  site: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  paymentType: {
    type: String,
    enum: ['Daily'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, { timestamps: true });

const Labour = mongoose.model('Labour', labourSchema);

export default Labour;
