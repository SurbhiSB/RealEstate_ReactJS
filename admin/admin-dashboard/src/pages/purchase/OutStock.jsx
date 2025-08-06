import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function InStock() {
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
  projectName: "",
  itemName: "",
  issueTo: "",
  outDate: "",             // <-- ADD THIS
  quantity: "",
  unit: "",
  remarks: "",
});


  // Fetch data from backend
  useEffect(() => {
    axios.get("http://localhost:3000/api/projects/all")
      .then((res) => setProjects(res.data.projects || []))
      .catch((err) => console.error("Project fetch error:", err));

    axios.get("http://localhost:3000/api/addMembers/addmembers")
      .then((res) => {
        const vendorList = res.data.data.filter(m => m.memberType?.toLowerCase() === "vendor");
        setVendors(vendorList);
      })
      .catch((err) => console.error("Vendor fetch error:", err));

   axios.get("http://localhost:3000/api/items")
  .then((res) => {
    const data = res.data;
    if (Array.isArray(data)) {
      setItems(data);
    } else if (Array.isArray(data.data)) {
      setItems(data.data);
    } else if (Array.isArray(data.items)) {
      setItems(data.items);
    } else {
      console.error("Unexpected item response format:", data);
      setItems([]);
    }
  })
  .catch((err) => {
    console.error("Items fetch error:", err);
    setItems([]);
  });

  }, []);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting:", formData);
  try {
    const res = await axios.post("http://localhost:3000/api/outstock", formData);
    alert("Stock submitted successfully");
  } catch (err) {
    console.error("Submit error:", err);
    alert("Error submitting stock");
  }
};




  const handleReset = () => {
    setFormData({
      projectName: "",
      itemName: "",
      issueTo: "",
      outDate: "",
      
      
      
      quantity: "",
      unit: "",
      remarks: "",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Add Stock</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Name */}
              <div>
                <label className="block mb-1 font-medium">Project Name</label>
                <select
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select</option>
                  {projects.map((proj) => (
                    <option key={proj._id} value={proj.projectName}>
                      {proj.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Item Name</label>
                <select
  name="itemName"
  value={formData.itemName}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded px-3 py-2"
>
  <option value="">Select</option>
  {Array.isArray(items) &&
    items.map((item) => (
      <option key={item._id} value={item.itemName}>
        {item.itemName}
      </option>
  ))}
</select>

              </div>

              {/* Vendor Name */}
              {/* <div>
                <label className="block mb-1 font-medium">Vendor Name</label>
                <select
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select</option>
                  {vendors.map((vendor) => (
                    <option key={vendor._id} value={vendor.fullName}>
                      {vendor.fullName}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Bill Number */}
              <div>
                <label className="block mb-1 font-medium">Issue  To</label>
                <input
                  type="text"
                  name="issueTo"
                  value={formData.issueTo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Bill Date */}
              

              {/* In Time */}
            <div>
  <label className="block mb-1 font-medium">Out Date</label>
  <input
    type="date"
    name="outDate"
    value={formData.outDate}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-3 py-2"
    required
  />
</div>


              {/* Vehicle Number */}
            

              {/* Item Name */}
              

              {/* Item Unit */}
              <div>
                <label className="block mb-1 font-medium">Item Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Item Quantity */}
              <div>
                <label className="block mb-1 font-medium">Item Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  step="0.01"
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="block mb-1 font-medium">Remark</label>
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Buttons */}
              <div className="col-span-2 flex justify-center gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                >
                  Submit
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
        </div>
      </div>
    </div>
  );
}
