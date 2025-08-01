import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const SiteFeesExpenses = () => {
  const initialFormData = {
    partyName: "",
    projectName: "",
    itemName: "",
    billDate: "",
    billNo: "",
    payBy: "Cash",
    amount: "0.00",
    remark: "",
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
        "http://localhost:3000/api/SiteFeesExpenses/SiteFeesExpenses",
        formData
      );

      if (response.data.success) {
        alert("SiteFees expense submitted successfully");
        handleReset();
      } else {
        alert("Failed to submit SiteFees expense");
      }
    } catch (error) {
      console.error("Error submitting SiteFees expense:", error);
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
            📦 SiteFees Expenses
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Party Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Party Name
              </label>
              <select
                name="partyName"
                value={formData.partyName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">-- Select Party --</option>
                {memberList.map((member) => (
                  <option key={member._id} value={member.fullName}>
                    {member.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              
              <select
  name="projectName"
  value={formData.projectName}
  onChange={handleChange}
  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
>
  <option value="">-- Select Project --</option>
  {projectList.map((project) => (
    <option key={project._id} value={project.projectName}>
      {project.projectName || project.projectName}
    </option>
  ))}
</select>
            </div>

            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <select
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">-- Select Item --</option>
                {headMasterList.map((headmaster) => (
                  <option key={headmaster._id} value={headmaster.HeadMasterName}>
                    {headmaster.HeadMasterName}
                  </option>
                ))}
              </select>
            </div>

            {/* Bill No */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bill No
              </label>
              <input
                type="text"
                name="billNo"
                value={formData.billNo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Bill Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bill Date
              </label>
              <input
                type="date"
                name="billDate"
                value={formData.billDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Pay By */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pay By
              </label>
              <select
                name="payBy"
                value={formData.payBy}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="Online">Online</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Remark */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Remark
              </label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-end space-x-2 mt-4">
              <button
                type="submit"
                className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-900"
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
      </div>
    </div>
  );
};

export default SiteFeesExpenses;
