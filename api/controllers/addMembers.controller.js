
import AddMember from '../models/addMembers.model.js';

// Create a new member
export const createAddMember = async (req, res) => {
  try {
    // Optional fields default to empty string if not provided
    const {
      memberType,
      fullName,
      email,
      phone,
      mobile, // 👈 This was missing
      remarks,
      companyName,
      displayName,
      contactPerson,
      contactEmail,
      contactNumber,
      gst,
      panNo,
      tds,
      paymentTerms,
      status,
      beneficiaryName = '',
      accountNumber = '',
      ifsc = '',
      bankName = ''
    } = req.body;

     if (!beneficiaryName || !accountNumber || !ifsc || !bankName) {
      return res.status(400).json({
        success: false,
        message: 'Bank details (Beneficiary Name, Account Number, IFSC, Bank Name) are required'
      });
    }

    const newMember = new AddMember({
      memberType,
      fullName,
      email,
      phone,
      mobile, // 👈 This was missing
      remarks,
      companyName,
      displayName,
      contactPerson,
      contactEmail,
      contactNumber,
      gst,
      panNo,
      tds,
      paymentTerms,
      status,
      beneficiaryName,
      accountNumber,
      ifsc,
      bankName
    });

    await newMember.save();

    res.status(201).json({
      success: true,
      message: 'Member created successfully',
      data: newMember
    });
  } catch (error) {
    console.error('Error in createAddMember:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create member',
      error: error.message
    });
  }
};

// Get all members
export const getAllAddMembers = async (req, res) => {
  try {
    const members = await AddMember.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    console.error('Error in getAllAddMembers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch members',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Failed to get member',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Failed to update member',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Failed to delete member',
      error: error.message
    });
  }
};
