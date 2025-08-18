import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

export default function FinanceAdvancePayment() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee: "",           // will store employee _id
    advanceDate: "",        // yyyy-mm-dd
    advanceAmount: "",      // number
    paidDayReminder: "",    // number (1-31)
    remark: ""
  });

  // Fetch employees for the dropdown
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => setEmployees(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      employee: "",
      advanceDate: "",
      advanceAmount: "",
      paidDayReminder: "",
      remark: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST to backend
      await axios.post("http://localhost:3000/api/advancepayment", {
        employee: formData.employee,
        advanceDate: formData.advanceDate,
        advanceAmount: Number(formData.advanceAmount || 0),
        paidDayReminder: Number(formData.paidDayReminder || 0),
        remark: formData.remark
      });
      alert("Advance payment saved!");
      handleReset();
    } catch (err) {
      console.error("Save failed:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to save advance payment");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Advance Payment
          </h2>

          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-3xl">
            {/* Employee Name */}
            <label className="block text-sm font-medium mb-1">Employee Name</label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-4"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>

            {/* Advance Date */}
            <label className="block text-sm font-medium mb-1">Advance Date</label>
            <input
              type="date"
              name="advanceDate"
              value={formData.advanceDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-4"
              required
            />

            {/* Advance Amount */}
            <label className="block text-sm font-medium mb-1">Advance Amount</label>
            <input
              type="number"
              name="advanceAmount"
              value={formData.advanceAmount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border rounded px-3 py-2 mb-4"
              min="0"
              step="0.01"
              required
            />

            {/* Paid Day Reminder */}
            <label className="block text-sm font-medium mb-1">
              Paid Day Reminder (Day of Month)
            </label>
            <input
              type="number"
              name="paidDayReminder"
              value={formData.paidDayReminder}
              onChange={handleChange}
              placeholder="e.g. 10"
              className="w-full border rounded px-3 py-2 mb-4"
              min="1"
              max="31"
            />

            {/* Remark */}
            <label className="block text-sm font-medium mb-1">Remark</label>
            <input
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-6"
              placeholder="Optional"
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
