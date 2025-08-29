import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useNavigate } from "react-router-dom";




export default function EmployeeAttendance() {
  const [attendanceDate, setAttendanceDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();

    // Initialize DataTable after fetch
    setTimeout(() => {
      if ($.fn.DataTable.isDataTable("#attendanceTable")) {
        $("#attendanceTable").DataTable().destroy();
      }
      $("#attendanceTable").DataTable();
    }, 500);
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/employees");
      setEmployees(res.data);

      // Set default attendance data
    setAttendanceData(
  res.data.map((emp) => ({
    empId: emp._id,
    name: emp.name,
    contact: emp.contact,
    email: emp.email,
    department: emp.department,
    designation: emp.designation,
    inTime: "",
    outTime: "",
    status: "Absent",
    remark: "",
  }))
);

    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAttendanceChange = (index, field, value) => {
    const updated = [...attendanceData];
    updated[index][field] = value;
    setAttendanceData(updated);
  };

  const handleSubmit = async () => {
  if (!attendanceDate) {
    alert("Please select an attendance date");
    return;
  }

 const payload = {
  date: attendanceDate,
  records: attendanceData.map((record, index) => ({
    empId: employees[index]._id,   // required
    name: employees[index].name,   // NEW - store employee name
    inTime: record.inTime || "",
    outTime: record.outTime || "",
    status: record.status || "Absent",
    remark: record.remark || ""
  }))
};


  console.log("Submitting payload:", payload); // Debug log

  try {
    const res = await axios.post("http://localhost:3000/api/attendance", payload);
    alert("Attendance saved successfully");
  } catch (error) {
    console.error("Error saving attendance:", error.response?.data || error);
    alert(error.response?.data?.message || "Failed to save attendance");
  }
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
          <h2 className="text-xl font-bold mb-4">Staff Attendance</h2>

          {/* Attendance Date */}
          <div className="mb-4">
            <label className="mr-2 font-medium">Attendance Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>

          {/* Attendance Table */}
          <table
            id="attendanceTable"
            className="display w-full border border-gray-300"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>EmpId</th>
                <th>Name</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Attendance</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.empId || `E-${index + 1}`}</td>
                  <td>{emp.name}</td>
                  <td>
                    <input
                      type="time"
                      value={attendanceData[index]?.inTime || ""}
                      onChange={(e) =>
                        handleAttendanceChange(index, "inTime", e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={attendanceData[index]?.outTime || ""}
                      onChange={(e) =>
                        handleAttendanceChange(index, "outTime", e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="space-x-2">
                    {["Absent", "Present", "Leave"].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleAttendanceChange(index, "status", status)
                        }
                        className={`px-3 py-1 rounded ${
                          status === "Present"
                            ? "bg-green-500 text-white"
                            : status === "Leave"
                            ? "bg-orange-400 text-white"
                            : "bg-gray-300"
                        } ${
                          attendanceData[index]?.status === status
                            ? "ring-2 ring-black"
                            : ""
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </td>
                  <td>
                    <input
                      type="text"
                      value={attendanceData[index]?.remark || ""}
                      onChange={(e) =>
                        handleAttendanceChange(index, "remark", e.target.value)
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
