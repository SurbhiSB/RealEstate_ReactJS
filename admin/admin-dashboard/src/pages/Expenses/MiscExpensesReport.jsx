import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function MiscExpensesReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/miscExpenses/miscExpenses')
      .then(res => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch(err => console.error('Error fetching office expenses:', err));
  }, []);

  const columns = [
    { name: '#', selector: (row, index) => index + 1, width: "60px" },
     { name: 'Project Name', selector: row => row.projectName, sortable: true },
    { name: 'Item Details', selector: row => row.itemName, sortable: true },
    { name: 'Amount', selector: row => row.amount },
    { name: 'Bill Date', selector: row => row.billDate },
    { name: 'Bill No', selector: row => row.billNo },
    { name: 'Pay Mode', selector: row => row.payMode },
    { name: 'Remark', selector: row => row.remark },
  ];

  // Export Functions
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((item, index) => ({
      '#': index + 1,
      'Project Name': item.projectName,
      'Item Details': item.itemName,
      'Amount': item.amount,
      'Bill Date': item.billDate,
      'Bill No': item.billNo,
      'Pay Mode': item.payMode,
      'Remark': item.remark
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Office Expenses");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "OfficeExpenses.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Office Expenses Report", 14, 10);
    const tableData = data.map((item, index) => [
      index + 1,
      item.projectName,
      item.itemName,
      item.amount,
      item.billDate,
      item.billNo,
      item.payMode,
      item.remark
    ]);

    doc.autoTable({
      head: [['#', 'Item Details', 'Amount', 'Bill Date', 'Bill No', 'Pay Mode', 'Remark']],
      body: tableData,
      startY: 20,
    });

    doc.save('OfficeExpenses.pdf');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=900,height=700');
    const html = `
      <html>
        <head><title>Print</title></head>
        <body>
          <h2>Office Expenses Report</h2>
          <table border="1" cellpadding="5" cellspacing="0" style="width:100%">
            <thead>
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Item Details</th>
                <th>Amount</th>
                <th>Bill Date</th>
                <th>Bill No</th>
                <th>Pay Mode</th>
                <th>Remark</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.projectName}</td>
                  <td>${item.itemName}</td>
                  <td>${item.amount}</td>
                  <td>${item.billDate}</td>
                  <td>${item.billNo}</td>
                  <td>${item.payMode}</td>
                  <td>${item.remark}</td>
                   <td></td>
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
      <h2 className="text-lg font-semibold mb-4">Miscellaneous Expenses List</h2>

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
