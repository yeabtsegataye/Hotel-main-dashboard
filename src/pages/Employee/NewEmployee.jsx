import React, { useState } from "react";
import { Spinner, useToast, Button } from "@chakra-ui/react";
import { useAddemployeeMutation } from "../../features/Data/dataApiSlice";
import { useSelector } from "react-redux";
import * as Yup from "yup"; // For validation
import DOMPurify from "dompurify"; // For sanitization

const AddNewEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    jobTitle: "",
    address: "",
    city: "",
    country: "",
    password: "",
    salary: "",
  });
  const [addemployee] = useAddemployeeMutation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // For validation errors
  const token = useSelector((state) => state.auth.token);

  // Validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .max(50, "First Name must be less than 50 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .max(50, "Last Name must be less than 50 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone is required"),
    department: Yup.string().required("Department is required"),
    jobTitle: Yup.string().required("Job Title is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      await validationSchema.validate(formData, { abortEarly: false });

      // Sanitize form data
      const sanitizedData = {};
      for (const key in formData) {
        sanitizedData[key] = DOMPurify.sanitize(formData[key]);
      }
////////////////////////////////////////////////////////////////////////
      const response = await addemployee({
        token,
        credentials: sanitizedData,
      }).unwrap();

///////////////////////////////////////////////////////////////////////
      if (response) {
        console.log(response,'rsssss')
        toast({
          title: "Employee added.",
          description: `Employee has been successfully added!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        jobTitle: "",
        address: "",
        city: "",
        country: "",
        password: "",
        salary: "",
      });
      setErrors({}); // Clear validation errors
    } catch (error) {
      if (error.inner) {
        // Yup validation errors
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        // API or other errors
        console.error(error);
        toast({
          title: "Error adding employee.",
          description: error?.data?.message ||error?.data || "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-[95%] md:w-[90%] mt-6 mx-auto border border-gray-200 rounded-lg shadow-lg bg-white">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-5">Add New Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 - Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Row 2 - Email and password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Row 3 - Department and Job Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.department ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.jobTitle ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
              )}
            </div>
          </div>

          {/* Row 4 - Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.salary ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
              )}
            </div>
          </div>

          {/* Row 5 - City, Country, Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`block w-full border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={loading}
            loadingText="Submitting"
            disabled={loading}
            colorScheme="blue"
            sx={{ width: "130px", py: 2, borderRadius: "lg" }}
          >
            {loading ? <Spinner size="sm" /> : "Add Employee"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;