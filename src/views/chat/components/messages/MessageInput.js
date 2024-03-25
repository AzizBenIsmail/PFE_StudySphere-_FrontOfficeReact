// import { useState, useRef } from "react";
// import { BsSend, BsFileEarmarkArrowUp } from "react-icons/bs";
// import { MdMic, MdStop } from "react-icons/md"; // Import microphone and stop icons
// import EmojiPicker from "emoji-picker-react";

// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const { loading, sendMessageToApi } = useSendMessage();
//   const fileInputRef = useRef(null);
//   const audioRecorder = useRef(null); // Reference for the audio recorder

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     fileInputRef.current.style.display = "block";
//   };

//   const handleFileUploadClick = () => {
//     fileInputRef.current.style.display = "block";
//     fileInputRef.current.value = null; // Reset the file input value to clear the selected file
//     setFile(null); // Clear the file state
//   };

//   const handleEmojiClick = (emojiObject) => {
//     const emoji = emojiObject.emoji;
//     setMessage(message + emoji);
//   };

//   const handleStartRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);
//       const chunks = [];

//       recorder.ondataavailable = (e) => chunks.push(e.data);

//       recorder.onstop = () => {
//         const blob = new Blob(chunks, { type: "audio/wav" }); // Adjust the type according to your requirement
//         const audioUrl = URL.createObjectURL(blob);
//         const audioFile = new File([blob], "recorded_audio.mp3"); // Adjust the file name and type
//         setFile(audioFile);
//         stream.getTracks().forEach((track) => track.stop());
//       };

