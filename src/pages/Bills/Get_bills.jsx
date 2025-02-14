import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome

const Get_bills = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample bill data
  const bills = [
    { id: "INV-1001", customer: "John Doe", amount: "$150", dueDate: "2024-02-10" },
    { id: "INV-1002", customer: "Jane Smith", amount: "$200", dueDate: "2024-02-15" },
    { id: "INV-1003", customer: "Alice Johnson", amount: "$250", dueDate: "2024-02-20" },
  ];

  // Filter bills based on search input
  const filteredBills = bills.filter((bill) =>
    bill.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Bills List</h2>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by customer name..."
          className="border rounded p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 ml-2 rounded">Search</button>
      </div>

      {/* Bills Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Bill ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition">
                <td className="px-4 py-3">{bill.id}</td>
                <td className="px-4 py-3">{bill.customer}</td>
                <td className="px-4 py-3">{bill.amount}</td>
                <td className="px-4 py-3">{bill.dueDate}</td>
                <td className="py-3 px-6 flex space-x-4">
                  <i className="fas fa-eye text-gray-500 cursor-pointer hover:text-blue-800 transition duration-200"></i>
                  <i className="fas fa-edit text-gray-500 cursor-pointer hover:text-green-800 transition duration-200"></i>
                  <i className="fas fa-trash text-gray-500 cursor-pointer hover:text-red-800 transition duration-200"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Get_bills;
