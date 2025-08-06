import InStock from "../models/inStock.model.js";

export const createStock = async (req, res) => {
  try {
    const stock = new InStock(req.body);
    await stock.save();
    res.status(201).json({ success: true, message: "Stock added successfully" });
  } catch (error) {
    console.error("Stock creation error:", error);
    res.status(500).json({ success: false, message: "Failed to add stock" });
  }
};

export const getAllStock = async (req, res) => {
  try {
    const stock = await InStock.find();
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stock" });
  }
};
