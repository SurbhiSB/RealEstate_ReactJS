import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaySalary() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    salaryDate: "",
    month: "",
    year: "",
    basicSalary: "",
    basicAllowance: "",
    mobileAllowance: "",
    otAllowance: "",
    leaveDeduction: "",
    advanceBalance: "",
    advanceDeduction: "",
    grossSalary: "",
    netSalary: "",
    totalDays: "",
    workDays: "",
    presentDays: "",
    leaveDays: "",
    remark: "",
  });

  // ✅ Fetch employees for dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/employees");
        setEmployees(res.data || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3000/api/salary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert("Salary record saved successfully!");
  } catch (err) {
    console.error("Error saving salary:", err);
    alert("Something went wrong");
  }
};


  const handleReset = () => {
    setFormData({
      employeeName: "",
      salaryDate: "",
      month: "",
      year: "",
      basicSalary: "",
      basicAllowance: "",
      mobileAllowance: "",
      otAllowance: "",
      leaveDeduction: "",
      advanceBalance: "",
      advanceDeduction: "",
      grossSalary: "",
      netSalary: "",
      totalDays: "",
      workDays: "",
      presentDays: "",
      leaveDays: "",
      remark: "",
    });
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
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Pay Salary</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                {/* Employee Name Dropdown from DB */}
                <label className="block text-sm font-medium mb-1">
                  Employee Name
                </label>
                <select
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp.name}>
                      {emp.name}
                    </option>
                  ))}
                </select>

                {/* Other fields (left column) */}
            <label className="block text-sm font-medium mt-4 mb-1">
  Month
</label>
<select
  name="month"
  value={formData.month}
  onChange={handleChange}
  className="w-full border rounded px-3 py-2"
>
  <option value="">-- Select Month --</option>
  <option value="January">January</option>
  <option value="February">February</option>
  <option value="March">March</option>
  <option value="April">April</option>
  <option value="May">May</option>
  <option value="June">June</option>
  <option value="July">July</option>
  <option value="August">August</option>
  <option value="September">September</option>
  <option value="October">October</option>
  <option value="November">November</option>
  <option value="December">December</option>
</select>



                <label className="block text-sm font-medium mt-4 mb-1">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  value={formData.basicSalary}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Mobile Allowance
                </label>
                <input
                  type="number"
                  name="mobileAllowance"
                  value={formData.mobileAllowance}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Gross Salary
                </label>
                <input
                  type="number"
                  name="grossSalary"
                  value={formData.grossSalary}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Advance Balance
                </label>
                <input
                  type="number"
                  name="advanceBalance"
                  value={formData.advanceBalance}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  readOnly
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Net Salary
                </label>
                <input
                  type="number"
                  name="netSalary"
                  value={formData.netSalary}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Work Days
                </label>
                <input
                  type="number"
                  name="workDays"
                  value={formData.workDays}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Leave Days
                </label>
                <input
                  type="number"
                  name="leaveDays"
                  value={formData.leaveDays}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Right Column */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Salary Date
                </label>
                <input
                  type="date"
                  name="salaryDate"
                  value={formData.salaryDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2025"
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Basic Allowance
                </label>
                <input
                  type="number"
                  name="basicAllowance"
                  value={formData.basicAllowance}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  OT Allowance
                </label>
                <input
                  type="number"
                  name="otAllowance"
                  value={formData.otAllowance}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Leave Deduction
                </label>
                <input
                  type="number"
                  name="leaveDeduction"
                  value={formData.leaveDeduction}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Advance Deduction
                </label>
                <input
                  type="number"
                  name="advanceDeduction"
                  value={formData.advanceDeduction}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Total Days
                </label>
                <input
                  type="number"
                  name="totalDays"
                  value={formData.totalDays}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Present Days
                </label>
                <input
                  type="number"
                  name="presentDays"
                  value={formData.presentDays}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <label className="block text-sm font-medium mt-4 mb-1">
                  Remark
                </label>
                <input
                  type="text"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                type="submit"
                className="bg-purple-900 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
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
