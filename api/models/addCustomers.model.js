import mongoose from 'mongoose';

const CustomerDocumentSchema = new mongoose.Schema({
  documentName: String,
  file: String,
  status: String,
});

const AddCustomerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  pinCode: String,
  country: {
    type: String,
    default: 'India',
  },
  email: String,
  phone: String,
  mobile: String,
  nomineeName: String,
  nomineeDOB: String,
  nomineeContact: String,
  nomineeRelation: String,
  panNo: String,
  gstNo: String,
  paymentTerms: String,
  status: {
    type: String,
    default: 'Active',
  },
  documents: [CustomerDocumentSchema], // Embedded docs
}, { timestamps: true });

const AddCustomer = mongoose.model('AddCustomer', AddCustomerSchema);
export default AddCustomer;