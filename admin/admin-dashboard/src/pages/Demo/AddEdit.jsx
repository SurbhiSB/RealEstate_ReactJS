import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function AddEdit() {
  const [categoryName, setCategoryName] = useState("");
  const [earnUpto, setEarnUpto] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [status, setStatus] = useState("Active");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get("http://localhost:3000/api/AddEdit/AddEdit")
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("earnUpto", earnUpto);
    if (categoryIcon) {
      formData.append("icon", categoryIcon);
    }
    formData.append("status", status);

    try {
      if (editId !== null) {
        await axios.put(
          `http://localhost:3000/api/AddEdit/AddEdit/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        fetchItems();
      } else {
        await axios.post("http://localhost:3000/api/AddEdit/AddEdit", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        fetchItems();
      }
      handleReset();
    } catch (error) {
  if (error.response) {
    console.log("Backend error:", error.response.data);
    alert(error.response.data.message || "Server error!");
  } else {
    console.log("Error:", error.message);
  }
}
  };

  const handleReset = () => {
    setCategoryName("");
    setEarnUpto("");
    setCategoryIcon(null);
    setStatus("Active");
    setEditId(null);
  };

  const handleEdit = (id) => {
    const item = items.find((item) => item._id === id);
    if (item) {
      setCategoryName(item.categoryName || "");
      setEarnUpto(item.earnUpto || "");
      setCategoryIcon(null); // file input can't be pre-filled
      setStatus(item.status || "Active");
      setEditId(item._id);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Add/Edit</h2>

          {/* Form Section */}
          <div className="bg-white shadow-md rounded border border-purple-300 mb-6">
            <div className="border-b border-purple-300 p-3 bg-purple-50 font-semibold text-purple-700">
              ✏️ Add/Edit
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              {/* Category Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Category Name"
                />
              </div>

              {/* Earn Upto */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Earn Upto</label>
                <input
                  type="text"
                  value={earnUpto}
                  onChange={(e) => setEarnUpto(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Earn Upto"
                />
              </div>

              {/* Category Icon */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Category Icon</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCategoryIcon(e.target.files[0])}
                  className="w-full p-2 border rounded"
                />
                <p className="text-sm text-gray-500">
                  Size should be 64x64 px
                </p>
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-purple-800 text-white px-4 py-2 rounded"
                >
                  {editId ? "Update" : "Submit"}
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

          {/* Table Section */}
          <div className="bg-white shadow-md rounded border border-purple-300">
            <div className="border-b border-purple-300 p-3 bg-purple-50 font-semibold text-purple-700">
              📋 Item List
            </div>
            <table className="w-full table-auto border-t text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Sr.No</th>
                  <th className="border px-4 py-2 text-left">Category</th>
                  <th className="border px-4 py-2 text-left">Earn upto</th>
                  <th className="border px-4 py-2 text-left">Icon</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item._id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{item.categoryName}</td>
                      <td className="border px-4 py-2">{item.earnUpto}</td>
                      <td className="border px-4 py-2">
                        {item.icon && (
                          <img
                            src={item.icon}
                            alt="Category Icon"
                            className="w-8 h-8 object-cover"
                          />
                        )}
                      </td>
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
                    <td colSpan="6" className="text-center py-3 text-gray-500">
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
