import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function ProjectPlots() {
  const { projectId } = useParams();
  const [plots, setPlots] = useState([]);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    // Fetch plots by project ID
    axios.get(`http://localhost:3000/api/plots/project/${projectId}`)
      .then(res => {
        setPlots(res.data.data || []);
      });

    // Optional: Fetch project name
    axios.get(`http://localhost:3000/api/projects/${projectId}`)
      .then(res => {
        setProjectName(res.data.project?.projectName || "");
      });
  }, [projectId]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Plots for Project: {projectName}
          </h2>

          {plots.length === 0 ? (
            <p>No plots found.</p>
          ) : (
            <table className="w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Plot Name</th>
                  <th className="border px-4 py-2">Plot No</th>
                  <th className="border px-4 py-2">Area Sq.M.</th>
                  <th className="border px-4 py-2">Area Sq.Ft.</th>
                  <th className="border px-4 py-2">RL</th>
                  <th className="border px-4 py-2">Corner</th>
                </tr>
              </thead>
              <tbody>
                {plots.map((plot) => (
                  <tr key={plot._id}>
                    <td className="border px-4 py-2">{plot.plotName}</td>
                    <td className="border px-4 py-2">{plot.plotNumber}</td>
                    <td className="border px-4 py-2">{plot.areaSqM}</td>
                    <td className="border px-4 py-2">{plot.areaSqFt}</td>
                    <td className="border px-4 py-2">{plot.rl}</td>
                    <td className="border px-4 py-2 text-center">
                      {plot.cornerPlot ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
