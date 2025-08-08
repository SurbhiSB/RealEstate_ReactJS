import WorkStatus from "../models/WorkStatus.model.js";

// @desc    Create new WorkStatus
// @route   POST /api/WorkStatuss/create
// @access  Public (you can restrict it later)
export const createWorkStatus = async (req, res) => {
  try {
    const {
      projectId,
      plotId,
      bookingId,
      customerId,
      WorkStatusMode,
      amount,
      WorkStatusDate,
      chequeStatus,
      depositBank,
    } = req.body;

    const fileUrl = req.file ? req.file.path : "";

    const newWorkStatus = new WorkStatus({
      projectId,
      plotId,
      bookingId,
      customerId,
      WorkStatusMode,
      amount,
      WorkStatusDate,
      chequeStatus,
      depositBank,
      fileUrl,
    });

    await newWorkStatus.save();

    res.status(201).json({ success: true, message: "WorkStatus created", data: newWorkStatus });
  } catch (err) {
    console.error("Create WorkStatus Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
