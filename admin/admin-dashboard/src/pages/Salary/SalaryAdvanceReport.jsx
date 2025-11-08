import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SalaryAdvanceReport() {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    employee: "All",
  });

  const [employees, setEmployees] = useState([]);
  const [reportData, setReportData] = useState([]);
    const navigate = useNavigate();

  // Fetch employees
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:3000/api/advancepayment", {   // 👈 match POST API
        params: {
          fromDate: filters.fromDate,
          toDate: filters.toDate,
          employeeId: filters.employee !== "All" ? filters.employee : "",
        },
      })
      .then((res) => setReportData(res.data))
      .catch((err) => console.error("Error fetching report:", err));
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
          <h2 className="text-xl font-bold mb-4">Advance Payment Report</h2>

          {/* Filters */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 mb-6"
          >
            <div>
              <label className="block text-sm font-medium mb-1">From Date</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) =>
                  setFilters({ ...filters, fromDate: e.target.value })
                }
                className="border p-2 rounded w-48"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To Date</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) =>
                  setFilters({ ...filters, toDate: e.target.value })
                }
                className="border p-2 rounded w-48"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Employee Name
              </label>
              <select
                value={filters.employee}
                onChange={(e) =>
                  setFilters({ ...filters, employee: e.target.value })
                }
                className="border p-2 rounded w-64"
              >
                <option value="All">All</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Report Table */}
          <div className="bg-white p-4 rounded-xl shadow overflow-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border p-2">#</th>
                  <th className="border p-2">Emp Id</th>
                  <th className="border p-2">Full Name</th>
                  <th className="border p-2">Advance Date</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">ReminderDay</th>
                  <th className="border p-2">Remark</th>
                  <th className="border p-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {reportData.length > 0 ? (
                  reportData.map((item, index) => (
                    <tr key={item._id}>
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.empId}</td>
                      <td className="border p-2">{item.fullName}</td>
                      <td className="border p-2">
                        {new Date(item.advanceDate).toLocaleDateString()}
                      </td>
                      <td className="border p-2">₹{item.advanceAmount}</td>
                      <td className="border p-2">{item.paidDayReminder}</td>
                      <td className="border p-2">{item.remark}</td>
                      <td className="border p-2">
                        <button className="bg-blue-600 text-white px-2 py-1 rounded">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border p-2 text-center" colSpan="8">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
