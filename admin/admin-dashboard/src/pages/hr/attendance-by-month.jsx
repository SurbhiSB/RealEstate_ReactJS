import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import jszip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import { useNavigate } from "react-router-dom";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// window.JSZip = jszip;

export default function AttendanceByMonth() {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("August");
  const [department, setDepartment] = useState("All");
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if ($.fn.DataTable.isDataTable("#attendanceByMonthTable")) {
      $("#attendanceByMonthTable").DataTable().destroy();
    }
    $("#attendanceByMonthTable").DataTable({
      dom: "Bfrtip",
      buttons: ["copy", "excel", "pdf", "print"],
    });
  }, [tableData]);

  const handleSubmit = () => {
    // Dummy static data for now
    const dummyData = [
      { empId: "E001", empName: "John Doe", days: ["P", "P", "A", "P", "P", "P", "A", "P", "P", "P", "A", "P", "P", "P", "A", "P"] },
      { empId: "E002", empName: "Jane Smith", days: ["P", "A", "A", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "P", "P", "P"] },
    ];
    setTableData(dummyData);
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
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Monthly Attendance</h2>

          {/* Filter Section */}
          <div className="flex items-center gap-4 mb-4">
            <div>
              <label className="block font-medium mb-1">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Month</label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option>All</option>
                <option>HR</option>
                <option>IT</option>
                <option>Finance</option>
              </select>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="bg-purple-800 text-white px-4 py-2 rounded mt-5"
              >
                Submit
              </button>
            </div>
          </div>

          {/* DataTable */}
          <table
            id="attendanceByMonthTable"
            className="display w-full border border-gray-300"
          >
            <thead>
              <tr>
                <th>EMP_ID</th>
                <th>EMP_NAME</th>
                {[...Array(16)].map((_, i) => (
                  <th key={i}>{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.empId}</td>
                  <td>{row.empName}</td>
                  {row.days.map((day, dayIndex) => (
                    <td key={dayIndex}>{day}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
