import React from "react";

const ProfileOptions = ({ setActiveSection }) => {
  return (
    <div className="flex justify-center items-center mt-4">
      {/* Option for media */}
      <div
        className="cursor-pointer text-gray-800 font-semibold flex flex-col items-center mr-4"
        onClick={() => setActiveSection("media")}
      >
        <div className="bg-blue-200 w-10 h-10 rounded-full mb-2"></div>
        Media
      </div>

      {/* Option for files */}
      <div
        className="cursor-pointer text-gray-800 font-semibold flex flex-col items-center mr-4"
        onClick={() => setActiveSection("files")}
      >
        <div className="bg-green-200 w-10 h-10 rounded-full mb-2"></div>
        Files
      </div>

      {/* Option for links */}
      <div
        className="cursor-pointer text-gray-800 font-semibold flex flex-col items-center"
        onClick={() => setActiveSection("links")}
      >
        <div className="bg-yellow-200 w-10 h-10 rounded-full mb-2"></div>
        Links
      </div>
    </div>
  );
};

export default ProfileOptions;
