import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  List,
  PlusSquare,
  FolderKanban,
  ChevronDown,
  ChevronUp,
  Circle,
  Building,
} from 'lucide-react';

export default function Sidebar() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li>
            <Link to="/" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>
          {/* Members with submenu */}
          <li>
            <button
              onClick={() => setIsMembersOpen(!isMembersOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <Users size={18} /> Members
              {isMembersOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isMembersOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/members/addMembers" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add Vendor/Contractor
                  </Link>
                </li>
                <li>
                  <Link to="/members/AddCustomer" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add Customer
                  </Link>
                </li>
                <li>
                  <Link to="/admin/members/add" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add New
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/listings" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
              <List size={18} /> Listings
            </Link>
          </li>
          <li>
            <Link to="/create-listing" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
              <PlusSquare size={18} /> Create Listing
            </Link>
          </li>
          <li>
            <Link to="/company-details" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
              <Building size={18} /> Company Details
            </Link>
          </li>

          {/* Projects with submenu */}
          <li>
            <button
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <FolderKanban size={18} /> Projects
              {isProjectsOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isProjectsOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/projects/group" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Group
                  </Link>
                </li>
                <li>
                  <Link to="/projects/group-list" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Group List
                  </Link>
                </li>
                <li>
                  <Link to="/projects/project" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Project
                  </Link>
                </li>
                <li>
                  <Link to="/projects/project-list" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Project List
                  </Link>
                </li>
                <li>
                  <Link to="/projects/plots" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Plots
                  </Link>
                </li>
                <li>
                  <Link to="/projects/booking" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Booking
                  </Link>
                </li>
                <li>
                  <Link to="/projects/booking-history" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Booking History
                  </Link>
                </li>
                <li>
                  <Link to="/projects/payment-recieved" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Payment Received
                  </Link>
                </li>
                <li>
                  <Link to="/projects/payment-history" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Payment History
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
