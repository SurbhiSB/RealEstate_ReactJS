import SendMessage from '../models/SendMessage.model.js';

// Create a new SendMessage
export const createSendMessage = async (req, res) => {
  try {
    const newSendMessage = new SendMessage(req.body);
    await newSendMessage.save();
    res.status(201).json({
      success: true,
      message: 'SendMessage created successfully',
      data: newSendMessage
    });
  } catch (error) {
    console.error('Error in createSendMessage:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create SendMessage',
      error: error.message
    });
  }
};

// Get all SendMessage with pagination
export const getAllSendMessage = async (req, res) => {
  try {
    const data = await SendMessage.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllSendMessage:", error);
    res.status(500).json({ success: false, message: "Error fetching office expenses" });
  }
};

// Get SendMessage by ID
export const getSendMessageById = async (req, res) => {
  try {
    const SendMessage = await SendMessage.findById(req.params.id);

    if (!SendMessage) {
      return res.status(404).json({
        success: false,
        message: 'SendMessage not found'
      });
    }

    res.status(200).json({
      success: true,
      data: SendMessage
    });
  } catch (error) {
    console.error('Error in getSendMessageById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SendMessage',
      error: error.message
    });
  }
};

// Update SendMessage by ID
export const updateSendMessageById = async (req, res) => {
  try {
    const updated = await SendMessage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'SendMessage not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'SendMessage updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateSendMessageById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update SendMessage',
      error: error.message
    });
  }
};
