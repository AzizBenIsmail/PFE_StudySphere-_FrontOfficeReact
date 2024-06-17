import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import GlobalContext from "../context/GlobalContext";
import { createEvent, updateEvent, deleteEvent } from "../service/ApiEvents.js";
import Draggable from "react-draggable";
import axios from "axios";
import Cookies from "js-cookie";

const labelsClasses = ["gray", "blue", "red", "purple"];

export default function EventModal() {
  const jwt_token = Cookies.get("jwt_token");

  if (!jwt_token) {
    window.location.replace("/login-page");
  }

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

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
    selectedEvent ? selectedEvent.startTime : null
  );
  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.endTime : null
  );

  const [meetingUrl, setMeetingUrl] = useState(null);
  const [guests, setGuests] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState([]);

  // Use a ref to track whether local storage has been initialized
  const localStorageInitialized = useRef(false);

  useEffect(() => {
    // Initialize selected guests from local storage on component mount
    if (!localStorageInitialized.current) {
      const storedSelectedGuests = localStorage.getItem("selectedGuests");
      if (storedSelectedGuests) {
        setSelectedGuests(JSON.parse(storedSelectedGuests));
      }
      localStorageInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    // Reset selected guests when modal is opened for creating a new event
    if (!selectedEvent) {
      setSelectedGuests([]);
    }
  }, [selectedEvent]);

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const calendarEvent = {
  //     title,
  //     description,
  //     label: selectedLabel,
  //     day: daySelected.valueOf(),
  //     startTime,
  //     endTime,
  //     meetingUrl,
  //     guests: selectedGuests.map((guest) => guest._id),
  //     _id: selectedEvent ? selectedEvent._id : undefined,
  //   };
  //   console.log("Calendar Event:", calendarEvent);
  //   try {
  //     if (selectedEvent) {
  //       await updateEvent(selectedEvent._id, calendarEvent, config);
  //       dispatchCalEvent({
  //         type: "update",
  //         payload: { ...selectedEvent, ...calendarEvent },
  //       });
  //     } else {
  //       const newEvent = await createEvent(calendarEvent, config);
  //       dispatchCalEvent({ type: "push", payload: newEvent });
  //     }
  //     setShowEventModal(false);
  //   } catch (error) {
  //     console.error("Error saving event:", error);
  //   }
  // }

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
      guests: selectedGuests.map((guest) => guest._id),
      _id: selectedEvent ? selectedEvent._id : undefined,
    };

    try {
      if (selectedEvent) {
        await updateEvent(selectedEvent._id, calendarEvent, config);
        dispatchCalEvent({
          type: "update",
          payload: { ...selectedEvent, ...calendarEvent },
        });
      } else {
        const newEvent = await createEvent(calendarEvent, config);
        dispatchCalEvent({ type: "push", payload: newEvent.data });
      }
      setShowEventModal(false);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteEvent(selectedEvent._id, config);
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
    const newMeetingUrl = `https://meet.jit.si/${uniqueRoom}`;
    console.log("New Meeting URL:", newMeetingUrl);
    setMeetingUrl(newMeetingUrl);
  }

  useEffect(() => {
    // Fetch guests from the backend
    
    fetchGuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/user/AllUsers",
        config
      );
      const fetchedGuests = response.data.users; // Extracting the 'users' array
      console.table("Fetched guests:", fetchedGuests); // Log the fetched guests
      setGuests(fetchedGuests);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  console.log("Guests:", guests);
  console.log("Filtered_Guests:", filteredGuests);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    // Check if guests is not empty and defined before filtering
    if (guests && guests.length > 0) {
      const filtered = guests.filter(
        (guest) =>
          guest.nom.toLowerCase().includes(searchInput) || // Change 'name' to 'nom' based on your data
          guest.prenom.toLowerCase().includes(searchInput) || // Add this line for filtering by 'prenom' if applicable
          guest.email.toLowerCase().includes(searchInput) // Add this line for filtering by 'email'
      );
      setFilteredGuests(filtered);
    } else {
      console.error("Guests is empty or undefined:", guests);
    }
  };

  console.log("Guests:", guests);
  console.log("FilteredGuests:", filteredGuests);

  const handleAddGuest = (guest) => {
    // Check if the guest is already selected
    const isGuestSelected = selectedGuests.some(
      (selectedGuest) => selectedGuest._id === guest._id
    );

    // If the guest is not already selected, add them to the list of selected guests
    if (!isGuestSelected) {
      setSelectedGuests([...selectedGuests, guest]);
    } else {
      // If the guest is already selected, you may want to handle this scenario
      // For example, you can remove the guest from the list of selected guests
      // setSelectedGuests(selectedGuests.filter((selectedGuest) => selectedGuest._id !== guest._id));
      console.log("Guest is already selected.");
    }
  };

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
                  <a
                    href={meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {meetingUrl}
                  </a>
                </div>
              )}
              <span>Add Guests:</span>
              <input
                type="text"
                name="guests"
                placeholder="Search for guests..."
                value={searchInput}
                onChange={handleSearchInput}
                className="text-black "
              />

              {/* Render filtered guest suggestions */}
              {searchInput.length > 0 && (
                <div className="guests-container">
                  <ul>
                    {filteredGuests.map((guest) => (
                      <li
                        key={guest._id}
                        onClick={() => handleAddGuest(guest)}
                        style={{ color: "black", cursor: "pointer" }}
                      >
                        {guest.nom}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Render selected guests */}
              <div>
                <h3>Selected Guests:</h3>
                <ul>
                  {selectedGuests.map((guest) => (
                    <li key={guest._id}>
                      {guest.nom} {/* Render the guest's name */}
                    </li>
                  ))}
                </ul>
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
      </Draggable>
    </div>
  );
}
