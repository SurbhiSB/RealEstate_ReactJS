import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FdSdExpenses = () => {
  const initialFormData = {
  projectName: "",
 fdNumber: "",
 depositDate: "",
  maturityDate: "",
  depositAmount: "",
  maturityAmount: "",
  interestRate: "",
  paymentMode: "",
  bankAccount: "",
  depositType: "",
  liquidateDate: "",
  liquidateAmount: "",
  rlDone: false,
  gpLetterDate: "",
  gpHandoverDate: "",
   remark: ""
};

  const [formData, setFormData] = useState(initialFormData);
  const [projectList, setProjectList] = useState([]);

   const navigate = useNavigate();
  
  
  
  const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

 useEffect(() => {
  axios
    .get("http://localhost:3000/api/projects/all")
    .then((res) => {
      console.log("Fetched projects:", res.data);
      if (res.data.success && Array.isArray(res.data.projects)) {
        setProjectList(res.data.projects); // ✅ change from data.data to data.projects
      } else {
        setProjectList([]);
      }
    })
    .catch((err) => {
      console.error("Error fetching project list:", err);
      setProjectList([]);
    });
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/FdSdExpenses/FdSdExpenses",
        formData
      );

      if (response.data.success) {
        alert("FdSdExpenses submitted successfully");
        handleReset();
      } else {
        alert("Failed to submit FdSdExpenses");
      }
    } catch (error) {
      console.error("Error submitting FdSdExpenses:", error);
      alert("Error occurred while submitting");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 bg-white rounded-md shadow-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
            📦 FdSdExpensess
          </h2>

          <form onSubmit={handleSubmit} className="">
            {/* Party Name */}
            

            {/* Project Name */}
           

           


            {/* Bill Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg shadow-md bg-white">
  {/* FD/SD Number */}

   <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              
              <select
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">-- Select Project --</option>
          {projectList.map((project) => (
            <option key={project._id} value={project.projectName}>
              {project.projectName || project.projectName}
            </option>
          ))}
        </select>
            </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">FD/SD Number</label>
    <input
      type="text"
      name="fdNumber"
      value={formData.fdNumber}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    />
  </div>

  {/* Deposit Date */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Deposit Date</label>
    <input
      type="date"
      name="depositDate"
      value={formData.depositDate}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    />
  </div>

  {/* Maturity Date */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Maturity Date</label>
    <input
      type="date"
      name="maturityDate"
      value={formData.maturityDate}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    />
  </div>

  {/* Deposit Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Deposit Amount</label>
    <input
      type="number"
      name="depositAmount"
      value={formData.depositAmount}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
      step="0.01"
    />
  </div>

  {/* Maturity Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Maturity Amount</label>
    <input
      type="number"
      name="maturityAmount"
      value={formData.maturityAmount}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
      step="0.01"
    />
  </div>

  {/* Rate of Interest */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Rate of Interest (%)</label>
    <input
      type="number"
      name="interestRate"
      value={formData.interestRate}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
      step="0.01"
    />
  </div>

  {/* Mode of Payment */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Mode of Payment</label>
    <select
      name="paymentMode"
      value={formData.paymentMode}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    >
      <option value="">Select</option>
      <option value="Cash">Cash</option>
      <option value="Cheque">Cheque</option>
      <option value="Online">Online</option>
    </select>
  </div>

  {/* Bank Account */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Bank Account</label>
    <select
      name="bankAccount"
      value={formData.bankAccount}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    >
      <option value="">Select</option>
      {/* Dynamically populate if needed */}
      <option value="SBI">SBI</option>
     
    </select>
  </div>

  {/* Type */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Type</label>
    <select
      name="depositType"
      value={formData.depositType}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    >
      <option value="">Select</option>
      <option value="EXISTING">EXISTING</option>
      <option value="LIQUIDATED">LIQUIDATED</option>
      <option value="EXTENDED">EXTENDED</option>
    </select>
  </div>

  {/* Liquidate Date */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Liquidate Date</label>
    <input
      type="date"
      name="liquidateDate"
      value={formData.liquidateDate}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    />
  </div>

  {/* Liquidate Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Liquidate Amount</label>
    <input
      type="number"
      name="liquidateAmount"
      value={formData.liquidateAmount}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
      step="0.01"
    />
  </div>

  {/* RL Done */}
  <div>
    <label className="block text-sm font-medium text-gray-700">RL Done</label>
    <input
      type="text"
      name="rlDone"
      checked={formData.rlDone}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    />
  </div>

  {/* Grampanchayat Letter Date */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Grampanchayat Letter Date</label>
    <input
      type="date"
      name="gpLetterDate"
      value={formData.gpLetterDate}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    />
  </div>

  {/* Grampanchayat Handover Date */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Grampanchayat Handover Date</label>
    <input
      type="date"
      name="gpHandoverDate"
      value={formData.gpHandoverDate}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    />
  </div>

  {/* Remark */}
  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-gray-700">Remark</label>
    <textarea
      name="remark"
      value={formData.remark}
      onChange={handleChange}
      rows={3}
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
    ></textarea>
  </div>
</div>


            {/* Buttons */}
            <div className="col-span-2 flex justify-end space-x-2 mt-4">
              <button
                type="submit"
                className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-900"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FdSdExpenses;
