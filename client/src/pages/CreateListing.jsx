import React, { useState } from "react";
import uploadToCloudinary from "../uploadToCloudinary";
import {useNavigate} from "react-router-dom";

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });

    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);

    
    
    const handleImageSubmit = (e) =>{
      
      if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true);
        setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
          setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls)
          });
          console.log("formData",formData);
          setImageUploadError(false);
          setUploading(false);
          
          
      }).catch((err) => {
          setImageUploadError('Image upload failed(2 mb max per image)');
          setUploading(false);
      })
      }else{
        setImageUploadError('You can only upload 6 images');
        setUploading(false);
      }
    };
    

    const storeImage = async (file) => {
        return await uploadToCloudinary(file);
    }

    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    }
  return (
    <main className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
          />

           <input
            type="text"
            placeholder="UserRef"
            className="border p-3 rounded-lg"
            id="UserRef"
            required
            onChange={handleChange}
          />


          {/* CHECKBOXES */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" onChange={handleChange} />
              <span>Offer</span>

                <div className='flex gap-2'>
                    <input type="checkbox" id='rent' className='w-5' />
                    <span>Rent</span>
                </div>

                <div className='flex gap-2'>
                    <input type="checkbox" id='parking' className='w-5' />
                    <span>Parking Spot</span>
                </div>

                <div className='flex gap-2'>
                    <input type="checkbox" id='furnished' className='w-5' />
                    <span>Furnished</span>
                </div>

                  <div className='flex gap-2'>
                    <input type="checkbox" id='offer' className='w-5' />
                    <span>Offer</span>
                </div>

              </div>

              <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                    <input type="number" id='bedrooms' min='1' max='10' required className='border border-gray-300 p-3 rounded-lg' />
                    <p>Beds</p>
                </div>
 <div className='flex items-center gap-2'>
                    <input type="number" id='bathrooms' min='1' max='10' required className='border border-gray-300 p-3 rounded-lg' />
                    <p>Baths</p>
                </div>

                 <div className='flex items-center gap-2'>
                    <input type="number" id='regularPrice' min='1' max='10' required className='border border-gray-300 p-3 rounded-lg' />

                <div className=''>
                    <p>Regular Price</p>
                    <span className='text-xs'>($ / Month)</span>
                </div>

                    
                </div>
                 <div className='flex items-center gap-2'>
                    <input type="number" id='discountPrice' min='1' max='10' required className='border border-gray-300 p-3 rounded-lg' />
                     <div className='flex flex-col items-center'>
                        <p>Discounted Price</p>
                        <span className='text-xs'>($ / Month)</span>
                </div>
                </div>

              </div>

        </div>

        <div className='flex flex-col gap-4 flex-1'>
            <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
            </p>
            <div className='flex gap-4'>
                <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
                <button type='' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:bg-green-700 hover:text-white disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
            </div>

{
  formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
    <div key={url}className='flex justify-between p-3 border items-center'>

    <img
     src={url}
    alt="listing image"
     className='w-32 h-32 object-cover rounded-lg' />

    <button type="button" onClick={() => handleRemoveImage(index)} className='p-3 text-red-600 border border-red-600 rounded-lg uppercase hover:bg-red-600 hover:text-white disabled:opacity-80'>Delete</button>
    </div>
  ))
}


            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="border border-gray-300 p-3 rounded-lg"
                onChange={handleChange}
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                required
                className="border border-gray-300 p-3 rounded-lg"
                onChange={handleChange}
              />
              <div>
                <p>Regular Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                required
                className="border border-gray-300 p-3 rounded-lg"
                onChange={handleChange}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:bg-green-700 hover:text-white"
            >
              Upload
            </button>
          </div>

          {imageUploadError && (
            <p className="text-red-600">{imageUploadError}</p>
          )}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url) => (
              <div
                className="flex items-center justify-between gap-2"
                key={url}
              >
                <img
                  src={url}
                  alt="listing"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(url)}
                  className="p-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
