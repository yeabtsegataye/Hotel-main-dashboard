import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import { useGetbillsQuery } from "../../features/Data/dataApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Bills } from "../../features/auth/authSlice";
import { ClipLoader } from "react-spinners"; // Import a spinner from react-spinners

const GetBills = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Assuming token is stored in Redux

  const { data: bills = [], error, isLoading } = useGetbillsQuery(token);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      if (bills.length > 0) {
        dispatch(Bills(bills));
      }
    } catch (dispatchError) {
      console.error("Error dispatching bills to Redux:", dispatchError);
    }
  }, [bills, dispatch]);

  // Custom Loading Spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={50} /> {/* Blue spinner */}
        <p className="ml-4 text-gray-600">Loading bills...</p>
      </div>
    );
  }

if (error) {
  console.error("Error fetching bills:", error);
  return (
    <p className="flex justify-center items-center h-screen text-red-500">
      Error fetching bills. {error.data?.message || error.message || "Unknown error"}.
    </p>
  );
}
  

  // Filter bills based on search input
  let filteredBills = [];
  try {
    filteredBills = bills.filter((bill) =>
      bill.BL_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (filterError) {
    console.error("Error filtering bills:", filterError);
    filteredBills = bills; // Fallback to showing all bills if filtering fails
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Bills List</h2>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by bill name..."
          className="border rounded p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bills Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Bill ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Subscription Type</th>
              <th className="px-4 py-2 text-left">Hotel ID</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill) => (
              <tr key={bill.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-4 py-3">{bill.id}</td>
                <td className="px-4 py-3">{bill.BL_name}</td>
                <td className="px-4 py-3">${Number(bill.BL_money).toFixed(2)}</td>
                <td className="px-4 py-3">{bill.BL_description}</td>
                <td className="px-4 py-3">{bill.BL_SUB_Type}</td>
                <td className="px-4 py-3">{bill.HT_id}</td>
                <td className="py-3 px-6 flex space-x-4">
                  <i className="fas fa-eye text-gray-500 cursor-pointer hover:text-blue-800 transition"></i>
                  <i className="fas fa-edit text-gray-500 cursor-pointer hover:text-green-800 transition"></i>
                  <i className="fas fa-trash text-gray-500 cursor-pointer hover:text-red-800 transition"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetBills;