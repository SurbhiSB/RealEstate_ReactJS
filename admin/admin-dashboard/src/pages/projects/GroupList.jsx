import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [editId, setEditId] = useState(null);
const [editGroupName, setEditGroupName] = useState("");
const [editShortName, setEditShortName] = useState("");

const handleUpdate = async (id) => {
  try {
    const res = await axios.put(`http://localhost:3000/api/group/update/${id}`, {
      groupName: editGroupName,
      userShortName: editShortName,
    });

    const updated = res.data.data;
    const updatedGroups = groups.map((group) =>
      group._id === id ? updated : group
    );
    setGroups(updatedGroups);
    setEditId(null);
  } catch (error) {
    alert("Failed to update group. Try again.");
    console.error(error);
  }
};


  // Fetch groups on mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/group/all");
        setGroups(res.data.data); // make sure your controller sends `data: groups`
        setFilteredGroups(res.data.data);
      } catch (err) {
        setError("Failed to load groups");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Filter on search
  useEffect(() => {
    const filtered = groups.filter(
      (group) =>
        group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.userShortName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroups(filtered);
  }, [searchTerm, groups]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <div className="text-xl font-semibold mb-4">All Project Groups</div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or short name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div className="bg-white shadow-md rounded-md p-4 border">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredGroups.length === 0 ? (
              <p>No matching groups found.</p>
            ) : (
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b text-left">#</th>
                    <th className="py-2 px-4 border-b text-left">Group Name</th>
                    <th className="py-2 px-4 border-b text-left">Short Name</th>
                  </tr>
                </thead>
          <tbody>
  {filteredGroups.map((group, index) => (
    <tr key={group._id} className="hover:bg-gray-50">
      <td className="py-2 px-4 border-b">{index + 1}</td>

      {editId === group._id ? (
        <>
          <td className="py-2 px-4 border-b">
            <input
              value={editGroupName}
              onChange={(e) => setEditGroupName(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </td>
          <td className="py-2 px-4 border-b">
            <input
              value={editShortName}
              onChange={(e) => setEditShortName(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </td>
          <td className="py-2 px-4 border-b">
            <button
              onClick={() => handleUpdate(group._id)}
              className="bg-green-600 text-white px-3 py-1 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditId(null)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="py-2 px-4 border-b">{group.groupName}</td>
          <td className="py-2 px-4 border-b">{group.userShortName}</td>
          <td className="py-2 px-4 border-b">
            <button
              onClick={() => {
                setEditId(group._id);
                setEditGroupName(group.groupName);
                setEditShortName(group.userShortName);
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          </td>
        </>
      )}
    </tr>
  ))}
</tbody>

              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
