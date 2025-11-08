import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Project() {
const { id } = useParams(); // will be undefined for create mode
const isEdit = Boolean(id);

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
  status: "Ongoing",
  registrarOffice: "",
  reraNumber: "",
  imageUrl: "", // You can set a URL after uploading
  projectType: "",
});


 const [projectDocuments, setProjectDocuments] = useState([
  {
    documentName: "",
    documentUrl: "",
    status: "Pending",
  },
]);
const navigate = useNavigate();


// ------------------------------
useEffect(() => {
  if (isEdit) {
    axios.get(`http://localhost:3000/api/projects/${id}`)
      .then((res) => {
        const project = res.data.project;

        setFormData({
          groupId: project.groupId?._id || "",
          projectName: project.projectName || "",
          displayName: project.displayName || "",
          mouza: project.mouza || "",
          khNo: project.khNo || "",
          address: project.address || "",
          locationMapLink: project.locationMapLink || "",
          pinCode: project.pinCode || "",
          reraNo: project.reraNo || "",
          state: project.state || "",
          city: project.city || "",
          status: project.status || "",
          registrarOffice: project.registrarOffice || "",
          projectType: project.projectType || "",
          documents: project.documents || [],
          noOfUnits: project.noOfUnits || ""
        });
      })
      .catch((err) => console.error("Error loading project:", err));
  }
}, [id]);

// ------------------------------


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/group/all");
        setGroups(res.data.groups || []);
      } catch (error) {
        console.error("Failed to fetch groups", error);
      }
    };
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleDocChange = (e, index) => {
  const updated = [...projectDocuments];
  updated[index].documentName = e.target.value;
  setProjectDocuments(updated);
};

 const handleFileChange = (e, index) => {
  const file = e.target.files[0];
  const updated = [...projectDocuments];
  updated[index].documentUrl = file ? file.name : ""; // Simulate file name (or later handle actual file upload)
  setProjectDocuments(updated);
};


 const handleRemoveRow = (index) => {
  const updated = projectDocuments.filter((_, i) => i !== index);
  setProjectDocuments(updated);
};


 const handleAddRow = () => {
  setProjectDocuments([...projectDocuments, {
    documentName: "",
    documentUrl: "",
    status: "Pending"
  }]);
};



 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    documents: projectDocuments,
  };

  try {
    let response;

    if (isEdit) {
      // ✅ Edit Mode: PUT request
      response = await axios.put(`http://localhost:3000/api/projects/${id}`, payload);

      if (response.data.success) {
        alert("✅ Project updated successfully!");
      } else {
        alert("❌ Project update failed.");
      }
    } else {
      // ✅ Create Mode: POST request
      response = await axios.post("http://localhost:3000/api/projects/create", payload);

      if (response.data.success) {
        alert("✅ Project submitted successfully!");

        // Reset form after submission
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
          status: "Ongoing",
          registrarOffice: "",
          reraNumber: "",
          imageUrl: "",
          projectType: "",
        });
        setProjectDocuments([{ documentName: "", documentUrl: "", status: "Pending" }]);
      } else {
        alert("❌ Project submission failed.");
      }
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("❌ Server error. Try again later.");
  }
};



  const handleReset = () => {
    setFormData({
      groupId: "",
      projectName: "",
      displayName: "",
      mouza: "",
      khNo: "",
      address: "",
      locationMapLink: "",
      pinCode: "",
      reraNo: "",
      state: "",
      city: "",
      status: "",
      registrarOffice: "",
      uploadImage: "",
      projectType: "",
    });
    setProjectDocuments([{ documentName: "", documentUrl: "", status: "Pending" }]);

  };
  const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Project Details</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">

            {/* Grid: 3 columns */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Group Name</label>
                <select name="groupId" value={formData.groupId} onChange={handleChange} className="w-full border p-2 rounded">
                  <option value="">Select Group</option>
                  {groups.map((group) => (
                    <option key={group._id} value={group._id}>{group.groupName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium">Project Name</label>
                <input name="projectName" value={formData.projectName} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block font-medium">Display Name</label>
                <input name="displayName" value={formData.displayName} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block font-medium">Mouza</label>
                <input name="mouza" value={formData.mouza} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block font-medium">K. H. No</label>
                <input name="khNo" value={formData.khNo} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <div className="col-span-3">
                <label className="block font-medium">Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block font-medium">Location Map Link</label>
                <input name="locationMapLink" value={formData.locationMapLink} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block font-medium">State</label>
                <select name="state" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded">
                  <option value="">--Select--</option>
                  <option>Maharashtra</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">City</label>
                <input name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block font-medium">Pin Code</label>
                <input name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block font-medium">Registrar Office</label>
                <input name="registrarOffice" value={formData.registrarOffice} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block font-medium">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
                  <option value="">--Select--</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Upload Image</label>
                <input name="uploadImage" value={formData.uploadImage} onChange={handleChange} placeholder="Image URL for now" className="w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block font-medium">Project Type</label>
                <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full border p-2 rounded">
                  <option value="">--Select--</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">RERA Number</label>
                <input name="reraNo" value={formData.reraNo} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
            </div>

            {/* Project Documents Table */}
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2">Project Documents</h3>
              <table className="w-full border text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-2 border">Document Name</th>
                    <th className="p-2 border">Attach Document</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {projectDocuments.map((doc, index) => (
                    <tr key={index}>
                      <td className="p-2 border">
                        <input
                          value={doc.docName}
                          onChange={(e) => handleDocChange(e, index)}
                          className="w-full border p-1"
                          placeholder="Document Name"
                        />
                      </td>
                      <td className="p-2 border">
                        <input type="file" onChange={(e) => handleFileChange(e, index)} />
                      </td>
                      <td className="p-2 border text-green-600">{doc.status}</td>
                      <td className="p-2 border text-red-600 cursor-pointer" onClick={() => handleRemoveRow(index)}>
                        Remove
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={handleAddRow}
                className="mt-2 text-blue-600 text-sm"
              >
                + Add Row
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
             <button
  type="submit"
  onClick={handleSubmit}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  Submit
</button>

             <button
  type="button"
  onClick={() => {
    setFormData({ /* reset to default values */ });
    setProjectDocuments([{ documentName: "", documentUrl: "", status: "Pending" }]);
  }}
  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 ml-2"
>
  Reset
</button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
