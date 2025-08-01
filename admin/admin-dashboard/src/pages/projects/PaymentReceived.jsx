import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PaymentReceived() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [plots, setPlots] = useState([]);

  const [formData, setFormData] = useState({
    projectName: "",
    plotNo: "",
    bookingId: "",
    customerName: "",
    receiptNumber: "2",
    amountReceived: "",
    paymentDate: "",
    paymentNumber: "",
    paymentMode: "",
    paymentDetails: "",
    chequeNumber: "",
    chequeDate: "",
    chequeStatus: "",
    drawnOnBank: "",
    depositBank: "",
    utrNumber: "",
    remark: "",
    file: null,
  });

  // Fetch projects on mount
  useEffect(() => {
    axios.get("http://localhost:3000/api/projects/all")
      .then((res) => {
        setProjects(res.data.projects || []);
      })
      .catch((err) => console.error("Error loading projects", err));
  }, []);

  // Fetch plots when a project is selected
  useEffect(() => {
    if (selectedProject) {
      axios
        .get(`http://localhost:3000/api/plots/project/${selectedProject}`)
        .then((res) => {
          console.log("Fetched plots:", res.data);
          setPlots(res.data.plots || []);
          setFormData((prev) => ({ ...prev, projectName: selectedProject }));
        })
        .catch((err) => {
          console.error("Error fetching plots:", err);
        });
    } else {
      setPlots([]);
    }
  }, [selectedProject]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("receivedFrom", formData.customerName);
    submitData.append("plotId", formData.plotNo);
    submitData.append("projectName", formData.projectName);
    submitData.append("plotNo", formData.plotNo);
    submitData.append("bookingId", formData.bookingId);
    submitData.append("customerName", formData.customerName);
    submitData.append("receiptNumber", formData.receiptNumber);
    submitData.append("amount", formData.amountReceived);
    submitData.append("paymentDate", formData.paymentDate);
    submitData.append("paymentNumber", formData.paymentNumber);
    submitData.append("paymentMode", formData.paymentMode);
    submitData.append("paymentDetails", formData.paymentDetails);
    submitData.append("chequeNumber", formData.chequeNumber);
    submitData.append("chequeDate", formData.chequeDate);
    submitData.append("chequeStatus", formData.chequeStatus);
    submitData.append("drawnOnBank", formData.drawnOnBank);
    submitData.append("depositBank", formData.depositBank);
    submitData.append("utrChequeNo", formData.utrNumber);
    submitData.append("remark", formData.remark);

       if (!formData.plotId) {
      alert("Please select a plot");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/payments/create", formData);
      alert("Payment saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Payment save error:", error);
      alert("Payment save failed. Check console for details.");
    }
  };

  const handleReset = () => {
    setFormData({
      projectName: "",
      plotNo: "",
      bookingId: "",
      customerName: "",
      receiptNumber: "2",
      amountReceived: "",
      paymentDate: "",
      paymentNumber: "",
      paymentMode: "",
      paymentDetails: "",
      chequeNumber: "",
      chequeDate: "",
      chequeStatus: "",
      drawnOnBank: "",
      depositBank: "",
      utrNumber: "",
      remark: "",
      file: null,
    });
    setSelectedProject("");
    setPlots([]);
  };

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-2">
          <div className="bg-white shadow-md rounded-lg p-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Received</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT COLUMN */}
              <div>
                <label className="label">
                  <span className="label-text">Select Project</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="">-- Select Project --</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>

                <label className="block mt-4 text-sm font-medium">Customer Name</label>
                <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Amount Received</label>
                <input type="number" name="amountReceived" value={formData.amountReceived} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Payment Date</label>
                <input type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Payment Mode</label>
                <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="input w-full">
                  <option value="">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Online">Online</option>
                </select>

                <label className="block mt-4 text-sm font-medium">Cheque Number</label>
                <input type="text" name="chequeNumber" value={formData.chequeNumber} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Drawn On Bank</label>
                <input type="text" name="drawnOnBank" value={formData.drawnOnBank} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">UTR Number</label>
                <input type="text" name="utrNumber" value={formData.utrNumber} onChange={handleChange} className="input w-full" />
              </div>

              {/* RIGHT COLUMN */}
              <div>
                <label className="label">
                  <span className="label-text">Select Plot</span>
                </label>
                <select
  className="select select-bordered w-full"
  name="plotNo"
  value={formData.plotNo}
  onChange={handleInputChange}
>
  <option value="">Select Plot</option>
  {plots && plots.length > 0 && plots.map((plot) => (
    <option key={plot._id} value={plot._id}>
      {plot.plotName}
    </option>
  ))}
</select>

                <div className="text-sm text-gray-600 mt-1">
                  Total Plots Fetched: {plots.length}
                </div>

                <label className="block mt-4 text-sm font-medium">Booking Id</label>
                <input type="text" name="bookingId" value={formData.bookingId} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Receipt Number</label>
                <input type="text" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Payment Number</label>
                <input type="text" name="paymentNumber" value={formData.paymentNumber} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Payment Details</label>
                <input type="text" name="paymentDetails" value={formData.paymentDetails} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Cheque Date</label>
                <input type="date" name="chequeDate" value={formData.chequeDate} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Cheque Status</label>
                <select name="chequeStatus" value={formData.chequeStatus} onChange={handleChange} className="input w-full">
                  <option value="">Select</option>
                  <option value="Cleared">Cleared</option>
                  <option value="Pending">Pending</option>
                  <option value="Bounced">Bounced</option>
                </select>

                <label className="block mt-4 text-sm font-medium">Deposit Bank</label>
                <input type="text" name="depositBank" value={formData.depositBank} onChange={handleChange} className="input w-full" />

                <label className="block mt-4 text-sm font-medium">Remark</label>
                <input type="text" name="remark" value={formData.remark} onChange={handleChange} className="input w-full" />
              </div>

              {/* File Upload */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium">Attach File(s)</label>
                <input type="file" name="file" onChange={handleChange} className="input w-full" />
              </div>

              {/* Submit and Reset */}
              <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-4">
                <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded">
                  Submit
                </button>
                <button type="button" onClick={handleReset} className="bg-gray-500 text-white px-6 py-2 rounded">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
