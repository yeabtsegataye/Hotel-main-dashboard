import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import { useGetemployeeQuery } from "../../features/Data/dataApiSlice"; // Adjust the import path
import { useDispatch, useSelector } from "react-redux";
import { employees } from "../../features/auth/authSlice"; // Import the employees action
import { ClipLoader } from "react-spinners"; // Import a spinner from react-spinners

const GetEmployees = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Assuming token is stored in Redux

  const { data: employeesData = [], error, isLoading } = useGetemployeeQuery(token);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      if (employeesData.length > 0) {
        dispatch(employees(employeesData)); // Dispatch employees data to Redux
      }
    } catch (dispatchError) {
      console.error("Error dispatching employees to Redux:", dispatchError);
    }
  }, [employeesData, dispatch]);

  // Debugging: Log employeesData and searchTerm
  console.log("Employees Data:", employeesData);
  console.log("Search Term:", searchTerm);

  // Custom Loading Spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={50} /> {/* Blue spinner */}
        <p className="ml-4 text-gray-600">Loading employees...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching employees:", error);
    return (
      <p className="flex justify-center items-center h-screen text-red-500">
        Error fetching employees. {error.data?.message || error.message || "Unknown error"}.
      </p>
    );
  }

  // Filter employees based on search input
  const filteredEmployees = employeesData
    ? employeesData.filter((employee) => {
        const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      })
    : [];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by employee name..."
          className="border rounded p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Employees Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Avatar</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-4 py-3">
                  <img
                    src={employee.avatar || "https://i.pravatar.cc/150?img=3"} // Fallback avatar
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-3">
                  {employee.firstName} {employee.lastName}
                </td>
                <td className="px-4 py-3">{employee.phone}</td>
                <td className="px-4 py-3">{employee.address}</td>
                <td className="px-4 py-3">{employee.department}</td>
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

export default GetEmployees;