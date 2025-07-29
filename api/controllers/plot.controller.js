import Plot from "../models/plot.model.js";

// @desc   Get all plots
// @route  GET /api/plots
// @access Public
export const getAllPlots = async (req, res) => {
  try {
    const plots = await Plot.find().populate("projectId", "projectName"); // Optional: populate related project
    res.status(200).json({ success: true, data: plots });
  } catch (error) {
    console.error("Error fetching plots:", error);
    res.status(500).json({ success: false, message: "Failed to fetch plots" });
  }
};

// @desc   Create a new plot
// @route  POST /api/plots/create
// @access Admin
export const createPlot = async (req, res) => {
  try {
    const {
      plotName,
      plotNumber,
      projectId,
      areaSqM,
      areaSqFt,
      rl,
      cornerPlot
    } = req.body;

    if (!plotName || !projectId) {
      return res
        .status(400)
        .json({ success: false, message: "plotName and projectId are required" });
    }

    const newPlot = new Plot({
      plotName,
      plotNumber,
      projectId,
      areaSqM,
      areaSqFt,
      rl,
      cornerPlot,
    });

    await newPlot.save();

    res.status(201).json({ success: true, message: "Plot created successfully", data: newPlot });
  } catch (error) {
    console.error("Error creating plot:", error);
    res.status(500).json({ success: false, message: "Failed to create plot" });
  }
};


// @desc   Get plots by projectId
// @route  GET /api/plots/project/:projectId
// @access Public
export const getPlotsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    const plots = await Plot.find({ projectId });

    res.status(200).json({ success: true, data: plots });
  } catch (error) {
    console.error("Error fetching plots by project:", error);
    res.status(500).json({ success: false, message: "Failed to fetch plots" });
  }
};

