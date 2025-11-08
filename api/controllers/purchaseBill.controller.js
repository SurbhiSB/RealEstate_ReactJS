import purchaseBill from "../models/purchaseBill.model.js";

export const createpurchaseBill = async (req, res) => {
  try {
    const newOrder = new purchaseBill(req.body);
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    console.error("❌ Purchase Order Create Error:", err);
    res.status(500).json({ success: false, message: err.message }); // ✅ More informative
  }
};

export const getAllPurchaseBills = async (req, res) => {
  try {
    const bills = await purchaseBill.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


