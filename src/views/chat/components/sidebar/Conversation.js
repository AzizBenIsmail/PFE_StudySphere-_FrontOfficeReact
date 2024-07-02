// import client from "../../../../assets/img/client.png";
// import { MdCircle } from "react-icons/md"; // Import MdCircle icon
// import useConversation from "views/chat/zustand/useConversation";
// import { useSocketContext } from "../../context/SocketContext";

// const Conversation = ({ conversation, lastIdx }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { onlineUsers } = useSocketContext();
//   const isOnline = onlineUsers.includes(conversation._id);

//   const isSelected = selectedConversation?._id === conversation._id;

//   return (
//     <>
//       <div
//         className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
//           ${isSelected ? "bg-red-500" : ""}
//         `}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         <div>
//           <div className="w-12 rounded-full">
//             {isOnline ? <MdCircle size={24} color="green" /> : ""}
//           </div>
//         </div>

//         <div>
//           <div className="lg:w-4 rounded-full">
//             <img
//               src={client}
//               alt="Profile"
//               className="w-full h-full rounded-full"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col flex-1">
//           <div className="flex gap-3 justify-between">
//             <p className="font-bold text-gray-200">
//               {conversation.nom} {conversation.prenom}
//             </p>
//           </div>
//         </div>
//       </div>

//       {!lastIdx && <div className="divider my-0 py-0 h-1" />}
//     </>
//   );
// };

// export default Conversation;


import client from "../../../../assets/img/client.png";
import { MdCircle } from "react-icons/md"; // Import MdCircle icon
import useConversation from "views/chat/zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer  
          ${isSelected ? "bg-gray-50" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div>
          <div className="w-12 rounded-full">
            {isOnline ? <MdCircle size={24} color="green" /> : ""}
          </div>
        </div>

        {/* Conditionally render the profile image only on smaller screens */}
        <div className="flex items-center justify-center  ">
          <div className="w-16 rounded-full">
            <img
              src={client}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>

        {/* Render conversation's name on larger screens */}
        <div className="hidden lg:flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {conversation.nom} {conversation.prenom}
            </p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
