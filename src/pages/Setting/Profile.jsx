import { useState } from "react";

const Profile = () => {
  const [location, setLocation] = useState("California");
  const [bio, setBio] = useState(
    "Hi, I'm Ronald, a passionate UX designer with 10 years of experience in creating intuitive and user-centered digital experiences..."
  );

  return (
    <div className="p-8 w-[95%] md:w-[90%] mt-6 mx-auto border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <div className="flex mb-6 items-center">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Ronald Richards"
          className="w-24 h-24 rounded-full mr-6"
        />
        <div className="flex flex-col">
          <button className="border border-blue-500 text-blue-500 px-4 py-2 mb-2 rounded-lg">
            Upload new photo
          </button>
          <p className="text-sm text-gray-500">
            recommended. JPG or PNG is allowed.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-5 mt-20">Personal Info</h3>
      <div className="flex flex-wrap mb-6 space-x-8">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-2">Full Name</p>
          <p>Ronald Richards</p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-2">Email</p>
          <p>RonaldRich@example.com</p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-2">Phone</p>
          <p>(219) 555-0114</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-bold mb-2">Location</p>
        <div className="flex items-center space-x-2">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="flex-1 border border-blue-300  rounded-lg p-2 "
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Search
          </button>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={() => alert("Changes saved!")}
        >
          Save changes
        </button>
      </div>

      <div className="mb-6">
        <p className="text-lg font-bold mb-2">Bio</p>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          className="border border-gray-300 rounded-lg p-2 w-full h-24 mb-4"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => alert("Changes saved!")}
        >
          Save changes
        </button>
      </div>

      {/* Main Profile and Completion Section */}
      <div className="flex flex-col md:flex-row mt-10 justify-between space-x-4">
        {/* Main Profile Section */}
        <div className="w-full md:w-3/5 p-4 border border-gray-200 rounded-lg bg-white shadow-md">
          <h4 className="text-lg font-bold mb-2">Additional Information</h4>
          <p>This area can be used for additional content related to the profile.</p>
        </div>

        {/* Profile Completion Section */}
        <div className="w-full md:w-2/5 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-md mt-4 md:mt-0">
          <h4 className="text-lg font-bold mb-2">Complete your profile</h4>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-green-500 text-2xl font-bold">40%</span>
              </div>
              <div className="w-28 h-28 border-8 border-green-400 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 border-8 border-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="flex justify-between">Setup account <span>10%</span></p>
            <p className="flex justify-between">Upload your photo <span>5%</span></p>
            <p className="flex justify-between">Personal Info <span>10%</span></p>
            <p className="flex justify-between">Location <span>20%</span></p>
            <p className="flex justify-between">Biography <span>15%</span></p>
            <p className="flex justify-between">Notifications <span>10%</span></p>
            <p className="flex justify-between">Bank details <span>30%</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
