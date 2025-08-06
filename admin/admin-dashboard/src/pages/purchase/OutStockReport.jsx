
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";


export default function OutStockReportPage() {
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    projectName: '',
    itemName: ''
  });

  useEffect(() => {
    fetchData();
    fetchProjects();
    fetchItems();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/api/outstock')
      .then(res => {
        setData(res.data);
        setTimeout(() => {
          $('#outStockTable').DataTable();
        }, 0);
      })
      .catch(err => console.error("Error fetching out stock data", err));
  };

  const fetchProjects = () => {
    axios.get('http://localhost:3000/api/projects/all')
      .then(res => setProjects(res.data.projects || []))
      .catch(err => console.error("Error fetching projects", err));
  };

  const fetchItems = () => {
    axios.get("http://localhost:3000/api/items")
      .then((res) => {
        const result = res.data.items || res.data.data || res.data;
        setItems(Array.isArray(result) ? result : []);
      })
      .catch((err) => console.error("Item fetch error", err));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredData = data.filter(entry => {
    const { fromDate, toDate, projectName, itemName } = filters;
    const entryDate = new Date(entry.outDate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return (
      (!from || entryDate >= from) &&
      (!to || entryDate <= to) &&
      (!projectName || entry.projectName === projectName) &&
      (!itemName || entry.itemName === itemName)
    );
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Out Stock Report</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <input type="date" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} className="border rounded px-3 py-2" />
              <input type="date" name="toDate" value={filters.toDate} onChange={handleFilterChange} className="border rounded px-3 py-2" />
              <select name="projectName" value={filters.projectName} onChange={handleFilterChange} className="border rounded px-3 py-2">
                <option value="">All Projects</option>
                {projects.map(p => (
                  <option key={p._id} value={p.projectName}>{p.projectName}</option>
                ))}
              </select>
              <select name="itemName" value={filters.itemName} onChange={handleFilterChange} className="border rounded px-3 py-2">
                <option value="">All Items</option>
                {items.map(i => (
                  <option key={i._id} value={i.itemName}>{i.itemName}</option>
                ))}
              </select>
              <button className="bg-purple-800 text-white px-4 py-2 rounded">Submit</button>
            </div>

            <div className="overflow-x-auto">
              <table id="outStockTable" className="display w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Bill Date</th>
                    <th>Out Time</th>
                    <th>Item Name</th>
                    <th>Project Name</th>
                    <th>In Qty</th>
                    <th>Issue To</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((entry, index) => (
                    <tr key={entry._id}>
                      <td>{index + 1}</td>
                      <td>{new Date(entry.outDate).toLocaleDateString()}</td>
                      <td>{entry.outTime}</td>
                      <td>{entry.itemName}</td>
                      <td>{entry.projectName}</td>
                      <td>{entry.quantity}</td>
                      <td>{entry.issueTo}</td>
                      <td>
                        <button className="bg-purple-800 text-white px-2 py-1 rounded flex items-center">
                          <i className="fas fa-edit mr-1"></i>Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


