import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const SendMessage = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    userType: "Customer", // default
  });

    const navigate = useNavigate();
    const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useState(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      message: "",
      userType: "Customer",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/SendMessage/SendMessage",
        formData
      );

      if (response.data.success) {
        alert("Message sent successfully");
        handleReset();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error occurred while sending message");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Send Message
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 max-w-lg"
          >
            {/* Title */}
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Enter title"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded p-2"
                rows={4}
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            {/* User Type */}
            <div>
              <label className="block mb-1">User Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="Customer">Customer</option>
                <option value="Agent">Agent</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-purple-900 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                Send Message
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

export default SendMessage;
