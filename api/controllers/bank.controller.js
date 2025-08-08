import Bank from '../models/bank.model.js';

export const createBank = async (req, res) => {
  try {
    const { bankName, status } = req.body;
    const newBank = new Bank({ bankName, status });
    await newBank.save();
    res.status(201).json(newBank);
  } catch (error) {
    res.status(500).json({ message: "Error creating bank", error });
  }
};

export const getAllBanks = async (req, res) => {
  try {
    const banks = await Bank.find();
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching banks", error });
  }
};

export const updateBank = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBank = await Bank.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedBank);
  } catch (error) {
    res.status(500).json({ message: "Error updating bank", error });
  }
};
