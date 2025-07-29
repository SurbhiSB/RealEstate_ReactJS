
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";



const Booking = () => {
  const [activeTab, setActiveTab] = useState("loan");

  const [formData, setFormData] = useState({
  projectName: "",
  bookingDate: "",
  plotName: "",
  plotDetails: "",
  associateName: "",
  bookingStatus: "",
  saleDeedDate: "",
  agreementExecutedDate: "",
  companyRate: 0,
  marketValue: 0,
  customerName1: "",
  customerName2: "",
  customerName3: "",
  remark: "",
});


const [projects, setProjects] = useState([]);
const [plots, setPlots] = useState([]);
const [associates, setAssociates] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const projectRes = await axios.get("http://localhost:3000/api/projects/all");
      const plotRes = await axios.post("http://localhost:3000/api/plots/create", formData);
      const associateRes = await axios.get("http://localhost:3000/api/associates");

      setProjects(projectRes.data?.data || []);
      setPlots(plotRes.data?.data || []);
      setAssociates(associateRes.data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/api/bookings", formData);
    alert("Booking submitted successfully!");
    console.log(res.data);
    // Optionally reset:
    setFormData({
      projectName: "",
      bookingDate: "",
      plotName: "",
      plotDetails: "",
      associateName: "",
      bookingStatus: "",
      saleDeedDate: "",
      agreementExecutedDate: "",
      companyRate: 0,
      marketValue: 0,
      customerName1: "",
      customerName2: "",
      customerName3: "",
      remark: "",
    });
  } catch (error) {
    console.error("Booking submission failed:", error);
    alert("Submission failed. Check console.");
  }
};



  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 overflow-auto">
          <form onSubmit={handleSubmit}>
  

          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Plot/Flag Booking
          </h2>

          {/* Booking Form Section */}
          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-6">
            {/* Column 1 */}
            <div>
              <label className="block text-sm font-medium">Project Name</label>
              <select
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.projectName}
                </option>
              ))}
            </select>



            </div>
            <div>
              <label className="block text-sm font-medium">Booking Date</label>
            <input
            type="date"
            name="bookingDate"
            className="input w-full"
            value={formData.bookingDate}
            onChange={handleChange}
            />

            </div>

            <div>
              <label className="block text-sm font-medium">Plot Name</label>
            <select
  className="input w-full"
  name="plotName"
  value={formData.plotName}
  onChange={handleChange}
>
  <option value="">Select Plot</option>
  {plots.map((plot) => (
    <option key={plot._id} value={plot._id}>
      {plot.plotName}
    </option>
  ))}
</select>



            </div>
            <div>
              <label className="block text-sm font-medium">Plot Details</label>
  <input
  type="text"
  name="plotDetails"
  className="input w-full"
  value={formData.plotDetails}
  onChange={handleChange}
/>

            </div>

            <div>
              <label className="block text-sm font-medium">
                Associate Name
              </label>
             <select
  className="input w-full"
  name="associateName"
  value={formData.associateName}
  onChange={handleChange}
>
  <option value="">Select Associate</option>
  {associates.map((associate) => (
    <option key={associate._id} value={associate._id}>
      {associate.name}
    </option>
  ))}
</select>


            </div>
            <div>
              <label className="block text-sm font-medium">
                Booking Status
              </label>
               <select
  className="input w-full"
  name="bookingStatus"
  value={formData.bookingStatus}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="Token Recieved">Token Recieved</option>
  <option value="Booked">Booked</option>
  <option value="On Hold">On Hold</option>
  <option value="Sale Deed Executed">Sale Deed Executed</option>
  <option value="Agreement Executed">Agreement Executed</option>
  <option value="Sold">Sold</option>
  <option value="Cancelled">Cancelled</option>
  
</select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Sale Deed Date
              </label>
              <input type="date" className="input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Agreement Executed Date
              </label>
              <input type="date" className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium">Company Rate</label>
             <input
  type="text"
  name="companyRate"
  className="input w-full"
  value={formData.companyRate}
  onChange={handleChange}
/>
            </div>
            <div>
              <label className="block text-sm font-medium">Market Value</label>
                <input
  type="text"
  name="marketValue"
  className="input w-full"
  value={formData.marketValue}
  onChange={handleChange}
/>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Customer Name 1
              </label>
            <select
  className="input w-full"
  name="customerName1"
  value={formData.customerName1}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="A">A</option>
  <option value="B">B</option>
</select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Customer Name 2
              </label>
             <select
  className="input w-full"
  name="customerName2"
  value={formData.customerName2}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="A">A</option>
  <option value="B">B</option>
</select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Customer Name 3
              </label>
             <select
  className="input w-full"
  name="customerName3"
  value={formData.customerName3}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="A">A</option>
  <option value="B">B</option>
</select>
            </div>
            <div>
              <label className="block text-sm font-medium">Remark</label>
             <input
  type="text"
  name="remark"
  className="input w-full"
  value={formData.remark}
  onChange={handleChange}
