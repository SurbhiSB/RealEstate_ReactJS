import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import UserTable from '../components/UserTable';

export default function UserManagement() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">User Management</h1>
          <UserTable />
        </main>
      </div>
    </div>
  );
}