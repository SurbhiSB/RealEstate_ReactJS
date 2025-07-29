import AddCompanys from '../models/addCompanys.model.js';

// Create a new Company
export const createAddCompany = async (req, res) => {
  try {
    const newCompany = new AddCompanys(req.body);
    await newCompany.save();
    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: newCompany
    });
  } catch (error) {
    console.error('Error in createAddCompany:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Company',
      error: error.message
    });
  }
};

// Get all Companys with pagination
export const getAllAddCompanys = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await AddCompanys.countDocuments();
    const Companys = await AddCompanys.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: Companys,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error('Error in getAllAddCompanys:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Companys',
      error: error.message
    });
  }
};
