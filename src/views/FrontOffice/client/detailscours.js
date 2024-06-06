import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../../../assets/styles/detailcours.css';
import Cookies from 'js-cookie';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getFormationById } from '../../../Services/ApiFormation';
import { RiStarSLine, RiStarSFill } from "react-icons/ri";
import { getFavoris, addFavori, removeFavori } from '../../../Services/ApiFav';

function Details() {
  const jwt_token = Cookies.get('jwt_token');
  const history = useHistory();
  const param = useParams();
  const [isFilled, setIsFilled] = useState(false);
  const [favoriId, setFavoriId] = useState(null);

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  const [formation, setFormation] = useState(null);

  const loadFormations = useCallback(async () => {
    try {
      const res = await getFormationById(param.id, config);
      if (res.data && res.data.formation) {
        setFormation(res.data.formation);
        console.log(res.data.formation);
      } else {
        console.error('Error: Formation data is missing in the response');
      }
    } catch (error) {
      console.error('Error loading formations:', error);
    }
  }, [param.id, config]);

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

  useEffect(() => {
    loadFormations();
    checkFavori();
  }, [loadFormations, checkFavori]);

  if (!formation) {
    return <div>Loading...</div>;
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

  return (
    <>
      {/* <Header /> */}
      <section className="pt-1 bg-blueGray-200 ">
        <div className='title-event-det mt-5 '>
          <h1 className="mb-5 text-center"> Détails des cours</h1>
        </div>
        <div className="details-container-custom container mt-20">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="details-content-wrapper d-flex align-items-start">
                <div className="details-content-custom">
                  <h1 className="details-title-custom">{formation.titre}</h1>
                  <div className="details-header-custom">
                    <div className="details-reviews-custom">
                      <span>Reviews (15 reviews)</span>
                    </div>
                    <div className="details-category-custom">
                      <span>Category</span>
                      <p>{formation.sujetInteret}</p>
                    </div>
                    <div className="details-group-custom">
                      <p>Group 20 people</p>
                    </div>
                    <div className="details-group-custom" onClick={toggleIcon} style={{ cursor: 'pointer' }}>
                      {isFilled ? <RiStarSFill size={40} /> : <RiStarSLine size={40} />}
                    </div>
                  </div>
                  <img className="details-image-custom img-fluid ml-15"
                       src={`http://localhost:5000/images/Formations/${formation.image_Formation}`}
                       style={{ width: "550px", height: "320px" }}
                       alt="React Course"
                       onMouseEnter={(e) =>
                         (e.currentTarget.style.boxShadow =
                           "0px 0px 30px 0px rgba(0,0,0,0.3)")}
                       onMouseLeave={(e) =>
                         (e.currentTarget.style.boxShadow = "none")}
                  />
                  {formation.centre && (
                    <div className='details-center-custom'>
                      <Link
                        to={`/profile/ProfileCenter/${formation.centre._id}`}
                      >
                        <img
                          alt="..."
                          className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                          src={`http://localhost:5000/images/Users/${formation.centre.image_user}`}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.boxShadow =
                              "0px 0px 30px 0px rgba(0,0,0,0.3)")}
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.boxShadow = "none")}
                        />
                      </Link>
                      <p className="mt-3">{formation.centre.nom}</p>
                    </div>
                  )}
                  <p className="details-description-custom">
                    {formation.description}
                  </p>
                  <div className='details-instructor-custom'>
                    <Link
                      to={`/profile/ProfileFormateur/${formation.formateur._id}`}
                    >
                      <img
                        alt="..."
                        className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                        src={`http://localhost:5000/images/Users/${formation.formateur.image_user}`}
                        style={{ width: "70px" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.boxShadow =
                            "0px 0px 30px 0px rgba(0,0,0,0.3)")}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.boxShadow = "none")}
                      />
                    </Link>
                    <span>{formation.formateur.nom} {formation.formateur.prenom} (IT Engineer)</span>
                  </div>
                </div>
                <div className="details-sidebar-custom">
                  <div className="details-features-custom">
                    <h3>Course Features</h3>
                    <ul>
                      <li><span>Competences</span><span className='details-blue-custom'>{formation.competences}</span></li>
                      <hr />
                      <li><span>jours</span><span className='details-blue-custom'>{formation.jours}</span></li>
                      <hr />
                      <li><span>niveauRequis</span><span className='details-blue-custom'>{formation.niveauRequis}</span></li>
                      <hr />
                      <li><span>typeContenu</span><span className='details-blue-custom'>{formation.typeContenu}</span></li>
                      <hr />
                      <li><span>Domaine</span><span className='details-blue-custom'>{formation.sujetInteret}</span></li>
                      <hr />
                      <li><span>Date Debut</span><span className='details-blue-custom'>{formatDate(formation.dateDebut)}</span></li>
                      <hr />
                      <li><span>Date Fin</span><span className='details-blue-custom'>{formatDate(formation.dateFin)}</span></li>
                      <hr />
                      <li><span>Duration</span><span className='details-blue-custom'>{formatDuration(formation.duree)}</span></li>
                      <hr />
                      <li><span>Method</span><span className='details-blue-custom'>{formation.styleEnseignement}</span></li>
                      <hr />
                      <li><span>Engagement Required</span><span className='details-blue-custom'>{formation.niveauDengagementRequis}</span></li>
                      <hr />
                      <li><span>Skill level</span><span className='details-blue-custom'>{formation.niveauDeDifficulte}</span></li>
                      <hr />
                      <li><span>Emplacement</span><span className='details-blue-custom'>{formation.emplacement}</span></li>
                      <hr />
                      <li><span>Language</span><span className='details-blue-custom'>{formation.langue}</span></li>
                      <hr />
                    </ul>
                    <h5 className='details-price-custom'>Course price: <span className='details-price-value-custom'>{formation.Prix} dt</span></h5>
                    <button className="details-btn-register-custom">Register now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='details-suggestions-custom container'>
          <h3 className="text-center">Other similar courses</h3>
          <div className='details-course-cards-custom row'>
            <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
              <div className='details-card-content-custom'>
                <span className='details-course-tag-custom'>Web development</span>
                <h4>Learn Full Stack NodeJs</h4>
                <button className='details-enroll-button-custom-det'>Enroll Now</button>
                <div className='marqua'> azer</div>
              </div>
            </div>
            <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
              <div className='details-card-content-custom'>
                <span className='details-course-tag-custom'>Web development</span>
                <h4>MongoDB Course</h4>
                <button className='details-enroll-button-custom-det'>Enroll Now</button>
                <div className='marqua'> azer</div>
              </div>
            </div>
            <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
              <div className='details-card-content-custom'>
                <span className='details-course-tag-custom'>Web development</span>
                <h4>Discover Angular</h4>
                <button className='details-enroll-button-custom-det'>Enroll Now</button>
                <div className='marqua'> azer</div>
              </div>
            </div>
            <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
              <div className='details-card-content-custom'>
                <span className='details-course-tag-custom'>Web development</span>
                <h4>Discover Angular</h4>
                <button className='details-enroll-button-custom-det'>Enroll Now</button>
                <div className='marqua'> azer</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Details;
