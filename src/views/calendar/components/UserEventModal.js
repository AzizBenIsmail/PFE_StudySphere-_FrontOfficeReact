

import React, { useContext ,useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import Draggable from "react-draggable";
import { useAuthContext } from "../../chat/context/AuthContext";

export default function UserEventModal() {
  const { setShowEventModal, selectedEvent } = useContext(GlobalContext);
  const { authUser } = useAuthContext();

  

  // Check if selectedEvent and guests are defined and compare guest IDs with authUser ID as strings
  const isUserSelected = selectedEvent && selectedEvent.guests && authUser && selectedEvent.guests.some((guest) => {
    const comparisonResult = guest._id.toString() === authUser._id.toString();
    console.log(`Comparing guest ID ${guest._id.toString()} with user ID ${authUser._id.toString()}: ${comparisonResult}`);
    return comparisonResult;
  });

  // Additional console logs for debugging
  console.log("selectedEvent:", selectedEvent);
  console.log("selectedEvent.guests:", selectedEvent && selectedEvent.guests);
  console.log("authUser:", authUser);
  console.log("authUser ID:", authUser && authUser._id);
  console.log("isUserSelected:", isUserSelected);
  console.log("selectedEvent.meetingUrl:", selectedEvent && selectedEvent.meetingUrl);
  console.log("Start Time:", selectedEvent.startTime);
  console.log("End Time:", selectedEvent.endTime);
  
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
              Start Time:{" "}
              {selectedEvent.startTime }
            </p>
            <p>
              End Time:{" "}
              {selectedEvent.endTime }
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

