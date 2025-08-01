import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function ItemMaster() {
  const [formData, setFormData] = useState({
    itemName: '',
    unit: '',
    gst: '0',
    status: 'Active',
  });

  const [itemList, setItemList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch items on component load
  useEffect(() => {
    fetchItems();
  }, []);

const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/items');
    console.log("Fetched Items Response:", response.data); // 🪵 Log this

    if (response.data.success) {
      setItemList(response.data.items.reverse());
    }
  } catch (error) {
    console.error('Error fetching items:', error.message);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:3000/api/items", {
      itemName: formData.itemName,
      unit: formData.unit,
      gst: formData.gst,
      status: formData.status,
    });

    console.log("Submitted:", res.data);

    if (res.data.success) {
      await fetchItems();       // ✅ Fetch updated list
      handleReset();            // ✅ Reset form
    }
  } catch (err) {
    console.error("Submit Error:", err.response?.data || err.message);
  }
};

  const handleReset = () => {
    setFormData({
      itemName: '',
      unit: '',
      gst: '0',
      status: 'Active',
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const item = itemList[index];
    setFormData(item);
    setEditIndex(index);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />

        <div className="p-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Item Master</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block mb-1 text-sm font-medium">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">GST (%)</label>
                <input
                  type="number"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="col-span-2 flex gap-4 mt-2">
                <button
                  type="submit"
                  className="btn btn-primary bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  {editIndex !== null ? 'Update' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary bg-gray-400 text-white hover:bg-gray-600 px-6 py-2 rounded"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Table */}
            <div>
              <h3 className="text-lg font-medium mb-2 border-b pb-1">Item List</h3>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Item Name</th>
                      <th>Unit</th>
                      <th>GST</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(itemList) && itemList.length > 0 ? (
                      itemList.map((item, index) => (
                        <tr key={item._id || item.id}>
                          <td>{index + 1}</td>
                          <td>{item.itemName}</td>
                          <td>{item.unit}</td>
                          <td>{item.gst}</td>
                          <td>{item.status}</td>
                          <td>
                            <button
                              onClick={() => handleEdit(index)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-gray-500">No items added</td>
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
