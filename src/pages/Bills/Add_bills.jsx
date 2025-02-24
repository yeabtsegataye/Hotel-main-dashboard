import React, { useState } from "react";
import axios from "axios";
import { Spinner, useToast, Button } from "@chakra-ui/react";
import { useAddbillsMutation } from "../../features/Data/dataApiSlice";
import { useSelector } from "react-redux";

const Add_bills = () => {
  const [billName, setBillName] = useState("");
  const [money, setMoney] = useState();
  const [description, setDescription] = useState("");
  const [subType, setSubType] = useState("");
  const [user_id, setuser_id] = useState("");
  const [loading, setLoading] = useState(false);
  const [addbills] = useAddbillsMutation();
  const toast = useToast();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setuser_id(user.id)
    const newBill = {
      BL_name: billName,
      BL_money: Number(money),
      BL_description: description,
      BL_SUB_Type: subType,
      user_id: user_id,
    };
    const addBill = {...newBill}
    
    try {
      console.log({ token, addBill }, 'request payload');
       const response = await addbills({ token, credentials:addBill }).unwrap(); // ✅ Spread the fields
      
      console.log(response, "fff");
      if (response) {
        // Success toast
        toast({
          title: "Bill added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      // Clear the form fields
      setBillName("");
      setMoney();
      setDescription("");
      setSubType("");
      setuser_id("");
    } catch (error) {
      console.error(error);
      // Error toast
      toast({
        title: "Failed to add bill.",
        description: error?.data || 'something went wrong',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
            <label
              htmlFor="billName"
              className="block text-sm font-medium text-gray-700"
            >
              Bill Name
            </label>
            <input
              type="text"
              id="billName"
              value={billName}
              onChange={(e) => setBillName(e.target.value)}
              className="block w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Bill Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="money"
              className="block text-sm font-medium text-gray-700"
            >
              Money
            </label>
            <input
              type="number"
              id="money"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              className="block w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Money"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="subType"
              className="block text-sm font-medium text-gray-700"
            >
              Sub Type
            </label>
            <select
              id="subType"
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              className="block w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Sub Type
              </option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="yearly">yearly</option>
            </select>
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
