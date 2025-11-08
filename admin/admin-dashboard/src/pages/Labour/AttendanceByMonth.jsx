import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function AttendanceByMonth() {
  const [searchParams] = useSearchParams();
  const siteName = searchParams.get("sitename") || "";

  const navigate = useNavigate();
  
  
  
  const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0] // default today
  );

  const [attendanceMonth, setAttendanceMonth] = useState(
    new Date().toISOString().slice(0, 7) // default current month
  );

  const [siteList, setSiteList] = useState([]);

  const [formData, setFormData] = useState({
    site: "",
    fromDate: "",
    toDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Addsite/Addsite")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setSiteList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching site list:", err);
        setSiteList([]);
      });
  }, [siteName]);

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
              {/* Attendance Date (Year restriction) */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Year
                </label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  min="2025-01-01"
                  max="2025-12-31"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Attendance Month */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Month
                </label>
                <input
                  type="month"
                  value={attendanceMonth}
                  onChange={(e) => setAttendanceMonth(e.target.value)}
                  min="2025-01"
                  max="2025-12"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Site Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site
                </label>
                <select
                  name="site"
                  value={formData.site}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select Site</option>
                  {siteList.map((site) => (
                    <option key={site._id} value={site.SiteName}>
                      {site.SiteName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table View */}
          {/* Table View */}
<div className="bg-white shadow-md rounded border border-purple-300 p-4 overflow-auto">
  <table className="table table-bordered border-collapse w-full text-sm">
    <thead>
      <tr>
        <th className="border px-2 py-1">LB_NAME</th>
        {Array.from({ length: 31 }, (_, i) => (
          <th key={i + 1} className="border px-2 py-1">{i + 1}</th>
        ))}
        <th className="border px-2 py-1">Days</th>
        <th className="border px-2 py-1">Present</th>
        <th className="border px-2 py-1">Absent</th>
      </tr>
    </thead>
    <tbody>
      {/* Example row - replace with your dynamic data */}
      {[
        { name: "अजय", presentDays: [11, 12], totalDays: 31 },
        { name: "लोमश", presentDays: [13], totalDays: 31 }
      ].map((employee, idx) => {
        const presentCount = employee.presentDays.length;
        const absentCount = employee.totalDays - presentCount;
        return (
          <tr key={idx}>
            <td className="border px-2 py-1">{employee.name}</td>
            {Array.from({ length: 31 }, (_, i) => (
              <td key={i + 1} className="border px-2 py-1 text-center">
                {employee.presentDays.includes(i + 1) ? (
                  <strong style={{ color: "forestgreen" }}>
                    <i className="fa fa-check"></i>
                  </strong>
                ) : null}
              </td>
            ))}
            <td className="border px-2 py-1 font-bold text-center">{employee.totalDays}</td>
            <td className="border px-2 py-1 font-bold text-center">{presentCount}</td>
            <td className="border px-2 py-1 font-bold text-center">{absentCount}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

        </div>
      </div>
    </div>
  );
}
