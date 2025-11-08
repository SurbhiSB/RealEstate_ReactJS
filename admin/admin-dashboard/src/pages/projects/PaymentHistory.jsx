import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";


export default function PaymentHistory() {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    projectId: "All",
  });
  const [projects, setProjects] = useState([]);
  const [records, setRecords] = useState([]);

  // fetch projects
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/projects/all")
      .then((res) => setProjects(res.data.projects || []))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // fetch payments when filter changes
  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/payments/history", {
        params: {
          fromDate: filters.fromDate,
          toDate: filters.toDate,
          projectId: filters.projectId !== "All" ? filters.projectId : "",
        },
      });
      setRecords(res.data.data || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

 

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Payment History
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap items-end gap-4 mb-4">
              <div>
                <label className="text-sm font-medium">From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium">To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Project Name</label>
                <select
                  name="projectId"
                  value={filters.projectId}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                >
                  <option value="All">All Project</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={fetchPayments}
                className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
              >
                Submit
              </button>
            </div>


            {/* Table */}
            <div className="overflow-x-auto">
              <table
                id="paymentTable"
                className="display stripe hover w-full text-sm text-left"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Payment Date</th>
                    <th>Project Name</th>
                    <th>Customer Name</th>
                    <th>Plot No</th>
                    <th>Payment Mode</th>
                    <th>Amount</th>
                    <th>Cost</th>
                    <th>Balance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, index) => (
                    <tr key={rec._id}>
                      <td>{index + 1}</td>
                      <td>{rec.paymentDate}</td>
                      <td>{rec.projectName}</td>
                      <td>{rec.customerName}</td>
                      <td>{rec.plotNo}</td>
                      <td>{rec.paymentMode}</td>
                      <td>{rec.amount}</td>
                      <td>{rec.cost || "-"}</td>
                      <td>{rec.balance || "-"}</td>
                      <td>{rec.status || "Pending"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
