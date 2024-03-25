// import { useEffect } from "react";
// import useConversation from "../../zustand/useConversation";
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";
// import { TiMessages } from "react-icons/ti";
// import { useAuthContext } from "../../context/AuthContext";

// const MessageContainer = () => {
// 	const { selectedConversation, setSelectedConversation } = useConversation();

// 	useEffect(() => {
// 		// cleanup function (unmounts)
// 		return () => setSelectedConversation(null);
// 	}, [setSelectedConversation]);

// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			{!selectedConversation ? (
// 				<NoChatSelected />
// 			) : (
// 				<>
// 					{/* Header */}
// 					<div className='bg-slate-500 px-4 py-2 mb-2'>
// 						<span className='label-text'>To:</span>{" "}
// 						<span className='text-gray-900 font-bold'>{selectedConversation.nom}</span>
// 					</div>
// 					<Messages />
// 					<MessageInput />
// 				</>
// 			)}
// 		</div>
// 	);
// };
// export default MessageContainer;

// const NoChatSelected = () => {
// 	const { authUser } = useAuthContext();
// 	return (
// 		<div className='flex items-center justify-center w-full h-full'>
// 			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
// 				<p>Welcome 👋 {authUser.nom} ❄</p>
// 				<p>Select a chat to start messaging</p>
// 				<TiMessages className='text-3xl md:text-6xl text-center' />
// 			</div>
// 		</div>
// 	);
// };

// import Messages from "./Messages";
// import MessageInput from "./MessageInput";

// const MessageContainer = () => {
//   return (
//     <div className='md:min-w-[450px] flex flex-col'>
//       <>
//         <div className="bg-purple-500 px-4 py-2 mb-2">
//           <span className="label-text">To:</span>{" "}
//           <span className="text-black-500 font-bold">Client jack</span>
//         </div>

//         <Messages />
//         <MessageInput/>
//       </>
//     </div>
//   );
// };
// export default MessageContainer;


import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
    <div className='  flex flex-col  bg-yellow-500 '>

			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2 bg-emerald-500 '>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.nom}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;


const NoChatSelected = () => {
	
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋tttt ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};