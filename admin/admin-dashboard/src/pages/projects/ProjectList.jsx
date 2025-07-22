// 📁 src/pages/projects/ProjectList.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  

    const navigate = useNavigate();

  const handleEdit = (projectId) => {
    navigate(`/projects/edit/${projectId}`);
  };


  useEffect(() => {
    axios.get("http://localhost:3000/api/projects/all").then((res) => {
      setData(res.data.projects || []);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorFn: (row, i) => i + 1,
        cell: (info) => info.getValue(),
      },
      {
        header: "Project Group",
        accessorFn: (row) => row.groupId?.groupName || "-",
        id: "groupName",
      },
      {
        header: "Project",
        accessorKey: "projectName",
      },
      {
        header: "Project Type",
        accessorKey: "projectType",
      },
      {
        header: "No. of Units",
        accessorKey: "noOfUnits",
        cell: (info) => info.getValue() || "-",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
  header: "Actions",
  cell: (info) => {
    const project = info.row.original;
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(project._id)}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Edit
        </button>

        <button className="bg-orange-400 text-white px-2 py-1 rounded text-sm">
          Plots
        </button>
      </div>
    );
  },
}

    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((row, i) => ({
      "#": i + 1,
      "Group": row.groupId?.groupName || "-",
      "Project": row.projectName,
      "Type": row.projectType,
      "Units": row.noOfUnits || "-",
      "Status": row.status,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Projects");
    XLSX.writeFile(wb, "projects.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Projects", 14, 10);
    doc.autoTable({
      head: [["#", "Group", "Project", "Type", "Units", "Status"]],
      body: data.map((row, i) => [
        i + 1,
        row.groupId?.groupName || "-",
        row.projectName,
        row.projectType,
        row.noOfUnits || "-",
        row.status,
      ]),
    });
    doc.save("projects.pdf");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-2xl font-semibold">Project List</h2>
            <div className="flex gap-2">
              <button onClick={exportExcel} className="bg-green-600 text-white px-3 py-1 rounded">Export Excel</button>
              <button onClick={exportPDF} className="bg-red-600 text-white px-3 py-1 rounded">Export PDF</button>
            </div>
          </div>

          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search..."
            className="mb-4 p-2 border rounded w-full max-w-md"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-100 text-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-2 border">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 border">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of {data.length} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">{table.getState().pagination.pageIndex + 1}</span>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}