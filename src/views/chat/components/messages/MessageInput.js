import { useState, useRef } from "react";
import { BsSend, BsFileEarmarkArrowUp } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessageToApi } = useSendMessage();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    fileInputRef.current.style.display = "block";
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.style.display = "block";
    fileInputRef.current.value = null; // Reset the file input value to clear the selected file
    setFile(null); // Clear the file state
  };

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setMessage(message + emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessageToApi(message, file);
    setMessage("");
    setFile(null);
    setShowEmojiPicker(false);
    fileInputRef.current.style.display = "none"; // Hide the file input after sending the file
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full ">
        <input
          type="text"
          className="border text-sm rounded-lg block w-3/4 p-2.5 bg-gray-700 border-gray-600 text-black ml-auto"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none", color: "white" }}
          ref={fileInputRef}
        />
        <button
          type="button"
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-white text-xl"
          onClick={handleFileUploadClick}
        >
          <BsFileEarmarkArrowUp />
        </button>
        <button
          type="button"
          className="absolute inset-y-0 left-10 flex items-center pl-3 pr-1 text-white text-xl mr-1"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊
        </button>
        {showEmojiPicker && (
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            disableSearchBar
            disableSkinTonePicker
            style={{ position: "absolute", top: "-1100%", right: 0 }}
          />
        )}

        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-white text-xl"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

// import { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const { loading, sendMessage } = useSendMessage();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message) return;
//     await sendMessage(message);
//     setMessage("");
//   };
//   return (
//     <form className="px-4 my-3">
//       <div className="w-full relative">
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
//           placeholder="Send a message"
//         />
//         <button
//           type="submit"
//           className="absolute inset-y-0 end-0 flex items-center pe-3"
//         >
//           <BsSend />
//         </button>
//       </div>
//     </form>
//   );
// };
// export default MessageInput;

// import { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
// 	const [message, setMessage] = useState("");
// 	const { loading, sendMessageToApi } = useSendMessage();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!message) return;
// 		try {
// 			await sendMessageToApi(message);
// 		} catch (error) {
// 			// Handle error if necessary
// 			console.error("Error sending message:", error);
// 		} finally {
// 			console.log("The message sent is:", message);
// 			setMessage("");
// 		}
// 	};

// 	return (
// 		<form className='px-4 my-3' onSubmit={handleSubmit}>
// 			<div className='w-full '>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-black'
// 					placeholder='Send a message'
// 					value={message}
// 					onChange={(e) => setMessage(e.target.value)}
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
