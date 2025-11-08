import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-dt";
import { useNavigate } from "react-router-dom";



export default function EmployeeList() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      if ($.fn.DataTable.isDataTable("#employeeTable")) {
        $("#employeeTable").DataTable().destroy();
      }
      setTimeout(() => {
        $("#employeeTable").DataTable({
          dom: "Bfrtip",
          buttons: ["copy", "excel", "pdf", "print"],
        });
      }, 0);
    }
  }, [employees]);

const fetchDepartments = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/departments");
    const deptArray = Array.isArray(res.data) ? res.data : res.data.data; 
    setDepartments(deptArray || []);
  } catch (err) {
    console.error("Error fetching departments:", err);
    setDepartments([]);
  }
};


  const fetchEmployees = async (dept = "") => {
    try {
      let url = "http://localhost:3000/api/employees";
      if (dept && dept !== "All") {
        url += `?department=${dept}`;
      }
      const res = await axios.get(url);
      setEmployees(res.data || []);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleFilter = () => {
    fetchEmployees(selectedDept);
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
          <div className="border rounded-lg bg-white shadow p-4">
            <h2 className="text-xl font-bold mb-4">Employee Report</h2>

            {/* Department Filter */}
            <div className="flex items-center gap-2 mb-4">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="All">All</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept.departmentName}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
              <button
                onClick={handleFilter}
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>

            {/* Table */}
            <table id="employeeTable" className="display" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>RegDate</th>
                  <th>EmpId</th>
                  <th>Full Name</th>
                  <th>Mobile</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Edit</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{index + 1}</td>
                    <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
                    <td>{emp.empId || ""}</td>
                    <td>{emp.name}</td>
                    <td>{emp.contact}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>{parseFloat(emp.salary || 0).toFixed(2)}</td>
                    <td>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
