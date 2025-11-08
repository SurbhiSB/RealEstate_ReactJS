import React, { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import { useNavigate } from "react-router-dom";

import jszip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.vfs;
window.JSZip = jszip;

export default function AttendanceSummary() {
  const navigate = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({
      dom: "Bfrtip",
      buttons: ["copy", "excel", "pdf", "print"],
      data: [], // Empty data for now
      columns: [
        { title: "#" },
        { title: "Emp Id" },
        { title: "Full Name" },
        { title: "Present Days" },
        { title: "Absent Days" },
        { title: "Leave Days" },
      ],
    });
  }, []);

    const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Attendance Summary</h2>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">From Date</label>
              <input
                type="date"
                defaultValue="2025-08-01"
                className="border px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">To Date</label>
              <input
                type="date"
                defaultValue="2025-08-31"
                className="border px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Department</label>
              <select className="border px-2 py-1 rounded">
                <option>All</option>
                <option>HR</option>
                <option>IT</option>
              </select>
            </div>
            <div className="mt-5">
              <button className="bg-purple-800 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </div>

          {/* DataTable */}
          <table ref={tableRef} className="display w-full border border-gray-300"></table>
        </div>
      </div>
    </div>
  );
}
