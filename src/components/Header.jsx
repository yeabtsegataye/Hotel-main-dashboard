import React, { useState } from "react";
import logoMini from "../assets/img/logo-mini.png";
import logo from "../assets/img/logo.png";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import removeCookie from "../auth/removeCookie";
import Notif_Toast from "./Tost";
import { useToast } from "@chakra-ui/react";
import UserDropdown from "./Dropdown";
import { useLogoutsMutation } from "../features/auth/authApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faInfoCircle,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [logouts] = useLogoutsMutation();
  const toast = useToast();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // State for notifications dropdown

  const toggleSidebar = (e) => {
    e.preventDefault();
    const body = document.body;

    if (window.innerWidth > 992) {
      body.classList.toggle("side-nav-closed");
      body.classList.toggle("side-nav-minified");
      const sidebarHeadings = document.querySelectorAll(".sidebar-heading");
      sidebarHeadings.forEach((element) => {
        if (element.style.display === "none") {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      });
    } else {
      body.classList.toggle("side-nav-minified");
      body.classList.toggle("side-nav-initialized");
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    removeCookie("refresh_token");

    try {
      const response = await logouts();
      if (response.error.originalStatus === 200) {
        dispatch(logOut());
        Notif_Toast(
          toast,
          "Log out successful",
          "You have successfully logged out",
          "success"
        );
        navigate("/Login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleNotifications = (e) => {
    e.preventDefault();
    setIsNotificationsOpen(!isNotificationsOpen); // Toggle notifications dropdown
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-sm z-50">
        <nav className="h-full flex items-center justify-between px-5">
          {/* Left Section: Burger Menu and Logo */}
          <div className="flex items-center space-x-4">
            {/* Desktop Logo */}
            <a className="hidden lg:block mr-8" href="/">
              <img
                className="side-nav-show-on-closed w-auto h-8"
                src={logoMini}
                alt="Graindashboard"
              />
              <img
                className="side-nav-hide-on-closed w-auto h-8"
                src={logo}
                alt="Graindashboard"
              />
            </a>
            {/* Burger Menu */}
            <a className="cursor-pointer" href="#" onClick={toggleSidebar}>
              <FontAwesomeIcon
                icon={faBars}
                className="text-gray-600 text-xl"
              />
            </a>
          </div>

          {/* Right Section: Notifications and User Dropdown */}
          <div className="flex items-center justify-center space-x-9">
            {/* Notifications Dropdown */}
            <div className="relative justify-center ml-4">
              <a
                id="notificationsInvoker"
                className="cursor-pointer relative"
                href="#"
                onClick={toggleNotifications} // Toggle dropdown on click
              >
                <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-gray-600 text-xl pb-1"
                />
              </a>

              {/* Notifications Dropdown Menu */}
              {isNotificationsOpen && ( // Conditionally render dropdown
                <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg py-2 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-80">
                  <div className="px-4 py-3 border-b flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <h5 className="font-semibold">Notifications</h5>
                    <a className="text-sm text-blue-500 ml-auto" href="#">
                      Clear All
                    </a>
                  </div>
                  <div className="divide-y">
                    <div className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="text-blue-500 mr-2"
                          />
                          <div>
                            <h6 className="font-semibold">New Update</h6>
                            <p className="text-sm mt-1">
                              Order <strong>#10000</strong> has been updated.
                            </p>
                          </div>
                        </div>
                        <a
                          className="text-gray-500 hover:text-gray-700"
                          href="#"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </a>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="text-blue-500 mr-2"
                          />
                          <div>
                            <h6 className="font-semibold">New Update</h6>
                            <p className="text-sm mt-1">
                              Order <strong>#10001</strong> has been updated.
                            </p>
                          </div>
                        </div>
                        <a
                          className="text-gray-500 hover:text-gray-700"
                          href="#"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <UserDropdown handleLogout={handleLogout} />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
