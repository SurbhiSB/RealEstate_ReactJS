
import { useEffect, useState } from 'react';

export default function ListingTable() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listing/get');
        const data = await res.json();
        if (data) {
          setListings(data);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Created By</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._id}>
              <td className="py-2 px-4 border-b">
                <img src={listing.imageUrls[0]} alt={listing.name} className="h-10 w-10 rounded-full object-cover" />
              </td>
              <td className="py-2 px-4 border-b">{listing.name}</td>
              <td className="py-2 px-4 border-b">{listing.userRef}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
