import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function LabourList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/AddLabour/addLabours')
      .then(res => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch(err => console.error('Error fetching office expenses:', err));
  }, []);

  const columns = [
  { name: '#', selector: (row, index) => index + 1, width: "60px" },
  { name: 'JoinDate', selector: row => row.joiningDate, sortable: true },
  { name: 'Full Name', selector: row => row.name, sortable: true },
  { name: 'Contact', selector: row => row.contact, sortable: true },
  { name: 'Site', selector: row => row.site, sortable: true },
  { name: 'Designation', selector: row => row.designation, sortable: true },
  { name: 'PerDay', selector: row => row.perDay, sortable: true },
  { name: 'Due Amount', selector: row => row.amount, sortable: true },
  { name: 'Total Payment', selector: row => row.totalPayment, sortable: true },
  {
    name: 'Edit',
    cell: row => (
      <button
        onClick={() => handleEdit(row)}
        className="text-blue-600 hover:underline"
      >
        Edit
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
];

  // Export Functions
 const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(data.map((item, index) => ({
    '#': index + 1,
    'JoinDate': item.joinDate,
    'Full Name': item.fullName,
    'Contact': item.contact,
    'Site': item.site,
    'Designation': item.designation,
    'PerDay': item.perDay,
    'Due Amount': item.dueAmount,
    'Total Payment': item.totalPayment
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Labour List");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(dataBlob, "LabourList.xlsx");
};

  const exportToPDF = () => {
  const doc = new jsPDF();
  doc.text("Labour List Report", 14, 10);

  const tableData = data.map((item, index) => [
    index + 1,
    item.joinDate,
    item.fullName,
    item.contact,
    item.site,
    item.designation,
    item.perDay,
    item.dueAmount,
    item.totalPayment
  ]);

  doc.autoTable({
    head: [['#', 'JoinDate', 'Full Name', 'Contact', 'Site', 'Designation', 'PerDay', 'Due Amount', 'Total Payment']],
    body: tableData,
    startY: 20,
  });

  doc.save('LabourList.pdf');
};

  const handlePrint = () => {
  const printWindow = window.open('', '', 'width=900,height=700');
  const html = `
    <html>
      <head>
        <title>Labour List</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
            font-family: Arial, sans-serif;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          h2 {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h2>Labour List Report</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>JoinDate</th>
              <th>Full Name</th>
              <th>Contact</th>
              <th>Site</th>
              <th>Designation</th>
              <th>PerDay</th>
              <th>Due Amount</th>
              <th>Total Payment</th>
            </tr>
          </thead>
          <tbody>
            ${data.map((item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${item.joinDate || ''}</td>
                <td>${item.fullName || ''}</td>
                <td>${item.contact || ''}</td>
                <td>${item.site || ''}</td>
                <td>${item.designation || ''}</td>
                <td>${item.perDay || ''}</td>
                <td>${item.dueAmount || ''}</td>
                <td>${item.totalPayment || ''}</td>
              </tr>
            `).join('')}
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
      <h2 className="text-lg font-semibold mb-4">Labour List</h2>

      <div className="mb-4 flex gap-2">
        <button className="bg-purple-700 text-white px-3 py-1 rounded" onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}>Copy</button>
        <button className="bg-purple-700 text-white px-3 py-1 rounded" onClick={exportToExcel}>Excel</button>
        <button className="bg-purple-700 text-white px-3 py-1 rounded" onClick={exportToPDF}>PDF</button>
        <button className="bg-purple-700 text-white px-3 py-1 rounded" onClick={handlePrint}>Print</button>
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
