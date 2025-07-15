import mongoose from "mongoose";
const listingSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },  
    
        bedrooms: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
      parking: {
        type: Boolean,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
   offer:{
    type: Boolean,
    required: true,
   },
   imageUrls: {
    type: Array,
    required: true,
   },
   UserRef: {
    type: String,
    required: true,
   },

createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
role: {
  type: String,
  enum: ['user', 'admin'],
  required: true
},
status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: function () {
    return this.role === 'admin' ? 'approved' : 'pending';
  }
}



    },




    
    {
        timestamps: true

}  
)

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;