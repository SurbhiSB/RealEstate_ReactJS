import mongoose from 'mongoose';

const WorkTypeListSchema = new mongoose.Schema(
  {
    WorkName: {
      type: String,
      required: true,
      trim: true,
    },
     
  },
  {
    timestamps: true,
  }
);

// ✅ Avoid OverwriteModelError
const WorkTypeLists = mongoose.models.WorkTypeList || mongoose.model('WorkType', WorkTypeListSchema);

export default WorkTypeLists;