import Associate from "../models/associate.model.js";

export const getAllAssociates = async (req, res) => {
  try {
    const associates = await Associate.find();
    res.status(200).json({ success: true, data: associates });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch associates" });
  }
};

export const createAssociate = async (req, res) => {
  try {
    const associate = new Associate(req.body);
    await associate.save();
    res.status(201).json({ success: true, data: associate });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create associate" });
  }
};
