import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import Cookies from 'js-cookie'

import { Link, useParams } from 'react-router-dom'

import { MdEmail, MdShareLocation } from 'react-icons/md'
import { getCentersByDomain, getUserByID } from '../../../Services/ApiUser'
import { HiLanguage } from 'react-icons/hi2'
import { GoGoal } from 'react-icons/go'
import { GiGiftOfKnowledge } from 'react-icons/gi'
import { TailSpin } from 'react-loader-spinner'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { getFormationByIdFormateur } from '../../../Services/ApiFormation'

export default function ProfileFormateur() {
  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])


  const param = useParams()

  const [User, setUser] = useState({})

  useEffect(() => {
    const getUser = async (config) => {
      await getUserByID(param.id, config).then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);
      }).catch((err) => {
        console.log(err);
      });
    };

    getUser(config);

    const interval = setInterval(() => {}, 1000000);

    return () => clearInterval(interval);
  }, [config,param.id ]);

  const [formations, setFormations] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);

  const loadFormations = useCallback(async () => {
    try {
      const res = await getFormationByIdFormateur(param.id, config);
      setFormations(res.data.formations);
    } catch (error) {
      console.error("Error loading formations:", error);
    }
  }, [config,param.id,]);

  useEffect(() => {
    loadFormations();
  }, [loadFormations]);

  const handleNextPage = () => {
    if (endIndex < formations.length - 1) {
      setStartIndex((prevStartIndex) => prevStartIndex + 1);
      setEndIndex((prevEndIndex) => prevEndIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (startIndex > 0) {
      setStartIndex((prevStartIndex) => prevStartIndex - 1);
      setEndIndex((prevEndIndex) => prevEndIndex - 1);
    }
  };

  const displayedFormations = formations.slice(startIndex, endIndex + 1);

  const [centers, setCenters] = useState([]);
  const [startIndexCenter, setStartIndexCenter] = useState(0);
  const [endIndexCenter, setEndIndexCenter] = useState(3);

  const loadCenters = useCallback(async () => {
    try {
      const res = await getCentersByDomain("Developpement", config);
      setCenters(res.data.centers);
    } catch (error) {
      console.error("Error loading formations:", error);
    }
  }, [config]);

  useEffect(() => {
    loadCenters();
  }, [loadCenters]);


  const handleNextPageCenter = () => {
    if (endIndexCenter < centers.length - 1) {
      setStartIndexCenter((prevStartIndex) => prevStartIndex + 1);
      setEndIndexCenter((prevEndIndex) => prevEndIndex + 1);
    }
  };

  const handlePrevPageCenter = () => {
    if (startIndexCenter > 0) {
      setStartIndexCenter((prevStartIndex) => prevStartIndex - 1);
      setEndIndexCenter((prevEndIndex) => prevEndIndex - 1);
    }
  };

  const displayedCenter = centers.slice(startIndexCenter, endIndexCenter + 1);






  return (
    <>
        <section className="relative py-15 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-1 flex justify-center">
                    <div className="relative">
                      {User && User.image_user ? (
                        <img
                          alt="UserImage"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${User.image_user}`}
                        />
                      ) : (
                        <div>
                          <img
                            alt="..."
                            src={require("../../../assets/img/client.png").default}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 sm:mt-0">
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {User && User.Formations ? User.Formations.length : "Aucune_Formation"}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Nbr_Formation
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                         {User && User.centresTravailAssocies ? User.centresTravailAssocies.length : "Aucune_centresTravailAssocies"}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          centresTravailAssocies
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {User && User.Formations ? User.Formations.reduce((total, formation) => total + formation.participants.length, 0) : 'Aucune inscription'}
                      </span>
                        <span className="text-sm text-blueGray-400">Nbr_étudiant</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-4xl  font-semibold leading-normal ml-2 text-blueGray-700 mb-2">
                    {User.nom}
                  </h3>
                  <div className="flex flex-wrap mt-12 justify-center">
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h6 className="text-xl mt-5 font-semibold flex items-center ml-8 ">
                        <MdEmail className="mr-2" style={{ fontSize: "25px" }} />
                        Email
                      </h6>
                      <p className="mt-2 mb-4 text-blueGray-400">{User.email}</p>
                    </div>
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h6 className="text-xl mt-5 font-semibold flex items-center ml-8">
                        <MdShareLocation
                          className="mr-2"
                          style={{ fontSize: "25px" }}
                        />
                        Localisation
                      </h6>
                      <p className="mt-2 mb-4 text-blueGray-400">
                        {User &&
                        User.preferences &&
                        User.preferences.emplacement_actuelle
                          ? User.preferences.emplacement_actuelle
                          : "Non saisire"}
                      </p>
                    </div>
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h5 className="text-xl font-semibold flex items-center ml-8">
                        <HiLanguage
                          className="mr-2"
                          style={{ fontSize: "50px" }}
                        />
                        préférences linguistiques
                      </h5>
                      <p className="mt-2 mb-4 text-blueGray-400">
                        {User &&
                        User.preferences &&
                        User.preferences.preferences_linguistiques
                          ? User.preferences.preferences_linguistiques
                          : "Non saisire"}
                      </p>
                    </div>
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h5 className="text-xl mt-5 font-semibold flex items-center ml-8">
                        <GoGoal className="mr-2" style={{ fontSize: "25px" }} />
                        Domaine
                      </h5>
                      <p className="mt-2 mb-4 text-blueGray-400">
                        {User &&
                        User.preferences &&
                        User.preferences.domaine_actuelle
                          ? User.preferences.domaine_actuelle
                          : "Non saisire"}
                      </p>
                    </div>
                    <div className="w-full lg:w-2/12 px-4 text-center">
                      <h5 className="text-xl font-semibold flex items-center ">
                        <GiGiftOfKnowledge style={{ fontSize: "50px" }} />
                        compétences d'intérêt
                      </h5>
                      <p className="mt-2 mb-4 text-blueGray-400">
                        {User &&
                        User.preferences &&
                        User.preferences.competences_dinteret
                          ? User.preferences.competences_dinteret
                          : "Non saisire"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-10 py-3 border-t border-blueGray-200 ">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg\:w-auto px-4">
                        <p className="text-lg leading-relaxed text-blueGray-700">
                          Les Formations de {User.nom}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    {displayedFormations.length === 0 ? (
                      <tr>
                        <td
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
                          colSpan="22"
                        >
                          <TailSpin
                            visible={true}
                            width="50"
                            height="50"
                            color="#4fa94d"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                          Aucune formation trouvée.
                        </td>
                      </tr>
                    ) : (
                      <>
                        <button
                          onClick={handlePrevPage}
                          disabled={startIndex === 0}
                          className=" bg-blue-500  rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.boxShadow =
                              "0px 0px 30px 0px rgba(0,0,0,0.3)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.boxShadow = "none")
                          }
                        >
                          <FaChevronLeft style={{ fontSize: "40px" }} />
                        </button>
                        {displayedFormations.map((formation) => (
                          <div
                            className=" w-full md:w-0/12 px-4 text-center"
                            key={formation._id}
                          >
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                              <div className="px-4 py-5 flex-auto">
                                <div className="hover:-mt-4 mt-1 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                                  {jwt_token ? (
                                      <img
                                        alt="..."
                                        className="align-middle border-none max-w-full h-auto rounded-lg"
                                        src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                                        style={{ width: '250px', height: '120px' }}
                                        onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                                        onClick={(e) => {window.location.replace(`/landing/detailscours/${formation._id}`)}}

                                      />
                                  ) : (
                                      <img
                                        alt="..."
                                        className="align-middle border-none max-w-full h-auto rounded-lg"
                                        src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                                        style={{ width: '250px', height: '120px' }}
                                        onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                                        onClick={(e) => {window.location.replace(`/DetailsFormation/${formation._id}`)} }

                                      />
                                  )}
                                </div>
                                <div className="flex flex-wrap">
                                  {formation.competences
                                  .split(",")
                                  .slice(0, 2) // Récupère seulement les deux premières compétences
                                  .map((competence, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        border:
                                          "2px solid rgba(186, 230, 253, 1)",
                                        marginRight: index === 1 ? "0" : "5px", // Ne pas ajouter de marge à droite pour la dernière compétence
                                      }}
                                      className="text-xs font-semibold mb-2 inline-block py-1 px-2 rounded-full text-blueGray-600  last:mr-0 mr-1"
                                    >
                                    {competence.trim()}
                                  </span>
                                  ))}
                                  {formation.competences.split(",").length > 2 && (
                                    <span className="text-xs font-semibold mb-2 inline-block py-1 px-2 rounded-full text-blueGray-600">
                                  Autres compétences...
                                </span>
                                  )}
                                </div>
                                <h6 className="text-base font-semibold">
                                  {formation.titre}
                                </h6>
                                <p className="mt-2 mb-4 text-xs text-blueGray-500">
                                  {formation.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={handleNextPage}
                          disabled={endIndex === centers.length - 1}
                          className="bg-blue-500 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          <FaChevronRight style={{ fontSize: "40px" }} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="pb-6 border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className=" lg\:w-auto ">
                          <a
                            href="/landing/training"
                            className="font-normal text-lightBlue-500 text-center"
                          >
                            Show more
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 py-3 border-t border-blueGray-200 ">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg\:w-auto px-4">
                          <p className="text-lg leading-relaxed text-blueGray-700">
                            Autre Center utiles
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      {displayedCenter.length === 0 ? (
                        <tr>
                          <td
                            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
                            colSpan="22"
                          >
                            <TailSpin
                              visible={true}
                              width="50"
                              height="50"
                              color="#4fa94d"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              wrapperStyle={{}}
                              wrapperClass=""
                            />
                            Aucune formation trouvée.
                          </td>
                        </tr>
                      ) : (
                        <>
                          <button
                            onClick={handlePrevPageCenter}
                            disabled={startIndexCenter === 0}
                            className=" bg-blue-500  rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.boxShadow =
                                "0px 0px 30px 0px rgba(0,0,0,0.3)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.boxShadow = "none")
                            }
                          >
                            <FaChevronLeft style={{ fontSize: "40px" }} />
                          </button>
                          {displayedCenter.map((center) => (
                            <div
                              className="  md:w-0/12 px-4 text-center"
                              key={center._id}
                            >
                              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                <div className="px-4 py-5 flex-auto">
                                  <div className="hover:-mt-4 mt-1 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                                    <Link

                                      to={`/profile/ProfileCenter/${center._id}`}
                                    >
                                      <img
                                        alt="..."
                                        className="align-middle border-none max-w-full h-auto rounded-lg"
                                        src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${center.image_user}`}
                                        // style={{ width: "350px", height: "350px" }}
                                        style={{ width: "250px", height: "120px" }}
                                        onMouseEnter={(e) =>
                                          (e.currentTarget.style.boxShadow =
                                            "0px 0px 30px 0px rgba(0,0,0,0.3)")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.currentTarget.style.boxShadow = "none")
                                        }
                                      />
                                    </Link>
                                  </div>
                                  <h6 className="text-base font-semibold">
                                    {center.nom}
                                  </h6>
                                  {/*<p className="mt-2 mb-4 text-xs text-blueGray-500">*/}
                                  {/*  {formation.description}*/}
                                  {/*</p>*/}
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={handleNextPageCenter}
                            disabled={endIndexCenter === centers.length - 1}
                            className="bg-blue-500 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            <FaChevronRight style={{ fontSize: "40px" }} />
                          </button>
                        </>
                      )}
                    </div>
                      <div className="pb-6 border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                          <div className="lg\:w-auto ">
                            <a
                              href="/landing/center"
                              className="font-normal text-lightBlue-500 text-center"
                            >
                              Show more
                            </a>
                          </div>
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
