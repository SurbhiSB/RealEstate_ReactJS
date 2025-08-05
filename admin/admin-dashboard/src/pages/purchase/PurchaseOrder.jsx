import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";


export default function PurchaseOrder() {
  const [items, setItems] = useState([
    { itemName: '', unit: '', quantity: '', rate: '', amount: '' }
  ]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    if (field === 'quantity' || field === 'rate') {
      const quantity = parseFloat(updated[index].quantity) || 0;
      const rate = parseFloat(updated[index].rate) || 0;
      updated[index].amount = (quantity * rate).toFixed(2);
    }

    setItems(updated);
  };

 const handleInputChange = (e) => {
  const { name, value, type, files } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "file" ? files[0] : value,
  }));
};



const calculateSubTotal = () => {
  return items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
};

const calculateTaxAmount = (rate) => {
  return (calculateSubTotal() * Number(rate || 0)) / 100;
};

const calculateTotal = () => {
  const subTotal = calculateSubTotal();
  const discount = (subTotal * parseFloat(formData.discountAmount || 0)) / 100;
  const adjustment = parseFloat(formData.adjustmentAmount || 0);

  const igst = (subTotal * parseFloat(formData.igstRate || 0)) / 100;
  const cgst = (subTotal * parseFloat(formData.cgstRate || 0)) / 100;
  const sgst = (subTotal * parseFloat(formData.sgstRate || 0)) / 100;

  return (
    subTotal -
    discount +
    adjustment +
    igst +
    cgst +
    sgst
  );
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Calculate values directly
  const subTotal = calculateSubTotal();
  const discountAmount = parseFloat(formData.discountAmount) || 0;
  const adjustmentAmount = parseFloat(formData.adjustmentAmount) || 0;

  const igstRate = parseFloat(formData.igstRate) || 0;
  const cgstRate = parseFloat(formData.cgstRate) || 0;
  const sgstRate = parseFloat(formData.sgstRate) || 0;

  const igstAmount = (subTotal * igstRate) / 100;
  const cgstAmount = (subTotal * cgstRate) / 100;
  const sgstAmount = (subTotal * sgstRate) / 100;

  const totalAmount =
    subTotal - discountAmount + adjustmentAmount + igstAmount + cgstAmount + sgstAmount;

  const payload = {
    ...formData,
    items: items,
    subTotal,
    discountAmount,
    adjustmentAmount,
    igstRate,
    igstAmount,
    cgstRate,
    cgstAmount,
    sgstRate,
    sgstAmount,
    totalAmount,
  };

  try {
    const res = await axios.post("http://localhost:3000/api/purchase-orders", payload);
    if (res.data.success) {
      alert("✅ Purchase Order Submitted Successfully!");
      console.log("Submitted Data:", res.data.data);

      // Reset
      setFormData({ ...initialFormData });
      setItems([]);
    }
  } catch (err) {
    console.error("❌ Submit error:", err);
    alert("Failed to submit Purchase Order");
  }
};



const handleReset = () => {
  setFormData({
    vendorName: "",
    projectName: "",
    poNumber: "",
    workType: "",
    siteEngineer: "",
    contactNumber: "",
    poDate: "",
    deliveryDate: "",
    discountAmount: "",
    adjustmentAmount: "",
    igstRate: "",
    cgstRate: "",
    sgstRate: "",
    remarks: "",
    fileTitle: "",
    file: null,
  });
  setItems([{ itemName: '', unit: '', quantity: '', rate: '', amount: '' }]);
};


  const addRow = () => {
    setItems([...items, { itemName: '', unit: '', quantity: '', rate: '', amount: '' }]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
const initialFormData = {
  memberName: "",
  vendorName: "",
  projectName: "",
  poNumber: "",
  workType: "",
  siteEngineer: "",
  contactNumber: "",
  poDate: "",
  deliveryDate: "",
  discountAmount: 0,
  adjustmentAmount: 0,
  igstRate: 0,
  cgstRate: 0,
  sgstRate: 0,
  remarks: "",
  fileTitle: "",
  fileUrl: ""
};

 const [formData, setFormData] = useState({ ...initialFormData });


const [memberList, setMemberList] = useState([]);
const [projects, setProjectList] = useState([]);

 useEffect(() => {
    axios
      .get("http://localhost:3000/api/addMembers/addmembers")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setMemberList(res.data.data);
        } else {
          setMemberList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching member list:", err);
        setMemberList([]);
      });
  }, []);

useEffect(() => {
  axios
    .get("http://localhost:3000/api/projects/all")
    .then((res) => {
      if (res.data.projects && Array.isArray(res.data.projects)) {
        setProjectList(res.data.projects);
      } else {
        setProjectList([]);
      }
    })
    .catch((err) => {
      console.error("Error fetching project list:", err);
      setProjectList([]);
    });
}, []);




  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-6">Purchase Order</h2>

            {/* Top Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  {/* Vendor Name */}
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">Vendor Name</label>
  <select
  name="vendorName"
  value={formData.vendorName}
  onChange={handleInputChange}
  className="select select-bordered w-full"
