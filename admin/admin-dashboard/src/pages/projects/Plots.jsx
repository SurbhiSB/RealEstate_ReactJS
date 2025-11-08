import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Plots() {
  const navigate = useNavigate();
  const [existingPlots, setExistingPlots] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [plots, setPlots] = useState([
    { plotType: "", plotNo: "", areaSqM: "", areaSqFt: "", rl: "", cornerPlot: false },
  ]);

  useEffect(() => {
  if (selectedProjectId) {
    axios.get(`http://localhost:3000/api/plots/project/${selectedProjectId}`)
      .then((res) => setExistingPlots(res.data.data || []))
      .catch((err) => console.error("Error fetching plots:", err));
  }
}, [selectedProjectId]);

  // Fetch all projects on load
  useEffect(() => {
    axios.get("http://localhost:3000/api/projects/all")
      .then((res) => {
        setProjects(res.data.projects || []);
      })
      .catch((err) => {
        console.error("Failed to fetch projects", err);
      });
  }, []);

  const handleInputChange = (index, field, value) => {
    const updated = [...plots];
    updated[index][field] = value;
    setPlots(updated);
  };

const handleRowSubmit = async (index) => {
  const plot = plots[index];

  if (!selectedProjectId || !plot.plotType) {
    alert("Project and Plot Type are required");
    return;
  }

const payload = {
  plotName: plot.plotType,
  plotNumber: plot.plotNo,
  projectId: selectedProjectId,
  areaSqM: plot.areaSqM,
  areaSqFt: plot.areaSqFt,
  rl: plot.rl,
  cornerPlot: plot.cornerPlot,
};


  try {
    const res = await axios.post("http://localhost:3000/api/plots/create", payload);
    if (res.data.success) {
      alert(`Plot ${plot.plotNo || plot.plotType} added successfully`);
    } else {
      alert("Failed to add plot");
    }
  } catch (err) {
    console.error("Submit error:", err);
    alert("Error submitting plot");
  }
};

const fetchPlotsByProject = async (projectId) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/plots/project/${projectId}`);
    console.log(res.data.data); // Array of plots
  } catch (err) {
    console.error("Error fetching plots by project", err);
  }
};





  const addRow = () => {
    setPlots([...plots, { plotType: "", plotNo: "", areaSqM: "", areaSqFt: "", rl: "", cornerPlot: false }]);
  };

  const resetForm = () => {
    setSelectedProjectId("");
    setPlots([{ plotType: "", plotNo: "", areaSqM: "", areaSqFt: "", rl: "", cornerPlot: false }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      projectId: selectedProjectId,
      plots: plots,
    };
    console.log("Submitting:", payload);
    // You can send this data to your backend API
  };
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
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Plots</h2>

          <div className="bg-white p-4 shadow-md rounded-lg border">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <select
  value={selectedProjectId}
  onChange={(e) => setSelectedProjectId(e.target.value)}
  className="w-1/3 border rounded px-3 py-2 focus:outline-none"
>
  <option value="">Select Project</option>
  {projects.map((proj) => (
    <option key={proj._id} value={proj._id}>
      {proj.projectName}
    </option>
  ))}
</select>

            </div>

            <form onSubmit={handleSubmit}>
              <table className="min-w-full table-auto border mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-sm">PlotType</th>
                    <th className="border px-4 py-2 text-sm">Plot No</th>
                    <th className="border px-4 py-2 text-sm">Area Sq.M.</th>
                    <th className="border px-4 py-2 text-sm">Area Sq.Ft.</th>
                    <th className="border px-4 py-2 text-sm">RL</th>
                    <th className="border px-4 py-2 text-sm">Corner Plot</th>
                    <th className="border px-4 py-2 text-sm">Action</th>

                  </tr>
                </thead>
                <tbody>
                  {plots.map((plot, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          className="w-full border rounded px-2 py-1"
                          value={plot.plotType}
                          onChange={(e) => handleInputChange(index, "plotType", e.target.value)}
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          className="w-full border rounded px-2 py-1"
                          value={plot.plotNo}
                          onChange={(e) => handleInputChange(index, "plotNo", e.target.value)}
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="number"
                          className="w-full border rounded px-2 py-1"
                          value={plot.areaSqM}
                          onChange={(e) => handleInputChange(index, "areaSqM", e.target.value)}
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="number"
                          className="w-full border rounded px-2 py-1"
                          value={plot.areaSqFt}
                          onChange={(e) => handleInputChange(index, "areaSqFt", e.target.value)}
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          className="w-full border rounded px-2 py-1"
                          value={plot.rl}
                          onChange={(e) => handleInputChange(index, "rl", e.target.value)}
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={plot.cornerPlot}
                          onChange={(e) => handleInputChange(index, "cornerPlot", e.target.checked)}
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
  <button
    type="button"
    onClick={() => handleRowSubmit(index)}
    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
  >
    Submit
  </button>
</td>

                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={addRow}
                  className="text-gray-700 font-medium hover:underline"
                >
                  + Add Row
                </button>

                {/* <div className="space-x-3">
                  <button
                    type="submit"
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Reset
                  </button>
                </div> */}
              </div>
            </form>

{existingPlots.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Existing Plots</h3>
    <table className="w-full border text-sm bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-2 py-1">Plot Type</th>
          <th className="border px-2 py-1">Plot No</th>
          <th className="border px-2 py-1">Area Sq.M.</th>
          <th className="border px-2 py-1">Area Sq.Ft.</th>
          <th className="border px-2 py-1">RL</th>
          <th className="border px-2 py-1">Corner Plot</th>
        </tr>
      </thead>
      <tbody>
        {existingPlots.map((plot) => (
          <tr key={plot._id}>
            <td className="border px-2 py-1">{plot.plotName}</td>
            <td className="border px-2 py-1">{plot.plotNumber}</td>
            <td className="border px-2 py-1">{plot.areaSqM}</td>
            <td className="border px-2 py-1">{plot.areaSqFt}</td>
            <td className="border px-2 py-1">{plot.rl}</td>
            <td className="border px-2 py-1 text-center">
              {plot.cornerPlot ? "Yes" : "No"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



          </div>
        </div>
      </div>
    </div>
  );
}
