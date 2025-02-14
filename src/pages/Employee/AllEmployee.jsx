import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome

const employees = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=3", // Dummy avatar
    department: "Development",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "UI/UX Designer",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    department: "Design",
  },
  {
    id: 3,
    name: "Alice Johnson",
    position: "Product Manager",
    email: "alice.johnson@example.com",
    avatar: "https://i.pravatar.cc/150?img=10",
    department: "Product",
  },
];

const EmployeeTable = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setEditEmployee(null);
  };

  // Filtering logic
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>

      {/* Filter Section */}
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Add buttons for additional filters if needed */}
        {/* Example: Filter by Earnings (you'll need to implement actual logic) */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
         search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-6">Avatar</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Position</th>
              <th className="py-3 px-6">Department</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-b">
                <td className="py-3 px-6">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-6">{employee.name}</td>
                <td className="py-3 px-6">{employee.position}</td>
                <td className="py-3 px-6">{employee.department}</td>
                <td className="py-3 px-6 flex space-x-3">
                  <i
                    className="fas fa-eye text-blue-500 cursor-pointer"
                    onClick={() => handleView(employee)}
                  ></i>
                  <i
                    className="fas fa-edit text-green-500 cursor-pointer"
                    onClick={() => handleEdit(employee)}
                  ></i>
                  <i className="fas fa-trash text-red-500 cursor-pointer"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <div className="text-center mb-6">
              <img
                src={selectedEmployee.avatar}
                alt={selectedEmployee.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-1">{selectedEmployee.name}</h3>
              <p className="text-sm text-gray-500">{selectedEmployee.position}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Employee Information</h4>
              <p className="text-sm">
                <strong>Email:</strong> {selectedEmployee.email}
              </p>
              <p className="text-sm">
                <strong>Department:</strong> {selectedEmployee.department}
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Employee</h3>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                value={editEmployee.name}
                className="block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Position</label>
              <input
                type="text"
                value={editEmployee.position}
                className="block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                value={editEmployee.email}
                className="block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Department</label>
              <input
                type="text"
                value={editEmployee.department}
                className="block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <button
              className="w-full bg-green-600 text-white py-2 rounded-lg mb-2 hover:bg-green-700 focus:ring-2 focus:ring-green-500"
              onClick={handleCloseModal}
            >
              Save Changes
            </button>
            <button
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
