import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { getAllEvents } from '../../../Services/ApiEvent'; // Assurez-vous que le chemin est correct
import { Link } from "react-router-dom";

const truncateDescription = (description, wordLimit) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return description;
};

export default function Landing() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const jwt_token = localStorage.getItem('jwt_token');

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  const loadEvents = useCallback(async () => {
    try {
      const res = await getAllEvents(config);
      setEvents(res);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }, [config]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {currentEvents.map((event) => (
              <div
                className="pt-6 w-full md:w-4/12 px-4 text-center"
                key={event._id}
              >
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="hover:-mt-4 mt-1 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <Link to={`/landing/EventDetail/${event._id}`}>
                        <img
                          alt="..."
                          className="align-middle border-none max-w-full h-auto rounded-lg"
                          src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${event.image}`}
                          style={{ width: "350px", height: "350px" }}

                        />
                      </Link>
                    </div>
                    <h6 className="text-xl font-semibold">
                      {event.title}
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      {truncateDescription(event.description, 17)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <nav className="block">
              <ul className="flex pl-0 rounded list-none flex-wrap">
                <li>
                  <button
                    onClick={() => paginate(1)}
                    className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === 1 ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                  >
                    <FaChevronLeft />
                    <FaChevronLeft />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === 1 ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                  >
                    <FaChevronLeft />
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === number ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
                    className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === Math.ceil(events.length / eventsPerPage) ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                  >
                    <FaChevronRight />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => paginate(Math.ceil(events.length / eventsPerPage))}
                    className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === Math.ceil(events.length / eventsPerPage) ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                  >
                    <FaChevronRight />
                    <FaChevronRight />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
