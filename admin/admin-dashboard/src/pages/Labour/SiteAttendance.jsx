import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function SiteList() {
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSites();
  }, []);

   const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  const fetchSites = () => {
    axios.get('http://localhost:3000/api/Addsite/Addsite')
      .then((res) => {
        setSites(res.data.data || []);
      })
      .catch((err) => console.error("Error fetching sites:", err));
  };

   const handleCardClick = (site) => {
    navigate(`/Labour/LabourListAttendance?id=${site._id}&sitename=${encodeURIComponent(site.SiteName)}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
            Site List
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(site)}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-200 hover:shadow-xl transition"
              >
                <FaHome className="text-purple-600 text-4xl mb-3" />
                <h3 className="text-lg font-bold text-gray-900">{site.SiteName}</h3>
                <p className="text-purple-500">{site.SiteAddress}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
