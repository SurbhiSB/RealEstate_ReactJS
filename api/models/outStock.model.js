// models/outStock.model.js
import mongoose from 'mongoose';

const outStockSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  itemName: { type: String, required: true },
  issueTo: { type: String, required: true },
  outDate: { type: Date, required: true },
  
 
  quantity: { type: Number, required: true },
  unit: { type: String },
  remarks: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model('OutStock', outStockSchema);
