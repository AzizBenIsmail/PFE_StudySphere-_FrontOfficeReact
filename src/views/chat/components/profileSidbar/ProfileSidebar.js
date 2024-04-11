import React, { useState ,useEffect } from "react";
import { AiOutlinePhone, AiOutlineVideoCamera } from "react-icons/ai";
import useConversation from "../../zustand/useConversation";
import client from "../../../../assets/img/client.png";

const ProfileSidebar = () => {
  const { selectedConversation, messages } = useConversation();
  const [activeSection, setActiveSection] = useState("profile");
  useEffect(() => {
    // Reset activeSection to "profile" when a new conversation is selected
    setActiveSection("profile");
  }, [selectedConversation]);
  const handleClick = (section) => {
    setActiveSection(section);
  };

  const handleBackToProfile = () => {
    setActiveSection("profile");
  };

  const handleMediaClick = () => {
    setActiveSection("profile");
  };

  const renderMedia = () => {
    console.log("Selected Conversationssssss:", selectedConversation);
    console.log("est messages: ", messages);

    if (messages) {
      return messages.map((message, index) => {
        console.log("Message file:", message.file); // Log the message's file object
        // Check if file object exists and has originalname property
        if (message.file && message.file.originalname) {
          const fileExtension = message.file.originalname
            .split(".")
            .pop()
            .toLowerCase(); // Get the file extension

          // Check the file extension to determine the type
          if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
            // Render image
            return (
              <div key={index} onClick={handleMediaClick}>
                <a
                  href={`http://localhost:5000/${message.file.originalname}`}
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Recommended for security reasons
                >
                  <img
                    src={`http://localhost:5000/${message.file.originalname}`} // Assuming file.path contains the URL of the image
                    alt={`Imagezz ${index}`}
                    className=" rounded-lg"
                  />
                </a>
              </div>
            );
          } else if (["mp4", "mov", "avi"].includes(fileExtension)) {
            // Render video
            return (
              <div key={index} onClick={handleMediaClick}>
                <a
                  href={`http://localhost:5000/${message.file.originalname}`}
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Recommended for security reasons
                >
                  <video
                    src={`http://localhost:5000/${message.file.originalname}`} // Assuming file.path contains the URL of the video
                    controls
                  />
                </a>
              </div>
            );
          }
        }
        return null; // Return null for messages without file object or originalname property
      });
    }
    return null;
  };

  const renderFiles = () => {
    if (messages) {
      return messages.map((message, index) => {
        if (message.file && message.file.originalname) {
          const fileExtension = message.file.originalname
            .split(".")
            .pop()
            .toLowerCase(); // Get the file extension

          // Check the file extension to determine the type
          if (
            !["jpg", "jpeg", "png", "gif", "mp4", "mov", "avi"].includes(
              fileExtension
            )
          ) {
            // Check if file extension is PDF, DOCX, or TXT
            if (["pdf", "docx", "txt"].includes(fileExtension)) {
              // Render file
              return (
                <div key={index}>
                  <a
                    href={`http://localhost:5000/${message.file.originalname}`}
                    target="_blank" // Open link in a new tab
                    rel="noopener noreferrer" // Recommended for security reasons
                    className="text-blue-500 hover:underline"
                  >
                    {message.file.originalname}
                  </a>
                </div>
              );
            }
          }
        }
        return null; // Return null for messages without file object or originalname property
      });
    }
    return null;
  };

  const renderLinks = () => {
    if (messages) {
      return messages.map((message, index) => {
        // Function to detect URLs in the message content
        const detectURLs = (content) => {
          const urlPattern = /(https?:\/\/[^\s]+)/g;
          return content.match(urlPattern) || [];
        };

        // Extract URLs from the message content
        const urls = detectURLs(message.message);

        // Render the links
        return urls.map((url, idx) => (
          <div key={idx}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {url}
            </a>
          </div>
        ));
      });
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      {selectedConversation && (
        <>
          {activeSection === "profile" && (
            <>
              {/* Profile Image */}
              <img
                src={client}
                alt="Profile"
                className="w-17 h-24 rounded-full mb-2"
              />

              {/* Profile Name */}
              <h3 className="text-gray-800 font-semibold text-base">
                {selectedConversation.nom}
              </h3>

              {/* Container for icons */}
              <div className="flex space-x-4">
                {/* Audio Call Icon */}
                <AiOutlinePhone
                  className="text-gray-800 text-lg"
                  onClick={() => handleClick("audio")}
                />

                {/* Video Call Icon */}
                <AiOutlineVideoCamera
                  className="text-gray-800 text-lg"
                  onClick={() => handleClick("video")}
                />
              </div>

              {/* Clickable div for Media, Files & Links */}
              <div
                className="cursor-pointer text-gray-800 font-semibold mt-2"
                onClick={() => setActiveSection("media")}
              >
                Media
              </div>
              <div
                className="cursor-pointer text-gray-800 font-semibold mt-2"
                onClick={() => setActiveSection("files")}
              >
                Files
              </div>
              <div
                className="cursor-pointer text-gray-800 font-semibold mt-2"
                onClick={() => setActiveSection("links")}
              >
                Links
              </div>
            </>
          )}

          {(activeSection === "media" ||
            activeSection === "files" ||
            activeSection === "links") && (
            <div>
              {/* Back to Profile Button */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleBackToProfile}
              >
                Back to Profile
              </button>
            </div>
          )}

          {activeSection === "media" && (
            <div>
              {/* Render media content */}
              <h3>Media content goes here</h3>
              {/* Render both images and videos */}
              {renderMedia()}
            </div>
          )}
          {activeSection === "files" && (
            <div>
              {/* Render files content */}
              <h3>Files content goes here</h3>
              {renderFiles()}
            </div>
          )}

          {activeSection === "links" && (
            <div>
              <h3>Links in conversation:</h3>
              {renderLinks()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileSidebar;
