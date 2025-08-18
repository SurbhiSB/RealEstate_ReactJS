import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function SalaryReport() {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch salary data from backend
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/salary"); // ✅ Your API route
        const data = await res.json();
        setSalaries(data);
      } catch (error) {
        console.error("Error fetching salaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Page Container */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Salary Report
          </h2>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Month */}
              <div>
                <label className="block text-sm font-medium mb-1">Month</label>
                <select className="w-full border rounded px-3 py-2">
                  {[
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
                  ].map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="number"
                  placeholder="2025"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>All</option>
                  <option>HR</option>
                  <option>IT</option>
                  <option>Finance</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex items-end">
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white shadow-md rounded-lg p-4">
            {/* Export Buttons */}
            <div className="mb-4 flex gap-2">
              <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                Copy
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                Excel
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                PDF
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                Print
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">#</th>
                    <th className="border p-2 text-left">Salary Date</th>
                    <th className="border p-2 text-left">EmpId</th>
                    <th className="border p-2 text-left">Full Name</th>
                    <th className="border p-2 text-left">Department</th>
                    <th className="border p-2 text-left">Month</th>
                    <th className="border p-2 text-left">NetSalary</th>
                    <th className="border p-2 text-left">Work Days</th>
                    <th className="border p-2 text-left">Leave Days</th>
                    <th className="border p-2 text-left">Present Days</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="border p-2 text-center" colSpan="10">
                        Loading...
                      </td>
                    </tr>
                  ) : salaries.length > 0 ? (
                    salaries.map((salary, index) => (
                      <tr key={salary._id}>
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2">{salary.salaryDate}</td>
                        <td className="border p-2">{salary.empId || "N/A"}</td>
                        <td className="border p-2">{salary.employeeName}</td>
                        <td className="border p-2">{salary.department || "N/A"}</td>
                        <td className="border p-2">{salary.month}</td>
                        <td className="border p-2">{salary.netSalary}</td>
                        <td className="border p-2">{salary.workDays}</td>
                        <td className="border p-2">{salary.leaveDays}</td>
                        <td className="border p-2">{salary.presentDays}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border p-2 text-center" colSpan="10">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination (basic static for now) */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <span>
                Showing {salaries.length} of {salaries.length} entries
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded">Previous</button>
                <button className="px-3 py-1 border rounded">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
