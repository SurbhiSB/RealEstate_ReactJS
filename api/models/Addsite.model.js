import mongoose from 'mongoose';

const AddsiteSchema = new mongoose.Schema(
  {
    SiteName: {
      type: String,
      required: true,
      trim: true,
    },
    SiteAddress: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
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
const Addsites = mongoose.models.AddAddsite || mongoose.model('Addsite', AddsiteSchema);

export default Addsites;