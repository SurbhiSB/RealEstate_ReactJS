
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Booking = () => {
  const [activeTab, setActiveTab] = useState("loan");

  const [formData, setFormData] = useState({
    // Main form fields
    projectName: "",
    bookingDate: "",
    plotName: "",
    plotDetails: "",
    associateName: "",
    bookingStatus: "",
    saleDeedDate: "",
    agreementExecutedDate: "",
    companyRate: 0,
    marketValue: 0,
    customer1: "",
    customer2: "",
    customer3: "",
    remark: "",
    
    // Loan Details tab
    isLoanCase: "No",
    loanStatus: "",
    bankName: "",
    bankExecutive: "",
    fixingDate: "",
    disbursementDate: "",
    loanAmount: 0,
    ocrBalance: 0,
    loanRemark: "",
    
    // Saledeed Details tab
    saledeedStatus: "",
    expectedSaledeedDate: "",
    expectedAgreementExecutedDate: "",
    saledeedValue: 0,
    stampDutyPercent: 0,
    stampDutyAmount: 0,
    registrationFeesPercent: 0,
    registrationFees: 0,
    mutation: "No",
    mutationCost: 0,
    sdExpensesReceived: 0,
    saledeedRemark: "",
    
    // Document upload status
    saledeedDocuments: [],
    salariedLoanDocuments: [],
    businessLoanDocuments: []
  });


const [projects, setProjects] = useState([]);
const [plots, setPlots] = useState([]);
const navigate = useNavigate();

useEffect(() => {
  const fetchData = async () => {
    try {
      const projectRes = await axios.get("http://localhost:3000/api/projects/all");
      const plotRes = await axios.get("http://localhost:3000/api/plots");

      setProjects(projectRes.data?.projects || []);
      setPlots(plotRes.data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);


const handleMainFormSubmit = async (e) => {
  e.preventDefault();
  
  const mainFormData = {
    projectName: formData.projectName,
    bookingDate: formData.bookingDate,
    plotName: formData.plotName,
    plotDetails: formData.plotDetails,
    associateName: formData.associateName,
    bookingStatus: formData.bookingStatus,
    saleDeedDate: formData.saleDeedDate,
    agreementExecutedDate: formData.agreementExecutedDate,
    companyRate: formData.companyRate,
    marketValue: formData.marketValue,
    customer1: formData.customer1,
    customer2: formData.customer2,
    customer3: formData.customer3,
    remark: formData.remark,
  };
  
  try {
    const res = await axios.post("http://localhost:3000/api/bookings", mainFormData);
    alert("Main booking form submitted successfully!");
    console.log(res.data);
  } catch (error) {
    console.error("Main form submission failed:", error);
    console.error("Error response data:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Submitted data:", mainFormData);
    alert(`Main form submission failed: ${error.response?.data?.message || error.message}`);
  }
};

const handleLoanSubmit = async (e) => {
  e.preventDefault();
  try {
    const loanData = {
      isLoanCase: formData.isLoanCase,
      loanStatus: formData.loanStatus,
      bankName: formData.bankName,
      bankExecutive: formData.bankExecutive,
      fixingDate: formData.fixingDate,
      disbursementDate: formData.disbursementDate,
      loanAmount: formData.loanAmount,
      ocrBalance: formData.ocrBalance,
      loanRemark: formData.loanRemark,
    };
    // You can either update existing booking or create separate loan record
    const res = await axios.post("http://localhost:3000/api/bookings/loan", loanData);
    alert("Loan details submitted successfully!");
    console.log(res.data);
  } catch (error) {
    console.error("Loan form submission failed:", error);
    alert("Loan form submission failed. Check console.");
  }
};

const handleSaledeedSubmit = async (e) => {
  e.preventDefault();
  try {
    const saledeedData = {
      saledeedStatus: formData.saledeedStatus,
      expectedSaledeedDate: formData.expectedSaledeedDate,
      expectedAgreementExecutedDate: formData.expectedAgreementExecutedDate,
      saledeedValue: formData.saledeedValue,
      stampDutyPercent: formData.stampDutyPercent,
      stampDutyAmount: formData.stampDutyAmount,
      registrationFeesPercent: formData.registrationFeesPercent,
      registrationFees: formData.registrationFees,
      mutation: formData.mutation,
      mutationCost: formData.mutationCost,
      sdExpensesReceived: formData.sdExpensesReceived,
      saledeedRemark: formData.saledeedRemark,
    };
    const res = await axios.post("http://localhost:3000/api/bookings/saledeed", saledeedData);
    alert("Saledeed details submitted successfully!");
    console.log(res.data);
  } catch (error) {
    console.error("Saledeed form submission failed:", error);
    alert("Saledeed form submission failed. Check console.");
  }
};

const handleDocumentSubmit = async (e) => {
  e.preventDefault();
  try {
    const documentData = {
      saledeedDocuments: formData.saledeedDocuments,
      salariedLoanDocuments: formData.salariedLoanDocuments,
      businessLoanDocuments: formData.businessLoanDocuments,
    };
    const res = await axios.post("http://localhost:3000/api/bookings/documents", documentData);
    alert("Documents submitted successfully!");
    console.log(res.data);
  } catch (error) {
    console.error("Document submission failed:", error);
    alert("Document submission failed. Check console.");
  }
};

const handleCompleteFormSubmit = async (e) => {
  e.preventDefault();
  
  // Prepare complete form data with proper field handling
  const completeFormData = {
    ...formData,
    // Handle empty strings for ObjectId fields (same as main form handler)
  };
  
  // Convert empty strings to null for ObjectId fields
  const objectIdFields = ['associateName', 'customer1', 'customer2', 'customer3'];
  objectIdFields.forEach(field => {
    if (completeFormData[field] === '') {
      completeFormData[field] = null;
    }
  });
  
  try {
    const res = await axios.post("http://localhost:3000/api/bookings", completeFormData);
    alert("Complete form with all tabs submitted successfully!");
    console.log(res.data);
    
    // Optionally reset the form after successful submission
    // setFormData({ /* reset to initial state */ });
  } catch (error) {
    console.error("Complete form submission failed:", error);
    console.error("Error response data:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Submitted data:", completeFormData);
    alert(`Complete form submission failed: ${error.response?.data?.message || error.message}`);
  }
};



  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-populate plot details when plot is selected
    if (name === 'plotName' && value) {
      const selectedPlot = plots.find(plot => plot._id === value);
      if (selectedPlot) {
        const plotDetails = `Total Area: ${selectedPlot.totalAreaSqFt || 0} sq.ft (${selectedPlot.totalAreaSqMt || 0} sq.mt)`;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          plotDetails: plotDetails
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 overflow-auto">
          {/* Main Booking Form */}
          <form onSubmit={handleMainFormSubmit}>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Main Booking Form</h2>
            
            {/* Booking Form Fields */}
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-6">
              {/* Field Columns */}
              <div>
                <label className="block text-sm font-medium">Project Name</label>
                <select
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="input w-full"
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Booking Date</label>
                <input
                  type="date"
                  name="bookingDate"
                  className="input w-full"
                  value={formData.bookingDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Plot Name</label>
                <select
                  className="input w-full"
                  name="plotName"
                  value={formData.plotName}
                  onChange={handleChange}
                >
                  <option value="">Select Plot</option>
                  {plots.map((plot) => (
                    <option key={plot._id} value={plot._id}>
                      {plot.plotName} ({plot.totalAreaSqFt} sq.ft)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Plot Details</label>
                <input
                  type="text"
                  name="plotDetails"
                  className="input w-full"
                  value={formData.plotDetails}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Associate Name</label>
                <select
                  className="input w-full"
                  name="associateName"
                  value={formData.associateName}
                  onChange={handleChange}
                >
                  <option value="">Select Associate</option>
                  {/* Hardcoded Associates */}
                  <option value="60b8c06e7c213e5e5ab9b1f1">John Doe</option>
                  <option value="60b8c06e7c213e5e5ab9b1f2">Jane Smith</option>
                  <option value="60b8c06e7c213e5e5ab9b1f3">Mike Johnson</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Booking Status</label>
                <select
                  className="input w-full"
                  name="bookingStatus"
                  value={formData.bookingStatus}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Token Received">Token Received</option>
                  <option value="Booked">Booked</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Sale Deed Executed">Sale Deed Executed</option>
                  <option value="Agreement Executed">Agreement Executed</option>
                  <option value="Sold">Sold</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Sale Deed Date</label>
                <input
                  type="date"
                  name="saleDeedDate"
                  className="input w-full"
                  value={formData.saleDeedDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Agreement Executed Date</label>
                <input
                  type="date"
                  name="agreementExecutedDate"
                  className="input w-full"
                  value={formData.agreementExecutedDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Company Rate</label>
                <input
                  type="number"
                  name="companyRate"
                  className="input w-full"
                  value={formData.companyRate}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Market Value</label>
                <input
                  type="number"
                  name="marketValue"
                  className="input w-full"
                  value={formData.marketValue}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Customer Name 1</label>
                <select
                  className="input w-full"
                  name="customer1"
                  value={formData.customer1}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {/* Hardcoded Customers */}
                  <option value="60b8c06e7c213e5e5ab9b1f4">Customer A - ABC Corp</option>
                  <option value="60b8c06e7c213e5e5ab9b1f5">Customer B - XYZ Ltd</option>
                  <option value="60b8c06e7c213e5e5ab9b1f6">Customer C - DEF Inc</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Customer Name 2</label>
                <select
                  className="input w-full"
                  name="customer2"
                  value={formData.customer2}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {/* Hardcoded Customers */}
                  <option value="60b8c06e7c213e5e5ab9b1f4">Customer A - ABC Corp</option>
                  <option value="60b8c06e7c213e5e5ab9b1f5">Customer B - XYZ Ltd</option>
                  <option value="60b8c06e7c213e5e5ab9b1f6">Customer C - DEF Inc</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Customer Name 3</label>
                <select
                  className="input w-full"
                  name="customer3"
                  value={formData.customer3}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {/* Hardcoded Customers */}
                  <option value="60b8c06e7c213e5e5ab9b1f4">Customer A - ABC Corp</option>
                  <option value="60b8c06e7c213e5e5ab9b1f5">Customer B - XYZ Ltd</option>
                  <option value="60b8c06e7c213e5e5ab9b1f6">Customer C - DEF Inc</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Remark</label>
                <textarea
                  name="remark"
                  className="input w-full"
                  value={formData.remark}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Main Form Submit & Reset Buttons */}
            <div className="flex justify-end gap-4 mt-4 mb-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Submit Main Form
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    // Reset only main form fields
                    projectName: "",
                    bookingDate: "",
                    plotName: "",
                    plotDetails: "",
                    associateName: "",
                    bookingStatus: "",
                    saleDeedDate: "",
                    agreementExecutedDate: "",
                    companyRate: 0,
                    marketValue: 0,
                    customer1: "",
                    customer2: "",
                    customer3: "",
                    remark: ""
                  }));
                }}
              >
                Reset Main Form
              </button>
            </div>
          </form>

          {/* Tabs - Add content for all required sections */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex space-x-4 border-b mb-4">
              <button
                type="button"
                onClick={() => handleTabChange("loan")}
                className={`py-2 px-4 ${
                  activeTab === "loan"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                Loan Details
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("saledeed")}
                className={`py-2 px-4 ${
                  activeTab === "saledeed"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                Saledeed Details
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("saledeedDoc")}
                className={`py-2 px-4 ${
                  activeTab === "saledeedDoc"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                Saledeed Document
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("salariedLoan")}
                className={`py-2 px-4 ${
                  activeTab === "salariedLoan"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                Salaried Loan Document
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("businessLoan")}
                className={`py-2 px-4 ${
                  activeTab === "businessLoan"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                <i className="fa fa-building mr-2"></i>Businessman Loan Document
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === "loan" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Is Loan Case
                  </label>
                  <select
                    name="isLoanCase"
                    value={formData.isLoanCase}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Loan Status
                  </label>
                  <select 
                    name="loanStatus"
                    value={formData.loanStatus}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="">Select</option>
                    <option value="Not Submitted">Not Submitted</option>
                    <option value="Lead Received">Lead Received</option>
                    <option value="Login Done">Login Done</option>
                    <option value="Sanctioned">Sanctioned</option>
                    <option value="Required Fixing">Required Fixing</option>
                    <option value="Fixing Received">Fixing Received</option>
                    <option value="Fixing Send">Fixing Send</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Disburstment Pending">Disburstment Pending</option>
                    <option value="Sale Deed Send">Sale Deed Send</option>
                    <option value="Disbursment Done">Disbursment Done</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Bank Name</label>
                  <input 
                    type="text" 
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Bank Executive
                  </label>
                  <input 
                    type="text" 
                    name="bankExecutive"
                    value={formData.bankExecutive}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Fixing Date
                  </label>
                  <input 
                    type="date" 
                    name="fixingDate"
                    value={formData.fixingDate}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Disbursement Date
                  </label>
                  <input 
                    type="date" 
                    name="disbursementDate"
                    value={formData.disbursementDate}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Loan Amount
                  </label>
                  <input 
                    type="number" 
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    OCR Balance
                  </label>
                  <input 
                    type="number" 
                    name="ocrBalance"
                    value={formData.ocrBalance}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium">
                    Loan Remark
                  </label>
                  <textarea 
                    name="loanRemark"
                    value={formData.loanRemark}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>
              </div>
            )}

            {activeTab === "saledeed" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Saledeed Status
                  </label>
                  <input 
                    type="text" 
                    name="saledeedStatus"
                    value={formData.saledeedStatus}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Expected Saledeed Date
                  </label>
                  <input
                    type="date"
                    name="expectedSaledeedDate"
                    className="input w-full"
                    value={formData.expectedSaledeedDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Expected Agreement Executed Date
                  </label>
                  <input
                    type="date"
                    name="expectedAgreementExecutedDate"
                    className="input w-full"
                    value={formData.expectedAgreementExecutedDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Sale Deed Value
                  </label>
                  <input 
                    type="number" 
                    name="saledeedValue"
                    value={formData.saledeedValue}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Stamp Duty %
                  </label>
                  <input 
                    type="number" 
                    name="stampDutyPercent"
                    value={formData.stampDutyPercent}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Stamp Duty Amount
                  </label>
                  <input 
                    type="number" 
                    name="stampDutyAmount"
                    value={formData.stampDutyAmount}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Registration Fees %
                  </label>
                  <input 
                    type="number" 
                    name="registrationFeesPercent"
                    value={formData.registrationFeesPercent}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Registration Fees
                  </label>
                  <input 
                    type="number" 
                    name="registrationFees"
                    value={formData.registrationFees}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Mutation</label>
                  <select
                    name="mutation"
                    value={formData.mutation}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Mutation Cost
                  </label>
                  <input 
                    type="number" 
                    name="mutationCost"
                    value={formData.mutationCost}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    SD Expenses Received
                  </label>
                  <input 
                    type="number" 
                    name="sdExpensesReceived"
                    value={formData.sdExpensesReceived}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Remark</label>
                  <textarea 
                    name="saledeedRemark"
                    value={formData.saledeedRemark}
                    onChange={handleChange}
                    className="input w-full" 
                  />
                </div>
              </div>
            )}

            {activeTab === "saledeedDoc" && (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-300">
                  <thead className="bg-gray-200 text-sm font-semibold text-left">
                    <tr>
                      <th className="px-4 py-2 border">Document</th>
                      <th className="px-4 py-2 border">Browse</th>
                      <th className="px-4 py-2 border">Upload Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "SALEDDEED DRAFT",
                      "NA COPY",
                      "PLOT 7/12",
                      "SANCTION LAYOUT MAP",
                    ].map((doc, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 border">{doc}</td>
                        <td className="px-4 py-2 border">
                          <input type="file" className="w-full" />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            className="input w-full"
                            defaultValue="Not Received"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "salariedLoan" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Salaried Loan Documents
                </h2>
                <div className="grid grid-cols-3 bg-gray-600 text-white font-semibold p-2 rounded">
                  <div>Document</div>
                  <div>Browse</div>
                  <div>Upload Status</div>
                </div>

                {[
                  "3 MONTH SALARY SLIP",
                  "6 MONTH BANK STATEMENT",
                  "2 YRS FORM NO 16",
                  "AADHAR CARD",
                  "PAN CARD",
                ].map((docName, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 items-center border-b py-2"
                  >
                    <div className="text-gray-700">{docName}</div>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                      onChange={(e) =>
                        console.log(`Uploading ${docName}`, e.target.files[0])
                      }
                    />
                    <div className="text-gray-600">Not Received</div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "businessLoan" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Businessman Loan Documents
                </h2>

                {/* Header row */}
                <div className="grid grid-cols-3 bg-gray-600 text-white font-semibold p-2 rounded">
                  <div>Document</div>
                  <div>Browse</div>
                  <div>Upload Status</div>
                </div>

                {/* Document rows */}
                {[
                  "3 YR ITR",
                  "3 YR COMPUTATION OF INCOME",
                  "3 YR BALANCE SHEET",
                  "1 YR BANK STATEMENT",
                  "GUMASTA",
                  "BUSINESS AADHAR CARD",
                  "BUSINESS PAN CARD",
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 items-center border-b py-2"
                  >
                    <div className="text-gray-700">{doc}</div>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                      onChange={(e) =>
                        console.log(`Uploading ${doc}`, e.target.files[0])
                      }
                    />
                    <div className="text-gray-600">Not Received</div>
                  </div>
                ))}
              </div>
            )}

            {/* Additional Tab Contents go here... */}
          </div>
          
          {/* Submit Complete Form Button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              onClick={handleCompleteFormSubmit}
            >
              Submit Complete Form (Main + All Tabs)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
