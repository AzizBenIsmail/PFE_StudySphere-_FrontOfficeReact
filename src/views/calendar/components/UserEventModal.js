import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Draggable from "react-draggable";
import { useAuthContext } from "../../chat/context/AuthContext";

export default function UserEventModal() {
  const { setShowEventModal, selectedEvent,   } = useContext(GlobalContext);

  const { authUser } = useAuthContext();
  // Check if selectedEvent and guests are defined
  // Check if selectedEvent and guests are defined
  const isUserSelected = selectedEvent && selectedEvent.guests && 
  authUser && selectedEvent.guests.some(guestId => guestId === authUser._id);


   console.log("selectedEvent:", selectedEvent);
  console.log("selectedEvent.guests:", selectedEvent && selectedEvent.guests);
  console.log("currentUser:", authUser);
  console.log("isUserSelected:", isUserSelected);
  console.log("selectedEvent.meetingUrl:", selectedEvent && selectedEvent.meetingUrl);

  console.log("authUser ID:", authUser && authUser._id);
  console.log("Selected Event:", selectedEvent);
 
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <Draggable handle=".drag-handle">
        <div className="bg-white rounded-lg shadow-2xl w-64 md:w-1/2 lg:w-1/4">
          <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <span className="material-icons-outlined text-gray-400 drag-handle">
              drag_handle
            </span>
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </header>
          <div className="p-3">
            <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            <p>
              {new Date(selectedEvent.startTime).toLocaleTimeString()} -{" "}
              {new Date(selectedEvent.endTime).toLocaleTimeString()}
            </p>
            {/* Ensure isUserSelected is defined before rendering */}
            {isUserSelected && selectedEvent.meetingUrl && (
              <div>
                <a
                  href={selectedEvent.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Meeting
                </a>
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
}
