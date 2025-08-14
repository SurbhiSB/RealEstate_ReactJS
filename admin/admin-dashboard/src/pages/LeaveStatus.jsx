import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function LeaveStatus() {
  const [applications, setApplications] = useState([]);

  // Fetch leave applications from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/leave-applications")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching leave applications:", err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6">
          {/* Page Title */}
          <h1 className="text-xl font-semibold mb-4">Application Status</h1>

          {/* Filter Section */}
          <div className="bg-white shadow rounded-lg p-4 border">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">From Date</label>
                <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">To Date</label>
                <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>All</option>
                  <option>HR</option>
                  <option>IT</option>
                  <option>Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="bg-gray-900 text-white px-4 py-2 rounded w-full">
                  Submit
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mb-4">
              <button className="bg-gray-200 px-4 py-2 rounded">Copy</button>
              <button className="bg-gray-200 px-4 py-2 rounded">Excel</button>
              <button className="bg-gray-200 px-4 py-2 rounded">PDF</button>
              <button className="bg-gray-200 px-4 py-2 rounded">Print</button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Full Name</th>
                    <th className="px-3 py-2">Department</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">FromDate</th>
                    <th className="px-3 py-2">ToDate</th>
                    <th className="px-3 py-2">Reason</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length > 0 ? (
                    applications.map((app, index) => (
                      <tr key={app._id} className="border-b">
                        <td className="px-3 py-2 text-center">{index + 1}</td>
                        <td className="px-3 py-2">{app.employeeName}</td>
                        <td className="px-3 py-2">{app.departmentName || "-"}</td>
                        <td className="px-3 py-2">{app.leaveCategory}</td>
                        <td className="px-3 py-2">
                          {new Date(app.fromDate).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2">
                          {new Date(app.toDate).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2">{app.reason}</td>
                        <td className="px-3 py-2">{app.status || "Pending"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Showing {applications.length} entries</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded">Previous</button>
                <button className="px-3 py-1 border rounded">Next</button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm mt-4">
            Copyright © 2025. All right reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
