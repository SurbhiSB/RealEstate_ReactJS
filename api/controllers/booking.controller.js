import Booking from "../models/booking.model.js";



// POST - Create booking
export const createBooking = async (req, res, next) => {
  try {
    const newBooking = new Booking(req.body);
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
