import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdvanceReceived() {
  const [employees, setEmployees] = useState([]);
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: "",
    advanceDate: "",
    amount: 0,
    remark: "",
  });

  // Fetch employee list
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/advancereceived", formData)
      .then((res) => {
        alert("Advance Received saved successfully!");
        setFormData({ employeeId: "", advanceDate: "", amount: 0, remark: "" });
      })
      .catch((err) => console.error("Error saving advance:", err));
  };

  // Handle reset
  const handleReset = () => {
    setFormData({ employeeId: "", advanceDate: "", amount: 0, remark: "" });
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
          <h2 className="text-xl font-bold mb-4">Advance Received</h2>

          <div className="bg-white rounded-xl shadow p-6 w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Employee Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Employee Name
                </label>
                <select
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Advance Date */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Advance Date
                </label>
                <input
                  type="date"
                  name="advanceDate"
                  value={formData.advanceDate}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  min="0"
                  required
                />
              </div>

              {/* Remark */}
              <div>
                <label className="block text-sm font-medium mb-1">Remark</label>
                <input
                  type="text"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900"
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
    </div>
  );
}
