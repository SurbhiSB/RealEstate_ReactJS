import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CompanyPayment() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    paymentType: "",
    amount: "",
    amountToPay: "",
    paymentMode: "",
    bankName: "",
    referenceNo: "",
    issueDate: "",
    billDate: "",
    billNumber: "",
    remarks: "",
  });

  

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/api/company-payments', formData); // change URL as needed
    if (res.data.success) {
      alert('Payment submitted successfully!');
      setFormData({
        projectName: '',
        paymentType: '',
        amount: '',
        amountToPay: '',
        modeOfPayment: '',
        bankName: '',
        refNo: '',
        issueDate: '',
        billTransactionDate: '',
        billNumber: '',
        remarks: ''
      });
    }
  } catch (err) {
    console.error('Submit error:', err);
    alert('Submission failed');
  }
};


  const handleReset = () => {
    setFormData({
      projectName: "",
      paymentType: "",
      amount: "",
      amountToPay: "",
      paymentMode: "",
      bankName: "",
      referenceNo: "",
      issueDate: "",
      billDate: "",
      billNumber: "",
      remarks: "",
    });
  };

   const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");

     useEffect(() => {
        axios.get("http://localhost:3000/api/projects/all")
          .then((res) => {
            setProjects(res.data.projects || []);
          })
          .catch((err) => console.error("Error loading projects", err));
      }, []);
    
      // Fetch plots when a project is selected
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
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Company Payment</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <div className="grid grid-cols-2 gap-6">
              {/* Project Name */}
             <div>
  <label className="block text-sm font-medium mb-1">Project Name</label>
  <select
    name="projectName"
    value={selectedProject}
    onChange={(e) => {
      setSelectedProject(e.target.value);
      setFormData(prev => ({ ...prev, projectName: e.target.value }));
    }}
    className="select select-bordered w-full max-w-xs"
  >
    <option value="">-- Select Project --</option>
    {projects.map((project) => (
      <option key={project._id} value={project._id}>
        {project.projectName}
      </option>
    ))}
  </select>
</div>


              {/* Payment Type */}
             <div>
  <label className="block mb-1 font-medium">Payment Type</label>
  <select
    name="paymentType"
    value={formData.paymentType}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
  >
    <option value="">-- Select Type --</option>
    <option value="Vendor Payment">Vendor Payment</option>
    <option value="Contractor Payment">Contractor Payment</option>
    <option value="Tax Payment">Tax Payment</option>
  </select>
</div>


         {/* Amount */}
              <div>
                <label className="block mb-1 font-medium">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="0.00"
                />
              </div>

              {/* Amount to Pay */}
              <div>
                <label className="block mb-1 font-medium">Amount to Pay</label>
                <input
                  type="number"
                  name="amountToPay"
                  value={formData.amountToPay}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="0.00"
                />
              </div>

              {/* Mode of Payment */}
            <div>
  <label className="block mb-1 font-medium">Mode of Payment</label>
  <select
    name="paymentMode"
    value={formData.paymentMode}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
  >
    <option value="">-- Select Mode --</option>
    <option value="Online Transfer">Online Transfer</option>
    <option value="Cheque">Cheque</option>
    <option value="Cash">Cash</option>
    <option value="NEFT">NEFT</option>
    <option value="RTGS">RTGS</option>
  </select>
</div>


              {/* Bank Name */}
              <div>
                <label className="block mb-1 font-medium">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Select"
                />
              </div>

              {/* Reference No */}
              <div>
                <label className="block mb-1 font-medium">Ref. No. / Cheque No. Number</label>
                <input
                  type="text"
                  name="referenceNo"
                  value={formData.referenceNo}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Issue Date */}
              <div>
                <label className="block mb-1 font-medium">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Bill Number */}
              <div>
                <label className="block mb-1 font-medium">Bill Number</label>
                <input
                  type="text"
                  name="billNumber"
                  value={formData.billNumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Bill/Transaction Date */}
              <div>
                <label className="block mb-1 font-medium">Bill/Transaction Date</label>
                <input
                  type="date"
                  name="billDate"
                  value={formData.billDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Remarks (spanning full width) */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
