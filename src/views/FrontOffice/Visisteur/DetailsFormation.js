import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../../../assets/styles/detailcours.css';
import { Link, useParams } from 'react-router-dom';
import { getFormationById } from '../../../Services/ApiFormation';
import { RiStarSLine } from "react-icons/ri";
import AuthNavbar from '../../../components/Navbars/AuthNavbar'

function Details() {
  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');
  const param = useParams();

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


  useEffect(() => {
    loadFormations();
  }, [loadFormations]);

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
    window.location.replace(`/auth/login`);

  };

  return (
    <>
      <AuthNavbar/>
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-55">
        <div className="absolute top-0 w-full h-full bg-center bg-cover">
          <span id="blackOverlay" className="w-full h-full absolute opacity-100 bg-bleu-500"></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12 pt-12 mt-2">
                <h1 className="text-white font-semibold text-5xl">
                  Your story starts with us.
                </h1>
                <p className="mt-4 text-lg text-blueGray-200">
                  "Chaque formation est une passerelle vers de nouvelles opportunités.
                  Inscris-toi aujourd'hui et dessine ton avenir avec assurance."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="pt-1 bg-blueGray-200">
        <div className='title-event-det mt-5'>
          <h1 className="mb-5 text-center">Caractéristiques du cours</h1>
        </div>
        <div className="details-container-custom container ">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="details-content-wrapper flex flex-col lg:flex-row items-start">
                <div className="details-content-custom">
                  <h1 className="details-title-custom ml-3">{formation.titre}</h1>
                  <div className="details-header-custom">
                    <div className="details-category-custom">
                      <span>Category</span>
                      <p>{formation.sujetInteret}</p>
                    </div>
                    <div className="details-group-custom" onClick={toggleIcon} style={{ cursor: 'pointer' }}>
                  <RiStarSLine size={40}/>
                    </div>
                  </div>
                  <img
                    className="details-image-custom img-fluid"
                    src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                    // style={{ width: "100%", height: "auto" }}
                    alt="React Course"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = "0px 0px 30px 0px rgba(0,0,0,0.3)")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")}
                  />
                  {formation.centre && (
                    <div className='details-center-custom'>
                      <Link to={`/profile/ProfileCenter/${formation.centre._id}`}>
                        <img
                          alt="..."
                          className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                          src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.centre.image_user}`}

                          style={{ width: "50px" , height:'50px'  }}

                          onMouseEnter={(e) =>
                            (e.currentTarget.style.boxShadow = "0px 0px 30px 0px rgba(0,0,0,0.3)")}
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
                    <Link to={`/profile/ProfileFormateur/${formation.formateur._id}`}>
                      <img
                        alt="..."
                        className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                        src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                        style={{ width: "70px" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.boxShadow = "0px 0px 30px 0px rgba(0,0,0,0.3)")}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.boxShadow = "none")}
                      />
                    </Link>
                    <span>{formation.formateur.nom} {formation.formateur.prenom} (IT Engineer)</span>
                  </div>
                </div>
                <div className="details-sidebar-custom mt-16  ml-3 lg:mt-0 lg:ml-8">
                  <div className="details-features-custom">
                    <h3>Caractéristiques du cours</h3>
                    <ul>
                      <li><span>Competences</span><span className='details-blue-custom'>{formation.competences}</span>
                      </li>
                      <hr/>
                      <li><span>jours</span><span className='details-blue-custom'>{formation.jours}</span></li>
                      <hr/>
                      <li><span>niveau requis</span><span
                        className='details-blue-custom'>{formation.niveauRequis}</span></li>
                      <hr/>
                      <li><span>typeContenu</span><span className='details-blue-custom'>{formation.typeContenu}</span>
                      </li>
                      <hr/>
                      <li><span>Domaine</span><span className='details-blue-custom'>{formation.sujetInteret}</span></li>
                      <hr/>
                      <li><span>Date Debut</span><span
                        className='details-blue-custom'>{formatDate(formation.dateDebut)}</span></li>
                      <hr/>
                      <li><span>Date Fin</span><span
                        className='details-blue-custom'>{formatDate(formation.dateFin)}</span></li>
                      <hr/>
                      <li><span>Durée</span><span
                        className='details-blue-custom'>{formatDuration(formation.duree)}</span></li>
                      <hr/>
                      <li><span>Method</span><span className='details-blue-custom'>{formation.styleEnseignement}</span>
                      </li>
                      <hr/>
                      <li><span>Engagement requis</span><span
                        className='details-blue-custom'>{formation.niveauDengagementRequis}</span></li>
                      <hr/>
                      <li><span>Niveau de compétence</span><span
                        className='details-blue-custom'>{formation.niveauDeDifficulte}</span></li>
                      <hr/>
                      <li><span>Emplacement</span><span className='details-blue-custom'>{formation.emplacement}</span>
                      </li>
                      <hr/>
                      <li><span>Language</span><span className='details-blue-custom'>{formation.langue}</span></li>
                      <hr/>
                    </ul>
                    <h5 className='details-price-custom'>Prix du cours: <span
                      className='details-price-value-custom'>{formation.Prix} dt</span></h5>
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => window.location.replace(`/auth`)}
                    >
                      Inscrivez-vous maintenant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

  export default Details;
