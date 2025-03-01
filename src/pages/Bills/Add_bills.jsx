import React, { useState } from "react";
import { Spinner, useToast, Button } from "@chakra-ui/react";
import { useAddbillsMutation } from "../../features/Data/dataApiSlice";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import DOMPurify from "dompurify"; // Import DOMPurify

// Define validation schema
const validationSchema = Yup.object().shape({
  billName: Yup.string()
    .required("Bill Name is required")
    .max(50, "Bill Name must be less than 50 characters"),
  money: Yup.number()
    .required("Money is required")
    .positive("Money must be a positive number"),
  description: Yup.string()
    .max(200, "Description must be less than 200 characters"),
  subType: Yup.string()
    .required("Sub Type is required")
    .oneOf(["Daily", "Weekly", "Monthly", "yearly"], "Invalid Sub Type"),
});

const Add_bills = () => {
  const [billName, setBillName] = useState("");
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [subType, setSubType] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [addbills] = useAddbillsMutation();
  const toast = useToast();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Validate inputs
    try {
      await validationSchema.validate(
        { billName, money, description, subType },
        { abortEarly: false }
      );

      // Sanitize inputs using DOMPurify
      const sanitizedBillName = DOMPurify.sanitize(billName);
      const sanitizedDescription = DOMPurify.sanitize(description);
      const sanitizedSubType = DOMPurify.sanitize(subType);

      const newBill = {
        BL_name: sanitizedBillName,
        BL_money: Number(money),
        BL_description: sanitizedDescription,
        BL_SUB_Type: sanitizedSubType,
        user_id: user.id,
      };

      const response = await addbills({ token, credentials: newBill }).unwrap();

      if (response) {
        toast({
          title: "Bill added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Clear the form fields
        setBillName("");
        setMoney("");
        setDescription("");
        setSubType("");
        setErrors({});
      }
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
          title: "Failed to add bill.",
          description: error?.data?.message || "Something went wrong",
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
      <h1 className="text-2xl font-bold mb-4">Add Bill</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="billName" className="block text-sm font-medium text-gray-700">
              Bill Name
            </label>
            <input
              type="text"
              id="billName"
              value={billName}
              onChange={(e) => setBillName(e.target.value)}
              className={`block w-full border ${
                errors.billName ? "border-red-500" : "border-gray-500"
              } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter Bill Name"
            />
            {errors.billName && (
              <p className="text-red-500 text-sm mt-1">{errors.billName}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="money" className="block text-sm font-medium text-gray-700">
              Money
            </label>
            <input
              type="number"
              id="money"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              className={`block w-full border ${
                errors.money ? "border-red-500" : "border-gray-500"
              } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter Money"
            />
            {errors.money && (
              <p className="text-red-500 text-sm mt-1">{errors.money}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`block w-full border ${
                errors.description ? "border-red-500" : "border-gray-500"
              } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter Description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="subType" className="block text-sm font-medium text-gray-700">
              Sub Type
            </label>
            <select
              id="subType"
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              className={`block w-full border ${
                errors.subType ? "border-red-500" : "border-gray-500"
              } rounded-lg p-2 focus:ring-2 focus:ring-blue-500`}
            >
              <option value="" disabled>
                Select Sub Type
              </option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="yearly">yearly</option>
            </select>
            {errors.subType && (
              <p className="text-red-500 text-sm mt-1">{errors.subType}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          loadingText="Submitting"
          disabled={loading}
          className="mt-4"
        >
          {loading ? <Spinner size="sm" /> : "Add Bill"}
        </Button>
      </form>
    </div>
  );
};

export default Add_bills;