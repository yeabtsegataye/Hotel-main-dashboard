import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAddcategoryMutation } from '../../features/Data/dataApiSlice';
import { useSelector } from 'react-redux';
import Notif_Toast from "../../components/Tost";
import { useToast } from "@chakra-ui/react";

const AddNewCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
    const toast = useToast();
    const [addcategory] = useAddcategoryMutation();
  const token = useSelector((state) => state.auth.token);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if the image is selected
    if (!image) {
      alert("Please upload an image.");
      return;
    }
  
    // Create a new FormData object
    const formData = new FormData();
    formData.append("categoryName", categoryName); // Append categoryName
    formData.append("categoryType", categoryType); // Append categoryType
    formData.append("description", description); // Append description
    formData.append("status", status); // Append status
    formData.append("image", image); // Append the image file
  
    // Debugging: log the FormData to check what is being sent
    console.log("FormData Entries:", Object.fromEntries(formData.entries()));
  
    setUploading(true);
  
    try {
      // Send the formData to the backend
      const response = await addcategory({ token, credentials: formData }).unwrap();
      console.log("Upload successful:", response);
      Notif_Toast(toast, "Added Successfully", "New category added", "success");
  
      // Reset form after successful submission
      setCategoryName("");
      setCategoryType("");
      setDescription("");
      setStatus("Active");
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
      Notif_Toast(
        toast,
        "Failed to add category",
        error.data?.message || "Upload error",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="p-8 w-[95%] md:w-[90%] mt-6 mx-auto border border-gray-200 rounded-lg shadow-lg bg-white">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-5">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Type</label>
              <input
                type="text"
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
              className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <i className="fas fa-cloud-upload-alt text-gray-500 text-2xl mb-2"></i>
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className=" bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {uploading ? 'Uploading...' : 'Add Category'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;