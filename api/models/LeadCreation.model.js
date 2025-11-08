import mongoose from 'mongoose';

const LeadCreationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  propertyType: {
    type: String,
    required: true,
    trim: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  leadSource: {
    type: String,
    required: true,
    trim: true
  },
  interactionsType: {
    type: String,
    required: true,
    trim: true
  },
  nextInteractionsDate: {
    type: Date,
    required: true
  },
  agentName: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const LeadCreation = mongoose.model('LeadCreation', LeadCreationSchema);

export default LeadCreation;
