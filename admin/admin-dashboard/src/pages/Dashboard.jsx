import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TotalUsersStatCard from '../components/TotalUsersStatCard';
import TotalListingsStatCard from '../components/TotalListingsStatCard';
import StatCard from '../components/StatCard';


export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TotalUsersStatCard />
            <TotalListingsStatCard />
            <StatCard title="New Users Today" value="12" />
            <StatCard title="Pending Approvals" value="3" />
          </div>
        </main>
      </div>
    </div>
  );
}