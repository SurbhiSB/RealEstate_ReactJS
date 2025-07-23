import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function AddAgent() {
  const [states, setStates] = useState([]);
  const [activeTab, setActiveTab] = useState('other');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
   
     fullName: '',
      mobile: '',
      panNo: '',
      referByMobile: '',
      commission: '',
      activeFlag: '',
      email: '',
      phone: '',
      aadhar: '',
      referByName: '',
      remarkNotes: '',
      gender: '',
      joiningDate: '',
      dob: '',
      anniversaryDate: '',
      education: '',
      nomineeName: '',
      nomineeRelation: '',
      nomineeDob: '',
      nomineeContact: '',
       paymentTerms: '',
       profilePic: null,
      idProof: null,
      addressProof: null,
      otherDoc: null,
      address: '',
      city: '',
      state: '',
      pinCode: '',
      beneficiaryName: '',
      accountNumber: '',
      bankName: '',
      ifsc: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/states')
      .then((res) => setStates(res.data))
      .catch((err) => console.error('Error fetching states:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmitOther = () => {
    setMessage("Other details saved successfully");
    setActiveTab("documents");
  };

  const handleSubmitdocuments = () => {
    setMessage("Documents details saved successfully");
    setActiveTab("address");
  };

  const handleSubmitaddress = () => {
    setMessage("Address details saved successfully");
    setActiveTab("bank");
  };

  const handleSubmitBank = async () => {
    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        dataToSend.append(key, formData[key]);
      }

      const res = await axios.post(
        'http://localhost:3000/api/AddAgent/AddAgent',
        dataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (res.data.success) {
        handleReset();
        setActiveTab("other");
        setMessage('Agent added successfully!');
      } else {
        setMessage('Submission failed');
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  const handleReset = () => {
    setFormData({
     
      fullName: '',
      mobile: '',
      panNo: '',
      referByMobile: '',
      commission: '',
      activeFlag: '',
      email: '',
      phone: '',
      aadhar: '',
      referByName: '',
      remarkNotes: '',
      gender: '',
      joiningDate: '',
      dob: '',
      anniversaryDate: '',
      education: '',
      nomineeName: '',
      nomineeRelation: '',
      nomineeDob: '',
      nomineeContact: '',
       paymentTerms: '',
       profilePic: null,
      idProof: null,
      addressProof: null,
      otherDoc: null,
      address: '',
      city: '',
      state: '',
      pinCode: '',
      beneficiaryName: '',
      accountNumber: '',
      bankName: '',
      ifsc: '',

    });
    setMessage('');
  };

  // NOTE: Only changed or corrected part of your file has been shown here.
  // You can keep the rest of the code as-is, but ensure the fixes above are applied:
  // ✅ Move useState inside component
  // ✅ Add handleFileChange to update formData for file inputs
  // ✅ Fix missing value + onChange for inputs like date fields

  return (
    // ... Keep your existing return block
    // just make sure:
    // - All <input type="date" ... /> have value={formData.xxx} and onChange={handleChange}
    // - All file <input type="file" name="xxx" ... /> use onChange={handleFileChange}


    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-4">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Agent Details</h2>

          <form className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              
              {/* <select name="memberType" value={formData.memberType} onChange={handleChange} className="w-full border p-2 rounded mb-4">
                <option value="">--Select--</option>
                <option value="vendor">Vendor</option>
                <option value="contractor">Contractor</option>
              </select> */}

              <label className="block mb-1 font-medium">Full Name</label>  
              <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

              
              <label className="block mb-1 font-medium">Mobile</label>
              <input name="mobile" value={formData.mobile} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

              
              <label className="block mb-1 font-medium">Pan Number</label>
              <input name="panNo" value={formData.panNo} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />
              
              
              <label className="block mb-1 font-medium">Refer By Mobile</label>
              <input name="referByMobile" value={formData.referByMobile} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

              
              <label className="block mb-1 font-medium">Commission</label>
              <input name="commission" value={formData.commission} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

              
              <label className="block mb-1 font-medium">Active Flag</label>
              <input name="activeFlag" value={formData.activeFlag} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

              
            </div>

            {/* Right Column */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full border p-2 rounded mb-4" />
              
              <label className="block mb-1 font-medium">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />
              
              <label className="block mb-1 font-medium">Aadhar Number</label>
              <input name="aadhar" value={formData.aadhar} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

              <label className="block mb-1 font-medium">Refer By Name</label>
              <input name="referByName" value={formData.referByName} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

              <label className="block mb-1 font-medium">Remark/Notes</label>
              <input name="remarkNotes" value={formData.remarkNotes} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

                
            </div>
          </form>

          {/* Tabs */}
          <div className="mt-10 border-t pt-4">
            <div className="flex space-x-4 mb-4">
              {['other', 'documents', 'address', 'bank'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'other' ? 'Other Details' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="bg-gray-100 p-4 rounded">
              {activeTab === 'other' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
        </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Joining Date</label>
    <input
      type="Date"
      name="joiningDate"
      placeholder="dd-mm-yyyy"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
    <input
      type="Date"
      name="dob"
      placeholder="dd-mm-yyyy"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Anniversary Date</label>
    <input
      type="Date"
      name="anniversaryDate"
      placeholder="dd-mm-yyyy"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Education</label>
    <input
      type="text"
      name="education"
      placeholder="Enter Education"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Nominee Name</label>
    <input
      type="text"
      name="nomineeName"
      placeholder="Enter Nominee Name"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Nominee Relation</label>
    <input
      type="text"
      name="nomineeRelation"
      placeholder="Enter Relation"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Nominee DOB</label>
    <input
      type="Date"
      name="nomineeDob"
      placeholder="dd-mm-yyyy"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Nominee Contact</label>
    <input
      type="text"
      name="nomineeContact"
      placeholder="Enter Contact Number"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
    <input
      type="text"
      name="paymentTerms"
      placeholder="Enter Payment Terms"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
    />
  </div>
</div>
<div className="mt-6">
                    <button type="button" onClick={handleSubmitOther} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Next</button>
                    {message && <p className="mt-4 text-green-600">{message}</p>}
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="p-6 bg-white rounded shadow-md">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {/* Profile Picture */}
  <div>
    <label className="block font-medium mb-1">Profile Picture</label>
    <input type="file" className="border p-1 w-full" />
    <p className="mt-2 text-sm text-gray-500">Passport Size Photo</p>
    <div className="mt-2 border rounded h-24 flex items-center justify-center bg-gray-50">
      <img src="/placeholder-image.png" alt="Preview" className="h-20" />
    </div>
  </div>

  {/* ID/PAN/Aadhar Proof */}
  <div>
    <label className="block font-medium mb-1">ID/PAN/Aadhar Proof</label>
    <input type="file" className="border p-1 w-full" />
    <p className="mt-2 text-sm text-gray-500">ID/PAN/Aadhar Proof Preview</p>
    <div className="mt-2 border rounded h-24 flex items-center justify-center bg-gray-50">
      <img src="/placeholder-image.png" alt="Preview" className="h-20" />
    </div>
  </div>

  {/* Address Proof */}
  <div>
    <label className="block font-medium mb-1">Address Proof</label>
    <input type="file" className="border p-1 w-full" />
    <p className="mt-2 text-sm text-gray-500">Address Proof Preview</p>
    <div className="mt-2 border rounded h-24 flex items-center justify-center bg-gray-50">
      <img src="/placeholder-image.png" alt="Preview" className="h-20" />
    </div>
  </div>

  {/* Other Document */}
  <div>
    <label className="block font-medium mb-1">Other Document</label>
    <input type="file" className="border p-1 w-full" />
    <p className="mt-2 text-sm text-gray-500">Other Documents</p>
    <div className="mt-2 border rounded h-24 flex items-center justify-center bg-gray-50">
      <img src="/placeholder-image.png" alt="Preview" className="h-20" />
    </div>
  </div>
</div>
<div className="mt-6">
                    <button type="button" onClick={handleSubmitdocuments} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Next</button>
                    {message && <p className="mt-4 text-green-600">{message}</p>}
                  </div>

                </div>
              )}

              {activeTab === 'address' && (
              <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto">
    <h2 className="text-lg font-semibold mb-6">Address Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 font-medium">Address</label>
        <input
          type="text"
          placeholder="Enter Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">City</label>
        <input
          type="text"
          placeholder="Enter City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">State</label>
        <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-700"
            >
              <option value="">-- Select --</option>
              {states.map((state) => (
                <option key={state._id} value={state.name}>
                  {state.name}
                </option>
              ))}
    </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Pin Code</label>
        <input
          type="text"
          placeholder="Enter Pin Code"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mt-6">
                    <button type="button" onClick={handleSubmitaddress} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Next</button>
                    {message && <p className="mt-4 text-green-600">{message}</p>}
                  </div>
    </div>

   
  </div>
              )}

              {activeTab === 'bank' && (
                <div className="space-y-4">
                  <input name="beneficiaryName" placeholder="Beneficiary Name" onChange={handleChange} value={formData.beneficiaryName} className="w-full border p-2 rounded" />
                  
                  <input name="accountNumber" placeholder="Account Number" onChange={handleChange} value={formData.accountNumber} className="w-full border p-2 rounded" />
                  <input name="bankName" placeholder="Bank Name" onChange={handleChange} value={formData.bankName} className="w-full border p-2 rounded" />
                  <input name="ifsc" placeholder="IFSC Code" onChange={handleChange} value={formData.ifsc} className="w-full border p-2 rounded" />
                  <button onClick={handleSubmitBank} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
                  {message && <p className="mt-4 text-green-600">{message}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
