import { useState, useRef, useEffect } from "react";
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
  const emojiPickerRef = useRef(null);

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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 
  return (
    <form className="px-4 my-3 mb-5" onSubmit={handleSubmit}>
      <div className="w-full relative flex items-center">
        <input
          type="text"
          className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: "1" }}
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none", color: "white" }}
          ref={fileInputRef}
        />
        <button
          type="button"
          className="ml-2 text-lightBlue-600  text-xl"
          onClick={handleFileUploadClick}
        >
          <BsFileEarmarkArrowUp />
        </button>
        <button
          type="button"
          className="ml-2 text-lightBlue-600 text-xl"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊
        </button>
        {showEmojiPicker && (
          <div ref={emojiPickerRef}>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              disableSearchBar
              disableSkinTonePicker
              style={{ position: "absolute", top: "-1200%", right: 0 }}
            />
          </div>
        )}

        <button
          type="button"
          className={`ml-2 text-lightBlue-600 text-xl ${
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
        <button type="submit" className="ml-2 text-lightBlue-600 text-xl">
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

