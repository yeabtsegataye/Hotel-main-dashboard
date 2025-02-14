import React, { useState } from 'react';

export const Orders = () => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [timeFilter, setTimeFilter] = useState('all'); // Time filter state

  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      orderDate: '2023-11-28',
      totalAmount: 150.5,
      status: 'Pending',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      orderDate: '2023-11-27',
      totalAmount: 85.25,
      status: 'Shipped',
    },
    {
      id: 3,
      customerName: 'David Lee',
      orderDate: '2023-11-26',
      totalAmount: 220.0,
      status: 'Delivered',
    },
    {
      id: 4,
      customerName: 'Alice Johnson',
      orderDate: '2023-11-25',
      totalAmount: 95.0,
      status: 'Accepted',
    },
    {
      id: 5,
      customerName: 'Bob Brown',
      orderDate: '2023-11-24',
      totalAmount: 120.0,
      status: 'Canceled',
    },
    // Add more sample order objects here
  ]);

  // Filter orders based on status and time
  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (activeTab !== 'all' && order.status !== activeTab) return false;

    // Filter by time
    const orderDate = new Date(order.orderDate);
    const currentDate = new Date();
    const timeDifference = currentDate - orderDate;

    switch (timeFilter) {
      case 'today':
        return orderDate.toDateString() === currentDate.toDateString();
      case 'last7days':
        return timeDifference <= 7 * 24 * 60 * 60 * 1000;
      case 'last30days':
        return timeDifference <= 30 * 24 * 60 * 60 * 1000;
      default:
        return true; // Show all orders
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>

      {/* Tabs for Pending, Accepted, and Canceled */}
      <div className="flex mb-4">
        <button
          className={`flex-1 p-2 text-sm ${activeTab === 'Pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Pending')}
        >
          Pending
        </button>
        <button
          className={`flex-1 p-2 text-sm ${activeTab === 'Accepted' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Accepted')}
        >
          Accepted
        </button>
        <button
          className={`flex-1 p-2 text-sm ${activeTab === 'Canceled' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Canceled')}
        >
          Canceled
        </button>
      </div>

      {/* Time-based filter */}
      <div className="mb-4">
        <label htmlFor="timeFilter" className="mr-2">
          Filter by Time:
        </label>
        <select
          id="timeFilter"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>
      </div>

      {/* Orders Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Order Date</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.customerName}</td>
              <td className="border p-2">{order.orderDate}</td>
              <td className="border p-2">${order.totalAmount.toFixed(2)}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2">
                  View
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};