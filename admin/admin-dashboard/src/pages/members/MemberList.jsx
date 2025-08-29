import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this line
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [memberType, setMemberType] = useState("All");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate(); // ✅ Initialize navigation

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  const fetchMembers = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/addMembers/addmembers?page=${page}&limit=10`
      );
      setMembers(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const filteredMembers = members.filter((member) => {
    return (
      (memberType === "All" || member.memberType === memberType) &&
      member.fullName.toLowerCase().includes(search.toLowerCase())
    );
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Member List", 14, 22);
    autoTable(doc, {
      startY: 28,
      head: [["#", "Name", "Email", "Phone"]],
      body: filteredMembers.map((m, i) => [
        i + 1,
        m.fullName || "-",
        m.email || "-",
        m.phone || "-",
      ]),
    });
    doc.save("members.pdf");
  };

  const copyToClipboard = () => {
    let copyText = "Name\tEmail\tPhone\n";
    filteredMembers.forEach((m) => {
      copyText += `${m.fullName || "-"}\t${m.email || "-"}\t${m.phone || "-"}\n`;
    });
    navigator.clipboard.writeText(copyText)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => alert("Failed to copy: " + err));
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-section").innerHTML;
    const newWin = window.open("", "", "width=900,height=600");
    newWin.document.write(`
      <html>
        <head>
          <title>Print Members</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredMembers.map((m) => ({
        Name: m.fullName,
        Email: m.email,
        Phone: m.phone,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, "members.xlsx");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Vendor/Contractor List</h2>

          {/* Filter Row */}
          <div className="flex items-center gap-4 mb-4">
            <select
              value={memberType}
              onChange={(e) => setMemberType(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="All">All</option>
              <option value="Vendor">Vendor</option>
              <option value="Contractor">Contractor</option>
            </select>
            <button className="bg-purple-800 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>

          {/* Export/Search Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="space-x-2">
              <button onClick={copyToClipboard} className="bg-purple-800 text-white px-3 py-1 rounded">
                Copy
              </button>
              <button onClick={exportToExcel} className="bg-purple-800 text-white px-3 py-1 rounded">
                Excel
              </button>
              <button onClick={exportToPDF} className="bg-purple-800 text-white px-3 py-1 rounded">
                PDF
              </button>
              <button onClick={handlePrint} className="bg-purple-800 text-white px-3 py-1 rounded">
                Print
              </button>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 p-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div id="print-section" className="overflow-auto max-h-[60vh] border rounded">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Mobile</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">RegDate</th>
                  <th className="p-2 border">Total Payment</th>
                  <th className="p-2 border">Payment Paid</th>
                  <th className="p-2 border">Outstanding Amount</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <tr key={member._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 text-center border">{index + 1}</td>
                      <td className="p-2 border">{member.fullName}</td>
                      <td className="p-2 border">{member.phone}</td>
                      <td className="p-2 border">{member.email}</td>
                      <td className="p-2 border">
                        {new Date(member.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="p-2 text-right border">0.0</td>
                      <td className="p-2 text-right border">0.0</td>
                      <td className="p-2 text-right border">0.0</td>
                      <td className="p-2 text-center text-green-600 border">✔</td>
                      <td className="p-2 text-center border">
                        <button
                          onClick={() => navigate(`/members/addMembers/${member._id}`)} // ✅ Navigate with ID
                          className="bg-purple-800 text-white px-3 py-1 rounded text-sm"
                        >
                          ✎ Edit Now
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="p-3 text-center text-gray-500">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-purple-800 text-white" : "bg-white border"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Copyright © 2025. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
