import SiteFeesExpenses from '../models/SiteFeesExpenses.model.js';

// Create a new SiteFeesExpenses
export const createSiteFeesExpenses = async (req, res) => {
  try {
    const newSiteFeesExpenses = new SiteFeesExpenses(req.body);
    await newSiteFeesExpenses.save();
    res.status(201).json({
      success: true,
      message: 'SiteFeesExpenses created successfully',
      data: newSiteFeesExpenses
    });
  } catch (error) {
    console.error('Error in createSiteFeesExpenses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create SiteFeesExpenses',
      error: error.message
    });
  }
};

// Get all SiteFeesExpenses with pagination
export const getAllSiteFeesExpenses = async (req, res) => {
  try {
    const data = await SiteFeesExpenses.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllSiteFeesExpenses:", error);
    res.status(500).json({ success: false, message: "Error fetching office expenses" });
  }
};

// Get SiteFeesExpenses by ID
export const getSiteFeesExpensesById = async (req, res) => {
  try {
    const SiteFeesExpenses = await SiteFeesExpenses.findById(req.params.id);

    if (!SiteFeesExpenses) {
      return res.status(404).json({
        success: false,
        message: 'SiteFeesExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      data: SiteFeesExpenses
    });
  } catch (error) {
    console.error('Error in getSiteFeesExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SiteFeesExpenses',
      error: error.message
    });
  }
};

// Update SiteFeesExpenses by ID
export const updateSiteFeesExpensesById = async (req, res) => {
  try {
    const updated = await SiteFeesExpenses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'SiteFeesExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'SiteFeesExpenses updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateSiteFeesExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update SiteFeesExpenses',
      error: error.message
    });
  }
};
