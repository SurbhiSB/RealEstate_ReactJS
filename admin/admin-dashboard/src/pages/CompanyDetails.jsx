import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function CompanyDetails() {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    state: '',
    city: '',
    pinCode: '',
    phoneNumber: '',
    email: '',
    website: '',
    message: '',
    jurisdiction: '',
  });

  const [companyId, setCompanyId] = useState(null); // ← Store ID if already exists

  // Check if company exists on load
  useEffect(() => {
    fetch(`http://localhost:3000/api/company/AddCompanydtl`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.data?.length > 0) {
          const existing = res.data[0]; // Assume only one company allowed
          setFormData(existing);
          setCompanyId(existing._id);
        }
      })
      .catch((err) => console.error('Error fetching existing company:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        companyId
          ? `http://localhost:3000/api/company/AddCompanydtl/${companyId}` // PUT
          : `http://localhost:3000/api/company/AddCompanydtl`,             // POST
        {
          method: companyId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert(`Company ${companyId ? 'updated' : 'created'} successfully!`);
        if (!companyId && result.data?._id) {
          setCompanyId(result.data._id); // Set ID after first creation
        }
      } else {
        alert('Failed to save company data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while saving the data.');
    }
  };

  const handleCancel = () => {
    console.log('Cancelled');
    // Optional: reset form or redirect
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Header />
        <div className="p-6 bg-gray-100 min-h-screen text-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {companyId ? 'Update Company Details' : 'Add Company Details'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="bg-white shadow border-t-4 border-gray-600 rounded-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Company Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Company Name', name: 'companyName' },
                  { label: 'Address', name: 'address' },
                  { label: 'State', name: 'state' },
                  { label: 'City', name: 'city' },
                  { label: 'Pin Code', name: 'pinCode' },
                  { label: 'Phone Number', name: 'phoneNumber' },
                  { label: 'Email Address', name: 'email' },
                  { label: 'Website URL', name: 'website' },
                  { label: 'Message', name: 'message' },
                  { label: 'Jurisdiction', name: 'jurisdiction' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-600 mb-1">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition-all"
              >
                {companyId ? 'Update' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
