import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const AddLabour = () => {
  const initialFormData = {
    name: '',
    contact: '',
    address: '',
    site: '',
    designation: '',
    paymentType: '',
    amount: '',
    joiningDate: '',
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [siteList, setSiteList] = useState([]);
  const [designationList, setDesignationList] = useState([]);

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

  // Fetch Designation List
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/LbDesignation/LbDesignation")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setDesignationList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching designation list:", err);
        setDesignationList([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If it's a number field, ensure correct type
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/AddLabour/addLabours",
        formData
      );

      if (response.data.success) {
        alert("Labour detail submitted successfully");
        handleReset();
      } else {
        alert("Failed to submit Labour Detail");
      }
    } catch (error) {
      console.error("Error submitting Labour Details:", error.response?.data || error);
      alert("Error occurred while submitting");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 bg-white rounded-md shadow-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
            📦 Labour Detail
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter Labour Name"
                required
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter Contact"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter Address"
              />
            </div>

            {/* Site */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Site</label>
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

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Designation / Role</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Designation</option>
                {designationList.map((d) => (
                  <option key={d._id} value={d.designationName}>
                    {d.designationName}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Type</label>
              <select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select Payment Type</option>
                <option value="Daily">Daily</option>
                
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment / Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="0"
                min="0"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-end space-x-2 mt-4">
              <button
                type="submit"
                className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-900"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLabour;
