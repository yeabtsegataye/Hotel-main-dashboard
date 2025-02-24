import React, { useState } from 'react';
import FoodImage from '../../assets/Food.png'; // Import the local image

export const Ingrediants = () => {
  const [selectedFood, setSelectedFood] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [unitAmount, setUnitAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      selectedFood,
      ingredientName,
      unitAmount,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl">
        {/* Image Section - Hidden on tablet and smaller screens */}
        <div className="hidden md:block w-1/3 bg-blue-50 flex items-center justify-center">
  <img
    src={FoodImage} // Use the imported image
    alt="Food Ingredients"
    className="w-full h-full object-cover opacity-60" // Updated classes
  />
</div>

        {/* Form Section - Full width on tablet and smaller screens */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Food Ingredient Form</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="food">
              Select Food
            </label>
            <select
              id="food"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a food</option>
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="pasta">Pasta</option>
              <option value="salad">Salad</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredientName">
              Ingredient Name
            </label>
            <input
              type="text"
              id="ingredientName"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter ingredient name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unitAmount">
              Unit Amount
            </label>
            <input
              type="number"
              id="unitAmount"
              value={unitAmount}
              onChange={(e) => setUnitAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter unit amount"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};