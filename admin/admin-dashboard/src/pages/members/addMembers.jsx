// src/pages/members/AddMembers.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function AddMembers() {
  const [activeTab, setActiveTab] = useState('other');
  const [formData, setFormData] = useState({
    memberType: '',
    fullName: '',
    email: '',
    phone: '',
    remarks: '',
    companyName: '',
    displayName: '',
    mobile: '',
    tds: '0.00',
    status: 'Active',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/addmembers', formData);
      if (res.data.success) {
        setMessage('Member added successfully!');
        setFormData({
          memberType: '',
          fullName: '',
          email: '',
          phone: '',
          remarks: '',
          companyName: '',
          displayName: '',
          mobile: '',
          tds: '0.00',
          status: 'Active',
        });
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-4">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Member Details</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <label className="block mb-1 font-medium">Member Type</label>
              <select
                name="memberType"
                value={formData.memberType}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
              >
                <option value="">--Select--</option>
                <option value="vendor">Vendor</option>
                <option value="contractor">Contractor</option>
              </select>

              <label className="block mb-1 font-medium">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-1 font-medium">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-1 font-medium">Remark/Notes</label>
              <input
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                type="text"
                className="w-full border p-2 rounded mb-4"
              />
            </div>

            {/* Right Column */}
            <div>
              <label className="block mb-1 font-medium">Company Name</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                type="text"
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-1 font-medium">Display Name</label>
              <input
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                type="text"
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-1 font-medium">Mobile</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="text"
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-1 font-medium">TDS</label>
              <input
                name="tds"
                value={formData.tds}
                onChange={handleChange}
                type="number"
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-1 font-medium">Status</label>
              <input
                name="status"
                value={formData.status}
                onChange={handleChange}
                type="text"
                className="w-full border p-2 rounded mb-4"
              />
            </div>
          </form>

          <div className="mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            {message && <p className="mt-4 text-green-600">{message}</p>}
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t pt-4">
            <div className="flex space-x-4 mb-4">
              {['other', 'address', 'contact', 'bank'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded ${
                    activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'other' && 'Other Details'}
                  {tab === 'address' && 'Address'}
                  {tab === 'contact' && 'Contact'}
                  {tab === 'bank' && 'Bank Details'}
                </button>
              ))}
            </div>

            <div className="bg-gray-100 p-4 rounded">
              {activeTab === 'other' && <p>Other details form goes here...</p>}
              {activeTab === 'address' && <p>Address form goes here...</p>}
              {activeTab === 'contact' && <p>Contact form goes here...</p>}
              {activeTab === 'bank' && <p>Bank details form goes here...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
