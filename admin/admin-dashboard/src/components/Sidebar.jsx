import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <nav>
        <ul>
          <li>
            <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
          </li>
          <li>
            <Link to="/users" className="block py-2 px-4 rounded hover:bg-gray-700">Users</Link>
          </li>
          <li>
            <Link to="/listings" className="block py-2 px-4 rounded hover:bg-gray-700">Listings</Link>
          </li>
          <li>
            <Link to="/create-listing" className="block py-2 px-4 rounded hover:bg-gray-700">Create Listing</Link>
          </li>

            <li>
            <Link to="/projects" className="block py-2 px-4 rounded hover:bg-gray-700">Projects</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
