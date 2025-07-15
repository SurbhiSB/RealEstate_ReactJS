import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';


export const getStats = async (req, res, next) => {
    try {
        const userCount = await User.countDocuments();
        const listingCount = await Listing.countDocuments();
        res.status(200).json({ userCount, listingCount });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
        const listings = await Listing.find().sort({ createdAt: -1 });
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
};

export const createListing = async (req, res) => {
  try {
    const { 
      name, description, address, regularPrice, discountPrice,
      bathrooms, bedrooms, furnished, parking, type, offer, imageUrls, UserRef
    } = req.body;

    // Assume `req.user` is set by your verifyToken middleware
    const createdBy = req.user._id;
    const role = req.user.isAdmin ? 'admin' : 'user';

    const listing = new Listing({
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      UserRef,
      createdBy,
      role
    });

    await listing.save();
    res.status(201).json({ message: 'Listing created successfully', listing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create listing', error });
  }
};
