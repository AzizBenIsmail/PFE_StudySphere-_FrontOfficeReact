import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// components
import Cookies from "js-cookie";
import {
  getAllFormations,
  getFormationsByLocation,
  getFormationsRecommanderByLocation
} from '../../../Services/ApiFormation'
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function Landing({user}) {
  const [formations, setFormations] = useState([]);
  const [formationsByLocation, setFormationsByLocation] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndexFormationsByLocation, setEndIndexFormationsByLocation] = useState(2);
  const [startIndexFormationsByLocation, setStartIndexFormationsByLocation] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const jwt_token = Cookies.get("jwt_token");
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const states = ['Ariana', 'Beja', 'Ben_Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine',
    'Kebili', 'Le_Kef', 'Mahdia', 'La_Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi_Bouzid',
    'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'];

  const citiesByState = {
    Ariana: ['Ariana', 'Ettadhamen', 'Kalaat_el-Andalous', 'La_Soukra', 'Sidi_Thabet'],
    Beja: ['Beja', 'Amdoun', 'Goubellat', 'Medjez_el-Bab', 'Nefza', 'Teboursouk', 'Testour', 'Thibar'],
    Ben_Arous: ['Ben_Arous', 'Bou_Mhel_el-Bassatine', 'El_Mourouj', 'Ezzahra', 'Fouchana', 'Hammam_Lif', 'Hammam_Chott', 'Megrine', 'Mohamedia', 'Rades'],
    Bizerte: ['Bizerte', 'Ghar_el-Melh', 'Mateur', 'Menzel_Bourguiba', 'Menzel_Jemil', 'Ras_Jebel', 'Sejnane', 'Tinja', 'Utique', 'Zarzouna'],
    Gabes: ['Gabes', 'El_Hamma', 'Ghannouch', 'Matmata', 'Mareth', 'Menzel_Habib', 'Metouia'],
    Gafsa: ['Gafsa', 'El_Ksar', 'Belkhir', 'Moulares', 'Redeyef', 'Mdhilla', 'El_Guettar', 'Sened', 'Oum_El_Araies', 'Metlaoui'],
    Jendouba: ['Jendouba', 'Bou_Salem', 'Tabarka', 'Ain_Draham', 'Fernana', 'Ghardimaou', 'Oued_Meliz', 'Amdoun'],
    Kairouan: ['Kairouan', 'Bou_Hajla', 'Chebika', 'Echrarda', 'Haffouz', 'Hajeb_El_Ayoun', 'Menouf', 'Nasrallah', 'Oueslatia', 'Sbikha', 'Alaa', 'Haj_Kacem', 'Menzel_Mehiri'],
    Kasserine: ['Kasserine', 'Feriana', 'Sbeitla', 'Thala', 'Hassi_El_Ferid', 'Ezzouhour', 'Ayoun_El_Atrous', 'El_Ayoun', 'Foussana', 'Hidra', 'Jedelienne', 'Majel_Bel_Abbes', 'Sbiba', 'Thelepte'],
    Kebili: ['Kebili', 'Douz', 'Souk_Lahad', 'Bechlioul', 'Faouar'],
    Le_Kef: ['Le_Kef', 'Dahmani', 'Jerissa', 'Sakiet_Sidi_Youssef', 'Tajerouine', 'El_Ksour', 'Nebeur', 'Sers', 'Kalaat_Senan'],
    Mahdia: ['Mahdia', 'Bou_Merdes', 'Chebba', 'El_Djem', 'Ksour_Essef', 'Mellouleche', 'Ouled_Chamekh', 'Sidi_Alouane'],
    La_Manouba: ['La_Manouba', 'Den_Den', 'Douar_Hicher', 'El_Battan', 'Mornaguia', 'Oued_Ellil', 'Tebourba'],
    Medenine: ['Medenine', 'Ben_Gardane', 'Djerba_Ajim', 'Djerba_Houmt_Souk', 'Djerba_Midoun', 'Zarzis'],
    Monastir: ['Monastir', 'Amiret_El_Fhoul', 'Bekalta', 'Bembla', 'Beni_Hassen', 'Jammel', 'Ksar_Hellal', 'Ksibet_El_Mediouni', 'Moknine', 'Ouerdanine', 'Sahline_Mootmar', 'Sayada-Lamta-Bou_Hajar', 'Teboulba', 'Zeramdine'],
    Nabeul: ['Nabeul', 'Beni_Khiar', 'Bou_Argoub', 'Dar_Chaabane', 'El_Haouaria', 'Grombalia', 'Hammam_Ghezeze', 'Hammamet', 'Kelibia', 'Korba', 'Menzel_Bouzelfa', 'Menzel_Temime', 'Soliman', 'Takelsa'],
    Sfax: ['Sfax', 'Agareb', 'Bir_Ali_Ben_Khalifa', 'El_Amra', 'Ghraiba', 'Jebeniana', 'Kerkennah', 'Mahares', 'Menzel_Chaker', 'Sakiet_Ezzit', 'Sakiet_Eddaier', 'Thyna'],
    Sidi_Bouzid: ['Sidi_Bouzid', 'Bir_El_Hafey', 'Cebbala_Ouled_Asker', 'Jilma', 'Menzel_Bouzaiane', 'Meknassy', 'Mezzouna', 'Ouled_Haffouz', 'Regueb', 'Sidi_Ali_Ben_Aoun'],
    Siliana: ['Siliana', 'Bargou', 'Bou_Arada', 'El_Aroussa', 'Gaafour', 'Kesra', 'Makthar', 'Rouhia'],
    Sousse: ['Sousse', 'Akouda', 'Bouficha', 'Enfidha', 'Hammam_Sousse', 'Hergla', 'Kalaa_Kebira', 'Kalaa_Seghira', 'Kondar', 'Msaken', 'Sidi_Bou_Ali', 'Sidi_El_Hani', 'Zaouiet_Sousse'],
    Tataouine: ['Tataouine', 'Bir_Lahmar', 'Dehiba', 'Ghomrassen', 'Remada', 'Smar'],
    Tozeur: ['Tozeur', 'Degache', 'Hamet_Jerid', 'Nafta', 'Tamerza', 'Nefta'],
    Tunis: ['Tunis', 'Carthage', 'La_Marsa', 'Le_Bardo', 'Sidi_Bou_Said'],
    Zaghouan: ['Zaghouan', 'Bir_Mcherga', 'Djebel_Oust', 'El_Fahs', 'Nadhour'],
  };


  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  const loadFormations = useCallback(async () => {
    try {
      const res = await getAllFormations(config);
      setFormations(res.data.formations);
    } catch (error) {
      console.error('Error loading formations:', error);
    }
  }, [config]);

  const loadFormationsRecommanderByLocation = useCallback(async () => {
    try {
      const res = await getFormationsRecommanderByLocation(config);
      setFormationsByLocation(res.data.formations);
    } catch (error) {
      console.error('Error loading formations:', error);
    }
  }, [config]);

  useEffect(() => {
    loadFormations();
    loadFormationsRecommanderByLocation();
  }, [loadFormations,loadFormationsRecommanderByLocation]);

  const handleNextPage = () => {
    if (endIndex < formations.length - 1) {
      setStartIndex((prevStartIndex) => prevStartIndex + 1);
      setEndIndex((prevEndIndex) => prevEndIndex + 1);
    }
  };

  const handleNextPageRecommanderByLocation = () => {
    if (endIndexFormationsByLocation < formationsByLocation.length - 1) {
      setStartIndexFormationsByLocation((prevStartIndexFormationsByLocation) => prevStartIndexFormationsByLocation + 1);
      setEndIndexFormationsByLocation((prevEndIndexFormationsByLocation) => prevEndIndexFormationsByLocation + 1);
    }
  };
  const handlePrevPage = () => {
    if (startIndex > 0) {
      setStartIndex((prevStartIndex) => prevStartIndex - 1);
      setEndIndex((prevEndIndex) => prevEndIndex - 1);
    }
  };

  const handlePrevPageRecommanderByLocation = () => {
    if (startIndexFormationsByLocation > 0) {
      setStartIndexFormationsByLocation((prevStartIndexFormationsByLocation) => prevStartIndexFormationsByLocation - 1);
      setEndIndexFormationsByLocation((prevEndIndexFormationsByLocation) => prevEndIndexFormationsByLocation - 1);
    }
  };


  const displayedFormations = formations && formations.length > 0 ? formations.slice(startIndex, endIndex + 1) : [];

  const displayedFormationsFormationsByLocation = formationsByLocation && formationsByLocation.length > 0 ? formationsByLocation.slice(startIndexFormationsByLocation, endIndexFormationsByLocation + 1) : [];


  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity(''); // Clear city selection when state changes
  };

  const handleCityChange = async (event) => {
    setSelectedCity(event.target.value);
    const location = `${selectedState},${event.target.value}`; // Assemble city and state
    try {
      const res = await getFormationsByLocation(location, config);
      setFormationsByLocation(res.data.formations);
    } catch (error) {
      console.error('Error searching formations by location:', error);
    }
  };

  return (
    <>
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="flex flex-wrap">
          <div className="pt-6 w-full md:w-2/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                Trouvez des Formation Base sur la localisation Géographique !
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                >
                  <option value="">Choisir l'état</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
                {selectedState && (
                  <>
                  <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  >
                    <option value="">Choisir la ville</option>
                    {citiesByState[selectedState].map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 w-full md:w-2/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                Trouvez des Formation par un formateur !
              </div>
            </div>
          </div>

          <div className="pt-6 w-full md:w-2/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                Trouvez des Formation par un center !
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {user && user.preferences && user.preferences.emplacement_actuelle ? (
            <>
              <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                  <div className="pr-12 pt-12 ">
                    <h1 className="text-black font-semibold text-2xl">
                      Explorez les formations {selectedState ? `dans ${selectedState}` : `dans ${user.preferences.emplacement_actuelle} , domaine : ${user.preferences.Domaine_dinteret} `}
                    </h1>
                  </div>
                </div>
              </div>
              <hr className="my-4 md:min-w-full" />
              <div className="flex flex-wrap">
                {displayedFormationsFormationsByLocation.length === 0 ? (
                  <tr>
                    <td
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
                      colSpan="22"
                    >
                      Aucune formation trouvée a {user.preferences.emplacement_actuelle}
                    </td>
                  </tr>
                ) : (
                  <>
                    <button
                      onClick={handlePrevPageRecommanderByLocation}
                      disabled={startIndexFormationsByLocation === 0}
                      className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <FaChevronLeft style={{ fontSize: '40px' }}/>
                    </button>
                    {displayedFormationsFormationsByLocation.map((formation) => (
                      <div
                        className="pt-6 w-full md:w-2/12 px-4 text-center"
                        key={formation._id}
                      >
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                          <div className="px-4 py-5 flex-auto">
                            <div className="hover:-mt-4 mt-1 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                              <Link to={`/DetailsFormation/${formation._id}`}>
                                <img
                                  alt="..."
                                  className="align-middle border-none max-w-full h-auto rounded-lg"
                                  src={`http://localhost:5000/images/Formations/${formation.image_Formation}`}
                                  style={{ width: "350px", height: "220px" }}
                                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                />
                              </Link>
                              <span
                                style={{
                                  position: "absolute",
                                  top: "5%",
                                  left: "82%",
                                  transform: "translate(-50%, -50%) ",
                                }}
                              >
                        <Link to={`/profile/ProfileFormateur/${formation.formateur._id}`}>
                          <img
                            alt="..."
                            className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                            src={`http://localhost:5000/images/Users/${formation.formateur.image_user}`}
                            style={{ width: "70px" }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                          />
                        </Link>
                      </span>
                              <span
                                style={{
                                  position: "absolute",
                                  top: "94%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              >
                        <Link to={`/profile/ProfileCenter/${formation.centre._id}`}>
                          <img
                            alt="..."
                            className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                            src={`http://localhost:5000/images/Users/${formation.centre.image_user}`}
                            style={{ width: "70px" }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                          />
                        </Link>
                      </span>
                            </div>
                            <div className="flex flex-wrap">
                              {formation.competences
                              .split(",")
                              .map((competence, index) => (
                                <span
                                  key={index}
                                  style={{
                                    border: "2px solid rgba(186, 230, 253, 1)",
                                    marginRight:
                                      index ===
                                      formation.competences.split(",").length - 1
                                        ? "0"
                                        : "5px",
                                  }}
                                  className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                                >
                            {competence.trim()}
                          </span>
                              ))}
                            </div>
                            <h6 className="text-xl font-semibold">
                              {formation.titre}
                            </h6>
                            <p className="mt-2 mb-4 text-blueGray-500">
                              {formation.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleNextPageRecommanderByLocation}
                      disabled={endIndexFormationsByLocation === formationsByLocation.length - 1}
                      className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <FaChevronRight style={{ fontSize: '40px' }}/>
                    </button>
                  </>
                )}
              </div>
            </>
          ) : null}
        <div className="flex flex-wrap">
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="pr-12 pt-12 ">
                  <h1 className="text-black font-semibold text-2xl">
                    Explorez Tous les formations disponibles
                  </h1>
                </div>
              </div>
            </div>
            <hr className="my-4 md:min-w-full" />

            {displayedFormations.length === 0 ? (
              <tr>
                <td
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
                  colSpan="22"
                >
                  Aucune formation trouvée.
                </td>
              </tr>
            ) : (
              <>
                <button
                  onClick={handlePrevPage}
                  disabled={startIndex === 0}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <FaChevronLeft style={{ fontSize: '40px' }}/>
                </button>
                {displayedFormations.map((formation) => (
                  <div
                    className="pt-6 w-full md:w-2/12 px-4 text-center"
                    key={formation._id}
                  >
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="hover:-mt-4 mt-1 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                          <Link to={`/DetailsFormation/${formation._id}`}>
                            <img
                              alt="..."
                              className="align-middle border-none max-w-full h-auto rounded-lg"
                              src={`http://localhost:5000/images/Formations/${formation.image_Formation}`}
                              style={{ width: "350px", height: "220px" }}
                              onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                            />
                          </Link>
                          <span
                            style={{
                              position: "absolute",
                              top: "5%",
                              left: "82%",
                              transform: "translate(-50%, -50%) ",
                            }}
                          >
                            <Link to={`/profile/ProfileFormateur/${formation.formateur._id}`}>
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                src={`http://localhost:5000/images/Users/${formation.formateur.image_user}`}
                                style={{ width: "70px" }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                              />
                            </Link>
                          </span>
                          <span
                            style={{
                              position: "absolute",
                              top: "94%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <Link to={`/profile/ProfileCenter/${formation.centre._id}`}>
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                src={`http://localhost:5000/images/Users/${formation.centre.image_user}`}
                                style={{ width: "70px" }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                              />
                            </Link>
                          </span>
                        </div>
                        <div className="flex flex-wrap">
                          {formation.competences
                          .split(",")
                          .map((competence, index) => (
                            <span
                              key={index}
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight:
                                  index ===
                                  formation.competences.split(",").length - 1
                                    ? "0"
                                    : "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                                {competence.trim()}
                              </span>
                          ))}
                        </div>
                        <h6 className="text-xl font-semibold">
                          {formation.titre}
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          {formation.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={endIndex === formations.length - 1}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FaChevronRight style={{ fontSize: '40px' }}/>
                </button>
              </>
            )}
          </div>
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-user-friends text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Working with us is a pleasure
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Don't let your uses guess by attaching tooltips and popoves to
                any element. Just make sure you enable them first via
                JavaScript.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                The kit comes with three pre-built pages to help you get
                started faster. You can change the text and images and you're
                good to go. Just make sure you enable them first via
                JavaScript.
              </p>
              <Link to="/" className="font-bold text-blueGray-700 mt-8">
                Check Notus React!
              </Link>
            </div>
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="..."
                  src={
                    require("../../../assets/img/team-4-470x470.png").default
                  }
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-lightBlue-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Top Notch Services
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-lg"
                src={
                  require("../../../assets/img/team-4-470x470.png").default
                }
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div className="md:pr-12">
                <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                  <i className="fas fa-rocket text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold">A growing company</h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  The extension comes with three pre-built pages to help you
                  get started faster. You can change the text and images and
                  you're good to go.
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <i className="fas fa-fingerprint"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Carefully crafted components
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Amazing page examples
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <i className="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Dynamic components
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">Here are our heroes</h2>
              <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                According to the National Oceanic and Atmospheric
                Administration, Ted, Scambos, NSIDClead scentist, puts the
                potentially record maximum.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={
                    require("../../../assets/img/team-4-470x470.png").default
                  }
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Ryan Tompson</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Web Developer
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-dribbble"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={
                    require("../../../assets/img/team-4-470x470.png").default
                  }
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Romina Hadid</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Marketing Specialist
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={
                    require("../../../assets/img/team-4-470x470.png").default
                  }
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Alexa Smith</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    UI/UX Designer
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={
                    require("../../../assets/img/team-4-470x470.png").default
                  }
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Jenna Kardi</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Founder and CEO
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-dribbble"></i>
                    </button>
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
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
