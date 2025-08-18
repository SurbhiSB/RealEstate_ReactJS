import AdvancePayment from "../models/advancePay.model.js";

// Create Advance Payment
export const createAdvancePayment = async (req, res) => {
  try {
    const newPayment = new AdvancePayment(req.body);
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Advance Payments
export const getAdvancePayments = async (req, res) => {
  try {
    const payments = await AdvancePayment.find()
      .populate("employee", "name") // show employee name
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
