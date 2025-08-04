import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function BankMaster() {
  const [bankName, setBankName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [branchName, setBranchName] = useState('');
  const [status, setStatus] = useState('Active');
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get('http://localhost:3000/api/BankMaster/BankMaster')
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error('Fetch error:', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bankName.trim()) return;

    const formData = {
      bankName,
      holderName,
      accountNumber,
      ifscCode,
      branch: branchName,
      status,
    };

    try {
      if (editId !== null) {
        // Update
        await axios.put(`http://localhost:3000/api/BankMaster/BankMaster/${editId}`, formData);
        const updatedItems = items.map((item) =>
          item._id === editId ? { ...item, ...formData } : item
        );
        setItems(updatedItems);
      } else {
        // Add
        const res = await axios.post('http://localhost:3000/api/BankMaster/BankMaster', formData);
        setItems([...items, res.data.data]);
       
      }

      handleReset();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to save data');
    }
  };

  const handleReset = () => {
    setBankName('');
    setHolderName('');
    setAccountNumber('');
    setIfscCode('');
    setBranchName('');
    setStatus('Active');
    setEditId(null);
  };

  const handleEdit = (id) => {
    const item = items.find((item) => item._id === id);
    if (item) {
      setBankName(item.bankName);
      setHolderName(item.holderName);
      setAccountNumber(item.accountNumber);
      setIfscCode(item.ifscCode);
      setBranchName(item.branch);
      setStatus(item.status);
      setEditId(item._id);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Bank Master</h2>

          {/* Form */}
          <div className="bg-white shadow-md rounded border border-purple-300 mb-6">
            <div className="border-b border-purple-300 p-3 bg-purple-50 font-semibold text-purple-700">
              ➕ Add Bank Details
            </div>
            <form onSubmit={handleSubmit} className="p-6 border rounded-md bg-white shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter Bank Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">A/c Holder Name</label>
                  <input
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter A/c Holder Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">A/c Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter Account Number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter IFSC Code"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                  <input
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter Branch Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-2 rounded-md shadow-md"
                >
                  {editId ? 'Update' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-md shadow-md"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Table */}
          <div className="bg-white shadow-md rounded border border-purple-300">
            <div className="border-b border-purple-300 p-3 bg-purple-50 font-semibold text-purple-700">
              📋 Bank List
            </div>
            <table className="w-full border text-sm shadow-sm rounded">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border px-4 py-2">Sr.No</th>
                  <th className="border px-4 py-2">Bank Name</th>
                  <th className="border px-4 py-2">A/c Holder Name</th>
                  <th className="border px-4 py-2">A/c Number</th>
                  <th className="border px-4 py-2">IFSC Code</th>
                  <th className="border px-4 py-2">Branch</th>
                  <th className="border px-4 py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{item.bankName}</td>
                      <td className="border px-4 py-2">{item.holderName}</td>
                      <td className="border px-4 py-2">{item.accountNumber}</td>
                      <td className="border px-4 py-2">{item.ifscCode}</td>
                      <td className="border px-4 py-2">{item.branch}</td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No items found
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
