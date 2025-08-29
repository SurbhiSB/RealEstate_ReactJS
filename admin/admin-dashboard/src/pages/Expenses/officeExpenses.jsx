import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const OfficeExpenses = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    amount: '0.00',
    billDate: '',
    billNo: '',
    payBy: 'Cash',
    remark: '',
  });

  const [headMasterList, setHeadMasterList] = useState([]);

  const navigate = useNavigate();
  
  
  
  const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/HeadMasters/HeadMaster')
      .then((res) => {
        if (res.data.success) {
          setHeadMasterList(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching headmaster list:', err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      itemName: '',
      amount: '0.00',
      billDate: '',
      billNo: '',
      payBy: 'Cash',
      remark: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/officeExpenses/officeExpenses',
        formData
      );

      if (response.data.success) {
        alert('Office expense submitted successfully');
        handleReset();
      } else {
        alert('Failed to submit office expense');
      }
    } catch (error) {
      console.error('Error submitting office expense:', error);
      alert('Error occurred while submitting');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">📁 Office Expenses</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block mb-1">Item Name</label>
              <select
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="">Select Item</option>
                {headMasterList.map((head, idx) => (
                  <option key={idx} value={head.HeadMasterName}>
                    {head.HeadMasterName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1">Bill Date</label>
              <input
                type="date"
                name="billDate"
                value={formData.billDate}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1">Bill No</label>
              <input
                type="text"
                name="billNo"
                value={formData.billNo}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1">Pay By</label>
              <select
                name="payBy"
                value={formData.payBy}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1">Remark</label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                className="w-full border rounded p-2"
                rows={3}
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-start gap-4">
              <button
                type="submit"
                className="bg-purple-900 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
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

export default OfficeExpenses;
