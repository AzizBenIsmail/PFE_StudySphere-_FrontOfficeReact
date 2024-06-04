import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import '../../css/detailcours.css';
import '../../../assets/styles/detailcours.css'
import Cookies from 'js-cookie'
import { useHistory, useParams } from 'react-router-dom'
import { getUserAuth } from '../../../Services/Apiauth'
import { getFormationById } from '../../../Services/ApiFormation'

function Details() {
  const [user, setUser] = useState(null)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jwt_token) {
          const config = {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          }
          const res = await getUserAuth(config)
            if (res.data.user.role === 'admin') {
              history.replace('/admin/')
            }
            return res.data.user
        } else {
          history.replace('/')
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [history, jwt_token]) // Inclure history et jwt_token dans le tableau de dépendances

  const [formation, setFormation] = useState([])

  const loadFormations = useCallback(async () => {
    try {
      const res = await getFormationById(param.id, config)
      setFormation(res.data.formation)
      console.log(res)
    } catch (error) {
      console.error('Error loading formations:', error)
    }
  }, [config])

  useEffect(() => {
    loadFormations()
  }, [loadFormations])

  return (
    <>
      {/* <Header /> */}
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
                 style={{ width: "450px", height: "320px" }}
                 alt="React Course"
                 onMouseEnter={(e) =>
                   (e.currentTarget.style.boxShadow =
                     "0px 0px 30px 0px rgba(0,0,0,0.3)")
                 }
                 onMouseLeave={(e) =>
                   (e.currentTarget.style.boxShadow = "none")
                 }/>
            <div className='details-center-custom'>
              <img                  src={`http://localhost:5000/images/Formations/${formation.image_Formation}`}
                                    alt="Center Course" />
              <p className="mt-3">{formation.titre}</p>
            </div>
            <p className="details-description-custom">
              Our React course offers comprehensive instruction for beginners and experienced developers alike.
              Learn to build dynamic user interfaces with hands-on projects and expert guidance.
              Covering core concepts, state management, routing, hooks, and more, this course equips you with essential skills for modern web development.
              Gain practical insights and create a portfolio of real-world projects to showcase your proficiency in React.
              Start mastering React today and elevate your career in web development.
            </p>
              <div className='details-instructor-custom'>
                <img src={require("../../../assets/img/reactjs.jpeg").default} alt="Instructor" className="instructor-image" />
                <span>Samira Ben Ali (IT Engineer)</span>
              </div>
          </div>
          <div className="details-sidebar-custom col-lg-4 col-md-12">
            <div className="details-features-custom">
              <h3>Course Features</h3>
              <ul>
                <li><span>Date</span><span className='details-blue-custom'>24/05/2024</span></li>
                <hr />
                <li><span>Method</span><span className='details-blue-custom'>Online</span></li>
                <hr />
                <li><span>Duration</span><span className='details-blue-custom'>Short term</span></li>
                <hr />
                <li><span>Skill level</span><span className='details-blue-custom'>Beginner</span></li>
                <hr />
                <li><span>Certification</span><span className='details-blue-custom'>Available</span></li>
                <hr />
                <li><span>Language</span><span className='details-blue-custom'>French</span></li>
                <hr />
              </ul>
              <h5 className='details-price-custom'>Course price: <span className='details-price-value-custom'>400 dt</span></h5>
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
    </>
  );
}

export default Details;
