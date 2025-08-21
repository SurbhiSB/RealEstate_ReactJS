import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

export default function RecievedReport() {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    employee: "All",
  });

  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]); // advance received data

  // Fetch employees for dropdown
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // Fetch advance received data (with filters)
  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/advancereceived", {
        params: {
          fromDate: filters.fromDate,
          toDate: filters.toDate,
          employeeId: filters.employee !== "All" ? filters.employee : "",
        },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching advance records:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecords(); // fetch filtered data
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6">
          {/* Page Title */}
          <h2 className="text-xl font-semibold mb-4">Received Payment Report</h2>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-lg p-4 border">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
              {/* From Date */}
              <div>
                <label className="block text-sm font-medium mb-1">From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium mb-1">To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* Employee Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1">Employee Name</label>
                <select
                  name="employee"
                  value={filters.employee}
                  onChange={handleChange}
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
                  <th className="border px-3 py-2">Amount</th>
                  <th className="border px-3 py-2">Remark</th>
                  <th className="border px-3 py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((rec, index) => {
                    const emp = employees.find((e) => e._id === rec.employeeId);
                    return (
                      <tr key={rec._id}>
                        <td className="border px-3 py-2">{index + 1}</td>
                        <td className="border px-3 py-2">{rec.employeeId}</td>
                        <td className="border px-3 py-2">{emp ? emp.name : "-"}</td>
                        <td className="border px-3 py-2">{rec.advanceDate}</td>
                        <td className="border px-3 py-2">{rec.amount}</td>
                        <td className="border px-3 py-2">{rec.remark}</td>
                        <td className="border px-3 py-2">
                          <button className="bg-blue-500 text-white px-2 py-1 rounded">
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
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
