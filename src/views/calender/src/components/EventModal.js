import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { FiMove } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FiPieChart } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);


    console.log("Selected Event in EventModal:", selectedEvent);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
;

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  console.log(labelsClasses);

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl h-modal">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            <FiMove />
          </span>
          <div>
            {selectedEvent && (
              <FiTrash2
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="text-gray-600 cursor-pointer"
              />
            )}
            <button onClick={() => setShowEventModal(false)}>
              <FiX className="text-gray-400" />
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
            <div className="flex items-center ">
              <span className="flex items-center text-gray-400">
                <span className="mr-3">
                  <FiClock />
                </span>
                <span>Schedule</span>
              </span>
              <p className="ml-4">{daySelected.format("dddd, MMMM DD")}</p>
            </div>
            <br />
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-gray-400">
                <span className="mr-3">
                  <FiPieChart />
                </span>
                Segment
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                required
                className="ml-4 pt-3 border-0 text-black pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <br />
            <FiBookmark className="text-gray-400" />
            <div className="flex">
  {labelsClasses.map((lblClass, i) => (
    <span
      key={i}
      onClick={() => setSelectedLabel(lblClass)}
      className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
    >
      {selectedLabel === lblClass && (
        <span className="text-white text-sm">
          <FiCheck />
        </span>
      )}
    </span>
  ))}
</div>

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
    </div>
  );
}
