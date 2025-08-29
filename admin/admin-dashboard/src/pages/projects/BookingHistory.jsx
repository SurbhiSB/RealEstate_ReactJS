import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function BookingHistory() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch project names for dropdown
    axios.get("http://localhost:3000/api/projects/all").then((res) => {
      setProjects(res.data.projects || []);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected project:", selectedProject);
    // TODO: Fetch booking history data for selected project
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
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Booking History</h2>

            {/* Project Dropdown Form */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-4">
              <label className="text-sm font-medium">Project Name</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm w-64"
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.projectName}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-1 rounded hover:bg-gray-800 text-sm"
              >
                Submit
              </button>
            </form>

            {/* Export Buttons */}
            <div className="flex space-x-2 mb-4">
              <button className="bg-gray-900 text-white px-3 py-1 rounded text-sm">Copy</button>
              <button className="bg-gray-900 text-white px-3 py-1 rounded text-sm">Excel</button>
              <button className="bg-gray-900 text-white px-3 py-1 rounded text-sm">PDF</button>
              <button className="bg-gray-900 text-white px-3 py-1 rounded text-sm">Print</button>
            </div>

            {/* Table */}
            <div className="overflow-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Booking Date</th>
                    <th className="px-3 py-2">Project Name</th>
                    <th className="px-3 py-2">Plot No</th>
                    <th className="px-3 py-2">Total Plot Area</th>
                    <th className="px-3 py-2">Associate Name</th>
                    <th className="px-3 py-2">Customer Name</th>
                    <th className="px-3 py-2">Amount</th>
                    <th className="px-3 py-2">Received</th>
                    <th className="px-3 py-2">Balance</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr>
                    <td className="px-3 py-2 text-center" colSpan={10}>
                      No data available in table
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="px-3 py-2 text-sm text-gray-500">Showing 0 to 0 of 0 entries</div>
            </div>

            {/* Pagination (optional) */}
            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-3 py-1 border rounded text-sm text-gray-500" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border rounded text-sm text-gray-500" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
