import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function InStock() {
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    vendorName: "",
    itemName: "",
    quantity: "",
    unit: "",
    remarks: "",
  });

  useEffect(() => {
    // Fetch projects
    axios.get("http://localhost:3000/api/projects/all")
      .then((res) => setProjects(res.data.projects || []))
      .catch((err) => console.error("Error loading projects", err));

    // Fetch vendors
    axios.get("http://localhost:3000/api/addMembers/addmembers")
      .then((res) => {
        const vendorsOnly = res.data.data.filter(m => m.memberType?.toLowerCase() === "vendor");
        setVendors(vendorsOnly);
      })
      .catch((err) => console.error("Error loading vendors", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // TODO: Submit to backend if needed
  };

  const handleReset = () => {
    setFormData({
      projectName: "",
      vendorName: "",
      itemName: "",
      quantity: "",
      unit: "",
      remarks: "",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-6">In-Stock Entry</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <select
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">-- Select Project --</option>
                  {projects.map((proj) => (
                    <option key={proj._id} value={proj.projectName}>
                      {proj.projectName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vendor Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Vendor Name</label>
                <select
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">-- Select Vendor --</option>
                  {vendors.map((vendor) => (
                    <option key={vendor._id} value={vendor.fullName}>
                      {vendor.fullName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter item name"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter quantity"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium mb-1">Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="e.g. kg, pcs"
                />
              </div>

              {/* Remarks */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Any additional notes..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-center gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
