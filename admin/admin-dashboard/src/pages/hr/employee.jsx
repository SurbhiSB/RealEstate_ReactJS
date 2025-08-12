import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function Employee() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    anniversaryDate: "",
    dob: "",
    address: "",
    gender: "",
    city: "",
    state: "",
    pinCode: "",
    joiningDate: "",
    education: "",
    department: "",
    designation: "",
    jobProfile: "",
    allowances: "",
    weeklyOff: "",
    checkInTime: "",
    checkOutTime: "",
    salary: "",
    password: "",
    status: "Active",
    aadharNumber: "",
    panNumber: "",
    pfNumber: "",
    esiNumber: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    bankIFSC: "",
    profilePicture: null,
    idProof: null,
    addressProof: null,
    passportPhoto: null,
    otherDocument: null,
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/employees', formData);
      alert('Employee data submitted successfully');
      setFormData({
        employeeName: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        joiningDate: '',
        accountNumber: '',
        bankName: '',
        ifscCode: '',
        aadhaarNumber: '',
        panNumber: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      });
    } catch (error) {
      console.error('Error submitting employee data:', error);
      alert('Failed to submit data');
    }
  };

   const handleReset = () => {
    setFormData({
      name: "",
      contact: "",
      email: "",
      anniversaryDate: "",
      dob: "",
      address: "",
      gender: "",
      city: "",
      state: "",
      pinCode: "",
      joiningDate: "",
      education: "",
      department: "",
      designation: "",
      jobProfile: "",
      allowances: "",
      weeklyOff: "",
      checkInTime: "",
      checkOutTime: "",
      salary: "",
      password: "",
      status: "",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Personal Details Section */}
          <div className="border rounded-lg p-4 shadow bg-white">
            <h2 className="text-lg font-bold mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>
    <label className="block mb-1 font-semibold">Employee Name</label>
    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Contact</label>
    <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Email</label>
    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Anniversary Date</label>
    <input type="date" name="anniversaryDate" value={formData.anniversaryDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Date of Birth</label>
    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Address</label>
    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Gender</label>
    <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">City</label>
    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">State</label>
    <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Pin Code</label>
    <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Joining Date</label>
    <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Education</label>
    <input type="text" name="education" value={formData.education} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Department</label>
    <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Designation</label>
    <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Job Profile</label>
    <input type="text" name="jobProfile" value={formData.jobProfile} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Allowances</label>
    <input type="text" name="allowances" value={formData.allowances} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Weekly Off</label>
    <input type="text" name="weeklyOff" value={formData.weeklyOff} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Check-In Time</label>
    <input type="time" name="checkInTime" value={formData.checkInTime} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Check-Out Time</label>
    <input type="time" name="checkOutTime" value={formData.checkOutTime} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Salary</label>
    <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Password</label>
    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Status</label>
    <input type="text" name="status" value={formData.status} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
  </div>
</div>

          </div>

          {/* Bank & KYC Details Section */}
          <div className="border rounded-lg p-4 shadow bg-white">
            <h2 className="text-lg font-bold mb-4">Bank & KYC Details</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Aadhar Number</label>
                <input name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label>PAN Number</label>
                <input name="panNumber" value={formData.panNumber} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label>PF Number</label>
                <input name="pfNumber" value={formData.pfNumber} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label>ESI Number</label>
                <input name="esiNumber" value={formData.esiNumber} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label>Bank Name</label>
                <input name="bankName" value={formData.bankName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label>Account Name</label>
                <input name="accountName" value={formData.accountName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label>Account Number</label>
                <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label>Bank IFSC</label>
                <input name="bankIFSC" value={formData.bankIFSC} onChange={handleChange} className="w-full border rounded px-2 py-1" />
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="border rounded-lg p-4 shadow bg-white">
            <h2 className="text-lg font-bold mb-4">Documents</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                ["profilePicture", "Profile Picture"],
                ["idProof", "ID/PAN/Aadhar Proof"],
                ["addressProof", "Address Proof"],
                ["passportPhoto", "Passport Size Photo"],
                ["otherDocument", "Other Document"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="block mb-1 text-sm font-medium">{label}</label>
                  <input type="file" name={name} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}





