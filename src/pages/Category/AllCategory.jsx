import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import { useDispatch, useSelector } from "react-redux";
import { useGetcatQuery } from "../../features/Data/dataApiSlice";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader for the loading spinner
import { category } from "../../features/auth/authSlice";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

const AllCategories = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Assuming token is stored in Redux

  const { data: categoryData = [], error, isLoading } = useGetcatQuery(token);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      if (categoryData.length > 0) {
        dispatch(category(categoryData)); // Dispatch categories data to Redux
      }
    } catch (dispatchError) {
      console.error("Error dispatching category to Redux:", dispatchError);
    }
  }, [categoryData, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={50} /> {/* Blue spinner */}
        <p className="ml-4 text-gray-600">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching categories:", error);
    return (
      <p className="flex justify-center items-center h-screen text-red-500">
        Error fetching categories.{" "}
        {error.data?.message || error.message || "Unknown error"}.
      </p>
    );
  }

  // Sanitize the search term
  const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm);

  // Filter categories based on sanitized search input
  const filteredCategories = categoryData
    ? categoryData.filter((category) => {
        const fullName = `${category.name} ${category.description}`.toLowerCase();
        return fullName.includes(sanitizedSearchTerm.toLowerCase());
      })
    : [];

  return (
    <div className="p-4 w-full sm:w-[90%] mt-6 mx-auto border border-gray-200 rounded-lg shadow-lg bg-white">
      <div className="bg-white rounded-lg shadow-sm p-6 w-full mx-auto">
        <h2 className="text-2xl font-bold mb-5">All Categories</h2>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            // Sanitize dynamic content
            const sanitizedName = DOMPurify.sanitize(category.name);
            const sanitizedDescription = DOMPurify.sanitize(category.description);
            const sanitizedImageUrl = DOMPurify.sanitize(
              `${import.meta.env.VITE_API_URL}/${category.image}`
            );

            return (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden w-full"
              >
                <img
                  src={sanitizedImageUrl}
                  alt={sanitizedName}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150"; // Fallback image
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{sanitizedName}</h3>
                  <p className="text-gray-600 mb-4">{sanitizedDescription}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <i
                        className="fas fa-edit text-gray-500 cursor-pointer hover:text-blue-700"
                        title="Edit"
                        onClick={() => console.log(`Edit ${sanitizedName}`)}
                      ></i>
                      <i
                        className="fas fa-trash text-gray-500 cursor-pointer hover:text-red-700"
                        title="Delete"
                        onClick={() => console.log(`Delete ${sanitizedName}`)}
                      ></i>
                    </div>
                    <i
                      className="fas fa-eye text-gray-500 cursor-pointer hover:text-green-700"
                      title="View Services"
                      onClick={() =>
                        console.log(`View services for ${sanitizedName}`)
                      }
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Category Button */}
        <div className="mt-6 flex justify-center">
          <i
            className="fas fa-plus-circle text-gray-500 cursor-pointer hover:text-green-700 text-2xl"
            title="Add New Category"
            onClick={() => console.log("Add New Category")}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;