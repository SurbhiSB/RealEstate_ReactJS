import FullPage from '../models/FullPage.model.js';

// Create a new FullPage
export const createFullPage = async (req, res) => {
  try {
    const {
      branchName,
      address,
      state,
      city,
      managerName,
      managerMobile,
      managerEmail,
      password,
      aadharNo,
      panNo,
    } = req.body;

    const newPage = new FullPages({
      branchName,
      address,
      state,
      city,
      managerName,
      managerMobile,
      managerEmail,
      password,
      aadharNo,
      panNo,
      aadharFront: req.files?.aadharFront?.[0]?.filename || null,
      aadharBack: req.files?.aadharBack?.[0]?.filename || null,
      passportPhoto: req.files?.passportPhoto?.[0]?.filename || null,
      panFile: req.files?.panFile?.[0]?.filename || null,
      otherDoc: req.files?.otherDoc?.[0]?.filename || null,
    });

    await newPage.save();

    res.status(201).json({
      success: true,
      message: "FullPage created successfully",
      data: newPage,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all FullPage with pagination
export const getAllFullPage = async (req, res) => {
  try {
    const data = await FullPage.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllFullPage:", error);
    res.status(500).json({ success: false, message: "Error fetching office expenses" });
  }
};

// Get FullPage by ID
export const getFullPageById = async (req, res) => {
  try {
    const FullPage = await FullPage.findById(req.params.id);

    if (!FullPage) {
      return res.status(404).json({
        success: false,
        message: 'FullPage not found'
      });
    }

    res.status(200).json({
      success: true,
      data: FullPage
    });
  } catch (error) {
    console.error('Error in getFullPageById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FullPage',
      error: error.message
    });
  }
};

// Update FullPage by ID
export const updateFullPageById = async (req, res) => {
  try {
    const updated = await FullPage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'FullPage not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'FullPage updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateFullPageById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update FullPage',
      error: error.message
    });
  }
};