/>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex space-x-4 border-b mb-4">
              <button
                onClick={() => handleTabChange("loan")}
                className={`py-2 px-4 ${
                  activeTab === "loan"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                Loan Details
              </button>
              <button
                onClick={() => handleTabChange("saledeed")}
                className={`py-2 px-4 ${
                  activeTab === "saledeed"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                Saledeed Details
              </button>
              <button
                onClick={() => handleTabChange("saledeedDoc")}
                className={`py-2 px-4 ${
                  activeTab === "saledeedDoc"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                Saledeed Document
              </button>

              <button
                onClick={() => setActiveTab("salariedLoan")}
                className={`py-2 px-4 ${
                  activeTab === "salariedLoan"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                Salaried Loan Document
              </button>

              <button
                onClick={() => setActiveTab("businessLoan")}
                className={`py-2 px-4 ${
                  activeTab === "businessLoan"
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                }`}
              >
                <i className="fa fa-building mr-2"></i>Businessman Loan Document
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === "loan" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Is Loan Case
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    defaultValue="No"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Loan Status
                  </label>
                  <select className="input w-full">
                    <option>Select</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Bank Name</label>
                  <input type="text" className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Bank Executive
                  </label>
                  <input type="text" className="input w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Fixing Date
                  </label>
                  <input type="date" className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Disbursement Date
                  </label>
                  <input type="date" className="input w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Loan Amount
                  </label>
                  <input type="number" className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    OCR Balance
                  </label>
                  <input type="number" className="input w-full" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium">
                    Loan Remark
                  </label>
                  <input type="text" className="input w-full" />
                </div>
              </div>
            )}

            {activeTab === "saledeed" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Saledeed Status
                  </label>
                  <input type="text" className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Expected Saledeed Date
                  </label>
                  <input
  type="text"
  name="saleDeedDate"
  className="input w-full"
  value={formData.saleDeedDate}
  onChange={handleChange}
/>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Expected Agreement Executed Date
                  </label>
                   <input
  type="text"
  name="agreementExecutedDate"
  className="input w-full"
  value={formData.agreementExecutedDate}
  onChange={handleChange}
/>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Sale Deed Value
                  </label>
                  <input type="number" className="input w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Stamp Duty %
                  </label>
                  <input type="number" className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Stamp Duty Amount
                  </label>
                  <input type="number" className="input w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Registration Fees %
                  </label>
                  <input type="number" className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Registration Fees
                  </label>
                  <input type="number" className="input w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Mutation</label>
                  <input
                    type="text"
                    className="input w-full"
                    defaultValue="No"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Mutation Cost
                  </label>
                  <input type="number" className="input w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    SD Expenses Received
                  </label>
                  <input type="number" className="input w-full" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Remark</label>
                  <input type="text" className="input w-full" />
                </div>
              </div>
            )}

            {activeTab === "saledeedDoc" && (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-300">
                  <thead className="bg-gray-200 text-sm font-semibold text-left">
                    <tr>
                      <th className="px-4 py-2 border">Document</th>
                      <th className="px-4 py-2 border">Browse</th>
                      <th className="px-4 py-2 border">Upload Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "SALEDDEED DRAFT",
                      "NA COPY",
                      "PLOT 7/12",
                      "SANCTION LAYOUT MAP",
                    ].map((doc, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 border">{doc}</td>
                        <td className="px-4 py-2 border">
                          <input type="file" className="w-full" />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            className="input w-full"
                            defaultValue="Not Received"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "salariedLoan" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Salaried Loan Documents
                </h2>
                <div className="grid grid-cols-3 bg-gray-600 text-white font-semibold p-2 rounded">
                  <div>Document</div>
                  <div>Browse</div>
                  <div>Upload Status</div>
                </div>

                {[
                  "3 MONTH SALARY SLIP",
                  "6 MONTH BANK STATEMENT",
                  "2 YRS FORM NO 16",
                  "AADHAR CARD",
                  "PAN CARD",
                ].map((docName, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 items-center border-b py-2"
                  >
                    <div className="text-gray-700">{docName}</div>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                      onChange={(e) =>
                        console.log(`Uploading ${docName}`, e.target.files[0])
                      }
                    />
                    <div className="text-gray-600">Not Received</div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "businessLoan" && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Businessman Loan Documents
                </h2>

                {/* Header row */}
                <div className="grid grid-cols-3 bg-gray-600 text-white font-semibold p-2 rounded">
                  <div>Document</div>
                  <div>Browse</div>
                  <div>Upload Status</div>
                </div>

                {/* Document rows */}
                {[
                  "3 YR ITR",
                  "3 YR COMPUTATION OF INCOME",
                  "3 YR BALANCE SHEET",
                  "1 YR BANK STATEMENT",
                  "GUMASTA",
                  "BUSINESS AADHAR CARD",
                  "BUSINESS PAN CARD",
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 items-center border-b py-2"
                  >
                    <div className="text-gray-700">{doc}</div>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                      onChange={(e) =>
                        console.log(`Uploading ${doc}`, e.target.files[0])
                      }
                    />
                    <div className="text-gray-600">Not Received</div>
                  </div>
                ))}
              </div>
            )}

            {/* Additional Tab Contents go here... */}
          </div>

          {/* Submit & Reset Buttons */}
      <div className="flex justify-end gap-4 mt-6">
  <button
    type="submit"
    className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
  >
    Submit
  </button>

  <button
    type="button"
    className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
    onClick={() => {
      window.location.reload();
    }}
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

export default Booking;
