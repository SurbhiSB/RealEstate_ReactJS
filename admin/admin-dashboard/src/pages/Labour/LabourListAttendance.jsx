import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function LabourListAttendance() {
  const [searchParams] = useSearchParams();
  const siteName = searchParams.get("sitename") || "";
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0] // default today
  );
  const [sites, setSites] = useState([]);

  const buttons = [
    { label: "A", color: "bg-red-500" },
    { label: "1/2", color: "bg-gray-300 text-black" },
    { label: "P", color: "bg-green-500" },
    { label: "P+1hr", color: "bg-green-500" },
    { label: "P+2hr", color: "bg-green-500" },
    { label: "P+3hr", color: "bg-green-500" },
    { label: "P+1/2", color: "bg-green-500" },
    { label: "P+P", color: "bg-green-500" },
  ];

  useEffect(() => {
  fetchSites();
}, [siteName]); // run whenever sitename changes

const fetchSites = () => {
  axios
    .get("http://localhost:3000/api/AddLabour/addLabours?site=${siteName}", {
      params: siteName ? { sitename: siteName } : {},
    })
    .then((res) => {
      setSites(res.data.data || []);
    })
    .catch((err) => console.error("Error fetching sites:", err));
};
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Attendance</h2>

          {/* Site Name & Date */}
          <div className="bg-white shadow-md rounded border border-purple-300 mb-6 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Site Name */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>

              {/* Attendance Date */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Attendance Date
                </label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-sm font-medium mb-4">
            <span>A - Absent</span>
            <span>P - Present</span>
            <span>1/2 - Half Day</span>
            <span>P+1hr - Present + 1hr</span>
            <span>P+2hr - Present + 2hr</span>
            <span>P+3hr - Present + 3hr</span>
            <span>P + 1/2 - 1.5Day</span>
            <span>P + P - Double</span>
          </div>

          {/* Table View */}
          <div className="bg-white shadow-md rounded border border-purple-300">
            <table className="w-full table-auto border-t text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Full Name</th>
                  <th className="border px-4 py-2 text-left">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {sites.length > 0 ? (
                  sites.map((site) => (
                    <tr key={site._id}>
                      <td className="border px-4 py-2">{site.name}</td>
                      <td className="flex gap-2 flex-wrap p-2">
                        {buttons.map((btn, index) => (
                          <button
                            key={index}
                            className={`px-3 py-1 rounded text-white text-sm ${btn.color} hover:opacity-80`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-3 text-gray-500">
                      No sites found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
