import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";

export const Orders = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [expandedTables, setExpandedTables] = useState({}); // Track expanded tables
  const [loadingOrders, setLoadingOrders] = useState({}); // Track loading state for each order
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_API_URL, {
        withCredentials: true,
        transports: ["websocket"],
        query: {
          hotelId: user.hotel_id,
          userId: user.id,
          type: "dashboard",
        },
      });

      newSocket.on("connect", () => {
        console.log("Connected to WebSocket with ID:", newSocket.id);
      });

      newSocket.on("connect_error", (err) => {
        console.error("WebSocket Connection Error:", err);
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    if (!socket) return; // Prevent null errors

    const handleNewOrder = (newOrder) => {
      console.log(newOrder, "new order from socket");

      setOrders((prevOrders) => {
        // Check if there's an existing order for the same table
        const existingTableIndex = prevOrders.findIndex(
          (order) => order.order_tabel === newOrder.order_tabel
        );

        if (existingTableIndex !== -1) {
          // If the table exists, update the existing table's orders
          const updatedOrders = [...prevOrders];
          updatedOrders[existingTableIndex] = {
            ...updatedOrders[existingTableIndex],
            foods: [...(updatedOrders[existingTableIndex].foods || []), newOrder.food], // Add the new food to the existing table
          };
          return updatedOrders;
        } else {
          // If the table doesn't exist, add the new order
          return [{ ...newOrder, foods: [newOrder.food] }, ...prevOrders];
        }
      });
    };

    socket.on("newOrder", handleNewOrder);

    // Cleanup socket listener
    return () => {
      socket.off("newOrder", handleNewOrder);
    };
  }, [socket]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    // Group orders by table
    const grouped = orders.reduce((acc, order) => {
      const table = order.order_tabel;
      if (!acc[table]) {
        acc[table] = [];
      }
      acc[table].push(order);
      return acc;
    }, {});
    setGroupedOrders(grouped);
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      const data = await response.json();
      setOrders(data);
      console.log(orders, "order fetch");
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      setOrders([]);
    }
  };

  const toggleTable = (table) => {
    setExpandedTables((prev) => ({
      ...prev,
      [table]: !prev[table], // Toggle expanded state
    }));
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      // Set loading state for the specific order
      setLoadingOrders((prev) => ({ ...prev, [orderId]: true }));

      const response = await fetch(`${import.meta.env.VITE_API_URL}/order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order_status: "accepted" }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to update order: ${response.statusText}`);
      }

      // Update the order status in the local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, order_status: "accepted" }
            : order
        )
      );
    } catch (error) {
      console.error("Error accepting order:", error.message);
    } finally {
      // Reset loading state for the specific order
      setLoadingOrders((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // Check if there are any pending orders
  const hasPendingOrders = Object.values(groupedOrders).some((tableOrders) =>
    tableOrders.some((order) => order.order_status === "pending")
  );

  // Count pending orders for each table
  const countPendingOrders = (tableOrders) => {
    return tableOrders.filter((order) => order.order_status === "pending").length;
  };

  // Sort tables by the number of pending orders (descending)
  const sortedTables = Object.entries(groupedOrders).sort(([tableA, ordersA], [tableB, ordersB]) => {
    const pendingA = countPendingOrders(ordersA);
    const pendingB = countPendingOrders(ordersB);
    return pendingB - pendingA; // Sort in descending order
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>

      {/* Tabs */}
      <div className="flex mb-4">
        {["Pending", "Accepted", "Canceled"].map((status) => (
          <button
            key={status}
            className={`flex-1 p-2 text-sm ${
              activeTab === status ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(status)}
            disabled={status === "Pending" && !hasPendingOrders} // Disable Pending tab if no pending orders
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {Object.keys(groupedOrders).length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {sortedTables.map(([table, tableOrders]) => {
            const pendingCount = countPendingOrders(tableOrders);
            return (
              <div key={table} className="border p-4 rounded-lg">
                {/* Table Header */}
                <div
                  className="flex justify-between items-center cursor-pointer p-2 bg-gray-100 rounded-lg"
                  onClick={() => toggleTable(table)}
                >
                  <div className="flex items-center space-x-4">
                    {activeTab === "Pending" && (
                      <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                        New Order
                      </span>
                    )}
                    <h2 className="text-lg font-semibold">Order from Table {table}</h2>
                    {activeTab === "Pending" && (
                      <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">
                        Pending: {pendingCount}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500">
                    {expandedTables[table] ? "▲" : "▼"}
                  </span>
                </div>

                {/* Collapsible Table Content */}
                {expandedTables[table] && (
                  <table className="w-full border-collapse mt-2">
                    <thead>
                      <tr>
                        <th className="border p-2">Number</th>
                        <th className="border p-2">Customer</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Food</th>
                        <th className="border p-2">Quantities</th>
                        {activeTab === "Pending" && <th className="border p-2">Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {tableOrders
                        .filter((order) => order.order_status === activeTab.toLowerCase())
                        .map((order) => (
                          <tr
                            key={order.id}
                            className={
                              order.order_status === "pending"
                                ? "bg-yellow-100"
                                : ""
                            }
                          >
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">
                              {order.customerName || "Guest"}
                            </td>
                            <td className="border p-2">{order.order_status}</td>
                            <td className="border p-2">{order.food.name}</td>
                            <td className="border p-2">{order.quantity}</td>
                            {activeTab === "Pending" && (
                              <td className="border p-2">
                                <button
                                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition duration-200 disabled:opacity-50"
                                  onClick={() => handleAcceptOrder(order.id)}
                                  disabled={loadingOrders[order.id]} // Disable button while loading
                                >
                                  {loadingOrders[order.id] ? (
                                    <Spinner size="sm" />
                                  ) : (
                                    "Accept"
                                  )}
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};