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
