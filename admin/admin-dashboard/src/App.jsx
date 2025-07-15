import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ListingManagement from './pages/ListingManagement';
import CreateListing from './pages/CreateListing';
import ProjectsPage from './pages/projects';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/listings" element={<ListingManagement />} />
        <Route path="/create-listing" element={<CreateListing />} />
         <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}