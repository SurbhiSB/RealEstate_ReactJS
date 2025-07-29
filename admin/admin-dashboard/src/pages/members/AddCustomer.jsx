import React, { useState } from 'react';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from 'axios';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
    phone: '',
    mobile: '',
    email: '',
    panNo: '',
    gstNo: '',
    paymentTerms: '',
    nomineeName: '',
    nomineeContact: '',
    nomineeRelation: '',
    nomineeDOB: '',
    status: 'Active'
  });

  const [documents, setDocuments] = useState([
    { docName: '', file: null, status: 'Pending' }
  ]);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocChange = (index, field, value) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index][field] = value;
    setDocuments(updatedDocuments);
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].status = newStatus;
    setDocuments(updatedDocuments);
  };

  const addRow = () => {
    setDocuments([...documents, { docName: '', file: null, status: 'Pending' }]);
  };

  const removeRow = (index) => {
    const updatedDocs = [...documents];
    updatedDocs.splice(index, 1);
    setDocuments(updatedDocs);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      pinCode: '',
      country: 'India',
      phone: '',
      mobile: '',
      email: '',
      panNo: '',
      gstNo: '',
      paymentTerms: '',
      nomineeName: '',
      nomineeContact: '',
      nomineeRelation: '',
      nomineeDOB: '',
      status: 'Active'
    });
    setDocuments([{ docName: '', file: null, status: 'Pending' }]);
    setMessage('');
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const processedDocuments = await Promise.all(
        documents.map(async (doc) => {
          let fileBase64 = '';
          if (doc.file) {
            fileBase64 = await toBase64(doc.file);
          }
          return {
            documentName: doc.docName,
            file: fileBase64,
            status: doc.status
          };
        })
      );

      const dataToSend = {
        ...formData,
        documents: processedDocuments
      };

      console.log("🔍 Final payload to be submitted:", dataToSend);

      const res = await axios.post('http://localhost:3000/api/AddCustomer/AddCustomer', dataToSend);

      if (res.data.success) {
        resetForm();
        setMessage('Customer added successfully!');
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
          <h2 className="text-xl font-bold text-purple-700 border-b pb-2 mb-4">Customer Details</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Address", name: "address", type: "textarea" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              { label: "Country", name: "country", defaultValue: "India" },
              { label: "Pin Code", name: "pinCode" },
              { label: "Email", name: "email", type: "email" },
              { label: "Mobile", name: "mobile", type: "tel" },
              { label: "Phone", name: "phone", type: "tel" },
              { label: "Nominee Name", name: "nomineeName" },
              { label: "PAN Number", name: "panNo" },
              { label: "GST Number", name: "gstNo" },
              { label: "Payment Terms", name: "paymentTerms", placeholder: "e.g., Advance / 50% on booking / EMI" },
            ].map(({ label, name, type = "text", placeholder = "", defaultValue = "" }) => (
              <div key={name} className={name === "address" ? "col-span-2" : ""}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                {type === "textarea" ? (
                  <textarea name={name} value={formData[name]} onChange={handleChange} rows="2" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm" />
                ) : (
                  <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} defaultValue={defaultValue} className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm" />
                )}
              </div>
            ))}
          </form>

          {/* Document Table */}
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Customer Documents</h3>
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Document Name</th>
                  <th className="border px-2 py-1">Attach File</th>
                  <th className="border px-2 py-1">Status</th>
                  <th className="border px-2 py-1">Remove</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        className="w-full border rounded px-2 py-1"
                        value={doc.docName}
                        onChange={(e) => handleDocChange(index, 'docName', e.target.value)}
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="file"
                        className="w-full"
                        onChange={(e) => handleDocChange(index, 'file', e.target.files[0])}
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <select
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                        value={doc.status}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                      >
                        <option value="Received">Received</option>
                        <option value="Not Received">Not Received</option>
                      </select>
                    </td>
                    <td className="border px-2 py-1 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className="text-red-500 font-bold text-xl hover:text-red-700"
                      >
                        ✖
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addRow}
              className="mt-3 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
            >
              + Add Row
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
            >
              Submit
            </button>
            <button
              type="reset"
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Reset
            </button>
          </div>

          {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
