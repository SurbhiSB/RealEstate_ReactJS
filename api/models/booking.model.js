import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  documentName: { type: String, required: true },
  documentUrl: { type: String, required: false },
  uploadStatus: { type: String, default: "Not Received" }
});

const bookingSchema = new mongoose.Schema(
  {
    projectName: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    bookingDate: { type: Date, required: true },
    plotName: { type: mongoose.Schema.Types.ObjectId, ref: "Plot", required: true },
    plotDetails: { type: String },

    associateName: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    bookingStatus: { type: String },

    saleDeedDate: { type: Date },
    agreementExecutedDate: { type: Date },

    companyRate: { type: Number, default: 0 },
    marketValue: { type: Number, default: 0 },

    customer1: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    customer2: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    customer3: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    remark: { type: String },

    // Loan Tab
    isLoanCase: { type: String, default: "No" },
    loanStatus: { type: String },
    bankName: { type: String },
    bankExecutive: { type: String },
    fixingDate: { type: Date },
    disbursementDate: { type: Date },
    loanAmount: { type: Number },
    ocrBalance: { type: Number },
    loanRemark: { type: String },

    // Saledeed Tab
    saledeedStatus: { type: String },
    expectedSaledeedDate: { type: Date },
    expectedAgreementExecutedDate: { type: Date },
    saledeedValue: { type: Number },
    stampDutyPercent: { type: Number },
    stampDutyAmount: { type: Number },
    registrationFeesPercent: { type: Number },
    registrationFees: { type: Number },
    mutation: { type: String, default: "No" },
    mutationCost: { type: Number },
    sdExpensesReceived: { type: Number },
    saledeedRemark: { type: String },

    // Documents
    saledeedDocuments: [documentSchema],
    salariedLoanDocuments: [documentSchema],
    businessLoanDocuments: [documentSchema]
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);