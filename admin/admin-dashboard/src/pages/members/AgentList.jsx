import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { FaCheck } from 'react-icons/fa';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from "react-router-dom";

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredAgents, setFilteredAgents] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, []);

  const navigate = useNavigate();
  
       const token = localStorage.getItem("adminToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  useEffect(() => {
    if (!token) navigate("/AdminLogin");
  }, [token, navigate]);

  const fetchAgents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/AddAgent/AddAgent');
      setAgents(res.data);
      setFilteredAgents(res.data);
    } catch (err) {
      console.error('Failed to fetch agents:', err);
    }
  };

  // Search filter
  useEffect(() => {
    const result = agents.filter(agent =>
      agent.fullName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredAgents(result);
  }, [search, agents]);

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredAgents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Agents');
    XLSX.writeFile(wb, 'AgentList.xlsx');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['#', 'Name', 'Mobile', 'Email', 'RegDate', 'Refer By', 'Perc.%', 'Status'];
    const tableRows = [];

    filteredAgents.forEach((agent, index) => {
      tableRows.push([
        index + 1,
        agent.fullName,
        agent.mobile,
        agent.email,
        agent.joiningDate,
        agent.referBy || '-',
        `${agent.percentage || 0} %`,
        agent.status ? '✔️' : '❌'
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('AgentList.pdf');
  };

  const copyToClipboard = () => {
    const text = filteredAgents.map((a, i) =>
      `${i + 1}. ${a.fullName} - ${a.mobile} - ${a.email}`
    ).join('\n');
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-5">
          <h2 className="text-xl font-bold mb-4">Agent List</h2>

          {/* Filter by Date (Not functional here, but UI ready) */}
          <div className="flex flex-wrap items-center mb-4 gap-2">
            <input type="date" className="border p-2 rounded" />
            <input type="date" className="border p-2 rounded" />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
          </div>

          {/* Top Actions */}
          <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="bg-purple-700 text-white px-3 py-1 rounded">Copy</button>
              <button onClick={exportToExcel} className="bg-purple-700 text-white px-3 py-1 rounded">Excel</button>
              <button onClick={exportToPDF} className="bg-purple-700 text-white px-3 py-1 rounded">PDF</button>
              <button onClick={() => window.print()} className="bg-purple-700 text-white px-3 py-1 rounded">Print</button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">#</th>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Mobile</th>
                  <th className="border px-3 py-2">Email</th>
                  <th className="border px-3 py-2">RegDate</th>
                  <th className="border px-3 py-2">Refer By</th>
                  <th className="border px-3 py-2">Perc.%</th>
                  <th className="border px-3 py-2">Status</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent, index) => (
                  <tr key={index} className="text-center">
                    <td className="border px-3 py-1">{index + 1}</td>
                    <td className="border px-3 py-1">{agent.fullName}</td>
                    <td className="border px-3 py-1">{agent.mobile}</td>
                    <td className="border px-3 py-1">{agent.email}</td>
                    <td className="border px-3 py-1">{agent.joiningDate}</td>
                    <td className="border px-3 py-1">{agent.referBy || '-'}</td>
                    <td className="border px-3 py-1">{agent.percentage} %</td>
                    <td className="border px-3 py-1 text-green-600">
                      {agent.status && <FaCheck />}
                    </td>
                    <td className="border px-3 py-1">
                      <button className="bg-purple-700 text-white px-3 py-1 rounded">Edit</button>
                    </td>
                  </tr>
                ))}
                {filteredAgents.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">No agents found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentList;
