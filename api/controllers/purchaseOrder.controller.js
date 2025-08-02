import PurchaseOrder from "../models/purchaseOrder.model.js";

export const createPurchaseOrder = async (req, res) => {
  try {
    const newOrder = new PurchaseOrder(req.body);
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    console.error("Purchase Order Create Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
