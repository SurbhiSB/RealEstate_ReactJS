import mongoose from 'mongoose';

const WorkAllotmentSchema = new mongoose.Schema({
  WorkName: {
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


}, { timestamps: true });

const WorkAllotment = mongoose.model('WorkAllotment', WorkAllotmentSchema);

export default WorkAllotment;
