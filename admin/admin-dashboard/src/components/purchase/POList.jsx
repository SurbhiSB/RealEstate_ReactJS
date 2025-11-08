import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PoList() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const res = await fetch("/api/purchaseOrder/get");
        const data = await res.json();
        if (data.success) {
          setPurchaseOrders(data.purchaseOrders);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVendors = async () => {
      try {
        const res = await fetch("/api/addagent/get");
        const data = await res.json();
        if (data.success) {
          setVendors(data.agents);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPurchaseOrders();
    fetchVendors();
  }, []);

  const handleVendorChange = (e) => {
    setSelectedVendor(e.target.value);
  };

  const filteredPurchaseOrders = selectedVendor
    ? purchaseOrders.filter((po) => po.vendorName === selectedVendor)
    : purchaseOrders;

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Purchase Order List
      </h1>
      <div className="flex justify-between items-center mb-4">
        <Link to="/create-po">
          <button className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Create Purchase Order
          </button>
        </Link>
        <div className="flex items-center">
          <label htmlFor="vendor" className="mr-2">
            Filter by Vendor:
          </label>
          <select
            id="vendor"
            value={selectedVendor}
            onChange={handleVendorChange}
            className="border p-3 rounded-lg"
          >
            <option value="">All Vendors</option>
            {vendors.map((vendor) => (
              <option key={vendor._id} value={vendor.name}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">PO Number</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Vendor Name</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchaseOrders.map((po) => (
              <tr key={po._id}>
                <td className="border px-4 py-2">{po.poNumber}</td>
                <td className="border px-4 py-2">
                  {new Date(po.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{po.vendorName}</td>
                <td className="border px-4 py-2">{po.totalAmount}</td>
                <td className="border px-4 py-2">
                  <Link to={`/update-po/${po._id}`}>
                    <button className="text-blue-700 mr-2">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(po._id)}
                    className="text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}