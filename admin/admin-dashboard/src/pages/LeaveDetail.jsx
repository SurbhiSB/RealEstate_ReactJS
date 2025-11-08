import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function LeaveDetail() {
  const [leaveCategory, setLeaveCategory] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [leaveDays, setLeaveDays] = useState("");
  const [remark, setRemark] = useState("");
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const navigate = useNavigate();

  // Fetch categories
  
  useEffect(() => {
    axios.get("http://localhost:3000/api/leave-categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

  axios.get("http://localhost:3000/api/departments")
  .then(res => {
    const deptArray = Array.isArray(res.data) ? res.data : res.data.data || [];
    setDepartments(deptArray);
  })
  .catch(err => {
    console.error("Error fetching departments", err);
    setDepartments([]);
  });


    axios.get("http://localhost:3000/api/leave-details")
      .then(res => setLeaveDetails(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/leave-details", {
      leaveCategory,
      departmentName,
      leaveDays,
      remark
    }).then(() => {
      setLeaveCategory("");
      setDepartmentName("");
      setLeaveDays("");
      setRemark("");
      return axios.get("http://localhost:3000/api/leave-details");
    }).then(res => setLeaveDetails(res.data))
      .catch(err => console.error(err));
  };

  const handleReset = () => {
    setLeaveCategory("");
    setDepartmentName("");
    setLeaveDays("");
    setRemark("");
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
          <h1 className="text-xl font-bold text-gray-700 mb-4">Leave Details</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left - Form */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
                <span role="img" aria-label="icon">📝</span>
                <h2 className="font-semibold text-gray-700">Leave Details</h2>
              </div>

              <form className="p-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Leave Category</label>
                  <select
                    value={leaveCategory}
                    onChange={(e) => setLeaveCategory(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {Array.isArray(categories) && categories.map(cat => (
                      <option key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Department Name</label>
                <select
  value={departmentName}
  onChange={(e) => setDepartmentName(e.target.value)}
  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
  required
>
  <option value="">Select Department</option>
  {departments.map((dep) => (
    <option key={dep._id} value={dep.departmentName}>
      {dep.departmentName}
    </option>
  ))}
</select>

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Leave Days</label>
                  <input
                    type="number"
                    value={leaveDays}
                    onChange={(e) => setLeaveDays(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter leave days"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Remark</label>
                  <input
                    type="text"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter remark"
                  />
                </div>

                <div className="flex space-x-2">
                  <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">Submit</button>
                  <button type="button" onClick={handleReset} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Reset</button>
                </div>
              </form>
            </div>

            {/* Right - Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
                <span role="img" aria-label="icon">📋</span>
                <h2 className="font-semibold text-gray-700">Leave Details List</h2>
              </div>

              <div className="p-4 overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2 text-sm">Sr.No</th>
                      <th className="border px-3 py-2 text-sm">Category</th>
                      <th className="border px-3 py-2 text-sm">Department</th>
                      <th className="border px-3 py-2 text-sm">Days</th>
                      <th className="border px-3 py-2 text-sm">Remark</th>
                      <th className="border px-3 py-2 text-sm">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(leaveDetails) && leaveDetails.length > 0 ? (
                      leaveDetails.map((detail, index) => (
                        <tr key={detail._id}>
                          <td className="border px-3 py-2 text-sm text-center">{index + 1}</td>
                          <td className="border px-3 py-2 text-sm">{detail.leaveCategory}</td>
                          <td className="border px-3 py-2 text-sm">{detail.departmentName}</td>
                          <td className="border px-3 py-2 text-sm">{detail.leaveDays}</td>
                          <td className="border px-3 py-2 text-sm">{detail.remark}</td>
                          <td className="border px-3 py-2 text-sm text-center">
                            <button className="text-blue-600 hover:underline">Edit</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-gray-500">No leave details found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
