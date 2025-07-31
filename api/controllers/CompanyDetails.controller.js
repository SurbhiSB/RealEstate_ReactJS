import AddCompanys from '../models/CompanyDetails.model.js';

// ✅ Create a new Company
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

// ✅ Get all Companies (with pagination)
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
      message: 'Failed to fetch Companies',
      error: error.message
    });
  }
};

// ✅ Get Company by ID (for editing)
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await AddCompanys.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error('Error in getCompanyById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get company by ID',
      error: error.message
    });
  }
};

// ✅ Update Company by ID
export const updateCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await AddCompanys.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Company updated successfully',
      data: updatedCompany
    });
  } catch (error) {
    console.error('Error in updateCompanyById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update company',
      error: error.message
    });
  }
};