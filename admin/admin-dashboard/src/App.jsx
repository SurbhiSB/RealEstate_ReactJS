import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ListingManagement from './pages/ListingManagement';
import CreateListing from './pages/CreateListing';
import Group from './pages/projects/Group';
import GroupList from './pages/projects/GroupList';
import Project from './pages/projects/Project';
import ProjectList from './pages/projects/ProjectList';
import Plots from './pages/projects/Plots';
import Booking from './pages/projects/Booking';
import BookingHistory from './pages/projects/BookingHistory';
import PaymentReceived from './pages/projects/PaymentReceived';
import PaymentHistory from './pages/projects/PaymentHistory';
import CompanyDetailsPage from './pages/CompanyDetails';

import AddMembers from './pages/members/addMembers';
import AddCustomers from './pages/members/AddCustomer';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/listings" element={<ListingManagement />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/company-details" element={<CompanyDetailsPage />} />
        <Route path="/projects/group" element={<Group />} />
        <Route path="/projects/group-list" element={<GroupList />} />
        <Route path="/projects/project" element={<Project />} />
        <Route path="/projects/project-list" element={<ProjectList />} />
        <Route path="/projects/plots" element={<Plots />} />
        <Route path="/projects/booking" element={<Booking />} />
        <Route path="/projects/booking-history" element={<BookingHistory />} />
        <Route path="/projects/payment-recieved" element={<PaymentReceived />} />
        <Route path="/projects/payment-history" element={<PaymentHistory />} />

        <Route path="/members/addMembers" element={<AddMembers />} />
        <Route path="/members/addCustomer" element={<AddCustomers />} />
      </Routes>
    </BrowserRouter>
  );
}