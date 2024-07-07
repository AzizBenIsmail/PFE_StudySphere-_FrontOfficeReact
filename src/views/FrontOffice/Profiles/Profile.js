import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import Cookies from 'js-cookie'
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoSchoolSharp } from "react-icons/io5";
import { MdOutlineCastForEducation } from "react-icons/md";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { BsCalendar2DayFill } from "react-icons/bs";

import { getUserAuth } from '../../../Services/Apiauth'
import { useHistory, useParams } from 'react-router-dom'
import { MdEmail, MdShareLocation } from 'react-icons/md'
import { HiLanguage } from 'react-icons/hi2'
import { GoGoal } from 'react-icons/go'
import { GiGiftOfKnowledge } from 'react-icons/gi'
import { getByCurrUser } from '../../../Services/ApiXp'
import { getAllNiveaux } from '../../../Services/ApiNiveau'

export default function Profile() {
  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');
  const history = useHistory();

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
      await getUserAuth(config).then((res) => {
        setUser(res.data.user)
        console.log(res.data.user)
      }).catch((err) => {
        console.log(err)
      })
    }

    getUser(config)

    const interval = setInterval(() => {}, 1000000)

    return () => clearInterval(interval)
  }, [config, param.id])

  const [xpEntry, setXPEntry] = useState(null);
  const [niveaux, setNiveaux] = useState([]);

  const loadXPEntries = useCallback(async () => {
    try {
      const res = await getByCurrUser(config);
      setXPEntry(res.data);
    } catch (error) {
      console.error("Error loading XP entries:", error);
    }
  }, [config]);

  useEffect(() => {
    loadXPEntries();
  }, [loadXPEntries]);


  const loadNiveaux = useCallback(async () => {
    try {
      const res = await getAllNiveaux(config);
      setNiveaux(res.data);
    } catch (error) {
      console.error("Error loading niveaux:", error);
    }
  }, [config]); // Assurez-vous d'inclure toutes les dépendances nécessaires ici

  // Effet pour charger les niveaux au chargement du composant
  useEffect(() => {
    loadNiveaux();
  }, [loadNiveaux]);

  const calculerPourcentageProgression = () => {
    if (!xpEntry || niveaux.length === 0) return 0;

    const niveauActuel = niveaux.find(
      (niveau) => niveau.nom === xpEntry.niveauAtteint.nom
    );
    const indexNiveauActuel = niveaux.indexOf(niveauActuel);

    if (indexNiveauActuel === niveaux.length - 1) {
      // L'utilisateur a atteint le dernier niveau
      return 100;
    }

    const xpRequisNiveauActuel = niveauActuel.xpRequis;
    const xpRequisNiveauSuivant = niveaux[indexNiveauActuel + 1].xpRequis;

    const xpNiveauActuel = xpEntry.pointsGagnes - xpRequisNiveauActuel;
    const xpNiveauSuivant = xpRequisNiveauSuivant - xpRequisNiveauActuel;

    const pourcentageProgression = (xpNiveauActuel / xpNiveauSuivant) * 100;
    return pourcentageProgression;
  };
  return (
    <>

        <section className="relative py-15 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      {User && User.image_user ? (
                        <img
                          // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                          alt="UserImage"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${User.image_user}`}
                          // style={{ width: "80px", height: "80px" }}
                        />
                      ) : (
                        <div>
                          <img
                            alt="..."
                            src={require("../../../assets/img/client.png").default}
                            // style={{ maxWidth: '120%' }}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6  mt-32 sm:mt-0">
                      <button
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() =>
                          history.push(`/AccountManagement/edit/${User._id}?u=${User.role.toLowerCase()}`)
                        }
                      >
                        Mettez à jour vos informations
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-2">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {User.visitsCount}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Nombre_connexion
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                     {
                       User
                         ? (
                           User.role === "formateur" && User.Formations
                             ? User.Formations.length
                             : (
                               User.role === "client" && User.inscriptions
                                 ? User.inscriptions.length
                                 : (
                                   User.role === "centre" && User.staff_enseignant
                                     ? User.staff_enseignant.length
                                     : "Aucune_Info"
                                 )
                             )
                         )
                         : "Aucune_Formation"
                     }

                        </span>
                        <span className="text-sm text-blueGray-400">
                         {
                           User
                             ? (
                               User.role === "formateur" && User.Formations
                                 ? "Nombre_Formation"
                                 : (
                                   User.role === "client" && User.inscriptions
                                     ? "Nombre_Inscriptions"
                                     : (
                                       User.role === "centre" && User.staff_enseignant
                                         ? "Staff_enseignant"
                                         : null
                                     )
                                 )
                             )
                             : null
                         }


                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                         {
                           User ? (
                             User.role === "formateur" && User.Formations ? (
                               User.centresTravailAssocies.length
                             ) : (
                               User.role === "client" && User.inscriptions ? (
                                 User.xp && User.xp.badgeIds ? (
                                   User.xp.badgeIds.length
                                 ) : "Nombre_Inscriptions"
                               ) : (
                                 User.role === "centre" && User.Formations ? (
                                   User.Formations.reduce((total, formation) => total + formation.participants.length, 0)
                                 ) : "Aucune_Info"
                               )
                             )
                           ) : "Aucune_Info"
                         }

                        </span>
                        <span className="text-sm text-blueGray-400">
                        {
                          User ? (
                            User.role === "formateur" && User.Formations ? (
                              "Nombre_CentresTravailAssocies"
                            ) : (
                              User.role === "client" && User.inscriptions ? (
                                "Nombre_Badges"
                              ) : (
                                User.role === "centre" && User.Formations ? (
                                  "Nombre_Participants"
                                ) : null
                              )
                            )
                          ) : null
                        }
                        </span>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-4xl  font-semibold leading-normal ml-2 text-blueGray-700 mb-2">
                    {User.prenom}
                    {User.nom}
                  </h3>
                  <hr/>
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
                  <div className="w-full lg:w-2/12 px-4 text-center">
                    <h5 className="text-xl mt-5 font-semibold flex items-center ml-8">
                      <LiaBirthdayCakeSolid  className="mr-2" style={{ fontSize: "30px" }} />
                      Date anniversaire
                    </h5>
                    <p className="mt-2 ml-8 mb-4 text-blueGray-400">
                      {User &&
                      User.preferences &&
                      User.preferences.date_anniversaire
                        ? User.preferences.date_anniversaire
                        : "Non saisire"}
                    </p>
                  </div>
                  <div className="w-full lg:w-2/12 px-4 text-center">
                    <h5 className="text-xl mt-5 font-semibold flex items-center ml-8">
                      <IoSchoolSharp  className="mr-2" style={{ fontSize: "25px" }} />
                      Niveau étude
                    </h5>
                    <p className="mt-2 mb-4 text-blueGray-400">
                      {User &&
                      User.preferences &&
                      User.preferences.niveau_etude
                        ? User.preferences.niveau_etude
                        : "Non saisire"}
                    </p>
                  </div>
                  <div className="w-full lg:w-2/12 px-4 text-center">
                    <h5 className="text-xl mt-5 font-semibold flex items-center ml-8">
                      <MdOutlineCastForEducation  className="" style={{ fontSize: "35px" }} />
                      Style d'apprentissage
                    </h5>
                    <p className="mt-2 mb-4 text-blueGray-400">
                      {User &&
                      User.preferences &&
                      User.preferences.style_dapprentissage
                        ? User.preferences.style_dapprentissage
                        : "Non saisire"}
                    </p>
                  </div>
                  <div className="w-full lg:w-2/12 px-4 text-center">
                    <h5 className="text-xl mt-5 font-semibold flex items-center ml-8">
                      <HiMiniCalendarDays  className="mr-2" style={{ fontSize: "25px" }} />
                      Duree préférée
                    </h5>
                    <p className="mt-2 mb-4 text-blueGray-400">
                      {User &&
                      User.preferences &&
                      User.preferences.duree_preferee
                        ? User.preferences.duree_preferee
                        : "Non saisire"}
                    </p>
                  </div>

                  <div className="w-full lg:w-2/12 px-4 text-center">
                    <h5 className="text-xl mt-5 font-semibold flex items-center ml-8">
                      <BsCalendar2DayFill className="mr-2" style={{ fontSize: "25px" }} />
                      Disponibilité
                    </h5>
                    <p className="mt-2 mb-4 text-blueGray-400">
                      {User &&
                      User.preferences &&
                      User.preferences.disponibilite
                        ? User.preferences.disponibilite
                        : "Non saisire"}
                    </p>
                  </div>
                </div>
                  <br/><hr/><br/>
                  <div className="w-full lg:w-6/12 px-4">
                    <h2 className="text-5xl mt-4 font-semibold">
                      {xpEntry && xpEntry.niveauAtteint ?  xpEntry.niveauAtteint.nom : null} | Xp : {xpEntry ? xpEntry.pointsGagnes : null}
                    </h2>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        {xpEntry && xpEntry.niveauAtteint ? xpEntry.niveauAtteint.nom: null} in progress
                      </span>
                      </div>
                      <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        {calculerPourcentageProgression()}%
                      </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                      <div
                        style={{ width: `${calculerPourcentageProgression()}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 ">
                  Badges
                </span><div className="flex flex-wrap">
                  {xpEntry  ? xpEntry.badgeIds.map((badge) => (
                    <div
                      className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4"
                      key={badge._id}
                    >
                      <div className="px-6">
                        <img
                          alt="..."
                          src={`${process.env.REACT_APP_API_URL_IMAGE_BADGES}/${badge.image_badge}`}
                          className="shadow-lg rounded-full bg-blueGray-100 mx-auto max-w-120-px"
                        />
                        <div className="pt-6 text-center">
                          <h5 className="text-xl font-bold">{badge.nom}</h5>
                          <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )): null}
                </div>
                  <br/><hr/><br/>

                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
