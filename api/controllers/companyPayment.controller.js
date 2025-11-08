// controllers/companyPayment.controller.js
import CompanyPayment from '../models/CompanyPayment.model.js';

export const createCompanyPayment = async (req, res) => {
  try {
    const payment = new CompanyPayment(req.body);
    await payment.save();
    res.status(201).json({ success: true, message: 'Company Payment saved' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving payment', error: err });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await CompanyPayment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
