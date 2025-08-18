import mongoose from 'mongoose';

const SendMessageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['Customer', 'Admin', 'Staff'],
      default: 'Customer',
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const SendMessage = mongoose.model('SendMessage', SendMessageSchema);

export default SendMessage;
