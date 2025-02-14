import React, { useState } from 'react';

const Add_bills = () => {
  const [billName, setBillName] = useState('');
  const [money, setMoney] = useState('');
  const [description, setDescription] = useState('');
  const [subType, setSubType] = useState('');
  const [htId, setHtId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object to store the bill data
    const newBill = {
      BL_name: billName,
      BL_money: money,
      BL_description: description,
      BL_SUB_Type: subType,
      HT_id: htId,
    };

    // Log the bill data to the console (replace with your actual POST request logic)
    console.log('New Bill:', newBill);

    // Clear the form fields
    setBillName('');
    setMoney('');
    setDescription('');
    setSubType('');
    setHtId('');
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
              className="block w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Bill Name"
              required
            />
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
              className="block w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Money"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="subType" className="block text-sm font-medium text-gray-700">
              Sub Type
            </label>
            <input
              type="text"
              id="subType"
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              className="block w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Sub Type"
            />
          </div>
      
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Bill
        </button>
      </form>
    </div>
  );
};

export default Add_bills;