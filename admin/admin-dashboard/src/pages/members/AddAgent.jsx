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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-4">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Agent Details</h2>

          <form className="grid grid-cols-2 gap-6">
            <div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded p-2">
                      <option value="">-- Select Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Joining Date</label>
                    <input type="date" name="joiningDate" value={formData.joiningDate || ""} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Anniversary Date</label>
                    <input type="date" name="anniversaryDate" value={formData.anniversaryDate || ""} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Education</label>
                    <input type="text" name="education" value={formData.education} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Nominee Name</label>
                    <input type="text" name="nomineeName" value={formData.nomineeName} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Nominee Relation</label>
                    <input type="text" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Nominee DOB</label>
                    <input type="date" name="nomineeDob" value={formData.nomineeDob || ""} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Nominee Contact</label>
                    <input type="text" name="nomineeContact" value={formData.nomineeContact} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Payment Terms</label>
                    <input type="text" name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>

                  <button type="button" onClick={handleSubmitOther} className="col-span-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4">Next</button>
                  {message && <p className="col-span-2 mt-2 text-green-600">{message}</p>}
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {["profilePic", "idProof", "addressProof", "otherDoc"].map((field, i) => (
                    <div key={i}>
                      <label className="block mb-1 font-medium">{field.replace(/([A-Z])/g, ' $1')}</label>
                      <input type="file" name={field} onChange={handleFileChange} className="w-full p-1 border rounded" />
                    </div>
                  ))}
                  <button type="button" onClick={handleSubmitdocuments} className="col-span-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4">Next</button>
                  {message && <p className="col-span-full mt-2 text-green-600">{message}</p>}
                </div>
              )}

              {activeTab === 'address' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" />
                  <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" />
                  <select name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">-- Select State --</option>
                    {states.map((state) => (
                      <option key={state._id} value={state.name}>{state.name}</option>
                    ))}
                  </select>
                  <input name="pinCode" placeholder="Pin Code" value={formData.pinCode} onChange={handleChange} className="w-full p-2 border rounded" />
                  <button type="button" onClick={handleSubmitaddress} className="col-span-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4">Next</button>
                  {message && <p className="col-span-2 mt-2 text-green-600">{message}</p>}
                </div>
              )}

              {activeTab === 'bank' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="beneficiaryName" placeholder="Beneficiary Name" onChange={handleChange} value={formData.beneficiaryName} className="w-full p-2 border rounded" />
                  <input name="accountNumber" placeholder="Account Number" onChange={handleChange} value={formData.accountNumber} className="w-full p-2 border rounded" />
                  <input name="bankName" placeholder="Bank Name" onChange={handleChange} value={formData.bankName} className="w-full p-2 border rounded" />
                  <input name="ifsc" placeholder="IFSC Code" onChange={handleChange} value={formData.ifsc} className="w-full p-2 border rounded" />
                  <button onClick={handleSubmitBank} className="col-span-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4">Submit</button>
                  {message && <p className="col-span-2 mt-2 text-green-600">{message}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
