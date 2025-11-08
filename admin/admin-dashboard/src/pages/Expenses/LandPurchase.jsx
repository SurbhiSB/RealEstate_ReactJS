import React, { useState } from 'react';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LandPurchase = () => {

  const navigate = useNavigate();
  
  
  
  const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useState(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  const [formData, setFormData] = useState({
    companyName: "S Prime IT",
    panNo: "",
    tanNo: "",
    khasraNo: "",
    mouza: "",
    hector: "",
    areaInAcre: "",
    saleDeedDate: "",
    saleDeedValue: "",
    stampDuty: "",
    registrationFees: "",
    financialYear: ""
  });

  const [owners, setOwners] = useState([
    { name: '', email: '', mobile: '', pan: '', aadhar: '', address: '' }
  ]);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOwnerChange = (index, field, value) => {
    const updatedOwners = [...owners];
    updatedOwners[index][field] = value;
    setOwners(updatedOwners);
  };

  const addOwner = () => {
    setOwners([...owners, { name: '', email: '', mobile: '', pan: '', aadhar: '', address: '' }]);
  };

  const removeOwner = (index) => {
    const updatedOwners = owners.filter((_, i) => i !== index);
    setOwners(updatedOwners);
  };

  const resetForm = () => {
    setFormData({
      companyName: "S Prime IT",
      panNo: "",
      tanNo: "",
      khasraNo: "",
      mouza: "",
      hector: "",
      areaInAcre: "",
      saleDeedDate: "",
      saleDeedValue: "",
      stampDuty: "",
      registrationFees: "",
      financialYear: ""
    });
    setOwners([{ name: '', email: '', mobile: '', pan: '', aadhar: '', address: '' }]);
    setMessage('');
  };

   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        owners
      };

      const res = await axios.post('http://localhost:3000/api/LandPurchase/LandPurchase', dataToSend);

      if (res.data.success) {
        resetForm();
        setMessage('Land purchase record submitted successfully!');
      } else {
        setMessage('Submission failed');
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Header />
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-purple-700 border-b pb-2 mb-4">Land Details</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type={key.toLowerCase().includes('date') ? 'date' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
                  readOnly={key === 'companyName'}
                />
              </div>
            ))}
          </form>

          {/* Owner Table */}
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Owner Details</h3>
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Owner Name</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Mobile</th>
                  <th className="border px-2 py-1">Pan</th>
                  <th className="border px-2 py-1">Aadhar</th>
                  <th className="border px-2 py-1">Address</th>
                  <th className="border px-2 py-1">Remove</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner, index) => (
                  <tr key={index}>
                    {Object.entries(owner).map(([field, value]) => (
                      <td key={field} className="border px-2 py-1">
                        {field === 'address' ? (
                          <textarea
                            className="w-full border rounded px-2 py-1"
                            rows={2}
                            value={value}
                            onChange={(e) => handleOwnerChange(index, field, e.target.value)}
                          />
                        ) : (
                          <input
                            type="text"
                            className="w-full border rounded px-2 py-1"
                            value={value}
                            onChange={(e) => handleOwnerChange(index, field, e.target.value)}
                          />
                        )}
                      </td>
                    ))}
                    <td className="border px-2 py-1 text-center">
                      <button
                        type="button"
                        onClick={() => removeOwner(index)}
                        className="text-red-500 font-bold text-xl hover:text-red-700"
                      >✖</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addOwner}
              className="mt-3 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
            >+ Add Row</button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
            >Submit</button>
            <button
              type="reset"
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >Reset</button>
          </div>

          {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LandPurchase;
