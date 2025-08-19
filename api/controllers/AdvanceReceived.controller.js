import AdvanceReceived from "../models/AdvanceReceived.model.js";

// Create advance received
export const createAdvanceReceived = async (req, res) => {
  try {
    const { employeeId, advanceDate, amount, remark } = req.body;

    if (!employeeId || !advanceDate || !amount) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newAdvance = new AdvanceReceived({
      employeeId,
      advanceDate,
      amount,
      remark,
    });

    await newAdvance.save();
    res.status(201).json({ message: "Advance received saved successfully!", data: newAdvance });
  } catch (error) {
    res.status(500).json({ message: "Error saving advance received", error: error.message });
  }
};

// Get all advance received
export const getAdvanceReceived = async (req, res) => {
  try {
    const advances = await AdvanceReceived.find().populate("employeeId", "name");
    res.status(200).json(advances);
  } catch (error) {
    res.status(500).json({ message: "Error fetching advance received", error: error.message });
  }
};
