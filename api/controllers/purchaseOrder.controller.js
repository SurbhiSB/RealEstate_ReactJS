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



export const getAllPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

