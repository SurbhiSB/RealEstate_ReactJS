import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

export default function POListPage() {
  const [siteList, setSiteList] = useState([]);
  const [payments, setPayments] = useState([]);

  const [formData, setFormData] = useState({
    site: '',
    fromDate: '',
    toDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Addsite/Addsite")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setSiteList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching site list:", err);
        setSiteList([]);
      });
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/WorkStatus");
        if (res.data.success) {
          setPayments(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-4">
          <div className="text-xl font-semibold mb-4">Work Status</div>

          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site</label>
              <select
                name="site"
                value={formData.site}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Site</option>
                {siteList.map((site) => (
                  <option key={site._id} value={site.SiteName}>
                    {site.SiteName}
                  </option>
                ))}
              </select>
            </div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-1 hover:bg-gray-900">
              Submit
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            {["Copy", "Excel", "PDF", "Print"].map((action) => (
              <button
                key={action}
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-950"
              >
                {action}
              </button>
            ))}
          </div>

          {/* PO List Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-300 text-sm text-left">
  <thead className="bg-gray-100 text-gray-700">
    <tr>
      <th className="px-4 py-2">Name</th>
      <th className="px-4 py-2">PerDay</th>
      <th className="px-4 py-2">Total Work(days)</th>
      <th className="px-4 py-2">Amount</th>
      <th className="px-4 py-2">View Details</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {payments.length === 0 ? (
      <tr>
        <td className="px-4 py-2 text-center" colSpan="5">
          No Data
        </td>
      </tr>
    ) : (
      payments.map((pay, index) => (
        <tr key={pay._id}>
          <td className="px-4 py-2">{pay.name || "-"}</td>
          <td className="px-4 py-2">{pay.perDay || 0}</td>
          <td className="px-4 py-2">{pay.totalWorkDays || 0}</td>
          <td className="px-4 py-2">₹{parseFloat(pay.amount || 0).toFixed(2)}</td>
          <td className="px-4 py-2">
            <button className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600">
              Details
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center text-sm mt-4">
            <div>Showing 0 to 0 of 0 entries</div>
            <div className="space-x-2">
              <button className="px-3 py-1 border rounded text-gray-500 bg-gray-100">Previous</button>
              <button className="px-3 py-1 border rounded text-gray-500 bg-gray-100">Next</button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 mt-8">
            Copyright © 2025. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
