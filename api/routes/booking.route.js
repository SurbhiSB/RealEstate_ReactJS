import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,     // ✅ Add this
  updateBooking,      // ✅ Optional
  deleteBooking       // ✅ Optional
} from "../controllers/booking.controller.js";


const router = express.Router();

// POST /api/bookings
router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
