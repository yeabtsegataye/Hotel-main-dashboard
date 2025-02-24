import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSignupMutation } from "../features/auth/authApiSlice";
import SignupImage from "../assets/Signup.png"; // Import your image from assets

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [signup] = useSignupMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = formErrors;

    switch (name) {
      case "email":
        errors.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? ""
          : "Email is invalid";
        break;
      case "password":
        errors.password = value.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
        )
          ? ""
          : "Password must contain at least 8 characters, UPPER/lowercase, number, and special character";
        break;
      case "passwordConfirm":
        errors.passwordConfirm =
          value === formData.password ? "" : "Passwords do not match";
        break;
      default:
        break;
    }

    setFormErrors(errors);
    setFormValid(!Object.values(errors).some((error) => error.length > 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      try {
        const encryptedPassword = CryptoJS.AES.encrypt(
          formData.password,
          SECRET_KEY
        ).toString();
        const encryptedFormData = {
          ...formData,
          Password: encryptedPassword,
        };
        const response = await signup(encryptedFormData).unwrap();
        if (response.accessToken) {
          toast({
            title: "Signup successful",
            description: "You have successfully signed up",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          navigate("/");
        }
      } catch (error) {
        toast({
          title: "Error signing up",
          description: error.data?.message || "An unexpected error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.error("Signup error", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-sky-200 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section - Hidden on small screens */}
        <div className="hidden md:block w-full md:w-1/2 bg-blue-50 flex items-center justify-center p-8">
          <img
            src={SignupImage}
            alt="Signup Illustration"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Create New Account</h2>
            <p className="text-gray-600">Join us and start your journey</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  formErrors.name ? "border-red-500" : formData.name && "border-green-500"
                }`}
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  formErrors.email ? "border-red-500" : formData.email && "border-green-500"
                }`}
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  formErrors.password ? "border-red-500" : formData.password && "border-green-500"
                }`}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  formErrors.passwordConfirm ? "border-red-500" : formData.passwordConfirm && "border-green-500"
                }`}
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirm your password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
              {formErrors.passwordConfirm && (
                <p className="text-red-500 text-sm mt-1">{formErrors.passwordConfirm}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={!formValid}
            >
              Sign Up
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/Login" className="text-blue-500 hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};