//       recorder.start();
//       audioRecorder.current = recorder;
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   const handleStopRecording = () => {
//     if (audioRecorder.current && audioRecorder.current.state === "recording") {
//       audioRecorder.current.stop();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await sendMessageToApi(message, file);
//     setMessage("");
//     setFile(null);
//     setShowEmojiPicker(false);
//     fileInputRef.current.style.display = "none"; // Hide the file input after sending the file
//   };

//   return (
//     <form className="px-4 my-3" onSubmit={handleSubmit}>
//       <div className="w-full ">
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-3/4 p-2.5 bg-gray-700 border-gray-600 text-black ml-auto"
//           placeholder="Send a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <input
//           type="file"
//           onChange={handleFileChange}
//           style={{ display: "none", color: "white" }}
//           ref={fileInputRef}
//         />
//         <button
//           type="button"
//           className="absolute inset-y-0 left-0 flex items-center pl-3 text-white text-xl"
//           onClick={handleFileUploadClick}
//         >
//           <BsFileEarmarkArrowUp />
//         </button>
//         <button
//           type="button"
//           className="absolute inset-y-0 left-10 flex items-center pl-3 pr-1 text-white text-xl"
//           onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//         >
//           😊
//         </button>
//         <button
//           type="button"
//           className="absolute inset-y-0 left-0 flex items-center pl-9 text-black text-xl"
//           onClick={handleStartRecording}
//         >
//           <MdMic />
//         </button>
//         <button
//           type="button"
//           className="absolute inset-y-0 left- flex items-center pl-5 text-red text-xl"
//           onClick={handleStopRecording}
//         >
//           <MdStop />
//         </button>
//         {showEmojiPicker && (
//           <EmojiPicker
//             onEmojiClick={handleEmojiClick}
//             disableSearchBar
//             disableSkinTonePicker
//             style={{ position: "absolute", top: "-1100%", right: 0 }}
//           />
//         )}

//         <button
//           type="submit"
//           className="absolute inset-y-0 end-0 flex items-center pe-3 text-white text-xl"
//         >
//           {loading ? (
//             <div className="loading loading-spinner"></div>
//           ) : (
//             <BsSend />
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MessageInput;

// import { useState, useRef } from "react";
// import { BsSend, BsFileEarmarkArrowUp } from "react-icons/bs";
// import EmojiPicker from "emoji-picker-react";

// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const { loading, sendMessageToApi } = useSendMessage();
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     fileInputRef.current.style.display = "block";
//   };

//   const handleFileUploadClick = () => {
//     fileInputRef.current.style.display = "block";
//     fileInputRef.current.value = null; // Reset the file input value to clear the selected file
//     setFile(null); // Clear the file state
//   };

//   const handleEmojiClick = (emojiObject) => {
//     const emoji = emojiObject.emoji;
//     setMessage(message + emoji);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await sendMessageToApi(message, file);
//     setMessage("");
//     setFile(null);
//     setShowEmojiPicker(false);
//     fileInputRef.current.style.display = "none"; // Hide the file input after sending the file
//   };

//   return (
//     <form className="px-4 my-3" onSubmit={handleSubmit}>
//       <div className="w-full ">
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-3/4 p-2.5 bg-gray-700 border-gray-600 text-black ml-auto"
//           placeholder="Send a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <input
//           type="file"
//           onChange={handleFileChange}
//           style={{ display: "none", color: "white" }}
//           ref={fileInputRef}
//         />
//         <button
//           type="button"
//           className="absolute inset-y-0 left-0 flex items-center pl-3 text-white text-xl"
//           onClick={handleFileUploadClick}
//         >
//           <BsFileEarmarkArrowUp />
//         </button>
//         <button
//           type="button"
//           className="absolute inset-y-0 left-10 flex items-center pl-3 pr-1 text-white text-xl"
//           onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//         >
//           😊
//         </button>
//         {showEmojiPicker && (
//           <EmojiPicker
//             onEmojiClick={handleEmojiClick}
//             disableSearchBar
//             disableSkinTonePicker
//             style={{ position: "absolute", top: "-1100%", right: 0 }}
//           />
//         )}

//         <button
//           type="submit"
//           className="absolute inset-y-0 end-0 flex items-center pe-3 text-white text-xl"
//         >
//           {loading ? (
//             <div className="loading loading-spinner"></div>
//           ) : (
//             <BsSend />
//           )}
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

//this is the correct code without record
// import { useState, useRef } from "react";
// import { BsSend, BsFileEarmarkArrowUp } from "react-icons/bs";
// import EmojiPicker from "emoji-picker-react";

// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const { loading, sendMessageToApi } = useSendMessage();

//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     fileInputRef.current.style.display = "block";
//   };

//   const handleFileUploadClick = () => {
//     fileInputRef.current.style.display = "block";
//     fileInputRef.current.value = null; // Reset the file input value to clear the selected file
//     setFile(null); // Clear the file state
//   };

//   const handleEmojiClick = (emojiObject) => {
//     const emoji = emojiObject.emoji;
//     setMessage(message + emoji);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await sendMessageToApi(message, file);
//     setMessage("");
//     setFile(null);
//     setShowEmojiPicker(false);
//     fileInputRef.current.style.display = "none"; // Hide the file input after sending the file
//   };

//   return (
//     <form className="px-4 my-3 mb-2" onSubmit={handleSubmit}>
//       <div className="w-full relative">
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-3-4 p-2-5 bg-gray-700 border-gray-600 text-white ml-auto"
//           placeholder="Send a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <input
//           type="file"
//           onChange={handleFileChange}
//           style={{ display: "none" , color : "white"}}
//           ref={fileInputRef}
//         />
//         <button
//           type="button"
//           className="absolute inset-y-0 left-0 flex items-center  text-white text-xl"
//           onClick={handleFileUploadClick}
//         >
//           <BsFileEarmarkArrowUp />
//         </button>
//         <button
//           type="button"
//           className="absolute inset-y-0 left-10 flex items-center pr-1 text-white text-xl"
//           onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//         >
//           😊
//         </button>
//         {showEmojiPicker && (
//           <EmojiPicker
//             onEmojiClick={handleEmojiClick}
//             disableSearchBar
//             disableSkinTonePicker
//             style={{ position: "absolute", top: "-1100%", right: 0 }}
//           />
//         )}

//         <button
//           type="submit"
//           className="absolute inset-y-0 end-0 flex items-center  text-white text-xl"
//         >
//           {loading ? (
//             <div className="loading loading-spinner"></div>
//           ) : (
//             <BsSend />
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MessageInput;

import { useState, useRef } from "react";
import { BsSend, BsFileEarmarkArrowUp } from "react-icons/bs";
import { MdMic, MdStop } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  // eslint-disable-next-line
  const [recordingProgress, setRecordingProgress] = useState(0); // State to track recording progress
  const { loading, sendMessageToApi } = useSendMessage();

  const audioRecorder = useRef(null);
  // eslint-disable-next-line
  const progressBarRef = useRef(null); // Reference for the progress bar

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

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mpeg" });
        const audioFile = new File([blob], "recorded_audio.mp3");
        setFile(audioFile);
        stream.getTracks().forEach((track) => track.stop());
        setRecordingProgress(0); // Reset progress when recording stops
      };

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
        const duration = (chunks.length / recorder.sampleRate) * 1000; // Calculate duration in milliseconds
        setRecordingProgress(duration);
      };

      recorder.start();
      setIsRecording(true);
      audioRecorder.current = recorder;
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const handleStopRecording = () => {
    if (audioRecorder.current && audioRecorder.current.state === "recording") {
      audioRecorder.current.stop();
      setIsRecording(false);

      const chunks = []; // Initialize the chunks array

      audioRecorder.current.ondataavailable = (e) => {
        chunks.push(e.data);
        const duration =
          (chunks.length / audioRecorder.current.sampleRate) * 1000;
        setRecordingProgress(duration);
      };

      // Generate a unique filename using timestamp or a random string
      const fileName = `recorded_audio_${Date.now()}.mp3`; // Using timestamp
      // const fileName = `recorded_audio_${Math.random().toString(36).substring(7)}.mp3`; // Using random string

      audioRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mpeg" });
        const audioFile = new File([blob], fileName);
        setFile(audioFile);
        setRecordingProgress(0);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRecording) {
      handleStopRecording();
    }
    await sendMessageToApi(message, file);
    setMessage("");
    setFile(null);
    setFile(null);
    setShowEmojiPicker(false);
    fileInputRef.current.style.display = "none"; // Hide the file input after sending the file
  };

  return (
    <form className="px-4 my-3 mb-5" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-3-4 p-2-5 bg-gray-700 border-gray-600 text-white ml-auto"
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
          className="absolute inset-y-0 left-0 flex items-center  text-white text-xl"
          onClick={handleFileUploadClick}
        >
          <BsFileEarmarkArrowUp />
        </button>
        <button
          type="button"
          className="absolute inset-y-0 left-10 flex items-center pr-1 text-white text-xl"
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
          type="button"
          className={`absolute inset-y-0 end-0 flex items-center pr-1 text-white text-xl ${
            isRecording ? "text-red-500" : ""
          }`}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          {isRecording ? (
            <>
              <MdStop />{" "}
              <span className="absolute inset-y-2 end-2 flex items-center">
                Recording
              </span>
            </>
          ) : (
            <MdMic />
          )}
        </button>
        <button
          type="submit"
          className="absolute inset-y-0 left-21 flex items-center  text-white text-xl"
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
