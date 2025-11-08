import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const LeadCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  const initialFormData = {
    fullName: "",
    phone: "",
    email: "",
    propertyType: "",
    projectName: "",
    budget: "",
    leadSource: "",
    interactionsType: "",
    nextInteractionsDate: "",
    agentName: "",
    status: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [agentList, setAgentList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [id, setId] = useState(null); // For edit mode

  // Get ID from query params and load data
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const leadId = params.get("id");
    if (leadId) {
      setId(leadId);
      loadLeadForEdit(leadId);
    }
  }, [location.search]);

  // Fetch agent list
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/AddAgent/AddAgent")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAgentList(res.data);
        } else if (res.data.success && Array.isArray(res.data.data)) {
          setAgentList(res.data.data);
        } else {
          setAgentList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching agent list:", err);
        setAgentList([]);
      });
  }, []);

  // Fetch project list
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/projects/all")
      .then((res) => {
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

  // Load lead for editing
  const loadLeadForEdit = async (leadId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/LeadCreation/LeadCreation/${leadId}`
      );
      if (res.data && res.data.success && res.data.data) {
        setFormData(res.data.data); // ✅ Backend returns "data", not "lead"
      }
    } catch (err) {
      console.error("Error loading lead:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (id) {
        // UPDATE request
        response = await axios.put(
          `http://localhost:3000/api/LeadCreation/LeadCreation/${id}`,
          formData
        );
      } else {
        // CREATE request
        response = await axios.post(
          "http://localhost:3000/api/LeadCreation/LeadCreation",
          formData
        );
      }

      if (response.data.success) {
        alert(id ? "Lead updated successfully" : "Lead created successfully");
        handleReset();
       
      } else {
        alert("Failed to save lead");
      }
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Error occurred while saving lead");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setId(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 bg-white rounded-md shadow-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
            📦 {id ? "Edit Lead" : "Lead Creation"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
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
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">-- Select Project --</option>
                {projectList.map((project) => (
                  <option key={project._id} value={project.projectName}>
                    {project.projectName}
                  </option>
                ))}
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
              <label className="block font-semibold mb-1">
                Interactions Type
              </label>
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
              <label className="block font-semibold mb-1">
                Next Interactions Date
              </label>
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
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">-- Select Agent --</option>
                {agentList.map((agent) => (
                  <option key={agent._id} value={agent.fullName}>
                    {agent.fullName}
                  </option>
                ))}
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

            {/* Buttons */}
            <div className="col-span-full flex gap-4 mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {id ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadCreation;
