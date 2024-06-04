import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "./context/GlobalContext";
import UserEventModal from "./components/UserEventModal"; // Create a separate EventModal for users
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import { getMonth } from "./util";
import axios from 'axios';


export default function UserCalendar() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    // Fetch all events from the backend
    fetchEvents();
 
  }, []);

 

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/calendar/events');
  
      if (!response.status === 200) {
        throw new Error('Failed to fetch events');
      }
  
      setEvents(response.data);
      
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  

  return (
    <React.Fragment>
      {showEventModal && <UserEventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} events={events} />
        </div>
      </div>
    </React.Fragment>
  );
}
