import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { createEvent, updateEvent, deleteEvent } from "../service/ApiEvents.js";
import Draggable from "react-draggable";
import Meeting from '../meeting/Meeting';

const labelsClasses = ["gray", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const [startTime, setStartTime] = useState(
    selectedEvent ? selectedEvent.startTime : ""
  );
  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.endTime : ""
  );
  const [meetingUrl, setMeetingUrl] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      startTime,
      endTime,
      meetingUrl,
      _id: selectedEvent ? selectedEvent._id : undefined,
    };
    try {
      if (selectedEvent) {
        await updateEvent(selectedEvent._id, calendarEvent);
        dispatchCalEvent({
          type: "update",
          payload: { ...selectedEvent, ...calendarEvent },
        });
      } else {
        const newEvent = await createEvent(calendarEvent);
        dispatchCalEvent({ type: "push", payload: newEvent });
      }
      setShowEventModal(false);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteEvent(selectedEvent._id);
      dispatchCalEvent({ type: "delete", payload: selectedEvent });
      setShowEventModal(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }
  function generateUniqueMeetingRoom() {
    return `onlineClassRoom-${Math.random().toString(36).substr(2, 9)}`;
  }

  function handleAddMeeting() {
    const uniqueRoom = generateUniqueMeetingRoom();
    setMeetingUrl(`https://meet.jit.si/${uniqueRoom}`);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <Draggable handle=".drag-handle">
        <form className="bg-white rounded-lg shadow-2xl w-64 md:w-1/2 lg:w-1/4">
          <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <span className="material-icons-outlined text-gray-400 drag-handle">
              drag_handle
            </span>
            <div>
              {selectedEvent && (
                <span
                  onClick={handleDelete}
                  className="material-icons-outlined text-gray-400 cursor-pointer"
                >
                  delete
                </span>
              )}
              <button onClick={() => setShowEventModal(false)}>
                <span className="material-icons-outlined text-gray-400">
                  close
                </span>
              </button>
            </div>
          </header>
          <div className="p-3">
            <div className="grid grid-cols-1/5 items-end gap-y-7">
              <div></div>
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="pt-3 border-0 text-black text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
              />

              <span className="material-icons-outlined text-gray-400">
                segment
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />

              <div>
                <input
                  type="time"
                  name="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="time"
                  name="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className=" ml-40"
                />
              </div>

              <span className="material-icons-outlined text-gray-400">
                bookmark_border
              </span>
              <div className="flex gap-x-2">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass || (
                      <span className="material-icons-outlined text-black text-sm">
                        check
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddMeeting}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
              >
                {meetingUrl ? "Join the meet" : "Add Video Conference"}
              </button>

              {meetingUrl && (
                <div>
                  <a href={meetingUrl} target="_blank" rel="noopener noreferrer">
                    {meetingUrl}
                  </a>
                </div>
              )}
            </div>
          </div>
          <footer className="flex justify-end border-t p-3 mt-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            >
              Save
            </button>
          </footer>
        </form>
      </Draggable>
    </div>
  );
}
