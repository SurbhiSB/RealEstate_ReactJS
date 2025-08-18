import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    employeeName: { type: String, required: true }, // or employeeId if you want relation
    salaryDate: { type: Date, required: true },
    month: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    year: { type: String, required: true },
    basicSalary: { type: Number, required: true },
    basicAllowance: { type: Number, default: 0 },
    mobileAllowance: { type: Number, default: 0 },
    otAllowance: { type: Number, default: 0 },
    leaveDeduction: { type: Number, default: 0 },
    advanceBalance: { type: Number, default: 0 },
    advanceDeduction: { type: Number, default: 0 },
    grossSalary: { type: Number, required: true },
    netSalary: { type: Number, required: true },
    totalDays: { type: Number, required: true },
    workDays: { type: Number, required: true },
    presentDays: { type: Number, required: true },
    leaveDays: { type: Number, default: 0 },
    remark: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Salary", salarySchema);
