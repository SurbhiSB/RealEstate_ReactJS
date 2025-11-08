import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TotalUsersStatCard from '../components/TotalUsersStatCard';
import TotalListingsStatCard from '../components/TotalListingsStatCard';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 overflow-y-auto">
          {/* Dashboard Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Dashboard Overview
          </h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="transition-transform transform hover:scale-105">
              <TotalUsersStatCard />
            </div>
            <div className="transition-transform transform hover:scale-105">
              <TotalListingsStatCard />
            </div>
            <div className="transition-transform transform hover:scale-105">
              <StatCard title="New Users Today" value="12" />
            </div>
            <div className="transition-transform transform hover:scale-105">
              <StatCard title="Pending Approvals" value="3" />
            </div>
          </div>

          {/* Extra Section: Analytics Preview */}
          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Quick Analytics
            </h2>
            <p className="text-gray-600 text-sm">
              Monitor the latest activity and trends happening in your
              application. (This section can later hold charts/graphs.)
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
