import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const WorkAllotment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id"); // ✅ Get ?id= from URL

  const initialFormData = {
    WorkName: "",
    site: "",
    designation: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [workList, setWorkList] = useState([]);
  const [siteList, setSiteList] = useState([]);
  const [LabourList, setLabourList] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);

  // ✅ Fetch Work Name List
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/WorkTypeList/WorkTypeList")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setWorkList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching work list:", err);
        setWorkList([]);
      });
  }, []);

  // ✅ Fetch Site List
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Addsite/Addsite")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setSiteList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching site list:", err);
        setSiteList([]);
      });
  }, []);

  // ✅ Fetch Labour List
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/AddLabour/addLabours")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setLabourList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching labours:", err);
        setLabourList([]);
      });
  }, []);

  // ✅ Filter labours by selected site
  useEffect(() => {
    if (formData.site) {
      const filtered = LabourList.filter(
        (labour) => labour.site === formData.site
      );
      setFilteredPersons(filtered);
    } else {
      setFilteredPersons([]);
    }
  }, [formData.site, LabourList]);

  // ✅ If editing, fetch existing record & clean commas/spaces
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/WorkAllotment/WorkAllotments/${id}`)
        .then((res) => {
          if (res.data.success && res.data.data) {
            const cleanData = {
              ...res.data.data,
              WorkName: res.data.data.WorkName?.replace(/,+$/, "").trim(),
              site: res.data.data.site?.replace(/,+$/, "").trim(),
              designation: res.data.data.designation?.replace(/,+$/, "").trim(),
            };
            setFormData(cleanData);
          }
        })
        .catch((err) => {
          console.error("Error fetching WorkAllotment:", err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (id) {
        // UPDATE request
        response = await axios.put(
          `http://localhost:3000/api/WorkAllotment/WorkAllotments/${id}`,
          formData
        );
      } else {
        // CREATE request
        response = await axios.post(
          "http://localhost:3000/api/WorkAllotment/WorkAllotments",
          formData
        );
      }

      if (response.data.success) {
        alert(
          id
            ? "Work Allotment details updated successfully"
            : "Work Allotment details submitted successfully"
        );
        
      } else {
        alert("Failed to save Work Allotment");
      }
    } catch (error) {
      console.error(
        "Error submitting Work Allotment:",
        error.response?.data || error
      );
      alert("Error occurred while saving Work Allotment");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setFilteredPersons([]);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 bg-white rounded-md shadow-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
            📦 Work Allotment {id ? "(Edit)" : "(New)"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Work Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Name
              </label>
              <select
                name="WorkName"
                value={formData.WorkName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Work Name</option>
                {workList.map((work) => (
                  <option key={work._id} value={work.WorkName}>
                    {work.WorkName}
                  </option>
                ))}
              </select>
            </div>

            {/* Site */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Site
              </label>
              <select
                name="site"
                value={formData.site}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Site</option>
                {siteList.map((site) => (
                  <option key={site._id} value={site.SiteName}>
                    {site.SiteName}
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation / Role
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Designation</option>
                {[...new Set(filteredPersons.map((d) => d.designation))].map(
                  (designation, idx) => (
                    <option key={idx} value={designation}>
                      {designation}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-end space-x-2 mt-4">
              <button
                type="submit"
                className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-900"
              >
                {id ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkAllotment;
