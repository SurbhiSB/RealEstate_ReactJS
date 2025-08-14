import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const LeadCreation = () => {
  const initialFormData = {
    fullName: "",
    phone: "",
    email: "",
    propertyType: "",
    project: "",
    budget: "",
    leadSource: "",
    interactionsType: "",
    nextInteractionsDate: "",
    agentName: "",
    status: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [memberList, setMemberList] = useState([]);
  const [headMasterList, setHeadMasterList] = useState([]);
  const [projectList, setProjectList] = useState([]);

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


  
 useEffect(() => {
  axios
    .get("http://localhost:3000/api/projects/all")
    .then((res) => {
      console.log("Fetched projects:", res.data);
      if (res.data.success && Array.isArray(res.data.projects)) {
        setProjectList(res.data.projects); // ✅ change from data.data to data.projects
      } else {
        setProjectList([]);
      }
    })
    .catch((err) => {
      console.error("Error fetching project list:", err);
      setProjectList([]);
    });
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/LeadCreation/LeadCreation",
        formData
      );

      if (response.data.success) {
        alert("Miscellaneous expense submitted successfully");
        handleReset();
      } else {
        alert("Failed to submit Miscellaneous expense");
      }
    } catch (error) {
      console.error("Error submitting Miscellaneous expense:", error);
      alert("Error occurred while submitting");
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
            📦 Lead Creation
          </h2>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Full Name */}
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter full name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter phone number"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter email"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block font-semibold mb-1">Property Type</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select type</option>
            <option value="Flat">Flat</option>
            <option value="Plot">Plot</option>
            <option value="Shop">Shop</option>
            <option value="Duplex">Duplex</option>
            <option value="Bunglows">Bunglows</option>
            <option value="Villas">Villas</option>
            <option value="Residencial">Residencial</option>
            <option value="Commercial">Commercial</option>
            <option value="Other">Other</option>
            <option value="Offices">Offices</option>
          </select>
        </div>

        {/* Project */}
        <div>
          <label className="block font-semibold mb-1">Project</label>
          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select project</option>
            <option value="Project A">Project A</option>
            <option value="Project B">Project B</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block font-semibold mb-1">Budget</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter budget"
          />
        </div>

        {/* Lead Source */}
        <div>
          <label className="block font-semibold mb-1">Lead Source</label>
          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select source</option>
            <option value="Social Media">Social Media</option>
            <option value="Websites">Websites</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Ads">Ads</option>
            <option value="Freiends">Freiends</option>
            <option value="Walk Ins">Walk Ins</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Interactions Type */}
        <div>
          <label className="block font-semibold mb-1">Interactions Type</label>
          <select
            name="interactionsType"
            value={formData.interactionsType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select interaction</option>
            <option value="Call">Call</option>
            <option value="Meeting">Meeting</option>
            <option value="Viewed">Viewed</option>
            <option value="Interested">Interested</option>
            <option value="Visit">Visit</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Next Interactions Date */}
        <div>
          <label className="block font-semibold mb-1">Next Interactions Date</label>
          <input
            type="date"
            name="nextInteractionsDate"
            value={formData.nextInteractionsDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Agent Name */}
        <div>
          <label className="block font-semibold mb-1">Agent Name</label>
          <select
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select agent</option>
            <option value="Agent 1">Agent 1</option>
            <option value="Agent 2">Agent 2</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select status</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </form>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
        >
          Reset
        </button>
      </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCreation;
