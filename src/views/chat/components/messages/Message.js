import { useAuthContext } from "../../context/AuthContext";
//import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  console.log("Message object:", message);
  const { authUser } = useAuthContext();
  console.log("Authenticated User:", authUser);
  
  const { selectedConversation } = useConversation();
  console.log("Selected Conversation:", selectedConversation);
  
  const fromMe = message.senderId === authUser?._id;
  console.log("Is Message from Me?", fromMe);
  
  const image_user = fromMe
    ? authUser?.image_user
    : selectedConversation?.image_user;
  console.log("Image User:", image_user);

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-red-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  // Function to check if the file is an image based on its extension
  const isImageFile = (fileName) => {
    if (fileName) {
      const extension = fileName.split(".").pop().toLowerCase();
      return ["jpg", "jpeg", "png", "gif"].includes(extension);
    }
    return false;
  };

  // Function to check if the file is a video based on its extension
  const isVideoFile = (fileName) => {
    if (fileName) {
      const extension = fileName.split(".").pop().toLowerCase();
      return ["mp4", "avi", "mov", "wmv"].includes(extension);
    }
    return false;
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={image_user} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message} {/* Render the message content */}
        {message.file &&
          (isImageFile(message.file.originalname) ? (
            // Check if the file is an image
            // Render the image
            <a
              href={`http://localhost:5000/${message.file.originalname}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`http://localhost:5000/${message.file.originalname}`}
                alt={`Profile picturof ${message.senderName}`}
                style={{ maxWidth: "300px", maxHeight: "250px" }}
              />
            </a>
          ) : isVideoFile(message.file.originalname) ? (
            // Check if the file is a video
            // Render the video
            <a
              href={`http://localhost:5000/${message.file.originalname}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <video
                src={`http://localhost:5000/${message.file.originalname}`}
                controls
                style={{ maxWidth: "300px", maxHeight: "250px" }}
              />
            </a>
          ) : (
            // Render a download link for non-image and non-video files
            <a
              href={`http://localhost:5000/${message.file.originalname}`}
              download
            >
              {message.file.originalname}
            </a>
          ))}
      </div>
    </div>
  );
};

export default Message;

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
