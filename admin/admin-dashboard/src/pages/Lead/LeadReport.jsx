import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LeadReport() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/LeadCreation/LeadCreation")
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching lead data:", err));
  }, []);

  const handleEdit = (row) => {
    navigate(`/Lead/LeadCreation?id=${row._id}`);
  };

  const columns = [
    { name: "#", selector: (row, index) => index + 1, width: "60px" },
    { name: "Full Name", selector: (row) => row.fullName, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Status", selector: (row) => row.status },
    { name: "Agent Name", selector: (row) => row.agentName },
    { name: "Interaction Type", selector: (row) => row.interactionsType },
    { name: "Next Interaction Date", selector: (row) => row.nextInteractionsDate },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleEdit(row)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <FaEdit /> Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item, index) => ({
        "#": index + 1,
        "Full Name": item.fullName,
        Phone: item.phone,
        Status: item.status,
        "Agent Name": item.agentName,
        "Interaction Type": item.interactionsType,
        "Next Interaction Date": item.nextInteractionsDate,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "LeadReport.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Lead Report", 14, 10);
    const tableData = data.map((item, index) => [
      index + 1,
      item.fullName,
      item.phone,
      item.status,
      item.agentName,
      item.interactionsType,
      item.nextInteractionsDate,
    ]);

    doc.autoTable({
      head: [["#", "Full Name", "Phone", "Status", "Agent Name", "Interaction Type", "Next Interaction Date"]],
      body: tableData,
      startY: 20,
    });

    doc.save("LeadReport.pdf");
  };

  // Print
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=700");
    const html = `
      <html>
        <head><title>Print</title></head>
        <body>
          <h2>Lead Report</h2>
          <table border="1" cellpadding="5" cellspacing="0" style="width:100%">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Agent Name</th>
                <th>Interaction Type</th>
                <th>Next Interaction Date</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.fullName}</td>
                  <td>${item.phone}</td>
                  <td>${item.status}</td>
                  <td>${item.agentName}</td>
                  <td>${item.interactionsType}</td>
                  <td>${item.nextInteractionsDate}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Lead Report</h2>

          <div className="mb-4 flex gap-2">
            <button
              className="bg-purple-700 text-white px-3 py-1 rounded"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}
            >
              Copy
            </button>
            <button
              className="bg-purple-700 text-white px-3 py-1 rounded"
              onClick={exportToExcel}
            >
              Excel
            </button>
            <button
              className="bg-purple-700 text-white px-3 py-1 rounded"
              onClick={exportToPDF}
            >
              PDF
            </button>
            <button
              className="bg-purple-700 text-white px-3 py-1 rounded"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>

          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            striped
            persistTableHead
            noDataComponent="No data available in table"
          />
        </div>
      </div>
    </div>
  );
}
