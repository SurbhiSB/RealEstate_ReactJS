import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function ExpensesHead() {
  const [headName, setHeadName] = useState('');
  const [status, setStatus] = useState('Active');
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  
  
  
  const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:3000/api/HeadMasters/HeadMaster')
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error('Fetch error:', err));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!headName.trim()) return;

  const formData = {
    HeadMasterName: headName,
    status,
  };

  try {
    if (editId !== null) {
      // Update request
      await axios.put(`http://localhost:3000/api/HeadMasters/HeadMaster/${editId}`, formData);

      const updatedItems = items.map(item =>
        item._id === editId ? { ...item, ...formData } : item
      );
      setItems(updatedItems);
    } else {
      // Add new
      const res = await axios.post('http://localhost:3000/api/HeadMasters/HeadMaster', formData);
      setItems([...items, res.data.data]);
    }

    // Clear form
    setHeadName('');
    setStatus('Active');
    setEditId(null);
  } catch (error) {
    console.error('Submit error:', error);
  }
};

  const handleReset = () => {
    setHeadName('');
    setStatus('Active');
    setEditId(null);
  };

  const handleEdit = (id) => {
    const item = items.find((item) => item._id === id);
    if (item) {
      setHeadName(item.HeadMasterName);
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
          <h2 className="text-xl font-semibold mb-4">Expenses Head</h2>

          <div className="bg-white shadow-md rounded border border-purple-300 mb-6">
            <div className="border-b border-purple-300 p-3 bg-purple-50 font-semibold text-purple-700">
              ✏️ Expenses Head
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block mb-1 font-medium">Head Name</label>
                <input
                  type="text"
                  value={headName}
                  onChange={(e) => setHeadName(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Head Name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-purple-800 text-white px-4 py-2 rounded"
                >
                  {editId ? 'Update' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white shadow-md rounded border border-purple-300">
            <div className="border-b border-purple-300 p-3 bg-purple-50 font-semibold text-purple-700">
              📋 Item List
            </div>
            <table className="w-full table-auto border-t text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Sr.No</th>
                  <th className="border px-4 py-2 text-left">Item Name</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Edit</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item._id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{item.HeadMasterName}</td>
                      <td className="border px-4 py-2">{item.status}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-purple-800 text-white px-3 py-1 text-sm rounded"
                          onClick={() => handleEdit(item._id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-3 text-gray-500">
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
