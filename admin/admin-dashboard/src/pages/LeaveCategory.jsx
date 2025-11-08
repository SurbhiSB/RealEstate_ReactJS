import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function LeaveCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [isCarryForward, setIsCarryForward] = useState("No");
  const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/leave-categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/leave-categories", {
        categoryName,
        isCarryForward
      });
      fetchCategories(); // refresh list
      setCategoryName("");
      setIsCarryForward("No");
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  const handleReset = () => {
    setCategoryName("");
    setIsCarryForward("No");
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
          <h1 className="text-xl font-bold text-gray-700 mb-4">Leave Category</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left side - Form */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
                <span role="img" aria-label="icon">📝</span>
                <h2 className="font-semibold text-gray-700">Leave Category</h2>
              </div>

              <form className="p-4 space-y-4" onSubmit={handleSubmit}>
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Enter category name"
                    required
                  />
                </div>

                {/* Is Carry Forward */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Is Carry Forward
                  </label>
                  <select
                    value={isCarryForward}
                    onChange={(e) => setIsCarryForward(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
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

            {/* Right side - Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
                <span role="img" aria-label="icon">📋</span>
                <h2 className="font-semibold text-gray-700">Leave Category List</h2>
              </div>

              <div className="p-4 overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2 text-sm">Sr.No</th>
                      <th className="border px-3 py-2 text-sm">Category</th>
                      <th className="border px-3 py-2 text-sm">Is Carry Forward</th>
                      <th className="border px-3 py-2 text-sm">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, index) => (
                      <tr key={cat._id}>
                        <td className="border px-3 py-2 text-sm text-center">
                          {index + 1}
                        </td>
                        <td className="border px-3 py-2 text-sm">
                          {cat.categoryName}
                        </td>
                        <td className="border px-3 py-2 text-sm">
                          {cat.isCarryForward}
                        </td>
                        <td className="border px-3 py-2 text-sm text-center">
                          <button className="text-blue-600 hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                    {categories.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-500">
                          No categories found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
