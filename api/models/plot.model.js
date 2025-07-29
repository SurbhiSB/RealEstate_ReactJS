import mongoose from "mongoose";

const plotSchema = new mongoose.Schema({
  plotName: { type: String, required: true },         // plotType
  plotNumber: String,                                 // plotNo
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  areaSqM: Number,
  areaSqFt: Number,
  rl: String,
  cornerPlot: Boolean,
});

const Plot = mongoose.model("Plot", plotSchema);
export default Plot;
