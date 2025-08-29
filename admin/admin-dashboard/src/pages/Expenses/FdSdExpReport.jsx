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

export default function FdSdExpReport() {
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
    axios.get('http://localhost:3000/api/FdSdExpenses/FdSdExpenses')
      .then(res => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch(err => console.error('Error fetching office expenses:', err));
  }, []);

  const columns = [
  { name: '#', selector: (row, index) => index + 1, width: "60px" },
  { name: 'Project Name', selector: row => row.projectName },
  { name: 'FD/SD Number', selector: row => row.fdNumber },
  { name: 'Deposit Date', selector: row => row.depositDate },
  { name: 'Maturity Date', selector: row => row.maturityDate },
  { name: 'Deposit Amount', selector: row => row.depositAmount },
  { name: 'Maturity Amount', selector: row => row.maturityAmount },
  { name: 'Interest Rate (%)', selector: row => row.interestRate },
  { name: 'Payment Mode', selector: row => row.paymentMode },
  { name: 'Bank Account', selector: row => row.bankAccount },
  { name: 'Type', selector: row => row.depositType },
  { name: 'Liquidate Date', selector: row => row.liquidateDate },
  { name: 'Liquidate Amount', selector: row => row.liquidateAmount },
  { name: 'RL Done', selector: row => row.rlDone ? "Yes" : "No" },
  { name: 'GP Letter Date', selector: row => row.gpLetterDate },
  { name: 'GP Handover Date', selector: row => row.gpHandoverDate },
  { name: 'Remark', selector: row => row.remark },
];

  // Export Functions
  const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(data.map((item, index) => ({
    '#': index + 1,
    'Project Name': item.projectName,
    'FD/SD Number': item.fdNumber,
    'Deposit Date': item.depositDate,
    'Maturity Date': item.maturityDate,
    'Deposit Amount': item.depositAmount,
    'Maturity Amount': item.maturityAmount,
    'Interest Rate (%)': item.interestRate,
    'Payment Mode': item.paymentMode,
    'Bank Account': item.bankAccount,
    'Type': item.depositType,
    'Liquidate Date': item.liquidateDate,
    'Liquidate Amount': item.liquidateAmount,
    'RL Done': item.rlDone ? "Yes" : "No",
    'GP Letter Date': item.gpLetterDate,
    'GP Handover Date': item.gpHandoverDate,
    'Remark': item.remark,
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "FD_SD_Expenses");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(dataBlob, "FdSdExpenses.xlsx");
};

 const exportToPDF = () => {
  const doc = new jsPDF();
  doc.text("FD/SD Expenses Report", 14, 10);

  const tableData = data.map((item, index) => [
    index + 1,
    item.projectName,
    item.fdNumber,
    item.depositAmount,
    item.maturityAmount,
    item.interestRate,
    item.paymentMode,
    item.bankAccount,
    item.depositType,
    item.rlDone ? "Yes" : "No",
    item.remark,
  ]);

  doc.autoTable({
    head: [['#', 'Project', 'FD/SD #', 'Deposit Amt', 'Maturity Amt', 'Interest %', 'Pay Mode', 'Bank', 'Type', 'RL Done', 'Remark']],
    body: tableData,
    startY: 20,
    styles: { fontSize: 8 },
  });

  doc.save('FdSdExpenses.pdf');
};

  const handlePrint = () => {
  const printWindow = window.open('', '', 'width=1000,height=700');
  const html = `
    <html>
      <head><title>FD/SD Report</title></head>
      <body>
        <h2>FD/SD Expenses Report</h2>
        <table border="1" cellpadding="5" cellspacing="0" style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>FD/SD #</th>
              <th>Deposit Amt</th>
              <th>Maturity Amt</th>
              <th>Interest %</th>
              <th>Pay Mode</th>
              <th>Bank</th>
              <th>Type</th>
              <th>RL Done</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            ${data.map((item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${item.projectName}</td>
                <td>${item.fdNumber}</td>
                <td>${item.depositAmount}</td>
                <td>${item.maturityAmount}</td>
                <td>${item.interestRate}</td>
                <td>${item.paymentMode}</td>
                <td>${item.bankAccount}</td>
                <td>${item.depositType}</td>
                <td>${item.rlDone ? "Yes" : "No"}</td>
                <td>${item.remark}</td>
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
      <h2 className="text-lg font-semibold mb-4">FdSd Expenses Report</h2>

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
