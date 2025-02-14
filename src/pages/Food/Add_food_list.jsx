import React, { useState } from "react";

const Add_food_list = () => {
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [completionTime, setCompletionTime] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState({ img1: null, img2: null, img3: null });
  const [video, setVideo] = useState(null);

  const handleImageChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFood = {
      FL_name: foodName,
      FL_descreption: description,
      FL_money: price,
      FL_img: images.img1,
      FL_img2: images.img2,
      FL_img3: images.img3,
      FL_video: video,
      FL_timeOFComplit: completionTime,
      CA_id: categoryId,
    };

    console.log("New Food Item:", newFood);

    // Clear form fields
    setFoodName("");
    setDescription("");
    setPrice("");
    setCompletionTime("");
    setCategoryId("");
    setImages({ img1: null, img2: null, img3: null });
    setVideo(null);
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
              type="datetime-local"
              value={completionTime}
              onChange={(e) => setCompletionTime(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Category ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category ID</label>
            <input
              type="text"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter Category ID"
              required
            />
          </div>

          {/* Image Uploads */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
            <div className="space-y-3">
             
              {[1, 2, 3].map((index) => (
                <div key={index} className="relative">
                  <input
                    type="file"
                    name={`img${index}`}
                    onChange={handleImageChange}
                    className="opacity-0 absolute w-full h-full cursor-pointer"
                    id={`file-upload-${index}`}
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="block w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-700 text-center cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    {images[`img${index}`] ? images[`img${index}`].name : `Upload Image ${index}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Video Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video</label>
            <div className="relative">
              <input
                type="file"
                onChange={handleVideoChange}
                className="opacity-0 absolute w-full h-full cursor-pointer"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="block w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-700 text-center cursor-pointer hover:bg-gray-50 transition-all"
              >
                {video ? video.name : "Upload Video"}
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
          >
            Add Food Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_food_list;