>
  <option value="">Select</option>
  {memberList.map((member, index) => (
    <option key={index} value={member.fullName}>
      {member.fullName}
    </option>
  ))}
</select>



  </div>

  {/* Project Name */}
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">Project Name</label>
    <select
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
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

  {/* PO Number */}
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">PO Number</label>
    <input
      type="text"
      name="poNumber"
      value={formData.poNumber}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  {/* Work Type */}
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">Work Type</label>
    <select
      name="workType"
      value={formData.workType}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    >
      <option value="">Select</option>
      <option value="">Sewer Work</option>
      <option value="">Stome Work</option>
      <option value="">Compound Wall</option>
      <option value="">Roofing Work</option>
      <option value="">Water Pipeline</option>

    </select>
  </div>

  {/* Site Engineer */}
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">Site Engineer</label>
    <input
      type="text"
      name="siteEngineer"
      value={formData.siteEngineer}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  {/* Contact Number */}
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">Contact Number</label>
    <input
      type="text"
      name="contactNumber"
      value={formData.contactNumber}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  {/* PO Date */}
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">PO Date</label>
    <input
      type="date"
      name="poDate"
      value={formData.poDate}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  {/* Delivery Date */}
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">Delivery Date</label>
    <input
      type="date"
      name="deliveryDate"
      value={formData.deliveryDate}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>
</div>


            {/* Item Table */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2 border-b pb-1">Item Details</h3>
              <table className="w-full border mt-2 text-sm text-left">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-2 border">Item Details</th>
                    <th className="p-2 border">Unit</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Rate</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      {['itemName', 'unit', 'quantity', 'rate', 'amount'].map((field, i) => (
                        <td className="p-2 border" key={i}>
                          <input
                            type="text"
                            value={item[field]}
                            className="w-full border rounded px-2 py-1"
                            readOnly={field === 'amount'}
                            onChange={(e) => handleItemChange(index, field, e.target.value)}
                          />
                        </td>
                      ))}
                      <td className="p-2 border text-center">
                        <button
                          type="button"
                          onClick={() => removeRow(index)}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={addRow} className="mt-2 text-blue-600 hover:underline font-medium">
                + Add Row
              </button>
            </div>

            {/* Calculation Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 max-w-3xl ml-auto">
  {/* Sub Total */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Sub Total</label>
    <input
      type="text"
      value={calculateSubTotal().toFixed(2)}
      readOnly
      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
    />
  </div>

  {/* Discount Amount */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Discount (%)
  </label>
  <input
    type="number"
    name="discountAmount"
    value={formData.discountAmount}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded-lg px-3 py-2"
    placeholder="Enter discount percent"
    min="0"
    max="100"
  />
</div>


  {/* Adjustment Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Amount</label>
    <input
      type="number"
      name="adjustmentAmount"
      value={formData.adjustmentAmount}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  {/* IGST Rate % */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">IGST Rate %</label>
    <input
      type="number"
      name="igstRate"
      value={formData.igstRate}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  {/* IGST Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">IGST Amount</label>
    <input
      type="text"
      value={calculateTaxAmount(formData.igstRate).toFixed(2)}
      readOnly
      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
    />
  </div>

  {/* CGST Rate % */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">CGST Rate %</label>
    <input
      type="number"
      name="cgstRate"
      value={formData.cgstRate}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  {/* CGST Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">CGST Amount</label>
    <input
      type="text"
      value={calculateTaxAmount(formData.cgstRate).toFixed(2)}
      readOnly
      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
    />
  </div>

  {/* SGST Rate % */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">SGST Rate %</label>
    <input
      type="number"
      name="sgstRate"
      value={formData.sgstRate}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  {/* SGST Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">SGST Amount</label>
    <input
      type="text"
      value={calculateTaxAmount(formData.sgstRate).toFixed(2)}
      readOnly
      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
    />
  </div>

  {/* Total Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
    <input
      type="text"
      value={calculateTotal().toFixed(2)}
      readOnly
      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
    />
  </div>
</div>


            {/* Remarks & File Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Remarks</label>
                              <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />

              </div>

             <div>
  <label className="text-sm font-medium text-gray-700 block mb-1">PO File Title</label>
  <input
    type="text"
    name="fileTitle"
    value={formData.fileTitle}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
  />

  <label className="text-sm font-medium text-gray-700 block mb-1">PO File</label>
  <input
    type="file"
    name="file"
    onChange={handleInputChange}
    className="w-full"
  />
</div>

            </div>

            {/* Terms & Conditions */}
            <div className="mt-6 text-sm text-gray-700">
              <h4 className="font-semibold mb-2">Terms and Conditions</h4>
              <ol className="list-decimal ml-5 space-y-1">
                <li>D/M which is signed by site incharge will only be accepted.</li>
                <li>Payment mode by Cheque / RTGS.</li>
                <li>If material is not up to the required standards then it will be rejected on site.</li>
              </ol>
            </div>
            <div className="mt-8 flex justify-center gap-4">
  <button
    onClick={handleReset}
    className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
  >
    Reset
  </button>
  <button
    onClick={handleSubmit}
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
  >
    Submit
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
