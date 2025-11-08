import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdvanceStatus() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [records, setRecords] = useState([]);
   const navigate = useNavigate();

  // Fetch employees for dropdown
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // Fetch advance status
  const fetchStatus = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/advancestatus", {
        params: {
          employeeId: selectedEmployee !== "All" ? selectedEmployee : "",
        },
      });
      setRecords(res.data.data || []); // if API returns {data: [...]}
    } catch (err) {
      console.error("Error fetching advance status:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStatus();
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
          {/* Page Title */}
          <h2 className="text-xl font-semibold mb-4">Advance Status</h2>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-lg p-4 border">
            <form onSubmit={handleSubmit} className="flex items-end gap-4">
              {/* Employee Dropdown */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Employee Name
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="All">All</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-purple-900 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2 mt-4">
            <button className="bg-gray-200 px-4 py-2 rounded-md">Copy</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md">
              Excel
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">
              PDF
            </button>
            <button className="bg-purple-900 text-white px-4 py-2 rounded-md">
              Print
            </button>
          </div>

          {/* Table Section */}
          <div className="mt-4 bg-white shadow-md rounded-lg p-4 border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">
                Showing {records.length} entries
              </span>
              <input
                type="text"
                placeholder="Search"
                className="border rounded-md px-3 py-1"
              />
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">#</th>
                  <th className="border px-3 py-2">Emp Id</th>
                  <th className="border px-3 py-2">Full Name</th>
                  <th className="border px-3 py-2">Advance</th>
                  <th className="border px-3 py-2">Paid Amount</th>
                  <th className="border px-3 py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((rec, index) => (
                    <tr key={rec._id}>
                      <td className="border px-3 py-2">{index + 1}</td>
                      <td className="border px-3 py-2">
                        {rec.employeeId?._id || "-"}
                      </td>
                      <td className="border px-3 py-2">
                        {rec.employeeId?.name || "-"}
                      </td>
                      <td className="border px-3 py-2">{rec.advance || 0}</td>
                      <td className="border px-3 py-2">{rec.paidAmount || 0}</td>
                      <td className="border px-3 py-2">{rec.balance || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-500"
                    >
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-2 text-sm">
              <span>Showing {records.length} entries</span>
              <div className="flex gap-2">
                <button className="px-2 py-1 border rounded">Previous</button>
                <button className="px-2 py-1 border rounded">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
