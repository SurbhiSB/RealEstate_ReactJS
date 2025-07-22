
import AddAgent from '../models/addagent.model.js';

// Create a new Agent
export const createAddAgent = async (req, res) => {
  try {
    // Optional fields default to empty string if not provided
    const {
      AgentType,
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

    const newAgent = new AddAgent({
      AgentType,
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

    await newAgent.save();

    res.status(201).json({
      success: true,
      message: 'Agent created successfully',
      data: newAgent
    });
  } catch (error) {
    console.error('Error in createAddAgent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Agent',
      error: error.message
    });
  }
};

// Get all Agents
export const getAllAddAgents = async (req, res) => {
  try {
    const Agents = await AddAgent.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: Agents });
  } catch (error) {
    console.error('Error in getAllAddAgents:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Agents',
      error: error.message
    });
  }
};

// Get single Agent
export const getSingleAgent = async (req, res) => {
  try {
    const Agent = await AddAgent.findById(req.params.id);
    if (!Agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    res.status(200).json({ success: true, data: Agent });
  } catch (error) {
    console.error('Error in getSingleAgent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get Agent',
      error: error.message
    });
  }
};

// Update Agent
export const updateAgent = async (req, res) => {
  try {
    const updated = await AddAgent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Agent not found for update' });
    }
    res.status(200).json({ success: true, message: 'Agent updated successfully', data: updated });
  } catch (error) {
    console.error('Error in updateAgent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update Agent',
      error: error.message
    });
  }
};

// Delete Agent
export const deleteAgent = async (req, res) => {
  try {
    const deleted = await AddAgent.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Agent not found for deletion' });
    }
    res.status(200).json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Error in deleteAgent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete Agent',
      error: error.message
    });
  }
};
