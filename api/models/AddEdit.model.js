import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    earnUpto: {
      type: String,
      trim: true,
    },
    icon: {
      type: String, // Will store the file path or URL for the icon
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Avoid OverwriteModelError
const AddEdits =
  mongoose.models.AddEdits || mongoose.model('Categories', CategorySchema);

export default AddEdits;
