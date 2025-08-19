import AdminLogin from '../models/AdminLogin.model.js';

// Create a new AdminLogin (only one allowed)
export const createAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if an admin already exists
    const existingAdmin = await AdminLogin.findOne({});
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists. Only one entry allowed.",
      });
    }

    const newAdmin = new AdminLogin({ email, password, isAdmin: true });
    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: newAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Admin",
      error: error.message,
    });
  }
};

// Get all AdminLogins with pagination
export const getAllAdminLogins = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await AdminLogin.countDocuments();
    const admins = await AdminLogin.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: admins,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error('Error in getAllAdminLogins:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch AdminLogin',
      error: error.message,
    });
  }
};

// Get AdminLogin by ID
export const getAdminLoginById = async (req, res) => {
  try {
    const admin = await AdminLogin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'AdminLogin not found',
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error('Error in getAdminLoginById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch AdminLogin',
      error: error.message,
    });
  }
};

// Update AdminLogin by ID
export const updateAdminLoginById = async (req, res) => {
  try {
    const updated = await AdminLogin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'AdminLogin not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'AdminLogin updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Error in updateAdminLoginById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update AdminLogin',
      error: error.message,
    });
  }
};
