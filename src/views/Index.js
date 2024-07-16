/*eslint-disable*/
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link , useHistory } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import {
  FormationByDayAndTime,
  getAllFormations,
  getFormationsByDomaine,
  getFormationsByLocation,
  getFormationsRecommanderByLocation
} from '../Services/ApiFormation'
import { Puff } from 'react-loader-spinner'

export default function Index() {
  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');

  const [user, setUser] = useState()
const histoy = useHistory()
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  //session
  if (jwt_token) {
    const fetchData = async () => {
      try {
        await getUserAuth(config).then((res) => {
          setUser(res.data.user);
          if (res.data.user.role === 'admin' || res.data.user.role === 'moderateur') {
            window.location.replace(`/admin/`)
          }
          if (res.data.user.role === 'client' || res.data.user.role === 'centre' || res.data.user.role === 'formateur') {
            window.location.replace(`/landing`)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  const [formations, setFormations] = useState([]);
  const [formationsByLocation, setFormationsByLocation] = useState([]);
  const [startIndexDev, setStartIndexDev] = useState(0);
  const [endIndexDev, setEndIndexDev] = useState(2);
  const [startIndexBI, setStartIndexBI] = useState(0);
  const [endIndexBI, setEndIndexBI] = useState(2);
  const [endIndexFormationsArtsVisuels, setEndIndexFormationsArtsVisuels] =
    useState(2);
  const [startIndexFormationsArtsVisuels, setStartIndexFormationsArtsVisuels] =
    useState(0);
  const [endIndexFormationsLangues_etrangeres, setEndIndexFormationsLangues_etrangeres] =
    useState(2);
  const [startIndexFormationsLangues_etrangeres, setStartIndexFormationsLangues_etrangeres] =
    useState(0);
  const [endIndexFormationsByLocation, setEndIndexFormationsByLocation] =
    useState(2);
  const [startIndexFormationsByLocation, setStartIndexFormationsByLocation] =
    useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState("");
  const [jours, setJours] = useState("");
  const [tranchesHoraires, setTranchesHoraires] = useState("");
  const [formationsArtsVisuels, setFormationsArtsVisuels] = useState([]);
  const [formationsLangues_etrangeres, setFormationsLangues_etrangeres] = useState([]);
  const [formationsBI, setFormationsBI] = useState([]);
  const [formationsDev, setFormationsDev] = useState([]);

  const states = ['Ariana', 'Beja', 'Ben_Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine',
    'Kebili', 'Le_Kef', 'Mahdia', 'La_Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi_Bouzid',
    'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan']

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
  }

  const ListeDomaine = {
    Informatique: ['Developpement', 'Securite informatique', 'Business Intelligence', 'Reseaux'],
    Arts: ['Arts visuels', 'Musique', 'Cinema', 'Theatre'],
    Design: ['Design graphique', 'Design industriel', 'Design d\'interieur'],
    Lettres: ['Litterature', 'Langues etrangeres', 'Histoire', 'Geologie'],
    Economie: ['Economie generale', 'Gestion', 'Comptabilite', 'Finance'],
    Commerce: ['Marketing', 'Vente', 'Distribution', 'Commerce international', 'Publicite', 'Relations publiques'],
    Tourisme: ['Gestion hoteliere', 'Tourisme culturel', 'Tourisme de loisirs', 'Agence de voyages'],
    Sport: ['Education physique', 'Entrainement sportif', 'Kinesthesie', 'Nutrition sportive'],
    Gestion_de_projet: ['Planification', 'Suivi et controle', 'Gestion des risques', 'Evaluation'],
    Entrepreneuriat: ['Creation d\'entreprise', 'Management', 'Strategie d\'entreprise', 'Innovation'],
  }

  const loadFormations = useCallback(async () => {
    try {
      const res = await getAllFormations(config);
      setFormations(res.data.formations);
      const artsVisuels = res.data.formations.filter(formation => formation.sujetInteret === 'Arts visuels');
      const Langues_etrangeres = res.data.formations.filter(formation => formation.sujetInteret === 'Langues etrangeres');
      const Dev = res.data.formations.filter(formation => formation.sujetInteret === 'Developpement');
      const BI = res.data.formations.filter(formation => formation.sujetInteret === 'Business Intelligence');
      setFormationsBI(BI);
      setFormationsDev(Dev);
      setFormationsArtsVisuels(artsVisuels);
      setFormationsLangues_etrangeres(Langues_etrangeres);
    } catch (error) {
      console.error("Error loading formations:", error);
    }
  }, [config]);

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
  const handleNextPageFormationsArtsVisuels = () => {
    if (endIndexFormationsArtsVisuels < formationsArtsVisuels.length - 1) {
      setStartIndexFormationsArtsVisuels((prevStartIndex) => prevStartIndex + 1);
      setEndIndexFormationsArtsVisuels((prevEndIndex) => prevEndIndex + 1);
    }
  };

  const handleNextPageRecommanderByLocation = () => {
    if (endIndexFormationsByLocation < formationsByLocation.length - 1) {
      setStartIndexFormationsByLocation(
        (prevStartIndexFormationsByLocation) =>
          prevStartIndexFormationsByLocation + 1
      );
      setEndIndexFormationsByLocation(
        (prevEndIndexFormationsByLocation) =>
          prevEndIndexFormationsByLocation + 1
      );
    }
  };
  const handlePrevPageFormationsArtsVisuels = () => {
    if (startIndexFormationsArtsVisuels > 0) {
      setStartIndexFormationsArtsVisuels((prevStartIndex) => prevStartIndex - 1);
      setEndIndexFormationsArtsVisuels((prevEndIndex) => prevEndIndex - 1);
    }
  };

  const handleNextPageLangues_etrangeres = () => {
    if (endIndexFormationsLangues_etrangeres < formationsLangues_etrangeres.length - 1) {
      setStartIndexFormationsLangues_etrangeres((prevStartIndex) => prevStartIndex + 1);
      setEndIndexFormationsLangues_etrangeres((prevEndIndex) => prevEndIndex + 1);
    }
  };

  const handlePrevPageLangues_etrangeres = () => {
    if (startIndexFormationsLangues_etrangeres > 0) {
      setStartIndexFormationsLangues_etrangeres((prevStartIndex) => prevStartIndex - 1);
      setEndIndexFormationsLangues_etrangeres((prevEndIndex) => prevEndIndex - 1);
    }
  };

  const handleNextPageDev = () => {
    if (endIndexDev < formationsDev.length - 1) {
      setStartIndexDev((prevStartIndex) => prevStartIndex + 1);
      setEndIndexDev((prevEndIndex) => prevEndIndex + 1);
    }
  };

  const handlePrevPageDev = () => {
    if (startIndexDev > 0) {
      setStartIndexDev((prevStartIndex) => prevStartIndex - 1);
      setEndIndexDev((prevEndIndex) => prevEndIndex - 1);
    }
  };

  const handleNextPageBI = () => {
    if (endIndexBI < formationsBI.length - 1) {
      setStartIndexBI((prevStartIndex) => prevStartIndex + 1);
      setEndIndexBI((prevEndIndex) => prevEndIndex + 1);
    }
  };

  const handlePrevPageBI = () => {
    if (startIndexBI > 0) {
      setStartIndexBI((prevStartIndex) => prevStartIndex - 1);
      setEndIndexBI((prevEndIndex) => prevEndIndex - 1);
    }
  };


  const handlePrevPageRecommanderByLocation = () => {
    if (startIndexFormationsByLocation > 0) {
      setStartIndexFormationsByLocation(
        (prevStartIndexFormationsByLocation) =>
          prevStartIndexFormationsByLocation - 1
      );
      setEndIndexFormationsByLocation(
        (prevEndIndexFormationsByLocation) =>
          prevEndIndexFormationsByLocation - 1
      );
    }
  };


  const displayedFormations =
    formations && formations.length > 0
      ? formations.slice(startIndex, endIndex + 1)
      : [];

  const displayedformationsArtsVisuels =
    formationsArtsVisuels && formationsArtsVisuels.length > 0
      ? formationsArtsVisuels.slice(startIndexFormationsArtsVisuels, endIndexFormationsArtsVisuels + 1)
      : [];

  const displayedFormationsFormationsByLocation =
    formationsByLocation && formationsByLocation.length > 0
      ? formationsByLocation.slice(
        startIndexFormationsByLocation,
        endIndexFormationsByLocation + 1
      )
      : [];

  const displayedFormationsFormationsLangues_etrangeres=
    formationsLangues_etrangeres && formationsLangues_etrangeres.length > 0
      ? formationsLangues_etrangeres.slice(
        startIndexFormationsLangues_etrangeres,
        endIndexFormationsLangues_etrangeres + 1
      )
      : [];

  const displayedFormationsDev =
    formationsDev && formationsDev.length > 0
      ? formationsDev.slice(startIndexDev, endIndexDev + 1)
      : [];

  const displayedFormationsBI =
    formationsBI && formationsBI.length > 0
      ? formationsBI.slice(startIndexBI, endIndexBI + 1)
      : [];

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity(""); // Clear city selection when state changes
  };

  const handleCityChange = async (event) => {
    setSelectedCity(event.target.value);
    setSelectedSousDomaine("");
    const location = `${selectedState},${event.target.value}`; // Assemble city and state
    try {
      const res = await getFormationsByLocation(location, config);
      setFormationsByLocation(res.data.formations);
    } catch (error) {
      console.error("Error searching formations by location:", error);
    }
  };

  // Ajoutez un nouvel état pour gérer le sous-domaine sélectionné
  const [selectedSousDomaine, setSelectedSousDomaine] = useState("");

  // Définissez une fonction pour gérer le changement de sous-domaine
  const handleSousDomaineChange = (event) => {
    setSelectedSousDomaine(event.target.value);
    fetchFormations(event.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  // Modifiez la fonction handleDomaineChange pour inclure la réinitialisation du sous-domaine sélectionné
  const handleDomaineChange = (event) => {
    setSelectedDomaine(event.target.value);
    setSelectedSousDomaine(""); // Réinitialiser le sous-domaine sélectionné
  };

  const fetchFormations = async (domaine) => {
    try {
      const response = await getFormationsByDomaine(domaine, config);
      setFormationsByLocation(response.data.formations);
    } catch (error) {
      console.error("Error fetching formations by domaine:", error);
    }
  };

  const loadFormationsByDayAndTime = useCallback(async () => {
    try {
      const res = await FormationByDayAndTime(jours, tranchesHoraires, config);
      setFormationsByLocation(res.data.formations);
    } catch (error) {
      console.error("Error loading formations by day and time:", error);
    }
  }, [jours, tranchesHoraires, config]);

  useEffect(() => {
    if (jours || tranchesHoraires) {
      loadFormationsByDayAndTime();
    }
  }, [jours, tranchesHoraires, loadFormationsByDayAndTime]);

  const handleJoursChange = (event) => {
    setJours(event.target.value);
  };

  const handleTranchesHorairesChange = (event) => {
    setTranchesHoraires(event.target.value);
  };

  return (
    <>
      <IndexNavbar fixed />
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-55">
        <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-100 bg-bleu-500"
            ></span>
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
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="flex flex-wrap">
          <div className="pt-6 w-full md:w-2/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                Trouver des formations en fonction de la localisation
                géographique!
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                >
                  <option value="">Choisir l'état</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
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
                        <option key={index} value={city}>
                          {city}
                        </option>
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
                Trouver des formations dans les domaines énumérés ci-dessous!
                <select
                  value={selectedDomaine}
                  onChange={handleDomaineChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full "
                >
                  <option value="">Choisir un domaine</option>
                  {Object.keys(ListeDomaine).map((domaine) => (
                    <option key={domaine} value={domaine}>
                      {domaine}
                    </option>
                  ))}
                </select>
                {selectedDomaine && (
                  <div className="pr-12">
                    <select
                      value={selectedSousDomaine}
                      onChange={handleSousDomaineChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-2"
                    >
                      <option value="">Choisir un sous-domaine</option>
                      {ListeDomaine[selectedDomaine].map((sousDomaine) => (
                        <option key={sousDomaine} value={sousDomaine}>
                          {sousDomaine}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 w-full md:w-2/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                Trouvez des formations par jour et par une plage horaire !
                <select
                  value={jours}
                  onChange={handleJoursChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                >
                  <option value="">Choisir un jour</option>
                  <option value="Lundi">Lundi</option>
                  <option value="Mardi">Mardi</option>
                  <option value="Mercredi">Mercredi</option>
                  <option value="Jeudi">Jeudi</option>
                  <option value="Vendredi">Vendredi</option>
                  <option value="Samedi">Samedi</option>
                  <option value="Dimanche">Dimanche</option>
                </select>
                {jours && (
                  <select
                    value={tranchesHoraires}
                    onChange={handleTranchesHorairesChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  >
                    <option value="">Choisir une tranche horaire</option>
                    <option value="Matin">Matin</option>
                    <option value="Après-midi">Après-midi</option>
                    <option value="Soir">Soir</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
              <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                  <div className="pr-12">
                    <h1 className="text-black font-semibold text-2xl">
                      {!selectedCity &&
                      !selectedDomaine &&
                      !selectedSousDomaine &&
                      !jours &&
                      !tranchesHoraires
                        ? null
                        : jours && !tranchesHoraires
                          ? `Explorez les formations dans le jour ${jours}`
                          : jours && tranchesHoraires
                            ? `Explorez les formations dans le jour ${jours} et tranche horaire ${tranchesHoraires}`
                            : selectedSousDomaine
                              ? `Explorez les formations de domaine ${selectedSousDomaine}`
                              : `Explorez les formations ${
                                selectedState
                                  ? `dans ${selectedState}`
                                  : user && user.preferences
                                    ? `dans ${user.preferences.emplacement_actuelle}, domaine : ${user.preferences.Domaine_dinteret}`
                                    : "dans votre emplacement actuel, domaine d'intérêt inconnu"
                              }`}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                {displayedFormationsFormationsByLocation.length === 0  ? (
                !selectedCity &&
                !selectedDomaine &&
                !selectedSousDomaine &&
                !jours &&
                !tranchesHoraires
                  ? null
                  :
                  <div>
                    <div
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
                      colSpan="22"
                    >
                      Aucune formation trouvée </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handlePrevPageRecommanderByLocation}
                      disabled={startIndexFormationsByLocation === 0}
                      className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                    {displayedFormationsFormationsByLocation.map(
                      (formation) => (
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
                                     src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                                  //  src={`https://forme-5wc0.onrender.com/images/Formations/${formation.image_Formation}`}
                                    style={{ width: "350px", height: "220px" }}
                                    onMouseEnter={(e) =>
                                      (e.currentTarget.style.boxShadow =
                                        "0px 0px 30px 0px rgba(0,0,0,0.3)")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.currentTarget.style.boxShadow = "none")
                                    }
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
                                  <Link
                                    to={`/profile/ProfileFormateur/${formation.formateur._id}`}
                                  >
                                    <img
                                      alt="..."
                                      className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                       src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                                     // src={`https://forme-5wc0.onrender.com/images/Users/${formation.formateur.image_user}`}
                                      style={{ width: "70px" }}
                                      onMouseEnter={(e) =>
                                        (e.currentTarget.style.boxShadow =
                                          "0px 0px 30px 0px rgba(0,0,0,0.3)")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.boxShadow =
                                          "none")
                                      }
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
                                  <Link
                                    to={`/profile/ProfileCenter/${formation.centre._id}`}
                                  >
                                    <img
                                      alt="..."
                                      className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                       src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                                    //  src={`https://forme-5wc0.onrender.com/images/Users/${formation.formateur.image_user}`}
                                      style={{ width: "70px" }}
                                      onMouseEnter={(e) =>
                                        (e.currentTarget.style.boxShadow =
                                          "0px 0px 30px 0px rgba(0,0,0,0.3)")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.boxShadow =
                                          "none")
                                      }
                                    />
                                  </Link>
                                </span>
                              </div>
                              <div className="flex flex-wrap">
                                {formation.competences
                                .split(",")
                                .slice(0, 3)
                                .map((competence, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      border:
                                        "2px solid rgba(186, 230, 253, 1)",
                                      marginRight:
                                        index ===
                                        Math.min(
                                          2,
                                          formation.competences.split(",")
                                            .length - 1
                                        )
                                          ? "0"
                                          : "5px",
                                    }}
                                    className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                                  >
                                      {competence.trim()}
                                    </span>
                                ))}
                                {formation.competences.split(",").length >
                                  3 && (
                                    <span
                                      style={{
                                        border:
                                          "2px solid rgba(186, 230, 253, 1)",
                                        marginRight: "5px",
                                      }}
                                      className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                                    >
                                    ...
                                  </span>
                                  )}
                              </div>
                              <h6 className="text-xl font-semibold">
                                {formation.titre}
                              </h6>
                              <p className="mt-2 mb-4 text-blueGray-500">
                                {formation.description
                                .split(" ")
                                .slice(0, 10)
                                .join(" ")}
                                {formation.description.split(" ").length > 10 &&
                                  " ..."}
                              </p>
                              <div className="mt-auto">
                                <button
                                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={event =>            histoy.push(`/auth/login`)}

                                >
                                  Inscrivez-vous maintenant
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}

                    <button
                      onClick={handleNextPageRecommanderByLocation}
                      disabled={
                        endIndexFormationsByLocation ===
                        formationsByLocation.length - 1
                      }
                      className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <FaChevronRight style={{ fontSize: "40px" }} />
                    </button>
                  </>
                )}
              </div>

          <div className="flex flex-wrap">
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="pr-12 ">
                  <h1 className="text-black font-semibold text-2xl">
                    Explorez Tous les formations disponibles
                  </h1>
                </div>
              </div>
            </div>
            <hr className="my-4 md:min-w-full" />

            {displayedFormations.length === 0 ? (
              <div>
                <div
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
                  colSpan="22"
                >
                    <Puff
                      visible={true}
                      height="70"
                      width="70"
                      color="#4fa94d"
                      ariaLabel="puff-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  Aucune formation trouvée pour le moment .
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={handlePrevPage}
                  disabled={startIndex === 0}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                               src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                             // src={`https://forme-5wc0.onrender.com/images/Formations/${formation.image_Formation}`}
                              style={{ width: "350px", height: "220px" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.boxShadow =
                                  "0px 0px 30px 0px rgba(0,0,0,0.3)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.boxShadow = "none")
                              }
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
                            <Link
                              to={`/profile/ProfileFormateur/${formation.formateur._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                 src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                               // src={`https://forme-5wc0.onrender.com/images/Users/${formation.formateur.image_user}`}
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
                          </span>
                          <span
                            style={{
                              position: "absolute",
                              top: "94%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <Link
                              to={`/profile/ProfileCenter/${formation.centre._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.centre.image_user}`}
                               // src={`https://forme-5wc0.onrender.com/images/Users/${formation.centre.image_user}`}
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
                          </span>
                        </div>
                        <div className="flex flex-wrap">
                          {formation.competences
                          .split(",")
                          .slice(0, 3)
                          .map((competence, index) => (
                            <span
                              key={index}
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight:
                                  index ===
                                  Math.min(
                                    2,
                                    formation.competences.split(",").length -
                                    1
                                  )
                                    ? "0"
                                    : "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                                {competence.trim()}
                              </span>
                          ))}
                          {formation.competences.split(",").length > 3 && (
                            <span
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight: "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                              ...
                            </span>
                          )}
                        </div>
                        <h6 className="text-xl font-semibold">
                          {formation.titre}
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          {formation.description
                          .split(" ")
                          .slice(0, 10)
                          .join(" ")}
                          {formation.description.split(" ").length > 10 &&
                            " ..."}
                        </p>

                        <div className="mt-auto">
                          <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={event =>            histoy.push(`/auth/login`)}

                          >
                            Inscrivez-vous maintenant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={endIndex === formations.length - 1}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FaChevronRight style={{ fontSize: "40px" }} />
                </button>
              </>
            )}
          </div>
          <div className="flex flex-wrap">
            {displayedFormations.length === 0 ? (
              // <tr>
              //   <td
              //     className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
              //     colSpan="22"
              //   >
              //     Aucune formation trouvée.
              //   </td>
              // </tr>
              <></>
            ) : (
              <>
                <div className="container relative mx-auto">
                  <div className="items-center flex flex-wrap">
                    <div className="pr-12 pt-12 ">
                      <h1 className="text-black font-semibold text-2xl">
                        Explorez Tous les formations en Developpement
                      </h1>
                    </div>
                  </div>
                </div>
                <hr className="my-4 md:min-w-full" />
                <button
                  onClick={handlePrevPageDev}
                  disabled={startIndexDev === 0}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                {displayedFormationsDev.map((formation) => (
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
                              src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                             // src={`https://forme-5wc0.onrender.com/images/Formations/${formation.image_Formation}`}
                              style={{ width: "350px", height: "220px" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.boxShadow =
                                  "0px 0px 30px 0px rgba(0,0,0,0.3)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.boxShadow = "none")
                              }
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
                            <Link
                              to={`/profile/ProfileFormateur/${formation.formateur._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                 src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                               // src={`https://forme-5wc0.onrender.com/images/Users/${formation.formateur.image_user}`}
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
                          </span>
                          <span
                            style={{
                              position: "absolute",
                              top: "94%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <Link
                              to={`/profile/ProfileCenter/${formation.centre._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.centre.image_user}`}
                                // src={`https://forme-5wc0.onrender.com/images/Users/${formation.centre.image_user}`}
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
                          </span>
                        </div>
                        <div className="flex flex-wrap">
                          {formation.competences
                          .split(",")
                          .slice(0, 3)
                          .map((competence, index) => (
                            <span
                              key={index}
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight:
                                  index ===
                                  Math.min(
                                    2,
                                    formation.competences.split(",").length -
                                    1
                                  )
                                    ? "0"
                                    : "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                                {competence.trim()}
                              </span>
                          ))}
                          {formation.competences.split(",").length > 3 && (
                            <span
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight: "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                              ...
                            </span>
                          )}
                        </div>
                        <h6 className="text-xl font-semibold">
                          {formation.titre}
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          {formation.description
                          .split(" ")
                          .slice(0, 15)
                          .join(" ")}
                          {formation.description.split(" ").length > 15 &&
                            " ..."}
                        </p>

                        <div className="mt-auto">
                          <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={event =>            histoy.push(`/auth/login`)}

                          >
                            Inscrivez-vous maintenant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleNextPageDev}
                  disabled={endIndexDev === formationsDev.length - 1}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FaChevronRight style={{ fontSize: "40px" }} />
                </button>
              </>
            )}
          </div>
          <div className="flex flex-wrap">
            {displayedFormationsBI.length === 0 ? (
              // <tr>
              //   <td
              //     className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
              //     colSpan="22"
              //   >
              //     Aucune formation trouvée.
              //   </td>
              // </tr>
              <></>
            ) : (
              <>
                <div className="container relative mx-auto">
                  <div className="items-center flex flex-wrap">
                    <div className="pr-12 pt-12 ">
                      <h1 className="text-black font-semibold text-2xl">
                        Explorez Tous les formations en Business Intelligence
                      </h1>
                    </div>
                  </div>
                </div>
                <hr className="my-4 md:min-w-full" />
                <button
                  onClick={handlePrevPageBI}
                  disabled={startIndexBI === 0}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                {displayedFormationsBI.map((formation) => (
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
                              src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                              // src={`https://forme-5wc0.onrender.com/images/Formations/${formation.image_Formation}`}
                              style={{ width: "350px", height: "220px" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.boxShadow =
                                  "0px 0px 30px 0px rgba(0,0,0,0.3)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.boxShadow = "none")
                              }
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
                            <Link
                              to={`/profile/ProfileFormateur/${formation.formateur._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                                // src={`https://forme-5wc0.onrender.com/images/Users/${formation.formateur.image_user}`}
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
                          </span>
                          <span
                            style={{
                              position: "absolute",
                              top: "94%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <Link
                              to={`/profile/ProfileCenter/${formation.centre._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                 src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.centre.image_user}`}
                               // src={`https://forme-5wc0.onrender.com/images/Users/${formation.centre.image_user}`}
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
                          </span>
                        </div>
                        <div className="flex flex-wrap">
                          {formation.competences
                          .split(",")
                          .slice(0, 3)
                          .map((competence, index) => (
                            <span
                              key={index}
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight:
                                  index ===
                                  Math.min(
                                    2,
                                    formation.competences.split(",").length -
                                    1
                                  )
                                    ? "0"
                                    : "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                                {competence.trim()}
                              </span>
                          ))}
                          {formation.competences.split(",").length > 3 && (
                            <span
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight: "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                              ...
                            </span>
                          )}
                        </div>
                        <h6 className="text-xl font-semibold">
                          {formation.titre}
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          {formation.description
                          .split(" ")
                          .slice(0, 15)
                          .join(" ")}
                          {formation.description.split(" ").length > 15 &&
                            " ..."}
                        </p>

                        <div className="mt-auto">
                          <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={event =>            histoy.push(`/auth/login`)}
                          >
                            Inscrivez-vous maintenant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleNextPageBI}
                  disabled={endIndexDev === formationsDev.length - 1}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FaChevronRight style={{ fontSize: "40px" }} />
                </button>
              </>
            )}
          </div>
          <div className="flex flex-wrap">
            {displayedFormations.length === 0 ? (
              // <tr>
              //   <td
              //     className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
              //     colSpan="22"
              //   >
              //     Aucune formation trouvée.
              //   </td>
              // </tr>
              <></>
            ) : (
              <>
                <div className="container relative mx-auto">
                  <div className="items-center flex flex-wrap">
                    <div className="pr-12 pt-12 ">
                      <h1 className="text-black font-semibold text-2xl">
                        Explorez Tous les formations en Arts Visuels
                      </h1>
                    </div>
                  </div>
                </div>
                <hr className="my-4 md:min-w-full" />
                <button
                  onClick={handlePrevPageFormationsArtsVisuels}
                  disabled={startIndexFormationsArtsVisuels === 0}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                {displayedformationsArtsVisuels.map((formation) => (
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
                               src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                             // src={`https://forme-5wc0.onrender.com/images/Formations/${formation.image_Formation}`}
                              style={{ width: "350px", height: "220px" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.boxShadow =
                                  "0px 0px 30px 0px rgba(0,0,0,0.3)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.boxShadow = "none")
                              }
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
                            <Link
                              to={`/profile/ProfileFormateur/${formation.formateur._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                 src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                                //src={`https://forme-5wc0.onrender.com/images/Users/${formation.formateur.image_user}`}
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
                          </span>
                          <span
                            style={{
                              position: "absolute",
                              top: "94%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <Link
                              to={`/profile/ProfileCenter/${formation.centre._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.centre.image_user}`}
                                //src={`https://forme-5wc0.onrender.com/images/Users/${formation.centre.image_user}`}
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
                          </span>
                        </div>
                        <div className="flex flex-wrap">
                          {formation.competences
                          .split(",")
                          .slice(0, 3)
                          .map((competence, index) => (
                            <span
                              key={index}
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight:
                                  index ===
                                  Math.min(
                                    2,
                                    formation.competences.split(",").length -
                                    1
                                  )
                                    ? "0"
                                    : "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                                {competence.trim()}
                              </span>
                          ))}
                          {formation.competences.split(",").length > 3 && (
                            <span
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight: "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                              ...
                            </span>
                          )}
                        </div>
                        <h6 className="text-xl font-semibold">
                          {formation.titre}
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          {formation.description
                          .split(" ")
                          .slice(0, 15)
                          .join(" ")}
                          {formation.description.split(" ").length > 15 &&
                            " ..."}
                        </p>

                        <div className="mt-auto">
                          <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={event =>            histoy.push(`/auth/login`)}

                          >
                            Inscrivez-vous maintenant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleNextPageFormationsArtsVisuels}
                  disabled={endIndexFormationsArtsVisuels === formationsArtsVisuels.length - 1}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FaChevronRight style={{ fontSize: "40px" }} />
                </button>
              </>
            )}
          </div>
          <div className="flex flex-wrap">
            {displayedFormations.length === 0 ? (
              // <tr>
              //   <td
              //     className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4"
              //     colSpan="22"
              //   >
              //     Aucune formation trouvée.
              //   </td>
              // </tr>
              <></>
            ) : (
              <>
                <div className="container relative mx-auto">
                  <div className="items-center flex flex-wrap">
                    <div className="pr-12 pt-12 ">
                      <h1 className="text-black font-semibold text-2xl">
                        Explorez Tous les formations en Langues etrangeres
                      </h1>
                    </div>
                  </div>
                </div>
                <hr className="my-4 md:min-w-full" />
                <button
                  onClick={handlePrevPageLangues_etrangeres}
                  disabled={startIndexFormationsLangues_etrangeres === 0}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                {displayedFormationsFormationsLangues_etrangeres.map((formation) => (
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
                               src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                             // src={`https://forme-5wc0.onrender.com/images/Formations/${formation.image_Formation}`}
                              style={{ width: "350px", height: "220px" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.boxShadow =
                                  "0px 0px 30px 0px rgba(0,0,0,0.3)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.boxShadow = "none")
                              }
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
                            <Link
                              to={`/profile/ProfileFormateur/${formation.formateur._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                 src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.formateur.image_user}`}
                                //src={`https://forme-5wc0.onrender.com/images/Users/${formation.formateur.image_user}`}
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
                          </span>
                          <span
                            style={{
                              position: "absolute",
                              top: "94%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <Link
                              to={`/profile/ProfileCenter/${formation.centre._id}`}
                            >
                              <img
                                alt="..."
                                className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                                 src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${formation.centre.image_user}`}
                                //src={`https://forme-5wc0.onrender.com/images/Users/${formation.centre.image_user}`}
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
                          </span>
                        </div>
                        <div className="flex flex-wrap">
                          {formation.competences
                          .split(",")
                          .slice(0, 3)
                          .map((competence, index) => (
                            <span
                              key={index}
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight:
                                  index ===
                                  Math.min(
                                    2,
                                    formation.competences.split(",").length -
                                    1
                                  )
                                    ? "0"
                                    : "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                                {competence.trim()}
                              </span>
                          ))}
                          {formation.competences.split(",").length > 3 && (
                            <span
                              style={{
                                border: "2px solid rgba(186, 230, 253, 1)",
                                marginRight: "5px",
                              }}
                              className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                            >
                              ...
                            </span>
                          )}
                        </div>
                        <h6 className="text-xl font-semibold">
                          {formation.titre}
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          {formation.description
                          .split(" ")
                          .slice(0, 15)
                          .join(" ")}
                          {formation.description.split(" ").length > 15 &&
                            " ..."}
                        </p>

                        <div className="mt-auto">
                          <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-8 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={event =>            histoy.push(`/auth/login`)}

                          >
                            Inscrivez-vous maintenant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleNextPageLangues_etrangeres}
                  disabled={endIndexFormationsLangues_etrangeres === formationsLangues_etrangeres.length - 1}
                  className="bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FaChevronRight style={{ fontSize: "40px" }} />
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
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go. Just make sure you enable them first via JavaScript.
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
                    require("../assets/img/team-4-470x470.png").default
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
      <Footer />
    </>
  );
}
