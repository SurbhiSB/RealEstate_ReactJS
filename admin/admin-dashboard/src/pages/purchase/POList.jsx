import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function POListPage() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
   const navigate = useNavigate();

useEffect(() => {
  const fetchVendors = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/addMembers/addmembers");
      console.log("RAW response:", res);
      console.log("res.data:", res.data);
      console.log("All memberTypes:", res.data.data.map(m => m.memberType));

      const vendorList = res.data.data.filter(
        (member) => member.memberType?.toLowerCase() === "vendor"
      );
      console.log("Filtered Vendors:", vendorList);

      setVendors(vendorList);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  fetchVendors();
}, []);

const [orders, setOrders] = useState([]);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/purchase-orders");
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching purchase orders:", err);
    }
  };

  fetchOrders();
}, []);
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
        <div className="p-4">
          <div className="text-xl font-semibold mb-4">PO List</div>

          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input type="date" className="border border-gray-300 px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input type="date" className="border border-gray-300 px-3 py-2 rounded-lg" />
            </div>
            <div>
             <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
 <select className="border border-gray-300 px-3 py-2 rounded-lg w-48">
  <option value="">All</option>
  {vendors.length > 0 ? (
    vendors.map((vendor) => (
      <option key={vendor._id} value={vendor.fullName}>
        {vendor.fullName}
      </option>
    ))
  ) : (
    <option disabled>Loading...</option>
  )}
</select>

</div>

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
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">PO Number</th>
                  <th className="px-4 py-2">Vendor Name</th>
                  <th className="px-4 py-2">Project Name</th>
                  <th className="px-4 py-2">PO Amount</th>
                  <th className="px-4 py-2">Delivery Date</th>
                  <th className="px-4 py-2">Attachment</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
           <tbody className="divide-y divide-gray-200">
  {orders.length === 0 ? (
    <tr>
      <td className="px-4 py-2 text-center" colSpan="9">
        No data available in table
      </td>
    </tr>
  ) : (
    orders.map((order, index) => (
      <tr key={order._id}>
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{order.poDate?.slice(0, 10)}</td>
        <td className="px-4 py-2">{order.poNumber}</td>
        <td className="px-4 py-2">{order.vendorName}</td>
        <td className="px-4 py-2">{order.projectName}</td>
        <td className="px-4 py-2">₹{order.totalAmount?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
        <td className="px-4 py-2">{order.deliveryDate?.slice(0, 10)}</td>
        <td className="px-4 py-2">
          {order.fileTitle ? (
            <a
              href={order.fileUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {order.fileTitle}
            </a>
          ) : (
            "-"
          )}
        </td>
        <td className="px-4 py-2">
          <button className="text-blue-600 hover:underline">View</button>
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
