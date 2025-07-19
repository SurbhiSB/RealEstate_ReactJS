import AddMember from '../models/addMembers.model.js';

// Create a new member
export const createaddMembers = async (req, res) => {
  try {
    const newMember = new AddMember(req.body);
    await newMember.save();
    res.status(201).json({ success: true, message: 'Member created successfully', data: newMember });
  } catch (error) {
    console.error('Error in createaddMembers:', error);
    res.status(500).json({ success: false, message: 'Failed to create member', error: error.message });
  }
};

// Get all members
export const getAlladdMemberss = async (req, res) => {
  try {
    const members = await AddMember.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    console.error('Error in getAlladdMemberss:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch members', error: error.message });
  }
};

// Get single member
export const getSingleMember = async (req, res) => {
  try {
    const member = await AddMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    console.error('Error in getSingleMember:', error);
    res.status(500).json({ success: false, message: 'Failed to get member', error: error.message });
  }
};

// Update member
export const updateMember = async (req, res) => {
  try {
    const updated = await AddMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Member not found for update' });
    }
    res.status(200).json({ success: true, message: 'Member updated successfully', data: updated });
  } catch (error) {
    console.error('Error in updateMember:', error);
    res.status(500).json({ success: false, message: 'Failed to update member', error: error.message });
  }
};

// Delete member
export const deleteMember = async (req, res) => {
  try {
    const deleted = await AddMember.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Member not found for deletion' });
    }
    res.status(200).json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error in deleteMember:', error);
    res.status(500).json({ success: false, message: 'Failed to delete member', error: error.message });
  }
};