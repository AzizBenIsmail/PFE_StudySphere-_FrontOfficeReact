import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getFormationById } from '../../../Services/ApiFormation'
import Cookies from 'js-cookie'
import { GiEmptyHourglass } from "react-icons/gi";

export default function Settings() {
  const param = useParams()
  const jwt_token = Cookies.get('jwt_token')

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
      const res = await getFormationById(param.id, config)
      setFormation(res.data.formation)
      console.log(res)
    } catch (error) {
      console.error('Error loading formations:', error)
    }
  }, [config,param.id])

  useEffect(() => {
    loadFormations()
  }, [loadFormations])


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

  // Fonction pour formater l'heure
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric" };
    return date.toLocaleTimeString("fr-FR", options);
  };

  const splitDescription = (description, formationId) => {
    if (!description) return null; // Ajout de cette vérification
    const words = description.split(" ");
    let wordCount = 0;
    let truncated = false;
    return words.map((word, index) => {
      if (wordCount >= 15 && !truncated) {
        truncated = true;
        return (
          <Link key={index} to={`/DetailsFormation/${formationId}`}>
            (... voir plus)
          </Link>
        );
      } else if (wordCount >= 15) {
        return null;
      } else {
        wordCount++;
        if (wordCount % 4 === 0) {
          return (
            <span key={index}>
              {word} <br />
            </span>
          );
        } else {
          return <span key={index}>{word} </span>;
        }
      }
    });
  };

  // Fonction pour convertir les minutes en heures
  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}H${remainingMinutes}Min`;
  };

  if (!formation) return null; // Ajout de cette vérification

  return (
    <>
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1">
            <div className="pt-6 w-full px-4 ">
              <div className="relative flex flex-row items-center justify-between min-w-0 break-words bg-centre w-full mb-8 shadow-lg rounded-lg"
                   onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                   onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div className="p-4">
                  <div className="">
                    <a href={`/DetailsFormation/${formation._id}`}>
                      <img
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                        style={{ width: "350px", height: "220px" }}
                      />
                    </a>
                  </div>
                </div>
                <div className="px-4 py-5 flex-auto">
                  <div className="flex pb-6 flex-wrap">
                    {formation.competences && formation.competences
                    .split(",")
                    .map((competence, index) => (
                      <span
                        key={index}
                        style={{
                          border: "2px solid rgba(226, 232, 240, 1)",
                          marginRight:
                            index ===
                            formation.competences.split(",").length - 1
                              ? "0"
                              : "5px",
                        }}
                        className="text-xs font-semibold inline-block text-blueGray-500 py-1 px-2 uppercase rounded-full text-black bg-white uppercase last:mr-0 mr-1"
                      >
                          {competence.trim()}
                        </span>
                    ))}
                  </div>
                  <h6 className="text-xl font-semibold">
                    {formation.titre}
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    {splitDescription(formation.description,formation._id)}
                  </p>
                  <div className="flex items-center mb-4">
                      <img
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                        alt="..."
                        className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                        src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.centre.image_user}`}
                        style={{ width: "25px" }}
                      />
                    <p className="text-xs text-blueGray-400 ml-2 ">posté par {formation.centre.nom}</p>
                      <img
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                        alt="..."
                        className="shadow ml-2 rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                        src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                        style={{ width: "25px" }}
                      />
                    <p className="text-xs text-blueGray-400 ml-2">posté par {formation.formateur.nom}</p>
                  </div>
                </div>
                <div className="px-4 py-5 flex-auto">
                  <h6 className="text-xl font-semibold">Date</h6>
                  <div className="flex items-center">
                    <p className="mt-2 mb-4 text-blueGray-500">
                      {formatDate(formation.dateDebut)}
                    </p>
                    <GiEmptyHourglass  style={{ fontSize: '25px' }}/>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      {formatTime(formation.dateDebut)}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-5 flex-auto">
                  <h6 className="text-xl font-semibold">
                    Durée
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    {convertMinutesToHours(formation.duree)}
                  </p>
                </div>
                <div className="px-4 py-5 flex-auto">
                  <h6 className="text-xl font-semibold">
                    Prix
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    {formation.Prix} DT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
