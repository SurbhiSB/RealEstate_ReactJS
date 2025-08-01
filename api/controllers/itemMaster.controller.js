import Item from "../models/item.model.js";

// Create new item
export const createItem = async (req, res) => {
  console.log("REQ BODY:", req.body);

  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();

    res.status(201).json({
      success: true,
      item: savedItem
    }); // ✅ wrap with success + item
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};



// Get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({
      success: true,
      items: items.reverse()  // optional reverse
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

