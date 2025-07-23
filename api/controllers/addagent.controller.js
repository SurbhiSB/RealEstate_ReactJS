import AddAgent from '../models/addagent.model.js';

// Create a new Agent
export const createAddAgent = async (req, res) => {
  try {
    const {
      // Basic Details
       fullName,
      mobile,
      panNo,
      referByMobile,
      commission,
      activeFlag,
      email,
      phone,
      aadhar,
      referByName,
      remarkNotes,
      gender,
      joiningDate,
      dob,
      anniversaryDate,
      education,
      nomineeName,
      nomineeRelation,
      nomineeDob,
      nomineeContact,
       paymentTerms,
       profilePic,
      idProof,
      addressProof,
      otherDoc,
      address,
      city,
      state,
      pinCode,
      beneficiaryName,
      accountNumber,
      bankName,
      ifsc
    } = req.body;

    // Validation for Bank Details
    if (!beneficiaryName || !accountNumber || !ifsc || !bankName) {
      return res.status(400).json({
        success: false,
        message: 'Bank details (Beneficiary Name, Account Number, IFSC, Bank Name) are required',
      });
    }

    const newAgent = new AddAgent({
      // Basic
       fullName,
      mobile,
      panNo,
      referByMobile,
      commission,
      activeFlag,
      email,
      phone,
      aadhar,
      referByName,
      remarkNotes,
      gender,
      joiningDate,
      dob,
      anniversaryDate,
      education,
      nomineeName,
      nomineeRelation,
      nomineeDob,
      nomineeContact,
       paymentTerms,
       profilePic,
      idProof,
      addressProof,
      otherDoc,
      address,
      city,
      state,
      pinCode,
      beneficiaryName,
      accountNumber,
      bankName,
      ifsc,
    });

    await newAgent.save();

    res.status(201).json({
      success: true,
      message: 'Agent created successfully',
      data: newAgent,
    });
  } catch (error) {
    console.error('Error in createAddAgent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Agent',
      error: error.message,
    });
  }
};

// Get all Agents
export const getAllAddAgents = async (req, res) => {
  try {
    const agents = await AddAgent.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: agents });
  } catch (error) {
    console.error('Error in getAllAddAgents:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Agents',
      error: error.message,
    });
  }
};

// Get single Agent by ID
export const getSingleAgent = async (req, res) => {
  try {
    const agent = await AddAgent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    res.status(200).json({ success: true, data: agent });
  } catch (error) {
    console.error('Error in getSingleAgent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get Agent',
      error: error.message,
    });
  }
};

// Update Agent by ID
export const updateAgent = async (req, res) => {
  try {
    const updatedAgent = await AddAgent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedAgent) {
      return res.status(404).json({ success: false, message: 'Agent not found for update' });
    }
    res.status(200).json({
      success: true,
      message: 'Agent updated successfully',
      data: updatedAgent,
    });
  } catch (error) {
    console.error('Error in updateAgent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update Agent',
      error: error.message,
    });
  }
};

// Delete Agent by ID
export const deleteAgent = async (req, res) => {
  try {
    const deletedAgent = await AddAgent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) {
      return res.status(404).json({ success: false, message: 'Agent not found for deletion' });
    }
    res.status(200).json({
      success: true,
      message: 'Agent deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteAgent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete Agent',
      error: error.message,
    });
  }
};
