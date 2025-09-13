import React, { useState } from 'react';
import uploadToCloudinary from '../utils/uploadToCloudinary';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    sale: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    imageUrls: [],
    role: 'admin',
status: 'approved',
  });

  const [imageUploadError, setImageUploadError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageSubmit = async () => {
    if (files.length + formData.imageUrls.length > 6) {
      return setImageUploadError('Max 6 images allowed.');
    }

    try {
      const urls = await Promise.all([...files].map(uploadToCloudinary));
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
      setImageUploadError('');
    } catch (err) {
      setImageUploadError('Image upload failed. (2MB max per image)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const data = await axios.post('http://localhost:3000/api/admin/admin-create', formData, {
        withCredentials: true,
      });
      console.log("data ",data);
      setSubmitSuccess('Listing created successfully!');
      setFormData({ ...formData, imageUrls: [] });
    } catch (err) {
      setSubmitSuccess('Failed to create listing.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-3 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Create Property Listing</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input className="border p-2 rounded" id="name" onChange={handleChange} value={formData.name} placeholder="Name" required />
            <textarea className="border p-2 rounded" id="description" onChange={handleChange} value={formData.description} placeholder="Description" />
            <input className="border p-2 rounded" id="address" onChange={handleChange} value={formData.address} placeholder="Address" required />

            <div className="flex gap-4 flex-wrap">
              {['sale', 'rent', 'parking', 'furnished', 'offer'].map((key) => (
                <label key={key} className="flex items-center gap-2">
                  <input type="checkbox" id={key} checked={formData[key]} onChange={handleChange} />
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-4">
              <input type="number" id="bedrooms" value={formData.bedrooms} onChange={handleChange} className="border p-2 rounded" placeholder="Bedrooms" />
              <input type="number" id="bathrooms" value={formData.bathrooms} onChange={handleChange} className="border p-2 rounded" placeholder="Bathrooms" />
            </div>

            <div className="flex gap-4">
              <input type="number" id="regularPrice" value={formData.regularPrice} onChange={handleChange} className="border p-2 rounded" placeholder="Regular Price" />
              <input type="number" id="discountPrice" value={formData.discountPrice} onChange={handleChange} className="border p-2 rounded" placeholder="Discounted Price" />
            </div>

            <div>
              <p className="font-semibold">Upload Images (max 6)</p>
              <input type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} />
              <button type="button" onClick={handleImageSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
                Upload Images
              </button>
              <p className="text-red-600">{imageUploadError}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.imageUrls.map((url, i) => (
                <img key={i} src={url} alt="listing" className="w-24 h-24 object-cover rounded" />
              ))}
            </div>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Submit Listing
            </button>

            <p className="text-red-600">{submitSuccess}</p>
          </form>
        </main>
      </div>
    </div>
  );
}
