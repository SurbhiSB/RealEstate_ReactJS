import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export const createListing = async (req, res, next) => {
  try {
    // Automatically attach user details
    const listingData = {
      ...req.body,
      createdBy: req.user.id, // user ID from JWT
      role: req.user.role || "user", // default if not included in token
    };
    const listing = await Listing.create(listingData);
    return res.status(201).json(listing);
  } catch (error) {
    return next(errorHandler(500, error));
    return res.status(500).json("error:", errorHandler);
    next(error);
  }
};
