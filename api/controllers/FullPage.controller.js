import FullPage from "../models/FullPage.model.js";
import multer from "multer";
import path from "path";

// ================= Multer Config =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files inside uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images or PDFs allowed"), false);
    }
  },
});

// ================= Controller Functions =================

// Create FullPage
export const createFullPage = async (req, res) => {
  try {
    const {
      branchName,
      address,
      state,
      city,
      managerName,
      managerMobile,
      managerEmail,
      password,
      aadharNo,
      panNo,
    } = req.body;

    const newFullPage = {
      branchName,
      address,
      state,
      city,
      managerName,
      managerMobile,
      managerEmail,
      password,
      aadharNo,
      panNo,
      // files: if uploaded, else null
      aadharFront: req.files?.aadharFront ? req.files.aadharFront[0].path : null,
      aadharBack: req.files?.aadharBack ? req.files.aadharBack[0].path : null,
      passportPhoto: req.files?.passportPhoto
        ? req.files.passportPhoto[0].path
        : null,
      panFile: req.files?.panFile ? req.files.panFile[0].path : null,
      otherDoc: req.files?.otherDoc ? req.files.otherDoc[0].path : null,
    };

    await FullPage.create(newFullPage);

    res.json({ success: true, message: "FullPage created successfully" });
  } catch (err) {
    console.error("Error in createFullPage:", err);
    res.status(400).json({
      success: false,
      message: "Error creating FullPage",
      error: err.message,
    });
  }
};

// Get all FullPage
export const getAllFullPage = async (req, res) => {
  try {
    const data = await FullPage.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllFullPage:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching FullPage data",
      error: error.message,
    });
  }
};

// Get FullPage by ID
export const getFullPageById = async (req, res) => {
  try {
    const data = await FullPage.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "FullPage not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error in getFullPageById:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch FullPage",
      error: error.message,
    });
  }
};

// Update FullPage by ID
export const updateFullPageById = async (req, res) => {
  try {
    const existing = await FullPage.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "FullPage not found",
      });
    }

    const updatedData = {
      ...req.body,
      aadharFront: req.files?.aadharFront
        ? req.files.aadharFront[0].path
        : existing.aadharFront,
      aadharBack: req.files?.aadharBack
        ? req.files.aadharBack[0].path
        : existing.aadharBack,
      passportPhoto: req.files?.passportPhoto
        ? req.files.passportPhoto[0].path
        : existing.passportPhoto,
      panFile: req.files?.panFile
        ? req.files.panFile[0].path
        : existing.panFile,
      otherDoc: req.files?.otherDoc
        ? req.files.otherDoc[0].path
        : existing.otherDoc,
    };

    const updated = await FullPage.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "FullPage updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error in updateFullPageById:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update FullPage",
      error: error.message,
    });
  }
};
