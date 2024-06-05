import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import '../../css/detailcours.css';
import '../../../assets/styles/detailcours.css'
import Cookies from 'js-cookie'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getFormationById } from '../../../Services/ApiFormation'

function Details() {
  const jwt_token = Cookies.get('jwt_token')
  const history = useHistory()
  const param = useParams()

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  const [formation, setFormation] = useState(null)

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
    loadFormations()
  }, [loadFormations])

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
  }

  return (
    <>
      {/* <Header /> */}
      <section className="pt-1 bg-blueGray-200 ">

      <div className='title-event-det mt-5 '>
          <h1 className="mb-5 text-center"> Détails des cours</h1>
        </div>
        <div className="details-container-custom container mt-20">
          <div className="row">
            <div className="details-content-custom col-lg-8 col-md-12">
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
                  {/* <Users className="details-icon-custom" /> */}
                  <p>Group 20 people</p>
                </div>
              </div>
              <img className="details-image-custom img-fluid ml-20"
                   src={`http://localhost:5000/images/Formations/${formation.image_Formation}`}
                   style={{ width: "550px", height: "320px" }}
                   alt="React Course"
                   onMouseEnter={(e) =>
                     (e.currentTarget.style.boxShadow =
                       "0px 0px 30px 0px rgba(0,0,0,0.3)")
                   }
                   onMouseLeave={(e) =>
                     (e.currentTarget.style.boxShadow = "none")
                   }/>
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
                          "0px 0px 30px 0px rgba(0,0,0,0.3)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = "none")
                      }
                    />
                  </Link>

                  <p className="mt-3">
                    {formation.centre.nom}</p>
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
                        "0px 0px 30px 0px rgba(0,0,0,0.3)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                  />
                </Link>
                <span>{formation.formateur.nom} {formation.formateur.prenom} (IT Engineer)</span>
              </div>
            </div>
            <div className="details-sidebar-custom col-lg-4 col-md-12">
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
                  <li><span>Date</span><span className='details-blue-custom'>{formatDate(formation.dateDebut)}</span></li>
                  <hr />
                  <li><span>duree</span><span className='details-blue-custom'>{formation.duree}</span></li>
                  <hr />
                  <li><span>Method</span><span className='details-blue-custom'>{formation.styleEnseignement}</span></li>
                  <hr />
                  <li><span>Duration</span><span className='details-blue-custom'>{formation.niveauDengagementRequis}</span></li>
                  <hr />
                  <li><span>Skill level</span><span className='details-blue-custom'>{formation.niveauDeDifficulte}</span></li>
                  <hr />
                  <li><span>Emplacement</span><span className='details-blue-custom'>{formation.emplacement}</span></li>
                  <hr/>
                  <li><span>Language</span><span className='details-blue-custom'>{formation.langue}</span></li>
                  <hr />
                </ul>
                <h5 className='details-price-custom'>Course price: <span className='details-price-value-custom'>{formation.Prix} dt</span></h5>
                <button className="details-btn-register-custom">Register now</button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='details-suggestions-custom container'>
          <h3 className="text-center">Other similar courses</h3>
          <div className='details-course-cards-custom row'>
            <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
              {/*<img src={nodeJsImage} alt='Node.js Course' className="img-fluid" />*/}
              <div className='details-card-content-custom'>
                <span className='details-course-tag-custom'>Web development</span>
                <h4>Learn Full Stack NodeJs</h4>
                <button className='details-enroll-button-custom-det'>Enroll Now</button>
                <div className='marqua'> azer</div>
              </div>
            </div>
            <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
              {/*<img src={mongoDbImage} alt='MongoDB Course' className="img-fluid" />*/}
              <div className='details-card-content-custom'>
                <span className='details-course-tag-custom'>Web development</span>
                <h4>MongoDB Course</h4>
                <button className='details-enroll-button-custom-det'>Enroll Now</button>
                <div className='marqua'> azer</div>
              </div>
            </div>
            <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
              {/*<img src={angularImage} alt='Angular Course' className="img-fluid" />*/}
              <div className='details-card-content-custom'>
                <span className='details-course-tag-custom'>Web development</span>
                <h4>Discover Angular</h4>
                <button className='details-enroll-button-custom-det'>Enroll Now</button>
                <div className='marqua'> azer</div>
              </div>
            </div>
            <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
              {/*<img src={angularImage} alt='Angular Course' className="img-fluid" />*/}
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
