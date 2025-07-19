import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userShortName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// 'AddMember' will be the collection name (auto-pluralized to 'addmembers')
const AddMembersModel = mongoose.model('AddMember', groupSchema);

export default AddMembersModel;
