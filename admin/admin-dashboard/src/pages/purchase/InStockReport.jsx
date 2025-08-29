import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function InStockReport() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
    projectName: "",
    itemName: "",
    vendorName: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/instock")
      .then((res) => {
        setStocks(res.data || []);
        setFilteredStocks(res.data || []);
      })
      .catch((err) => console.error("Stock fetch error:", err));

    axios.get("http://localhost:3000/api/projects/all")
      .then((res) => setProjects(res.data.projects || []))
      .catch((err) => console.error("Project fetch error:", err));

    axios.get("http://localhost:3000/api/addMembers/addmembers")
      .then((res) => {
        const vendorList = res.data.data.filter(m => m.memberType?.toLowerCase() === "vendor");
        setVendors(vendorList);
      })
      .catch((err) => console.error("Vendor fetch error:", err));

    axios.get("http://localhost:3000/api/items")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setItems(data);
        } else if (Array.isArray(data.data)) {
          setItems(data.data);
        } else if (Array.isArray(data.items)) {
          setItems(data.items);
        } else {
          console.error("Unexpected item response format:", data);
          setItems([]);
        }
      })
      .catch((err) => {
        console.error("Items fetch error:", err);
        setItems([]);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    let result = stocks;

    if (filter.fromDate)
      result = result.filter(
        (stock) => new Date(stock.billDate) >= new Date(filter.fromDate)
      );

    if (filter.toDate)
      result = result.filter(
        (stock) => new Date(stock.billDate) <= new Date(filter.toDate)
      );

    if (filter.projectName)
      result = result.filter(
        (stock) =>
          stock.projectName?.toLowerCase() ===
          filter.projectName.toLowerCase()
      );

    if (filter.itemName)
      result = result.filter(
        (stock) =>
          stock.itemName?.toLowerCase() === filter.itemName.toLowerCase()
      );

    if (filter.vendorName)
      result = result.filter(
        (stock) =>
          stock.vendorName?.toLowerCase() === filter.vendorName.toLowerCase()
      );

    setFilteredStocks(result);
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
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">In Stock Report</h2>

            {/* Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <input
                type="date"
                name="fromDate"
                value={filter.fromDate}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded"
                placeholder="From Date"
              />
              <input
                type="date"
                name="toDate"
                value={filter.toDate}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded"
                placeholder="To Date"
              />
              <select
                name="projectName"
                value={filter.projectName}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded"
              >
                <option value="">Select Project</option>
                {projects.map((proj) => (
                  <option key={proj._id} value={proj.projectName}>
                    {proj.projectName}
                  </option>
                ))}
              </select>
              <select
                name="itemName"
                value={filter.itemName}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded"
              >
                <option value="">Select Item</option>
                {items.map((item) => (
                  <option key={item._id} value={item.itemName}>
                    {item.itemName}
                  </option>
                ))}
              </select>
              <select
                name="vendorName"
                value={filter.vendorName}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded"
              >
                <option value="">Select Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor.fullName}>
                    {vendor.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={handleFilterSubmit}
                className="bg-purple-800 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setFilteredStocks(stocks)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Reset
              </button>
            </div>

            {/* Export Buttons - static for now */}
            <div className="flex gap-2 mb-4">
              {["Copy", "Excel", "PDF", "Print"].map((label) => (
                <button
                  key={label}
                  className="bg-purple-900 text-white px-4 py-2 rounded text-sm"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-auto">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="px-3 py-2 border">#</th>
                    <th className="px-3 py-2 border">Bill Date</th>
                    <th className="px-3 py-2 border">In Time</th>
                    <th className="px-3 py-2 border">Item Name</th>
                    <th className="px-3 py-2 border">Vendor Name</th>
                    <th className="px-3 py-2 border">Project Name</th>
                    <th className="px-3 py-2 border">In Qty</th>
                    <th className="px-3 py-2 border">Bill Number</th>
                    <th className="px-3 py-2 border">Vehicle No</th>
                    <th className="px-3 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center py-4">
                        No entries found
                      </td>
                    </tr>
                  ) : (
                    filteredStocks.map((stock, index) => (
                      <tr key={stock._id} className="border-t">
                        <td className="px-3 py-2 border">{index + 1}</td>
                        <td className="px-3 py-2 border">
                          {new Date(stock.billDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-3 py-2 border">{stock.inTime}</td>
                        <td className="px-3 py-2 border">{stock.itemName}</td>
                        <td className="px-3 py-2 border">{stock.vendorName}</td>
                        <td className="px-3 py-2 border">{stock.projectName}</td>
                        <td className="px-3 py-2 border">{stock.quantity}</td>
                        <td className="px-3 py-2 border">{stock.billNumber}</td>
                        <td className="px-3 py-2 border">{stock.vehicleNumber}</td>
                        <td className="px-3 py-2 border">
                          <button className="bg-purple-700 text-white px-2 py-1 text-xs rounded">
                            ✏️ Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
