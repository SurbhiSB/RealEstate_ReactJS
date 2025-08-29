import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function AddMembers() {
  const [activeTab, setActiveTab] = useState('other');
  const { id } = useParams();
    const navigate = useNavigate();



const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  const [formData, setFormData] = useState({
    memberType: '',
    fullName: '',
    email: '',
    phone: '',
    remarks: '',
    companyName: '',
    displayName: '',
    mobile: '',
    tds: '0.00',
    status: 'Active',
    gst: '',
    panNo: '',
    paymentTerms: '',
    contactPerson: '',
    contactNumber: '',
    contactEmail: '',
    beneficiaryName: '',
    accountNumber: '',
    bankName: '',
    ifsc: '',
  });

  const [billingAddress, setBillingAddress] = useState({
    name: '', phone: '', address: '', city: '', state: '', country: '', pinCode: ''
  });
  const [shippingAddress, setShippingAddress] = useState({
    name: '', phone: '', address: '', city: '', state: '', country: '', pinCode: ''
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [message, setMessage] = useState('');



  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/addMembers/addmembers/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
})
        .then((res) => {
          const data = res.data.data;
          setFormData({
            memberType: data.memberType || '',
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            remarks: data.remarks || '',
            companyName: data.companyName || '',
            displayName: data.displayName || '',
            mobile: data.mobile || '',
            tds: data.tds || '0.00',
            status: data.status || 'Active',
            gst: data.gst || '',
            panNo: data.panNo || '',
            paymentTerms: data.paymentTerms || '',
            contactPerson: data.contactPerson || '',
            contactNumber: data.contactNumber || '',
            contactEmail: data.contactEmail || '',
            beneficiaryName: data.beneficiaryName || '',
            accountNumber: data.accountNumber || '',
            bankName: data.bankName || '',
            ifsc: data.ifsc || ''
          });
          setBillingAddress(data.billingAddress || billingAddress);
          setShippingAddress(data.shippingAddress || shippingAddress);
           
        })
        .catch((err) => {
          console.error("Error fetching member:", err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (field, value) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingChange = (field, value) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSameAsBillingToggle = () => {
    const isSame = !sameAsBilling;
    setSameAsBilling(isSame);
    if (isSame) setShippingAddress({ ...billingAddress });
  };

  const handleSubmitOther = () => {
    setMessage("Other details saved successfully");
    setActiveTab("address");
  };

  const handleSubmitAddress = () => {
    setMessage("Address saved successfully");
    setActiveTab("contact");
  };

  const handleSubmitContact = () => {
    setMessage("Contact information saved successfully");
    setActiveTab("bank");
  };

  const handleSubmitBank = async () => {
    try {
      const dataToSend = {
        ...formData,
        billingAddress,
        shippingAddress,
      };

      const res = id
        ? await axios.put(`http://localhost:3000/api/addMembers/addmembers/${id}`, dataToSend)
        : await axios.post('http://localhost:3000/api/addMembers/addmembers', dataToSend);

      if (res.data.success) {
        handleReset();
        setActiveTab("other");
        setMessage('Member saved successfully!');
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
      memberType: '',
      fullName: '',
      email: '',
      phone: '',
      remarks: '',
      companyName: '',
      displayName: '',
      mobile: '',
      tds: '0.00',
      status: 'Active',
      gst: '',
      panNo: '',
      paymentTerms: '',
      contactPerson: '',
      contactNumber: '',
      contactEmail: '',
      beneficiaryName: '',
      accountNumber: '',
      bankName: '',
      ifsc: '',
    });
    setBillingAddress({ name: '', phone: '', address: '', city: '', state: '', country: '', pinCode: '' });
    setShippingAddress({ name: '', phone: '', address: '', city: '', state: '', country: '', pinCode: '' });
    setSameAsBilling(false);
    setMessage('');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-4">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Member Details</h2>

          <form className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <label className="block mb-1 font-medium">Member Type</label>
              <select name="memberType" value={formData.memberType} onChange={handleChange} className="w-full border p-2 rounded mb-4">
                <option value="">--Select--</option>
                <option value="vendor">Vendor</option>
                <option value="contractor">Contractor</option>
              </select>

              <label className="block mb-1 font-medium">Full Name</label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

              <label className="block mb-1 font-medium">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full border p-2 rounded mb-4" />

              <label className="block mb-1 font-medium">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} type="text" className="w-full border p-2 rounded mb-4" />

              <label className="block mb-1 font-medium">Remarks</label>
              <input name="remarks" value={formData.remarks} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            </div>

            {/* Right Column */}
            <div>
              <label className="block mb-1 font-medium">Company Name</label>
              <input name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border p-2 rounded mb-4" />

              <label className="block mb-1 font-medium">Display Name</label>
              <input name="displayName" value={formData.displayName} onChange={handleChange} className="w-full border p-2 rounded mb-4" />

              <label className="block mb-1 font-medium">Mobile</label>
              <input name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border p-2 rounded mb-4" />

              <label className="block mb-1 font-medium">TDS</label>
              <input name="tds" value={formData.tds} onChange={handleChange} className="w-full border p-2 rounded mb-4" />

              <label className="block mb-1 font-medium">Status</label>
              <input name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            </div>
          </form>

          {/* Tabs */}
          <div className="mt-10 border-t pt-4">
            <div className="flex space-x-4 mb-4">
              {['other', 'address', 'contact', 'bank'].map((tab) => (
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
                  <input name="gst" value={formData.gst} onChange={handleChange} placeholder="GST Number" className="w-full border p-2 mb-4 rounded" />
                  <input name="panNo" value={formData.panNo} onChange={handleChange} placeholder="PAN Number" className="w-full border p-2 mb-4 rounded" />
                  <input name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} placeholder="Payment Terms" className="w-full border p-2 mb-4 rounded" />
                  <div className="mt-6">
                    <button type="button" onClick={handleSubmitOther} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Next</button>
                    {message && <p className="mt-4 text-green-600">{message}</p>}
                  </div>
                </div>
              )}

              {activeTab === 'address' && (
                <div className="p-6 bg-white rounded shadow-md">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
                      {Object.keys(billingAddress).map((field) => (
                        <input
                          key={field}
                          type="text"
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={billingAddress[field]}
                          onChange={(e) => handleBillingChange(field, e.target.value)}
                          className="w-full p-2 border rounded mb-2"
                        />
                      ))}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                      <div className="flex items-center mb-4">
                        <input type="checkbox" id="sameAddress" checked={sameAsBilling} onChange={handleSameAsBillingToggle} className="mr-2" />
                        <label htmlFor="sameAddress" className="text-sm">Same As Billing Address</label>
                      </div>
                      {Object.keys(shippingAddress).map((field) => (
                        <input
                          key={field}
                          type="text"
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={shippingAddress[field]}
                          onChange={(e) => handleShippingChange(field, e.target.value)}
                          className="w-full p-2 border rounded mb-2"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button type="button" onClick={handleSubmitAddress} className="bg-purple-800 text-white px-6 py-2 rounded hover:bg-purple-900 transition">Next</button>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto">
                  <h2 className="text-lg font-semibold mb-6">Contact Details</h2>
                  <div className="space-y-4">
                    <input type="text" placeholder="Person Name" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" placeholder="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="email" placeholder="Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>
                  <div className="flex justify-center mt-6">
                    <button type="button" onClick={handleSubmitContact} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Next</button>
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
