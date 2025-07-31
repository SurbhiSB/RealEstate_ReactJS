import mongoose from 'mongoose';

const HeadMasterSchema = new mongoose.Schema(
  {
    headName: {
      type: String,
      required: true,
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Avoid OverwriteModelError
const HeadMasters = mongoose.models.AddHeadMaster || mongoose.model('HeadMaster', HeadMasterSchema);

export default HeadMasters;