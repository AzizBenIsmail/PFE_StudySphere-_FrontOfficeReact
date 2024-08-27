import React, { useState, useEffect, useCallback } from 'react';
import { getAllEvents, createEvent, deleteEvent } from '../../../Services/ApiEvent';

export default function Event() {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  const fetchEvents = useCallback(async () => {
    try {
      const data = await getAllEvents();
      setFilteredEvents(data);
    } catch (err) {
      setError(err.message || "Erreur lors de la récupération des événements.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('description', newEvent.description);
    formData.append('date', newEvent.date);
    formData.append('location', newEvent.location);

    if (image !== undefined) {
      formData.append("image", image, `${newEvent.title}.png`);
    }

    try {
      await createEvent(formData);
      setNewEvent({ title: '', description: '', date: '', location: '' });
      setImage(null);
      setShowForm(false);
      await fetchEvents();
    } catch (err) {
      setError(err.message || "Erreur lors de la création de l'événement.");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      await fetchEvents();
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression de l'événement.");
    }
  };

  const handlechangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-white">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-white">Événements</h3>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Annuler' : 'Créer un événement'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4">
          <h4 className="font-semibold text-white mb-2">Ajouter un nouvel événement</h4>
          <form onSubmit={handleCreateEvent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Titre"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
                <input
                  type="text"
                  placeholder="Lieu"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
                <input
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="image_user"
                  type="file"
                  name="image_user"
                  onChange={(e) => handlechangeFile(e)}
                  aria-label="image_user"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            >
              Créer l'événement
            </button>
          </form>
        </div>
      )}

      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
          <tr>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
              Image
            </th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
              Titre
            </th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
              Description
            </th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
              Date
            </th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
              Lieu
            </th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {filteredEvents.map((event) => (
            <tr key={event._id}>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                <img
                  alt="UserImage"
                  src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${event.image}`}
                  style={{ width: '80px', height: '80px' }}
                />
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                {event.title}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                {event.description}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                {event.location}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
