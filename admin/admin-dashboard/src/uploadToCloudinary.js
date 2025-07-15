
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'my_unsigned_preset'); // Replace with your upload preset
  const res = await fetch('https://api.cloudinary.com/v1_1/djncznyoc/image/upload', { // Replace with your cloud name
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data.secure_url;
};

export default uploadToCloudinary;
//Cloud name : djncznyoc
// API Key : 272818263167995
// API Secret : ybdDBdjP5oVciKryv45r4PGf1aw

