import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WorkAllotmentHistory() {
  const navigate = useNavigate(); // ✅ FIX: define navigate

  const [siteList, setSiteList] = useState([]);
  const [payments, setPayments] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);

    const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  const [formData, setFormData] = useState({
    site: "",
    fromDate: "",
    toDate: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch Site List
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

  // Fetch All Payments / Work Allotments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/WorkAllotment/WorkAllotments"
        );
        if (res.data.success && Array.isArray(res.data.data)) {
          setPayments(res.data.data);
          setFilteredPersons(res.data.data); // Show all by default
        }
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    fetchPayments();
  }, []);

  // Handle Filter Submit
  const handleFilter = (e) => {
    e.preventDefault();

    let filtered = payments;

    // Filter by site
    if (formData.site) {
      filtered = filtered.filter((labour) => labour.site === formData.site);
    }

    // Filter by date range
    if (formData.fromDate && formData.toDate) {
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);
      filtered = filtered.filter((labour) => {
        const workDate = new Date(labour.date); // Ensure your API sends 'date'
        return workDate >= from && workDate <= to;
      });
    }

    setFilteredPersons(filtered);
  };

  // Navigate to edit page
  const handleCardClick = (item) => {
    navigate(`/Labour/WorkAllotment?id=${item._id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-4">
          <div className="text-xl font-semibold mb-4">
            Work Allotment History
          </div>

          {/* Filter Section */}
          <form
            onSubmit={handleFilter}
            className="bg-white p-4 rounded-lg shadow mb-4 flex flex-wrap gap-4 items-end"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site
              </label>
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
            <button
              type="submit"
              className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-900"
            >
              Submit
            </button>
          </form>

           {/* Work Allotment Table */}

           <div className="text-xl font-semibold mb-4">
           Work Summary
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-300 text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Allot Date</th>
                  <th className="px-4 py-2">Work Name</th>
                  <th className="px-4 py-2">Members</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPersons.length === 0 ? (
                  <tr>
                    <td className="px-4 py-2 text-center" colSpan="3">
                      No Data
                    </td>
                  </tr>
                ) : (
                  filteredPersons.map((pay) => (
                    <tr key={pay._id}>
                      <td className="px-4 py-2">{pay.createdAt || "-"}</td>
                      <td className="px-4 py-2">{pay.WorkName || "-"}</td>
                      <td className="px-4 py-2">{pay.WorkName || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <br></br>

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

          {/* Work Allotment Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-300 text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Work Name</th>
                  <th className="px-4 py-2">Site Name</th>
                  <th className="px-4 py-2">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPersons.length === 0 ? (
                  <tr>
                    <td className="px-4 py-2 text-center" colSpan="3">
                      No Data
                    </td>
                  </tr>
                ) : (
                  filteredPersons.map((pay) => (
                    <tr key={pay._id}>
                      <td className="px-4 py-2">{pay.WorkName || "-"}</td>
                      <td className="px-4 py-2">{pay.site || "-"}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
                          onClick={() => handleCardClick(pay)}
                        >
                          Edit
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
            <div>
              Showing {filteredPersons.length} of {payments.length} entries
            </div>
            <div className="space-x-2">
              <button className="px-3 py-1 border rounded text-gray-500 bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 border rounded text-gray-500 bg-gray-100">
                Next
              </button>
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
