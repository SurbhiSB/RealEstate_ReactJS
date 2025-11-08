import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function ProjectPlots() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/projects/${projectId}/plots`);
        setProject(res.data.project);
        setPlots(res.data.plots || []);
      } catch (err) {
        console.error("Error fetching plots:", err);
      }
    };
    fetchPlots();
  }, [projectId]);

  // Calculate counts
  const totalCount = plots.length;
  const vacantCount = plots.filter((p) => p.status === "Vacant").length;
  const bookedCount = plots.filter((p) => p.status === "Booked").length;
  const blockedCount = plots.filter((p) => p.status === "Blocked").length;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />

        <div className="p-6">
          {/* Project Title */}
          <h2 className="text-2xl font-bold mb-6">{project?.projectName} - Plot Status</h2>

          {/* Top Summary Boxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-100 border-l-4 border-blue-500 rounded-lg p-6 text-center shadow">
              <p className="text-2xl font-bold text-blue-700">{totalCount}</p>
              <p className="text-gray-700">Total Plots</p>
            </div>
            <div className="bg-green-100 border-l-4 border-green-500 rounded-lg p-6 text-center shadow">
              <p className="text-2xl font-bold text-green-700">{vacantCount}</p>
              <p className="text-gray-700">Vacant</p>
            </div>
            <div className="bg-red-100 border-l-4 border-red-500 rounded-lg p-6 text-center shadow">
              <p className="text-2xl font-bold text-red-700">{bookedCount}</p>
              <p className="text-gray-700">Booked</p>
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-6 text-center shadow">
              <p className="text-2xl font-bold text-yellow-700">{blockedCount}</p>
              <p className="text-gray-700">Blocked</p>
            </div>
          </div>

          {/* Plot Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {plots.map((plot, i) => (
              <div
                key={plot._id || i}
                className={`p-4 rounded-lg shadow text-center font-semibold cursor-pointer transition ${
                  plot.status === "Vacant"
                    ? "bg-green-200 text-green-900 border border-green-400"
                    : plot.status === "Booked"
                    ? "bg-red-200 text-red-900 border border-red-400"
                    : plot.status === "Blocked"
                    ? "bg-yellow-200 text-yellow-900 border border-yellow-400"
                    : "bg-gray-200 text-gray-700 border"
                }`}
              >
                <p className="text-lg">Plot {plot.plotNumber}</p>
                <p className="text-sm">{plot.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
