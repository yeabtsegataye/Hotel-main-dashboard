import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { setCredentials } from "../features/auth/authSlice";
import { useToast } from "@chakra-ui/react";
import Notif_Toast from "../components/Tost";
import LoginImage from "../assets/Login2.png";
import { useDloginMutation } from "../features/auth/authApiSlice";
import { ClipLoader } from "react-spinners"; // Import the spinner component

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role
  const [emailError, setEmailError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dlogin] = useDloginMutation();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const validateEmail = (value) => {
    const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    setEmailError(emailValid ? "" : "Email is invalid");
    setFormValid(emailValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formValid) {
      try {
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          SECRET_KEY
        ).toString();

        const userData = await dlogin({
          email,
          Password: encryptedPassword,
          role, // Send role along with credentials
        }).unwrap();

        if (userData) {
          dispatch(setCredentials(userData));
          Notif_Toast(
            toast,
            "Login successful",
            "You have successfully logged in",
            "success"
          );
          navigate("/");
        }
      } catch (error) {
       // console.log(error, "edd");
        Notif_Toast(
          toast,
          "Error logging in",
          error?.data?.data || // Access the nested "data" property
          error?.data?.message ||
          error?.data ||
          "Something went wrong",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-sky-200 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="hidden md:block w-full md:w-1/2 flex items-center justify-center ">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  emailError ? "border-red-500" : email && "border-green-500"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Login as:
              </p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={handleRoleChange}
                  className="form-radio h-4 w-4 text-blue-500"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={role === "employee"}
                  onChange={handleRoleChange}
                  className="form-radio h-4 w-4 text-blue-500"
                />
                <span className="ml-2 text-gray-700">Employee</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center justify-center"
              disabled={!formValid || isLoading}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={20} /> // Show spinner when loading
              ) : (
                "Log In" // Show "Log In" text when not loading
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
