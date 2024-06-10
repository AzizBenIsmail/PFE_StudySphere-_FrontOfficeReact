// import React, {
//   useState,
//   useEffect,
//   useReducer,
//   useMemo,
// } from "react";
// import GlobalContext from "./GlobalContext";
// import dayjs from "dayjs";
// import { getEvents } from 'Services/ApiEvents';

// function savedEventsReducer(state, { type, payload }) {
//   switch (type) {
//     case "push":
//       return [...state, payload];
//     case "update":
//       console.table(payload);
//       return state.map((evt) => (evt._id === payload._id ? payload : evt));
//     case "delete":
//       return state.filter((evt) => evt._id !== payload._id);
//     default:
//       throw new Error();
//   }
// }

// // function savedEventsReducer(state, { type, payload }) {
// //   switch (type) {
// //     case "push":
// //       return [...state, payload];
// //     case "update":
// //       return state.map((evt) =>
// //         evt.id === payload.id ? payload : evt
// //       );
// //     case "delete":
// //       return state.filter((evt) => evt.id !== payload.id);
// //     default:
// //       throw new Error();
// //   }
// // }
// async function initEvents() {
//   try {
//     // Fetch events from the database using the getEvents function
//     const events = await getEvents();
//     console.log('Fetched events:', events);
//     return events;
//   } catch (error) {
//     console.error('Error fetching events from the database:', error);
//     return []; // Return an empty array in case of an error
//   }
// }

// export default function ContextWrapper(props) {
//   const [monthIndex, setMonthIndex] = useState(dayjs().month());
//   const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
//   const [daySelected, setDaySelected] = useState(dayjs());
//   const [showEventModal, setShowEventModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [labels, setLabels] = useState([]);
//   const [savedEvents, dispatchCalEvent] = useReducer(
//     savedEventsReducer,
//     [],
//     initEvents
//   );

//   console.log('savedEvents:', savedEvents);

  
//   const filteredEvents = useMemo(() => {
//     return savedEvents.filter((evt) =>
//       labels
//         .filter((lbl) => lbl.checked)
//         .map((lbl) => lbl.label)
//         .includes(evt.label)
//     );
//   }, [savedEvents, labels]);

//   // const filteredEvents = useMemo(() => {
//   //   if (!savedEvents || !Array.isArray(savedEvents)) return []; // Check if savedEvents is truthy and an array
//   //   return savedEvents.filter((evt) =>
//   //     labels
//   //       .filter((lbl) => lbl.checked)
//   //       .map((lbl) => lbl.label)
//   //       .includes(evt.label)
//   //   );
//   // }, [savedEvents, labels]);

//   useEffect(() => {
//     localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
//   }, [savedEvents]);

//   useEffect(() => {
//     setLabels((prevLabels) => {
//       return [...new Set(savedEvents.map((evt) => evt.label))].map(
//         (label) => {
//           const currentLabel = prevLabels.find(
//             (lbl) => lbl.label === label
//           );
//           return {
//             label,
//             checked: currentLabel ? currentLabel.checked : true,
//           };
//         }
//       );
//     });
//   }, [savedEvents]);

//   useEffect(() => {
//     if (smallCalendarMonth !== null) {
//       setMonthIndex(smallCalendarMonth);
//     }
//   }, [smallCalendarMonth]);

//   useEffect(() => {
//     if (!showEventModal) {
//       setSelectedEvent(null);
//     }
//   }, [showEventModal]);
//   useEffect(() => {
//     console.log("Selected Event in ContextWrapper:", selectedEvent);
//   }, [selectedEvent]);
  
//   function updateLabel(label) {
//     setLabels(
//       labels.map((lbl) => (lbl.label === label.label ? label : lbl))
//     );
//   }

//   return (
//     <GlobalContext.Provider
//       value={{
//         monthIndex,
//         setMonthIndex,
//         smallCalendarMonth,
//         setSmallCalendarMonth,
//         daySelected,
//         setDaySelected,
//         showEventModal,
//         setShowEventModal,
//         dispatchCalEvent,
//         selectedEvent,
//         setSelectedEvent,
//         savedEvents,
//         setLabels,
//         labels,
//         updateLabel,
//         filteredEvents,
//       }}
//     >
//       {props.children}
//     </GlobalContext.Provider>
//   );
// }


import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { getEvents } from 'Services/ApiEvents';

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "init":
      return payload; // Initialize savedEvents with fetched events
    case "push":
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

  console.log('savedEvents:', savedEvents);

  const fetchEvents = async () => {
    try {
      // Fetch events from the database using the getEvents function
      const events = await getEvents();
      console.log('Fetched events:', events);
      dispatchCalEvent({ type: 'init', payload: events }); // Dispatch the fetched events
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error('Error fetching events from the database:', error);
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
  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
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
