import React, { useState } from "react";
import { useSelector } from "react-redux";

const UserDropdown = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:bg-gray-100 transition ml-3"
      >
        <i className="fas fa-user text-gray-700"></i>
        <span className="text-gray-700">{user?.email || "Guest"}</span>
        <i className="fas fa-chevron-down text-gray-500"></i>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <a
            href="/myprofile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <i className="fas fa-user mr-2"></i> My Profile
          </a>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            <i className="fas fa-power-off mr-2"></i> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
