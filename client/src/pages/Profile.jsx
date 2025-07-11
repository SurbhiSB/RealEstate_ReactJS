import { useSelector } from "react-redux"
import { useRef } from "react";
import { Link } from "react-router-dom";
export default function Profile() {
  const fileRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col items-center gap-4">

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
    </div>
  )
}
