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
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-200"; // Adjusted background color
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

  return (
    <div className={`flex items-start ${chatClassName} mb-4`}>
      {!fromMe && ( // Place profile picture on the left if not sender
        <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
          <img
            alt="Profile"
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
                  alt={`Profile picture of ${message.senderName}`}
                  style={{ maxWidth: "300px", maxHeight: "250px" }}
                />
              </a>
            ) : isVideoFile(message.file.originalname) ? (
              <video
                src={`http://localhost:5000/${message.file.originalname}`}
                controls
                style={{ maxWidth: "300px", maxHeight: "250px" }}
              />
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
      </div>
      {fromMe && ( // Place profile picture on the right if sender
        <div className="w-10 h-10 rounded-full overflow-hidden ml-2">
          <img
            alt="Profile"
            src={image_user}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Message;

// import React from "react";

// const Message = () => {
//   return (
//     <>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         Button
//       </button>
//     </>
//   );
// };

// export default Message;

// import React from 'react'

// function Message() {
//   return (
//     <div>Message</div>
//   )
// }

// export default Message

//import { useAuthContext } from "../../context/AuthContext";
// //import { extractTime } from "../../utils/extractTime";
//import useConversation from "../../zustand/useConversation";

// const Message = () => {
//   return (
//     <div className="chat chat-end">
//       <div>
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
//               alt="user avatar"
//             />
//           </div>
//         </div>
//         <div className={`chat-bubble text-black bg-purple-500`}>
//           hello , im yasmine !
//         </div>
//         {/* <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div> */}
//       </div>
//     </div>
//   );
// };
// export default Message;
