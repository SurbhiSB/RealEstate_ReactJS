import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Group() {
  const [groupName, setGroupName] = useState("");
  const [userShortName, setUserShortName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/group/create", {
        groupName,
        userShortName,
      });

      setMessage(res.data.message || "Group created successfully!");
      setGroupName("");
      setUserShortName("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleReset = () => {
    setGroupName("");
    setUserShortName("");
    setMessage("");
    setError("");
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
        <div className="p-6">
          <div className="text-xl font-semibold mb-4">Project Group</div>

          <div className="bg-white shadow-md rounded-md p-6 border-t-4 border-gray-700">
            <div className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-folder-plus"></i> Project Group
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} onReset={handleReset}>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="groupName">
                  Group Name
                </label>
                <input
                  id="groupName"
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="shortName">
                  Display/Short Name
                </label>
                <input
                  id="shortName"
                  type="text"
                  value={userShortName}
                  onChange={(e) => setUserShortName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  required
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
                >
                  Reset
                </button>
              </div>

              {message && <p className="text-green-600 pt-2">{message}</p>}
              {error && <p className="text-red-600 pt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
