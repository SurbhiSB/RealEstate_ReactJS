import AddEdits from '../models/AddEdit.model.js';

// Create a new AddEdit
export const createAddEdit = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { categoryName, earnUpto, status } = req.body;
    const icon = req.file ? req.file.filename : null;

    const newAddEdit = new AddEdits({
      categoryName,
      earnUpto,
      status,
      icon,
    });

    await newAddEdit.save();

    res.status(201).json({
      success: true,
      message: "AddEdit created successfully",
      data: newAddEdit,
    });
  } catch (error) {
    console.error("Error in createAddEdit:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get all AddEdits with pagination
export const getAllAddEdits = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await AddEdits.countDocuments();
    const addEditsList = await AddEdits.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: addEditsList,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error("Error in getAllAddEdits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch AddEdits",
      error: error.message
    });
  }
};

// Get AddEdit by ID
export const getAddEditById = async (req, res) => {
  try {
    const AddEdit = await AddEdits.findById(req.params.id);

    if (!AddEdit) {
      return res.status(404).json({
        success: false,
        message: 'AddEdit not found'
      });
    }

    res.status(200).json({
      success: true,
      data: AddEdit
    });
  } catch (error) {
    console.error('Error in getAddEditById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch AddEdit',
      error: error.message
    });
  }
};

// Update AddEdit by ID
export const updateAddEditById = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, earnUpto, status } = req.body;
    const icon = req.file ? req.file.filename : undefined;

    const updateData = { categoryName, earnUpto, status };
    if (icon) updateData.icon = icon;

    const updated = await AddEdits.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "AddEdit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "AddEdit updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error in updateAddEditById:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update AddEdit",
      error: error.message,
    });
  }
};
