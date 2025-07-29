import mongoose from "mongoose";

const associateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: String,
});

const Associate = mongoose.model("Associate", associateSchema);

export default Associate;
