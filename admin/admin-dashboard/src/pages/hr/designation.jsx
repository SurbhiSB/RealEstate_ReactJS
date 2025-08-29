

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Designation() {
  const [formData, setFormData] = useState({
    designationName: "",
    status: "Active",
  });
  const [designations, setDesignations] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const fetchDesignations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/designations");
      setDesignations(res.data);
    } catch (error) {
      console.error("Error fetching designations", error);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        const id = designations[editIndex]._id;
        await axios.put(`http://localhost:3000/api/designations/${id}`, formData);
      } else {
        await axios.post("http://localhost:3000/api/designations", formData);
      }
      setFormData({ designationName: "", status: "Active" });
      setEditIndex(null);
      fetchDesignations();
    } catch (error) {
      console.error("Submit Error", error);
    }
  };

  const handleEdit = (index) => {
    const data = designations[index];
    setFormData({
      designationName: data.designationName,
      status: data.status,
    });
    setEditIndex(index);
  };

  const handleReset = () => {
    setFormData({ designationName: "", status: "Active" });
    setEditIndex(null);
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
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-4">Designation</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white p-4 shadow rounded border border-purple-200">
              <h2 className="text-lg font-medium mb-3 border-b pb-2">🗂️ Designation</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Designation Name</label>
                  <input
                    type="text"
                    name="designationName"
                    value={formData.designationName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-purple-800 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Table */}
            <div className="bg-white p-4 shadow rounded border border-purple-200 overflow-x-auto">
              <h2 className="text-lg font-medium mb-3 border-b pb-2">📋 Designation List</h2>
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border px-3 py-2">Sr.No</th>
                    <th className="border px-3 py-2">Designation</th>
                    <th className="border px-3 py-2">Active</th>
                    <th className="border px-3 py-2">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {designations.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-2">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    designations.map((desig, index) => (
                      <tr key={index}>
                        <td className="border px-3 py-2">{index + 1}</td>
                        <td className="border px-3 py-2">{desig.designationName}</td>
                        <td className="border px-3 py-2">{desig.status}</td>
                        <td className="border px-3 py-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-purple-800 text-white px-2 py-1 rounded"
                          >
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


