// import { useSocketContext } from "../../context/SocketContext";
// import useConversation from "../../zustand/useConversation";

// const Conversation = ({ conversation, lastIdx, emoji }) => {
// 	const { selectedConversation, setSelectedConversation } = useConversation();

// 	const isSelected = selectedConversation?._id === conversation._id;
// 	const { onlineUsers } = useSocketContext();
// 	const isOnline = onlineUsers.includes(conversation._id);

// 	return (
// 		<>
// 			<div
// 				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
// 				${isSelected ? "bg-sky-500" : ""}
// 			`}
// 				onClick={() => setSelectedConversation(conversation)}
// 			>
// 				<div className={`avatar ${isOnline ? "online" : ""}`}>
// 					<div className='w-12 rounded-full'>
// 						<img src={conversation.profilePic} alt='user avatar' />
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>{conversation.prenom}</p>
// 						<span className='text-xl'>{emoji}</span>
// 					</div>
// 				</div>
// 			</div>

// 			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
// 		</>
// 	);
// };
// export default Conversation;

//STARTER CODE SNIPPET

// const Conversation = ({ conversation, lastIdx }) => {
// 	console.log("imguser path:", conversation.image_user);
  
// 	return (
// 	  <>
// 		<div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
// 		  <div>
// 			<div className="w-12 rounded-full">
// 			  <img src={conversation.image_user} alt="user avatar" />
// 			</div>
// 		  </div>
  
// 		  <div className="flex flex-col flex-1">
// 			<div className="flex gap-3 justify-between">
// 			  <p className="font-bold text-gray-200">
// 				{conversation.nom} {conversation.prenom}
// 			  </p>
// 			</div>
// 		  </div>
// 		</div>
  
// 		{!lastIdx && <div className="divider my-0 py-0 h-1" />}
// 	  </>
// 	);
//   };
  
//   export default Conversation;
  


// const Conversation = () => {
// 		return (
// 			<>
// 				<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 					<div className='avatar online'>
// 						<div className='w-12 rounded-full'>
// 							<img
// 								src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 								alt='user avatar'
// 							/>
// 						</div>
// 					</div>

// 					<div className='flex flex-col flex-1'>
// 						<div className='flex gap-3 justify-between'>
// 							<p className='font-bold text-gray-200'>Client jack</p>

// 						</div>
// 					</div>
// 				</div>

// 				<div className='divider my-0 py-0 h-1' />
// 			</>
// 		);
// 	};
// 	export default Conversation;





import client from '../../../../assets/img/client.png';
import { MdCircle } from 'react-icons/md'; // Import MdCircle icon
import useConversation from 'views/chat/zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';


const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-red-500" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div>
          <div className="w-12 rounded-full">
            {isOnline ? (
              <MdCircle size={24} color="green" /> 
            ) : ""}
          </div>
        </div>

        <div>
          <div className="w-12 rounded-full">
            <img src={client} alt="Profile" className="w-full h-full rounded-full" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
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
