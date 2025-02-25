import React, { useState } from 'react';
import { Spinner, useToast, Button } from "@chakra-ui/react";
import { useAddemployeeMutation } from '../../features/Data/dataApiSlice';
import { useSelector } from 'react-redux';

const AddNewEmployee = () => {
    const user = useSelector((state) => state.auth.user);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    jobTitle: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    user_id: user.id,
  });
  const [addemployee] = useAddemployeeMutation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newEmployee = { ...formData };
      // console.log(formData, "employee form data");
      console.log(newEmployee, "newwww");  
      
      const response = await addemployee({
        token,
        credentials: newEmployee
      }).unwrap();
      
      console.log(response, "empoloyee response");

      toast({
        title: 'Employee added.',
        description: `Employee  has been successfully added!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        jobTitle: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
      
      });
    } catch (error) {
      console.log(error,'the errrr')
      toast({
        title: 'Error adding employee.',
        description: error?.data?.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="block w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 2 - Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 3 - Department and Job Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 4 - Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Row 5 - City, Country, Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={loading}
            loadingText="Submitting"
            disabled={loading}
            className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            {loading ? <Spinner size="sm" /> : "Add Employee"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;