import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function BankList() {
  const [bankName, setBankName] = useState('');
  const [status, setStatus] = useState('Active');
  const [banks, setBanks] = useState([]);
  const [editId, setEditId] = useState(null);
   const navigate = useNavigate();

  const fetchBanks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/banks');
      setBanks(res.data);
    } catch (err) {
      console.error('Error fetching banks:', err);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/banks/${editId}`, { bankName, status });
      } else {
        await axios.post('http://localhost:3000/api/banks', { bankName, status });
      }
      setBankName('');
      setStatus('Active');
      setEditId(null);
      fetchBanks();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (bank) => {
    setBankName(bank.bankName);
    setStatus(bank.status);
    setEditId(bank._id);
  };

  const handleReset = () => {
    setBankName('');
    setStatus('Active');
    setEditId(null);
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
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Form */}
            <div className="border rounded-lg shadow p-4 bg-white">
              <h2 className="font-bold text-lg mb-4">🏦 New Bank</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="mt-1 p-2 border w-full rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 p-2 border w-full rounded"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded mr-2">
                  Submit
                </button>
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleReset}>
                  Reset
                </button>
              </form>
            </div>

            {/* Right: List */}
            <div className="border rounded-lg shadow p-4 bg-white">
              <h2 className="font-bold text-lg mb-4">📋 Bank List</h2>
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border">Sr.No</th>
                    <th className="p-2 border">Bank Name</th>
                    <th className="p-2 border">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {banks.map((bank, index) => (
                    <tr key={bank._id}>
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border">{bank.bankName}</td>
                      <td className="p-2 border">
                        <button onClick={() => handleEdit(bank)} className="bg-gray-800 text-white px-3 py-1 rounded">
                          ✏️ Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {banks.length === 0 && (
                    <tr>
                      <td className="p-2 border text-center" colSpan={3}>No data available</td>
                    </tr>
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
