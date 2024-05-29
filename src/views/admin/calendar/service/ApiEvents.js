// services/ApiEvents.js
import axios from 'axios';

const apiURL = 'http://localhost:5000/calendar/events';  // Assuming your backend API endpoint for events is at this URL

export async function getEvents() {
    try {
        const response = await axios.get(apiURL);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

export async function createEvent(eventData) {
    try {
        const response = await axios.post(apiURL, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

export async function updateEvent(id, eventData) {
    try {
        const response = await axios.put(`${apiURL}/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
}

export async function deleteEvent(id) {
    try {
        const response = await axios.delete(`${apiURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}