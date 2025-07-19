import Group from '../models/group.model.js';

// Create a new group
export const createGroup = async (req, res, next) => {
  try {
    const { groupName, userShortName } = req.body;

    // Check for existing group with same name
    const existing = await Group.findOne({ groupName });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Group with this name already exists',
      });
    }

    const group = new Group({ groupName, userShortName });
    await group.save();

    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      data: group,
    });
  } catch (err) {
    next(err); // sends error to global error handler
  }
};

// Get all groups
export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: groups,
    });
  } catch (err) {
    next(err);
  }
};


// Update group
export const updateGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { groupName, userShortName } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { groupName, userShortName },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    res.status(200).json({ success: true, message: 'Group updated successfully', data: updatedGroup });
  } catch (err) {
    next(err);
  }
};

