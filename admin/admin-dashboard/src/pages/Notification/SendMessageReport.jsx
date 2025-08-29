import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function SendMessageReport() {
  const [data, setData] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/SendMessage/SendMessage')
      .then(res => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch(err => console.error('Error fetching send messages:', err));
  }, []);

  const columns = [
    { name: '#', selector: (row, index) => index + 1, width: "60px" },
    { name: 'Entry Date', selector: row => new Date(row.createdAt).toLocaleDateString(), sortable: true },
    { name: 'User Type', selector: row => row.userType, sortable: true },
    { name: 'Title', selector: row => row.title, sortable: true },
    { name: 'Message', selector: row => row.message, wrap: true },
    { name: 'Added By', selector: row => row.addedBy || '', sortable: true }
  ];

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((item, index) => ({
      '#': index + 1,
      'Entry Date': new Date(item.createdAt).toLocaleDateString(),
      'User Type': item.userType,
      'Title': item.title,
      'Message': item.message,
      'Added By': item.addedBy || ''
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Send Messages");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "SendMessages.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Send Message Report", 14, 10);
    const tableData = data.map((item, index) => [
      index + 1,
      new Date(item.createdAt).toLocaleDateString(),
      item.userType,
      item.title,
      item.message,
      item.addedBy || ''
    ]);
    doc.autoTable({
      head: [['#', 'Entry Date', 'User Type', 'Title', 'Message', 'Added By']],
      body: tableData,
      startY: 20,
    });
    doc.save('SendMessages.pdf');
  };

  // Print
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=900,height=700');
    const html = `
      <html>
        <head><title>Print</title></head>
        <body>
          <h2>Send Message Report</h2>
          <table border="1" cellpadding="5" cellspacing="0" style="width:100%">
            <thead>
              <tr>
                <th>#</th>
                <th>Entry Date</th>
                <th>User Type</th>
                <th>Title</th>
                <th>Message</th>
                <th>Added By</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>${item.userType}</td>
                  <td>${item.title}</td>
                  <td>${item.message}</td>
                  <td>${item.addedBy || ''}</td>
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
          <h2 className="text-lg font-semibold mb-4">Send Message Report</h2>

          <div className="mb-4 flex gap-2">
            <button className="bg-purple-700 text-white px-3 py-1 rounded"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}>Copy</button>
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
