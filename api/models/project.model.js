import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
  imageUrl: { type: String },
  projectType: {
    type: String,
    enum: ["Residential", "Commercial"],
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
