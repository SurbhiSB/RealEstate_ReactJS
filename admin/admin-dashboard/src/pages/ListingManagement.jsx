import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import ListingTable from '../components/ListingTable';

export default function ListingManagement() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Listing Management</h1>
          <ListingTable />
        </main>
      </div>
    </div>
  );
}