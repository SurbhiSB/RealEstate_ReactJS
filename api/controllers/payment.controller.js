import Payment from "../models/payment.model.js";

// @desc    Create new payment
// @route   POST /api/payments/create
// @access  Public (you can restrict it later)
export const createPayment = async (req, res) => {
  try {
    const {
      projectId,
      plotId,
      bookingId,
      customerId,
      paymentMode,
      amount,
      paymentDate,
      chequeStatus,
      depositBank,
    } = req.body;

    const fileUrl = req.file ? req.file.path : "";

    const newPayment = new Payment({
      projectId,
      plotId,
      bookingId,
      customerId,
      paymentMode,
      amount,
      paymentDate,
      chequeStatus,
      depositBank,
      fileUrl,
    });

    await newPayment.save();

    res.status(201).json({ success: true, message: "Payment created", data: newPayment });
  } catch (err) {
    console.error("Create Payment Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
