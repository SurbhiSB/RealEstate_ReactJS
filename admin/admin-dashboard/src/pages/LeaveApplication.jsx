import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function LeaveApplication() {
    const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState("");
  const [leaveCategory, setLeaveCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [applyOD, setApplyOD] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:3000/api/leave-categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/leave-applications", {
      employeeName,
      leaveCategory,
      fromDate,
      toDate,
      reason,
      applyOD
    })
      .then(() => {
        setEmployeeName("");
        setLeaveCategory("");
        setFromDate("");
        setToDate("");
        setReason("");
        setApplyOD(false);
      })
      .catch(err => console.error(err));
  };

  const handleReset = () => {
    setEmployeeName("");
    setLeaveCategory("");
    setFromDate("");
    setToDate("");
    setReason("");
    setApplyOD(false);
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

        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-700 mb-4">Leave Application</h1>

          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
              <span role="img" aria-label="icon">📝</span>
              <h2 className="font-semibold text-gray-700">Leave Application</h2>
            </div>

            <form className="p-4 space-y-4" onSubmit={handleSubmit}>
              {/* Employee Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Employee Name</label>
                <select
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                >
                  <option value="">Select Employee</option>
                  {Array.isArray(employees) && employees.map(emp => (
                    <option key={emp._id} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
              </div>

              {/* Leave Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Leave Category</label>
                <select
                  value={leaveCategory}
                  onChange={(e) => setLeaveCategory(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                >
                  <option value="">Select Category</option>
                  {Array.isArray(categories) && categories.map(cat => (
                    <option key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>
                  ))}
                </select>
              </div>

              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Reason</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter reason"
                  required
                />
              </div>

              {/* Apply for On Duty */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={applyOD}
                  onChange={(e) => setApplyOD(e.target.checked)}
                />
                <label className="text-sm font-medium text-gray-600">Apply for On Duty (OD)</label>
              </div>

              {/* Buttons */}
              <div className="flex space-x-2">
                <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Submit</button>
                <button type="button" onClick={handleReset} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Reset</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
