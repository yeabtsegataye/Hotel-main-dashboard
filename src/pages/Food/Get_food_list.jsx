import React, { useState, useEffect } from "react";
import {
  useGetfoodQuery,
  useGetcatQuery,
} from "../../features/Data/dataApiSlice";
import { useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react"; // For loading spinner

export const Get_food_list = () => {
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const category = useSelector((state) => state.auth.category);

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories if not available in Redux store
  const {
    data: categoryData = [],
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useGetcatQuery(token, {
    skip: !!category, // Skip if categories are already available in the Redux store
  });

  useEffect(() => {
    if (category) {
      setCategories(category);
      setSelectedCategory(category[0]?.id); // Set the first category as selected
    } else if (categoryData) {
      setCategories(categoryData);
      setSelectedCategory(categoryData[0]?.id); // Set the first category as selected
    }
  }, [category, categoryData]);

  // Fetch foods for the selected category
  const {
    data: foods = [],
    isLoading: isFoodLoading,
    isError: isFoodError,
    refetch,
  } = useGetfoodQuery(
    { token, id: selectedCategory },
    {
      skip: !selectedCategory, // Skip if no category is selected
      selectFromResult: ({ data, isLoading, isError }) => ({
        data,
        isLoading,
        isError,
        isCached: !!data, // Check if data is already in the cache
      }),
    }
  );

  // Fixed truncateText function (truncates text by character limit, adds "...")
  const truncateText = (text, charLimit) => {
    if (!text) return ""; // Handle empty or undefined text
    return text.length > charLimit ? text.substring(0, charLimit) + "..." : text;
  };

  // Loading and error states
  if (isCategoryLoading || isFoodLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (categoryError || isFoodError) {
    return <p className="text-center text-red-500">Failed to load foods.</p>;
  }

  return (
    <div className="p-6 w-[95%] md:w-[90%] mt-6 mx-auto border border-gray-200 rounded-lg shadow-lg bg-white">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto space-x-4 pb-3 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 hover:text-white transition`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-center my-6">Our Food Menu</h1>

      {/* Food Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {foods.length === 0 ? (
          <p className="text-center text-gray-600">No food is assigned for this category.</p>
        ) : (
          foods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden w-[300px] hover:scale-105 transition-transform"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/${food.image}`}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {truncateText(food.name, 20)} {/* Truncate to 20 characters */}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  {truncateText(food.description, 50)} {/* Truncate to 50 characters */}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">
                    ${food.price}
                  </span>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
