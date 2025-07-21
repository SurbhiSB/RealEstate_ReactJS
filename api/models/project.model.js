import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  documentName: { type: String, required: true },
  documentUrl: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const projectSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    projectName: { type: String, required: true },
    displayName: { type: String, required: true },
    mouza: { type: String, required: true },
    khNo: { type: String, required: true },
    address: { type: String, required: true },
    locationMapLink: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing",
    },
    registrarOffice: { type: String },
    reraNumber: { type: String },
    imageUrl: { type: String }, // You can upload to cloud and store link here
    projectType: {
      type: String,
      enum: ["Residential", "Commercial"],
      required: true,
    },
    documents: [documentSchema], // <-- Add array of documents
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
