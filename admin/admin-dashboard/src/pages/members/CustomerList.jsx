import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [customerType, setCustomerType] = useState("All");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const fetchCustomers = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/AddCustomer/AddCustomer?page=${page}&limit=10`
      );
      setCustomers(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    (customer?.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
    (customer?.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (customer?.phone || "").toLowerCase().includes(search.toLowerCase())
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Customer List", 14, 22);
    autoTable(doc, {
      startY: 28,
      head: [["#", "Name", "Mobile", "Email", "Address", "Reg Date", "Status"]],
      body: filteredCustomers.map((c, i) => [
        i + 1,
        c.fullName || "-",
        c.phone || "-",
        c.email || "-",
        c.Address || "-",
        new Date(c.createdAt).toLocaleDateString("en-GB"),
        "✔",
      ]),
    });
    doc.save("customer-list.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredCustomers.map((c) => ({
        Name: c.fullName,
        Mobile: c.phone,
        Email: c.email,
        Address: c.Address,
        RegDate: new Date(c.createdAt).toLocaleDateString("en-GB"),
        Status: "✔",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, "customer-list.xlsx");
  };

  const copyToClipboard = () => {
    let copyText = "Name\tMobile\tEmail\tAddress\tRegDate\tStatus\n";
    filteredCustomers.forEach((c) => {
      copyText += `${c.fullName || "-"}\t${c.phone || "-"}\t${c.email || "-"}\t${
        c.Address || "-"
      }\t${new Date(c.createdAt).toLocaleDateString("en-GB")}\t✔\n`;
    });

    navigator.clipboard
      .writeText(copyText)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => alert("Failed to copy: " + err));
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-section").innerHTML;
    const newWin = window.open("", "", "width=900,height=600");
    newWin.document.write(`
      <html>
        <head>
          <title>Print Customers</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Customer List</h2>

          {/* Filter Section */}
          <div className="flex items-center gap-4 mb-4">
            <select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="All">All</option>
              <option value="Vendor">Vendor</option>
              <option value="Contractor">Contractor</option>
            </select>
            <button
              onClick={() => fetchCustomers(currentPage)}
              className="bg-purple-800 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>

          {/* Export & Search */}
          <div className="flex items-center justify-between mb-4">
            <div className="space-x-2">
              <button
                onClick={copyToClipboard}
                className="bg-purple-800 text-white px-3 py-1 rounded"
              >
                Copy
              </button>
              <button
                onClick={exportToExcel}
                className="bg-purple-800 text-white px-3 py-1 rounded"
              >
                Excel
              </button>
              <button
                onClick={exportToPDF}
                className="bg-purple-800 text-white px-3 py-1 rounded"
              >
                PDF
              </button>
              <button
                onClick={handlePrint}
                className="bg-purple-800 text-white px-3 py-1 rounded"
              >
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
          <div id="print-section" className="overflow-auto border rounded">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Mobile</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">RegDate</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((c, index) => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="p-2 text-center border">{index + 1}</td>
                      <td className="p-2 border">{c.fullName}</td>
                      <td className="p-2 border">{c.phone}</td>
                      <td className="p-2 border">{c.email}</td>
                      <td className="p-2 border">{c.Address || "-"}</td>
                      <td className="p-2 border">
                        {new Date(c.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="p-2 text-center text-green-600 border">✔</td>
                      <td className="p-2 text-center border">
                        <button className="bg-purple-800 text-white px-3 py-1 rounded text-sm">
                          ✎ Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-3 text-center text-gray-500">
                      No customers found.
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
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-purple-800 text-white"
                    : "bg-white border"
                }`}
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
