import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function Project() {
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    groupId: "",
    projectName: "",
    displayName: "",
    mouza: "",
    khNo: "",
    address: "",
    locationMapLink: "",
    state: "",
    city: "",
    pinCode: "",
    status: "",
    registrarOffice: "",
    reraNumber: "",
    imageUrl: "", // Static or later use file uploader
    projectType: ""
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/group/all")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.groups || []);
      })
      .catch((err) => console.error("Failed to fetch groups:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/project/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Project created successfully!");
        setFormData({
          groupId: "",
          projectName: "",
          displayName: "",
          mouza: "",
          khNo: "",
          address: "",
          locationMapLink: "",
          state: "",
          city: "",
          pinCode: "",
          status: "",
          registrarOffice: "",
          reraNumber: "",
          imageUrl: "",
          projectType: ""
        });
      } else {
        alert("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Project Details</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-md">
            
            {/* Group Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">Group Name</label>
              <select name="groupId" value={formData.groupId} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded">
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.groupName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Project Name</label>
              <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Display Name</label>
              <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Mouza</label>
              <input type="text" name="mouza" value={formData.mouza} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">K. H. No</label>
              <input type="text" name="khNo" value={formData.khNo} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-semibold mb-1">Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" rows="2" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Location Map Link</label>
              <input type="text" name="locationMapLink" value={formData.locationMapLink} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">State</label>
              <select name="state" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">--Select--</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Pin Code</label>
              <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">--Select--</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Registrar Office</label>
              <input type="text" name="registrarOffice" value={formData.registrarOffice} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">RERA Number</label>
              <input type="text" name="reraNumber" value={formData.reraNumber} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Upload Image</label>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL for now" className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Project Type</label>
              <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">--Select--</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="md:col-span-3 text-right">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Create Project</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
