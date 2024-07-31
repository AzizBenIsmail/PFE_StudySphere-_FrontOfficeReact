import React, { useEffect, useState } from 'react';
import '../../../assets/styles/detailcours.css';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../../Services/ApiEvent'; // Assurez-vous que le chemin est correct

function Details() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data); // Assurez-vous que la structure de la réponse est correcte
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="pt-1 bg-blueGray-200">
        <div className='title-event-det mt-5'>
          <h1 className="mb-5 text-center">Détail Evénement</h1>
        </div>
        <div className="details-container-custom mb-2 container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="details-content-wrapper flex flex-col lg:flex-row items-start">
                <div className="details-content-custom">
                  <h1 className="details-title-custom">{event.title}</h1>
                  <img
                    className="details-image-custom img-fluid"
                    src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${event.image}`}
                    style={{ width: "550px", height: "320px" }}
                    alt={event.titre} // Utilisez le titre de l'événement pour l'attribut alt
                  />

                </div>
                <div className="details-sidebar-custom mt-16 ml-4 lg:mt-0 lg:ml-8">
                  <div className="details-features-custom">
                    <h3>Details Evénement</h3>
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>description</span><span className='details-blue-custom'>{event.description}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>date</span><span className='details-blue-custom'>{event.date}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>location</span><span className='details-blue-custom'>{event.location}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>
      </section>
    </>
  );
}

export default Details;
