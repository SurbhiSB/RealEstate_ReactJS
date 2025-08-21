import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

export default function AdvanceSummary() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [records, setRecords] = useState([]);

  // Fetch employees for dropdown
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // Fetch Advance Summary
  const fetchSummary = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/advancesummary", {
        params: {
          employeeId: selectedEmployee !== "All" ? selectedEmployee : "",
          fromDate,
          toDate,
        },
      });
      setRecords(res.data.data || []);
    } catch (err) {
      console.error("Error fetching advance summary:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSummary();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6">
          {/* Page Title */}
          <h2 className="text-xl font-semibold mb-4">Advance Summary</h2>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-lg p-4 border">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              
              {/* From Date */}
              <div>
                <label className="block text-sm font-medium mb-1">From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium mb-1">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* Employee Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1">Employee Name</label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="All">Select Employee</option>
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
                  className="bg-purple-900 text-white px-4 py-2 rounded-md w-full"
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
                  <th className="border px-3 py-2">Paid Date</th>
                  <th className="border px-3 py-2">Remark</th>
                  <th className="border px-3 py-2">Debit</th>
                  <th className="border px-3 py-2">Credit</th>
                  <th className="border px-3 py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((rec, index) => (
                    <tr key={rec._id}>
                      <td className="border px-3 py-2">{index + 1}</td>
                      <td className="border px-3 py-2">{rec.employeeId?._id || "-"}</td>
                      <td className="border px-3 py-2">{rec.employeeId?.name || "-"}</td>
                      <td className="border px-3 py-2">{rec.paidDate || "-"}</td>
                      <td className="border px-3 py-2">{rec.remark || "-"}</td>
                      <td className="border px-3 py-2">{rec.debit || 0}</td>
                      <td className="border px-3 py-2">{rec.credit || 0}</td>
                      <td className="border px-3 py-2">{rec.balance || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
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
