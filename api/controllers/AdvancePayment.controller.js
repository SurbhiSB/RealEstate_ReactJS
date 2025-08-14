import AdvancePayment from '../models/AdvancePayment.model.js';

// Create a new AdvancePayment
export const createAdvancePayment = async (req, res) => {
  try {
    const newAdvancePayment = new AdvancePayment(req.body);
    await newAdvancePayment.save();
    res.status(201).json({
      success: true,
      message: 'AdvancePayment created successfully',
      data: newAdvancePayment
    });
  } catch (error) {
    console.error('Error in createAdvancePayments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create AdvancePayment',
      error: error.message
    });
  }
};

// Get all AdvancePayment with pagination
export const getAllAdvancePayments = async (req, res) => {
  try {
    const { site, fromDate, toDate } = req.query; // 'site' matches your frontend params
    let filter = {};

    // Filter by site/vendor
    if (site) {
      filter.site = site; // change this key to match your DB field name
    }

    // Filter by date range
    if (fromDate && toDate) {
      filter.date = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const payments = await AdvancePayment.find(filter);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get AdvancePayment by ID
export const getaddAdvancePaymentById = async (req, res) => {
  try {
    const AdvancePayment = await AdvancePayment.findById(req.params.id);

    if (!AdvancePayment) {
      return res.status(404).json({
        success: false,
        message: 'AdvancePayment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: AdvancePayment
    });
  } catch (error) {
    console.error('Error in getAdvancePaymentById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch AdvancePayment',
      error: error.message
    });
  }
};

// Update AdvancePayment by ID
export const updateAdvancePaymentsById = async (req, res) => {
  try {
    const updated = await AdvancePayment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'AdvancePayment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'AdvancePayment updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateAdvancePaymentById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update AdvancePayment',
      error: error.message
    });
  }
};
