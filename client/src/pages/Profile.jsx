import { useSelector } from "react-redux"
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
  const fileRef = useRef(null);
  const [showListingsError, setShowListingsError] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userListings, setUserListings] = useState([]);
  const handleShowListings = async() => {
    try{
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`, { withCredentials: true });
      const data = await res.json();
      if(data.success === false){
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    }
    catch(error){
setShowListingsError(true);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">

        <input type="file" ref={fileRef} hidden accept="image/*"/>

        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="profile" className="rounded-full w-32 h-32 object-cover cursor-pointer self-center mt-2" />

        <input type="text" placeholder="username" defaultValue={currentUser.username} id="username" className="border p-3 rounded-lg"/>
        
        <input type="email" placeholder="email" defaultValue={currentUser.email} id="email" className="border p-3 rounded-lg" />
        <input type="text" placeholder="password" id="password" className="border p-3 rounded-lg" />  
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>      

<Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"create-listing"}> Create Listing </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 hover:underline cursor-pointer">Delete Account</span>
        <span className="text-red-600 hover:underline cursor-pointer">Sign Out</span>
      </div>
      <button onClick={handleShowListings} className = 'text-green-700 w-full'>Show Listing</button>
      <p className="text-red-600 mt-5">{showListingsError ? 'error showing listings': ''}

      </p>
      {
      userListings && userListings.length > 0 && 
      <div className="flex flex-col gap-4" id="listings"> 
        <h1 className="text-3xl font-semibold text-center mt-7" id="listings">Your Listings</h1>{userListings.map((listing) => (
        <div key={listing._id} className="border rounded-lg p-3 flex items-center justify-between gap-4">
          <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 object-contain'/>
          </Link>
          <link className='flex-1 text-slate-700 font-semibold hover:underline truncate'to={`/listing/${listing._id}`}>
          <p>{listing.name}</p>
          </link>
          <div className="flex flex-col items-center">
          <button className="bg-red-600 text-white p-2 rounded-lg uppercase">Delete</button>
          <button className="bg-green-600 text-white p-2 rounded-lg uppercase">Edit</button>
          </div>
 
        </div>

      ))}
    
    </div>
    }
    </div>
      
  );
}
//show listing watch video time 6.52Houre
