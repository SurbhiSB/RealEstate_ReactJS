import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const FullPage = () => {
  const initialFormData = {
  // 🏢 Branch Office Details
  branchName: "",
  address: "",
  state: "",
  city: "",
  managerName: "",
  managerMobile: "",
  managerEmail: "",
  password: "",

  // 📑 KYC Details
  aadharNo: "",
  aadharFront: null,
  aadharBack: null,
  passportPhoto: null,
  panNo: "",
  panFile: null,
  otherDoc: null,
};

  const [formData, setFormData] = useState(initialFormData);
  const [memberList, setMemberList] = useState([]);
  const [headMasterList, setHeadMasterList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  // Fetch Members
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/addMembers/addmembers")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setMemberList(res.data.data);
        } else {
          setMemberList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching member list:", err);
        setMemberList([]);
      });
  }, []);

  // Fetch HeadMasters
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/HeadMasters/HeadMaster")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setHeadMasterList(res.data.data);
        } else {
          setHeadMasterList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching headmaster list:", err);
        setHeadMasterList([]);
      });
  }, []);

  // Fetch Projects
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/projects/all")
      .then((res) => {
        console.log("Fetched projects:", res.data);
        if (res.data.success && Array.isArray(res.data.projects)) {
          setProjectList(res.data.projects);
        } else {
          setProjectList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching project list:", err);
        setProjectList([]);
      });
  }, []);

  // Handle Input Change
 const handleChange = (e) => {
  const { name, value, files } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: files ? files[0] : value,
  }));
};
  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Build FormData object
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:3000/api/FullPage/FullPage",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        alert("SiteFees expense submitted successfully ✅");
        handleReset();
      } else {
        alert("Failed to submit SiteFees expense ❌");
      }
    } catch (error) {
      console.error("Error submitting SiteFees expense:", error);
      alert("Error occurred while submitting ❌");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 bg-white rounded-md shadow-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
            📦 SiteFees Expenses
          </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg space-y-8">
    {/* Branch Office Details Section */}
    <div className="border rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-indigo-700 border-b pb-2 mb-4">
        🏢 Branch Office Details
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {/* Branch Name */}
        <div>
          <label className="block text-sm font-medium">Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Manager Name */}
        <div>
          <label className="block text-sm font-medium">Manager Name</label>
          <input
            type="text"
            name="managerName"
            value={formData.managerName}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Manager Mobile */}
        <div>
          <label className="block text-sm font-medium">Manager Mobile</label>
          <input
            type="text"
            name="managerMobile"
            value={formData.managerMobile}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Manager Email */}
        <div>
          <label className="block text-sm font-medium">Manager Email</label>
          <input
            type="email"
            name="managerEmail"
            value={formData.managerEmail}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>
      </div>
    </div>

    {/* KYC Section */}
    <div className="border rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-indigo-700 border-b pb-2 mb-4">
        📑 KYC Details
      </h3>

      <div className="grid grid-cols-3 gap-4">
  {/* Aadhaar Number */}
        <div>
          <label className="block text-sm font-medium">Aadhar No</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Aadhaar Front */}
        <div>
          <label className="block text-sm font-medium">Upload Aadhar Front</label>
          <input type="file" name="aadharFront" onChange={handleChange} />
        </div>

        {/* Aadhaar Back */}
        <div>
          <label className="block text-sm font-medium">Upload Aadhar Back</label>
          <input type="file" name="aadharBack" onChange={handleChange} />
        </div>

        {/* Passport */}
        <div>
          <label className="block text-sm font-medium">Passport Size Photo</label>
          <input type="file" name="passportPhoto" onChange={handleChange} />
        </div>

          {/* PAN Number */}
          <div>
            <label className="block text-sm font-medium">PAN Card No</label>
            <input
              type="text"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              className="mt-1 block w-full border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* PAN File Upload */}
          <div>
            <label className="block text-sm font-medium">Upload PAN Card</label>
            <input type="file" name="panFile" onChange={handleChange} />
            {formData.panFile && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Pan Card Preview:</p>
                <img
                  src={URL.createObjectURL(formData.panFile)}
                  alt="Pan Preview"
                  className="h-20 border rounded-md mt-1"
                />
              </div>
            )}
      </div>

      {/* Other Document */}
      <div>
        <label className="block text-sm font-medium">Upload Other Document</label>
        <input type="file" name="otherDoc" onChange={handleChange} />
        {formData.otherDoc && (
          <div className="mt-2">
            <p className="text-xs text-gray-500">Other Preview:</p>
            <img
              src={URL.createObjectURL(formData.otherDoc)}
              alt="Other Preview"
              className="h-20 border rounded-md mt-1"
            />
          </div>
        )}
      </div>
    </div>

    </div>

    {/* Action Buttons */}
    <div className="flex justify-end gap-3">
      <button
        type="reset"
        className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
      >
        Reset
      </button>
      <button
        type="submit"
        className="px-4 py-2 rounded bg-indigo-700 text-white hover:bg-indigo-800"
      >
        Submit
      </button>
    </div>
  </form>
        </div>
      </div>
    </div>
  );
};

export default FullPage;
