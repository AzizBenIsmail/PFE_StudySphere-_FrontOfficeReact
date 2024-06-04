

import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { getAllEvents } from '../service/ApiEvents';
import Cookies from 'js-cookie';

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "init":
      return payload; // Initialize savedEvents with fetched events
    case "push":
      console.log("Event added:", payload);
      return [...state, payload];
    case "update":
      console.table(payload);
      return state.map((evt) => (evt._id === payload._id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt._id !== payload._id);
    default:
      throw new Error();
  }
}

export default function ContextWrapper(props) {
  //const jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODg5OWI0ZDViODAzM2UxY2M1MTNiMyIsImlhdCI6MTY4Njc1MzQ4NCwiZXhwIjoxNjg2NzYwNjg0fQ.KPnsNPjL0PS3oyZ5l3mMC9GUc0ymgheVr-FYt_31pN0";
  const jwt_token = Cookies.get('jwt_token')
  //console.log('JWT Token in hook:', jwt_token);


  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);
  //console.log('Config:', config);
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [], // Initialize with an empty array
    savedEvents => savedEvents // No need for initialization function
  );
  const [loading, setLoading] = useState(true); // Add loading state

  //console.log('savedEvents:', savedEvents);

  const fetchEvents = async () => {
    try {
      
      // Fetch events from the database using the getEvents function
      const events = await getAllEvents(config);
      //console.log('Fetched events:', events);
      dispatchCalEvent({ type: 'init', payload: events }); // Dispatch the fetched events
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      //console.error('Error fetching events from the database:', error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when component mounts
  }, []);

  

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  useEffect(() => {
    console.log("Selected Event in ContextWrapper:", selectedEvent);
  }, [selectedEvent]);
  
  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }
  
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

