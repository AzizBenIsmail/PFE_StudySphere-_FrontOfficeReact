import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser?._id;
  const image_user = fromMe
    ? authUser?.image_user
    : selectedConversation?.image_user;

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-indigo-500" : "bg-gray-300"; // Adjusted background color
  const bubbleTextColor = fromMe ? "text-white" : "text-gray-800"; // Adjusted text color
  const shakeClass = message.shouldShake ? "shake" : "";

  const isImageFile = (fileName) => {
    if (fileName) {
      const extension = fileName.split(".").pop().toLowerCase();
      return ["jpg", "jpeg", "png", "gif"].includes(extension);
    }
    return false;
  };

  const isVideoFile = (fileName) => {
    if (fileName) {
      const extension = fileName.split(".").pop().toLowerCase();
      return ["mp4", "avi", "mov", "wmv"].includes(extension);
    }
    return false;
  };

  const isAudioFile = (fileName) => {
    if (fileName) {
      const extension = fileName.split(".").pop().toLowerCase();
      return ["mp3", "wav", "ogg"].includes(extension); // Adjusted to include audio file extensions
    }
    return false;
  };

  // Function to detect URLs in the message content
  // const detectURLs = (content) => {
  //   const urlPattern = /(https?:\/\/[^\s]+)/g;
  //   return content.match(urlPattern);
  // };

  return (
    <div className={`flex items-start ${chatClassName} mb-4`}>
      {!fromMe && (
        <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
          <img
            alt="user"
            src={image_user}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div
        className={`rounded-lg px-2 py-2 max-w-xs break-words ${bubbleBgColor} ${bubbleTextColor} ${shakeClass}`}
        style={{
          maxWidth: "calc(100vw - 4rem)",
        }}
      >
        {message.message}
        {message.file && (
          <>
            {isImageFile(message.file.originalname) ? (
              <a
                href={`http://localhost:5000/${message.file.originalname}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`http://localhost:5000/${message.file.originalname}`}
                  alt={`  of ${message.senderName}`}
                  style={{ maxWidth: "300px", maxHeight: "250px" }}
                />
              </a>
            ) : isVideoFile(message.file.originalname) ? (
              <video
                src={`http://localhost:5000/${message.file.originalname}`}
                controls
                style={{ maxWidth: "300px", maxHeight: "250px" }}
              />
            ) : isAudioFile(message.file.originalname) ? (
              <audio
                controls
                style={{ width: "200px", height: "30px" }} // Adjusted height and width
              >
                <source
                  src={`http://localhost:5000/${message.file.originalname}`}
                  type={`audio/${message.file.originalname
                    .split(".")
                    .pop()
                    .toLowerCase()}`}
                />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <a
                href={`http://localhost:5000/${message.file.originalname}`}
                download
                className="mt-2 text-blue-500 hover:underline"
              >
                {message.file.originalname}
              </a>
            )}
          </>
        )}
        {/* Render clickable links */}
        {/* {detectURLs(message.message)?.map((url, index) => (
          <div key={index} className="mt-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {url}
            </a>
          </div>
        ))} */}
      </div>
      {fromMe && (
        <div className="w-10 h-10 rounded-full overflow-hidden ml-2">
          <img
            alt="user"
            src={image_user}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Message;
