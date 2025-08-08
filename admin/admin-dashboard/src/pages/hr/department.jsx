import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

export default function Department() {
  const [formData, setFormData] = useState({
    departmentName: "",
    status: "Active",
  });

  const [departments, setDepartments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/departments");
      setDepartments(res.data.data || []);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        const id = departments[editIndex]._id;
        await axios.put(`http://localhost:3000/api/departments/${id}`, formData);
        alert("Department updated");
      } else {
        await axios.post("http://localhost:3000/api/departments", formData);
        alert("Department added");
      }
      setFormData({ departmentName: "", status: "Active" });
      setEditIndex(null);
      fetchDepartments();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error saving department");
    }
  };

  const handleEdit = (index) => {
    const dept = departments[index];
    setFormData({ departmentName: dept.departmentName, status: dept.status });
    setEditIndex(index);
  };

  const handleReset = () => {
    setFormData({ departmentName: "", status: "Active" });
    setEditIndex(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Department Form */}
          <div className="bg-white rounded shadow-md p-6 w-full md:w-1/2">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">🏢 Department</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Department Name</label>
                <input
                  type="text"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                >
                  {editIndex !== null ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Department List Table */}
          <div className="bg-white rounded shadow-md p-6 w-full md:w-1/2">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">📋 Department List</h2>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-2 py-2 border">Sr.No</th>
                  <th className="px-2 py-2 border">Department</th>
                  <th className="px-2 py-2 border">Active</th>
                  <th className="px-2 py-2 border">Edit</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={dept._id} className="text-center">
                    <td className="px-2 py-1 border">{index + 1}</td>
                    <td className="px-2 py-1 border">{dept.departmentName}</td>
                    <td className="px-2 py-1 border">{dept.status}</td>
                    <td className="px-2 py-1 border">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded text-xs"
                      >
                        ✏️ Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {departments.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No departments found
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
