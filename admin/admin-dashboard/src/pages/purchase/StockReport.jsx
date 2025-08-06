import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";


export default function StockReportPage() {
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    projectName: "",
    itemName: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/projects/all").then((res) => {
      setProjects(res.data.projects || []);
    });

    axios.get("http://localhost:3000/api/items").then((res) => {
      const data = res.data;
      if (Array.isArray(data)) setItems(data);
      else if (Array.isArray(data.data)) setItems(data.data);
      else if (Array.isArray(data.items)) setItems(data.items);
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      $("#stockReportTable").DataTable();
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/stock-report", {
        params: filters,
      });
      setData(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Stock Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Project Name</label>
                <select
                  name="projectName"
                  value={filters.projectName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">All</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p.projectName}>
                      {p.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Item Name</label>
                <select
                  name="itemName"
                  value={filters.itemName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">All</option>
                  {items.map((i) => (
                    <option key={i._id} value={i.itemName}>
                      {i.itemName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSubmit}
                  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                >
                  Submit
                </button>
              </div>
            </div>

            <table
              id="stockReportTable"
              className="display w-full text-sm border"
            >
              <thead className="bg-gray-200">
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Item Name</th>
                  <th>Unit</th>
                  <th>In Qty</th>
                  <th>Out Qty</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.projectName}</td>
                      <td>{row.itemName}</td>
                      <td>{row.unit}</td>
                      <td>{row.inQty}</td>
                      <td>{row.outQty}</td>
                      <td>{(row.inQty || 0) - (row.outQty || 0)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}