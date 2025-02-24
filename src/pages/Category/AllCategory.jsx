import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const AllCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Web Development',
      description: 'Professional web development services.',
      imgSrc: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Graphic Design',
      description: 'Creative graphic design services.',
      imgSrc: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Digital Marketing',
      description: 'Effective digital marketing solutions.',
      imgSrc: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Content Writing',
      description: 'High-quality content writing services.',
      imgSrc: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="p-8 w-[95%] md:w-[90%] mt-6 mx-auto border border-gray-200 rounded-lg shadow-lg bg-white">
      <div className="bg-white rounded-lg shadow-sm p-6 w-full mx-auto">
        <h2 className="text-2xl font-bold mb-5">All Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img src={category.imgSrc} alt={category.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <i
                      className="fas fa-edit text-gray-500 cursor-pointer hover:text-blue-700"
                      title="Edit"
                      onClick={() => console.log(`Edit ${category.name}`)} // Replace with actual edit function
                    ></i>
                    <i
                      className="fas fa-trash text-gray-500 cursor-pointer hover:text-red-700"
                      title="Delete"
                      onClick={() => console.log(`Delete ${category.name}`)} // Replace with actual delete function
                    ></i>
                  </div>
                  <i
                    className="fas fa-eye text-gray-500 cursor-pointer hover:text-green-700"
                    title="View Services"
                    onClick={() => console.log(`View services for ${category.name}`)} // Replace with actual view function
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <i
            className="fas fa-plus-circle text-gray-500 cursor-pointer hover:text-green-700"
            title="Add New Category"
            onClick={() => console.log("Add New Category")} // Replace with actual add function
          ></i>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
