import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function LandPurchaseList() {
  const [LandPurchases, setLandPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [LandPurchaseType, setLandPurchaseType] = useState("All");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLandPurchases(currentPage);
  }, [currentPage]);

  const fetchLandPurchases = async (page = 1) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/LandPurchase/LandPurchase?page=${page}&limit=10`);
      setLandPurchases(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching LandPurchases:", error);
    }
  };

  const getOwnerName = (owners = []) => {
    if (owners.length === 0) return "-";
    return owners.map(o => o.name).join(", ");
  };

  const filteredLandPurchases = LandPurchases.filter(item =>
    getOwnerName(item.owners).toLowerCase().includes(search.toLowerCase())
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Land Purchase List", 14, 22);
    autoTable(doc, {
      startY: 28,
      head: [["#", "Owner Name", "Khasra No", "Mouza", "Hector", "Area (Acre)", "Sale Deed Value"]],
      body: filteredLandPurchases.map((m, i) => [
        i + 1,
        getOwnerName(m.owners),
        m.khasraNo || "-",
        m.mouza || "-",
        m.hector || "-",
        m.areaInAcre || "-",
        m.saleDeedValue || "-",
      ]),
    });
    doc.save("LandPurchases.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredLandPurchases.map(m => ({
        "Owner Name": getOwnerName(m.owners),
        "Financial Year": m.financialYear,
        "Khasra No": m.khasraNo,
        "Mouza": m.mouza,
        "Hector": m.hector,
        "Area in Acre": m.areaInAcre,
        "Sale Deed Date": m.saleDeedDate,
        "Sale Deed Value": m.saleDeedValue,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LandPurchases");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "LandPurchases.xlsx");
  };

  const copyToClipboard = () => {
    let copyText = "Owner Name\tFinancial Year\tKhasra No\tMouza\tHector\tArea in Acre\tSale Deed Value\n";
    filteredLandPurchases.forEach(m => {
      copyText += `${getOwnerName(m.owners)}\t${m.financialYear || "-"}\t${m.khasraNo || "-"}\t${m.mouza || "-"}\t${m.hector || "-"}\t${m.areaInAcre || "-"}\t${m.saleDeedValue || "-"}\n`;
    });
    navigator.clipboard.writeText(copyText)
      .then(() => alert("Copied to clipboard!"))
      .catch(err => alert("Failed to copy: " + err));
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-section").innerHTML;
    const newWin = window.open("", "", "width=900,height=600");
    newWin.document.write(`
      <html>
        <head><title>Print</title></head>
        <body>${printContent}</body>
      </html>
    `);
    newWin.document.close();
    newWin.print();
    newWin.close();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Land Purchase List</h2>

          {/* Search and filter */}
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search by Owner Name"
              className="border border-gray-300 p-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="space-x-2">
              <button onClick={copyToClipboard} className="bg-purple-800 text-white px-3 py-1 rounded">Copy</button>
              <button onClick={exportToExcel} className="bg-purple-800 text-white px-3 py-1 rounded">Excel</button>
              <button onClick={exportToPDF} className="bg-purple-800 text-white px-3 py-1 rounded">PDF</button>
              <button onClick={handlePrint} className="bg-purple-800 text-white px-3 py-1 rounded">Print</button>
            </div>
          </div>

          {/* Table */}
          <div id="print-section" className="overflow-auto max-h-[60vh] border rounded">
            <table className="min-w-full bg-white text-sm border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Owner Name</th>
                  <th className="p-2 border">Financial Year</th>
                  <th className="p-2 border">Khasra No</th>
                  <th className="p-2 border">Mouza</th>
                  <th className="p-2 border">Hector</th>
                  <th className="p-2 border">Area in Acre</th>
                  <th className="p-2 border">Sale Deed Date</th>
                  <th className="p-2 border">Sale Deed Value</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLandPurchases.length > 0 ? (
                  filteredLandPurchases.map((purchase, index) => (
                    <tr key={purchase._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 text-center border">{index + 1}</td>
                      <td className="p-2 border">{getOwnerName(purchase.owners)}</td>
                      <td className="p-2 border">{purchase.financialYear}</td>
                      <td className="p-2 border">{purchase.khasraNo}</td>
                      <td className="p-2 border">{purchase.mouza}</td>
                      <td className="p-2 border">{purchase.hector}</td>
                      <td className="p-2 border">{purchase.areaInAcre}</td>
                      <td className="p-2 border">
                        {new Date(purchase.saleDeedDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="p-2 text-right border">{purchase.saleDeedValue}</td>
                      <td className="p-2 text-center border">
                        <button
                          onClick={() => navigate(`/LandPurchases/addLandPurchases/${purchase._id}`)}
                          className="bg-purple-800 text-white px-3 py-1 rounded text-sm"
                        >
                          ✎ Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="p-3 text-center text-gray-500">
                      No data available in table
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
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-purple-800 text-white" : "bg-white border"}`}
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
