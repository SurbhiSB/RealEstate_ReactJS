import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CompanyDetails from '../components/CompanyDetails';

export default function CompanyDetailsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <CompanyDetails />
        </main>
      </div>
    </div>
  );
}
