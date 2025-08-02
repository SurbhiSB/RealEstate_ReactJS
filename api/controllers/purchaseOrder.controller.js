import PurchaseOrder from "../models/purchaseOrder.model.js";

export const createPurchaseOrder = async (req, res) => {
  try {
    const newPO = new PurchaseOrder(req.body);
    await newPO.save();
    res.status(201).json({ success: true, message: "Purchase Order saved", data: newPO });
  } catch (err) {
    console.error("Error saving purchase order:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
