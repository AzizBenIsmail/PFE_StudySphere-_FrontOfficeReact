import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../../../assets/styles/detailcours.css';
import { Link, useParams } from 'react-router-dom';
import { desinscription, getFormationById, inscription, feedback } from '../../../Services/ApiFormation';
import { RiStarSLine, RiStarSFill } from "react-icons/ri";
import { getFavoris, addFavori, removeFavori } from '../../../Services/ApiFav';
import { getUserAuth } from '../../../Services/Apiauth';
import { Puff } from "react-loader-spinner";
import ReactStars from "react-rating-stars-component";

function Details() {
  const jwt_token = localStorage.getItem('jwt_token');
  const param = useParams();
  const [isFilled, setIsFilled] = useState(false);
  const [favoriId, setFavoriId] = useState(null);
  const [userInscriptions, setUserInscriptions] = useState([]);
  const [feedbackScore, setFeedbackScore] = useState(0);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false); // State to track if feedback has been submitted

  const isUserEnrolled = (formationId) => {
    return userInscriptions.includes(formationId);
  };

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  const [formation, setFormation] = useState(null);
  const [user, setUser] = useState(null);


  const loadFormations = useCallback(async () => {
    try {
      const res = await getFormationById(param.id, config);
      if (res.data && res.data.formation) {
        setFormation(res.data.formation);
        // Check if user has already submitted feedback
        if (res.data.formation.feedback.some(f => f.userId === user)) {
          setHasSubmittedFeedback(true);
        }
      } else {
        console.error('Error: Formation data is missing in the response');
      }
    } catch (error) {
      console.error('Error loading formations:', error);
    }
  }, [param.id, config, user]);

  const checkFavori = useCallback(async () => {
    try {
      const favoris = await getFavoris(config);
      const foundFavori = favoris.find(favori => favori.formationId === param.id);
      if (foundFavori) {
        setIsFilled(true);
        setFavoriId(foundFavori._id);
      }
    } catch (error) {
      console.error('Error checking favoris:', error);
    }
  }, [param.id, config]);

  const loadUserInscriptions = useCallback(async () => {
    try {
      const res = await getUserAuth(config);
      setUserInscriptions(res.data.user.inscriptions);
      setUser(res.data.user._id);
    } catch (error) {
      console.error("Error loading user inscriptions:", error);
    }
  }, [config]);

  useEffect(() => {
    loadFormations();
    checkFavori();
    loadUserInscriptions();
  }, [loadFormations, loadUserInscriptions, checkFavori]);

  if (!formation) {
    return (
      <div className="spinner-wrapper">
        <Puff
          visible={true}
          height="200"
          width="200"
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${dayName} ${day} ${month} ${year} at ${hours}:${minutes}`;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour(s) and ${mins} minute(s)`;
  };

  const toggleIcon = async () => {
    try {
      if (isFilled) {
        await removeFavori(favoriId, config);
        setFavoriId(null);
      } else {
        const newFavori = await addFavori({ formationId: param.id }, config);
        setFavoriId(newFavori._id);
      }
      setIsFilled(!isFilled);
    } catch (error) {
      console.error('Error toggling favori:', error);
    }
  };

  const handleDesinscription = async (id) => {
    try {
      const response = await desinscription(id, config);
      console.log('Desinscription successful:', response);
      loadUserInscriptions();
    } catch (error) {
      console.error('Error during desinscription:', error);
    }
  };

  const handleInscription = async (id) => {
    try {
      const response = await inscription(id, config);
      console.log('Inscription successful:', response);
      loadUserInscriptions();
    } catch (error) {
      console.error('Error during inscription:', error);
    }
  };

  const handleFeedbackChange = (newRating) => {
    setFeedbackScore(newRating);
  };

  const handleFeedbackSubmit = async () => {
    try {
      if (hasSubmittedFeedback) {
        console.log('Vous avez déjà soumis un avis pour cette formation.');
        return;
      }
      const response = await feedback(param.id, feedbackScore, config);
      console.log('Feedback submitted:', response);
      setHasSubmittedFeedback(true); // Set state to true after feedback submission
      loadFormations();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <>
      <section className="pt-1 bg-blueGray-200">
        <div className='title-event-det mt-5'>
          <h1 className="mb-5 text-center">Détails des cours</h1>
        </div>
        <div className="details-container-custom mb-2 container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="details-content-wrapper flex flex-col lg:flex-row items-start">
                <div className="details-content-custom">
                  <h1 className="details-title-custom">{formation.titre}</h1>
                  <div className="details-header-custom">
                    <div className="details-category-custom">
                      <span>Category</span>
                      <p>{formation.sujetInteret}</p>
                    </div>
                    <div className="details-category-custom">
                      <span>Nombre D'Inscriptions</span>
                      <p>{formation.participants.length}</p>
                    </div>
                    <div className="details-group-custom" onClick={toggleIcon} style={{ cursor: 'pointer' }}>
                      {isFilled ? <RiStarSFill size={40}/> : <RiStarSLine size={40}/>}
                    </div>
                  </div>
                  <img
                    className="details-image-custom img-fluid"
                    src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                    style={{ width: "550px", height: "320px" }}
                    alt="React Course"
                  />
                  {formation.centre && (
                    <div className='details-center-custom'>
                      <Link to={`/profile/ProfileCenter/${formation.centre._id}`}>
                        <img
                          alt="..."
                          className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                          src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.centre.image_user}`}
                          style={{ width: "50px", height:'50px'  }}
                        />
                      </Link>
                      <p className="mt-3">{formation.centre.nom}</p>
                    </div>
                  )}
                  <p className="details-description-custom">{formation.description}</p>
                  <div className='details-instructor-custom'>
                    <Link to={`/profile/ProfileFormateur/${formation.formateur._id}`}>
                      <img
                        alt="..."
                        className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                        src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                        style={{ width: "70px" }}
                      />
                    </Link>
                    <span>{formation.formateur.nom} {formation.formateur.prenom} (IT Engineer)</span>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="feedback">Rate this formation:</label>
                    <ReactStars
                      count={5}
                      onChange={handleFeedbackChange}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <button
                      className="btn btn-success mt-2"
                      onClick={handleFeedbackSubmit}
                      disabled={hasSubmittedFeedback} // Disable button if feedback has already been submitted
                    >
                      Submit Feedback
                    </button>
                  </div>
                  <div className="mt-3">
                    <h4>Average Rating: {formation.averageFeedback.toFixed(2)}/10</h4>
                  </div>
                </div>
                <div className="details-sidebar-custom mt-16 ml-4 lg:mt-0 lg:ml-8">
                  <div className="details-features-custom">
                    <h3>Caractéristiques du cours</h3>
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Competences</span><span className='details-blue-custom'>{formation.competences}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>jours</span><span className='details-blue-custom'>{formation.jours}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>niveau requis</span><span className='details-blue-custom'>{formation.niveauRequis}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>typeContenu</span><span className='details-blue-custom'>{formation.typeContenu}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Domaine</span><span className='details-blue-custom'>{formation.sujetInteret}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Date Debut</span><span className='details-blue-custom'>{formatDate(formation.dateDebut)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Date Fin</span><span className='details-blue-custom'>{formatDate(formation.dateFin)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Durée</span><span className='details-blue-custom'>{formatDuration(formation.duree)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Method</span><span className='details-blue-custom'>{formation.styleEnseignement}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Engagement requis</span><span className='details-blue-custom'>{formation.niveauDengagementRequis}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Niveau de compétence</span><span className='details-blue-custom'>{formation.niveauDeDifficulte}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Emplacement</span><span className='details-blue-custom'>{formation.emplacement}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Language</span><span className='details-blue-custom'>{formation.langue}</span>
                      </li>
                    </ul>
                    <h5 className='details-price-custom'>Prix du cours: <span className='details-price-value-custom'>{formation.Prix} dt</span></h5>
                    <div className="mt-auto">
                      {!isUserEnrolled(formation._id) ? (
                        <button
                          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => handleInscription(formation._id, config)}
                        >
                          Inscrivez-vous maintenant
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => handleDesinscription(formation._id)}
                        >
                          Annulez votre inscription
                        </button>
                      )}
                    </div>
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
