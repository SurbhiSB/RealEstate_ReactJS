import Booking from "../models/booking.model.js";



// POST - Create booking
export const createBooking = async (req, res, next) => {
  try {
    // Handle empty strings for ObjectId fields
    const bookingData = { ...req.body };
    
    // Convert empty strings to null for ObjectId fields
    const objectIdFields = ['associateName', 'customer1', 'customer2', 'customer3'];
    objectIdFields.forEach(field => {
      if (bookingData[field] === '') {
        bookingData[field] = null;
      }
    });
    
    // Handle array format for loan details
    if (bookingData.isLoanCase || bookingData.loanStatus || bookingData.bankName) {
      bookingData.loanDetails = [{
        isLoanCase: bookingData.isLoanCase || "No",
        loanStatus: bookingData.loanStatus || "",
        bankName: bookingData.bankName || "",
        bankExecutive: bookingData.bankExecutive || "",
        fixingDate: bookingData.fixingDate || null,
        disbursementDate: bookingData.disbursementDate || null,
        loanAmount: bookingData.loanAmount || 0,
        ocrBalance: bookingData.ocrBalance || 0,
        loanRemark: bookingData.loanRemark || ""
      }];
    }
    
    // Handle array format for saledeed details
    if (bookingData.saledeedStatus || bookingData.expectedSaledeedDate || bookingData.saledeedValue) {
      bookingData.saledeedDetails = [{
        saledeedStatus: bookingData.saledeedStatus || "",
        expectedSaledeedDate: bookingData.expectedSaledeedDate || null,
        expectedAgreementExecutedDate: bookingData.expectedAgreementExecutedDate || null,
        saledeedValue: bookingData.saledeedValue || 0,
        stampDutyPercent: bookingData.stampDutyPercent || 0,
        stampDutyAmount: bookingData.stampDutyAmount || 0,
        registrationFeesPercent: bookingData.registrationFeesPercent || 0,
        registrationFees: bookingData.registrationFees || 0,
        mutation: bookingData.mutation || "No",
        mutationCost: bookingData.mutationCost || 0,
        sdExpensesReceived: bookingData.sdExpensesReceived || 0,
        saledeedRemark: bookingData.saledeedRemark || ""
      }];
    }
    
    const newBooking = new Booking(bookingData);
    const saved = await newBooking.save();
    res.status(201).json({
      success: true,
      message: "Booking created",
      booking: saved,
    });
  } catch (err) {
    next(err);
  }
};

// GET - All bookings
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (err) {
    next(err);
  }
};

// GET - Single booking
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.status(200).json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

// PUT - Update booking
export const updateBooking = async (req, res, next) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ success: false, message: "Booking not found" });
    res.status(200).json({ success: true, booking: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE - Remove booking
export const deleteBooking = async (req, res, next) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Booking not found" });
    res.status(200).json({ success: true, message: "Booking deleted" });
  } catch (err) {
    next(err);
  }
};