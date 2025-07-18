import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true, // Ensures no two groups have the same name
      trim: true,
    },
    userShortName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Group = mongoose.model('Group', groupSchema);

export default Group;
