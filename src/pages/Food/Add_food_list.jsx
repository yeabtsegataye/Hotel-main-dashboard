import React, { useEffect, useState } from "react";
import { useAddfoodMutation, useGetcatQuery } from '../../features/Data/dataApiSlice';
import { useSelector } from "react-redux";
import Notif_Toast from "../../components/Tost";
import { useToast } from "@chakra-ui/react";
import validator from "validator"; // For input sanitization
import DOMPurify from "dompurify"; // For sanitizing HTML inputs (if needed)

const Add_food_list = () => {
  const [images, setImages] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [completionTime, setCompletionTime] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const token = useSelector((state) => state.auth.token);
  const { data: categoryData = [], isLoading } = useGetcatQuery(token);
  const [addFood] = useAddfoodMutation();

  useEffect(() => {
    if (categoryData.length > 0) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image file type
      if (!file.type.startsWith("image/")) {
        Notif_Toast(
          toast,
          "Invalid File Type",
          "Please upload an image file (JPEG, PNG, etc.).",
          "error"
        );
        return;
      }
      setImages(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Input sanitization
    const sanitizedFoodName = DOMPurify.sanitize(foodName.trim());
    const sanitizedDescription = DOMPurify.sanitize(description.trim());

    // Validate inputs
    if (!sanitizedFoodName || !sanitizedDescription || !price || !completionTime || !categoryId || !images) {
      Notif_Toast(
        toast,
        "Missing Fields",
        "Please fill out all fields and upload an image.",
        "error"
      );
      return;
    }

    if (!validator.isNumeric(price)) {
      Notif_Toast(
        toast,
        "Invalid Price",
        "Price must be a valid number.",
        "error"
      );
      return;
    }

    if (!validator.isNumeric(categoryId)) {
      Notif_Toast(
        toast,
        "Invalid Category",
        "Please select a valid category.",
        "error"
      );
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("name", sanitizedFoodName);
    formData.append("description", sanitizedDescription);
    formData.append("price", Number(price)); // Ensure price is a number
    formData.append("image", images);
    formData.append("timeOfComplition", completionTime);
    formData.append("category_id", Number(categoryId)); // Ensure category_id is a number

    setUploading(true);

    try {
      const response = await addFood({ token, credentials: formData }).unwrap();
      console.log("Food added successfully:", response);
      if (response) {
        Notif_Toast(
          toast,
          "Success",
          "Food item added successfully!",
          "success"
        );
      }
      // Clear form fields
      setFoodName("");
      setDescription("");
      setPrice("");
      setCompletionTime("");
      setCategoryId("");
      setImages(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error adding food:", error);
      Notif_Toast(
        toast,
        "Error",
        error.data?.message || "Failed to add food item.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 w-[95%] md:w-[90%] mt-6 mx-auto border border-gray-200 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Food Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Food Name</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter Food Name"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter Price"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter Description"
              rows="4"
            ></textarea>
          </div>

          {/* Completion Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time of Completion</label>
            <input
              type="time-local"
              value={completionTime}
              onChange={(e) => setCompletionTime(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <div className="relative">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="opacity-0 absolute w-full h-full cursor-pointer"
                accept="image/*" // Restrict to image files
              />
              <label className="block w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-700 text-center cursor-pointer hover:bg-gray-50 transition-all">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                ) : (
                  "Choose an image"
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Add Food Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_food_list;