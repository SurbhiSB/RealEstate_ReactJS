import React, { useState } from 'react';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

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
    const updatedDocs = [...documents];
    updatedDocs[index][field] = value;
    setDocuments(updatedDocs);
  };

  const addRow = () => {
    setDocuments([...documents, { docName: '', file: null, status: 'Pending' }]);
  };

  const removeRow = (index) => {
    const updatedDocs = [...documents];
    updatedDocs.splice(index, 1);
    setDocuments(updatedDocs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Documents:', documents);
    setMessage('Customer added successfully!');
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Header />
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-purple-700 border-b pb-2 mb-4">Customer Details</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Left */}
              <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea rows="2" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input type="text" defaultValue="India" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pin Code</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nominee Name</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">PAN Number</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GST Number</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
          <input type="text" placeholder="e.g., Advance / 50% on booking / EMI" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
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
                    <td className="border px-2 py-1">{doc.status}</td>
                    <td className="border px-2 py-1 text-center">
                      {documents.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRow(index)}
                          className="text-red-500 font-bold"
                        >
                          X
                        </button>
                      )}
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
