import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function PurchaseOrder() {
  const [items, setItems] = useState([
    { itemName: '', unit: '', quantity: '', rate: '', amount: '', remarks: '' }
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === 'quantity' || field === 'rate') {
      const quantity = parseFloat(updatedItems[index].quantity) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].amount = (quantity * rate).toFixed(2);
    }

    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([...items, { itemName: '', unit: '', quantity: '', rate: '', amount: '', remarks: '' }]);
  };

  const removeRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
     <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Purchase Order</h2>

        {/* Main Form */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>Select</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input type="text" value="MRIGENDRAWAS" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PO Number</label>
            <input type="text" value="101" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>Select</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Engineer</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PO Date</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
        </div>

        {/* Item Table */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Item Details</h3>

          <table className="w-full border text-sm text-left mb-6">
            <thead className="bg-gray-200 text-gray-600">
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
              {/* Example Row */}
              <tr>
                <td className="p-2 border"><input className="w-full border rounded px-2 py-1" /></td>
                <td className="p-2 border"><input className="w-full border rounded px-2 py-1" /></td>
                <td className="p-2 border"><input className="w-full border rounded px-2 py-1" /></td>
                <td className="p-2 border"><input className="w-full border rounded px-2 py-1" /></td>
                <td className="p-2 border"><input className="w-full border rounded px-2 py-1" /></td>
                <td className="p-2 border text-center"><button className="text-red-500">Remove</button></td>
              </tr>
            </tbody>
          </table>
          <button className="text-blue-600 font-medium mb-6">+ Add Row</button>

          {/* Totals Section */}
          <div className="grid grid-cols-2 gap-6 max-w-2xl ml-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub Total</label>
              <input type="text" value="0.00" readOnly className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Amount</label>
              <input type="text" value="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Amount</label>
              <input type="text" value="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IGST Rate %</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IGST Amount</label>
              <input type="text" value="0.00" readOnly className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
