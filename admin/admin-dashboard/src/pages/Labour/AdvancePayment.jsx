import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const AdvancePayment = () => {
  const initialFormData = {
    site: "",
    person: "",
    amount: 0,
    remark: "",
    isAdvance: false,
    paymentDate: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [siteList, setSiteList] = useState([]);
  const [labourList, setLabourList] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);

  // Fetch Sites
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
  }, []);

  // Fetch Labours
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/AddLabour/addLabours")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setLabourList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching labours:", err);
        setLabourList([]);
      });
  }, []);

  // Filter labours by selected site
  useEffect(() => {
    if (formData.site) {
      const filtered = labourList.filter(
        (labour) => labour.site === formData.site
      );
      setFilteredPersons(filtered);
    } else {
      setFilteredPersons([]);
    }
  }, [formData.site, labourList]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "amount"
          ? parseFloat(value) || ""
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/AdvancePayment/AdvancePayment",
        formData
      );

      if (response.data.success) {
        alert("Labour detail submitted successfully");
        handleReset();
      } else {
        alert("Failed to submit Labour Detail");
      }
    } catch (error) {
      console.error(
        "Error submitting Labour Details:",
        error.response?.data || error
      );
      alert("Error occurred while submitting");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setFilteredPersons([]);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 bg-white rounded-md shadow-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
            🧾 Payment Report
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Site Name
              </label>
              <select
                name="site"
                value={formData.site}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select Site</option>
                {siteList.map((site) => (
                  <option key={site._id} value={site.SiteName}>
                    {site.SiteName}
                  </option>
                ))}
              </select>
            </div>

            {/* Person Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <select
                name="person"
                value={formData.person}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select Person</option>
                {filteredPersons.map((p) => (
                  <option
                    key={p._id}
                    value={`${p.name} (${p.designation})`}
                  >
                    {p.name} ({p.designation})
                  </option>
                ))}
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
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="0"
                min="0"
                required
              />
            </div>

            {/* Remark */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Remark
              </label>
              <input
                type="text"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter remark"
              />
            </div>

            {/* Is Advance */}
            <div className="flex items-center mt-6 space-x-2">
              <input
                type="checkbox"
                name="isAdvance"
                checked={formData.isAdvance}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">
                Is Advance
              </label>
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Date
              </label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
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

export default AdvancePayment;
