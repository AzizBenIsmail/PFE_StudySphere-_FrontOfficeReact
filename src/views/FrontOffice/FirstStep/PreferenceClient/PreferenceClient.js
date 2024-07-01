import React, { useEffect, useMemo, useState } from 'react'
// import { Link } from 'react-router-dom'
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3, } from 'react-icons/tb'
import { BiBeenHere, BiSolidBeenHere } from 'react-icons/bi'
// import { useLocation } from 'react-router-dom'
import { CiSquareRemove } from 'react-icons/ci'
import {addPreferences }from '../../../../Services/ApiPref'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

export default function PreferenceClient () {

  const jwt_token = Cookies.get("jwt_token");

  if (!Cookies.get("jwt_token")) {
    window.location.replace("/login-page");
  }

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  const initialSelectedLanguages = {
    Francais: false,
    Anglais: false,
    Langue_maternelle: false,
  };

  const history = useHistory()
  // const location = useLocation()
  const [Step, setStep] = useState('1')
  const [selectedDomaineactuelle, setSelectedDomaineactuelle] = useState('')
  const [selectedDomainedinteret, setSelectedDomainedinteret] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState(initialSelectedLanguages)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedCompetences, setSelectedCompetences] = useState([])
  const [domaineSelectionne, setDomaineSelectionne] = useState('')
  const [competenceSelectionnee, setCompetenceSelectionnee] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [preferences, setPreferences] = useState({
    domaine_actuelle: '',
    objectifs_de_carriere: '',
    Domaine_dinteret: '',
    competences_dinteret: '',
    niveau_dexperience_professionnelle: '',
    interets_personnels: '',
    date_anniversaire: '',
    niveau_etude: '',
    niveau_de_difficulte: '',
    niveau_dengagement: '',
    besoin: '',
    emplacement_actuelle: '',
    style_dapprentissage: '',
    budget: '',
    disponibilite: '',
    duree_preferee: '',
    type_de_contenu_prefere: '',
    preferences_linguistiques: '',
    historique_dapprentissage: '',
  })
  const handleSelectChange = (event) => {
    setPreferences({ ...preferences, [event.target.name]: event.target.value })
  }

  const sousListes = {
    Informatique: ['Developpement', 'Securite informatique', 'Business Intelligence', 'Reseaux'],
    Arts: ['Arts visuels', 'Musique', 'Cinema', 'Theatre'],
    Design: ['Design graphique', 'Design industriel', 'Design d\'interieur'],
    Lettres: ['Litterature', 'Langues etrangeres', 'Histoire' ,'Geologie'],
    Economie: ['Economie generale', 'Gestion', 'Comptabilite', 'Finance'],
    Commerce: ['Marketing', 'Vente', 'Distribution', 'Commerce international', 'Publicite', 'Relations publiques'],
    Tourisme: ['Gestion hoteliere', 'Tourisme culturel', 'Tourisme de loisirs', 'Agence de voyages'],
    Sport: ['Education physique', 'Entrainement sportif', 'Kinesthesie', 'Nutrition sportive'],
    Gestion_de_projet: ['Planification', 'Suivi et controle', 'Gestion des risques', 'Evaluation'],
    Entrepreneuriat: ['Creation d\'entreprise', 'Management', 'Strategie d\'entreprise', 'Innovation'],
  }

  const sousListesCompetence = {
    Informatique: ['Developpement de logiciels', 'Administration systeme', 'Securite informatique', 'Analyse de donnees', 'Architecture cloud'],
    Developpement_Web_Basique: ['HTML', 'CSS', 'JavaScript', 'Python', 'PHP', 'Java', 'C#', 'TypeScript', 'SQL'],
    Developpement_mobile: ['Flutter', 'React Native', 'Ionic', 'Swift', 'Kotlin'],
    Developpement_Web_Frontend: ['React', 'Angular', 'Vue', 'Svelte', 'Ember'],
    Developpement_Web_Backend: ['Node.js', 'Express', 'Django', 'Ruby on Rails', 'Spring Boot'],
    intelligence_artificielle: ["Machine Learning", "Deep Learning", "Chatbots", "Data Mining"],
    Art_et_culture: ['Creation artistique', 'Ecriture creative', 'Performance musicale', 'Interpretation artistique', 'Gestion d\'evenements culturels'],
    Lettres: ['Analyse de texte','Communication ecrite et verbale', 'Competences interpersonnelles', 'Redaction et edition', 'Presentation orale','Recherche historique', 'Comprehension des evenements passes et de leur impact sur le present', 'Connaissance des differents contextes culturels',"Comprehension des processus geologiques","Capacite a interpreter les roches"],
    Langues_etrangeres: ['Anglais','Espagnol','Chinois (Mandarin)','Français','Arabe','Russe','Portugais','Allemand','Japonais','Hindi','Bengali','Swahili','Italien','Coreen','Neerlandais','Turc','Polonais','Persan (Farsi)','Vietnamien','Suedois'],
    Economie: ['Analyse financiere', 'Comptabilite', 'Gestion des investissements', 'Evaluation des risques', 'Planification financiere'],
    Commerce: ['Strategie marketing', 'Analyse de marche', 'Marketing digital', 'Gestion de la marque', 'Communication publicitaire'],
    Ingenierie: ['Conception', 'Analyse des structures', 'Gestion de projets d\'ingenierie', 'Resolution de problemes techniques', 'Maintenance preventive et corrective'],
    Vente: ['Negociation', 'Prospection commerciale', 'Gestion de la relation client', 'Closing de ventes', 'Elaboration de propositions commerciales'],
    Logistique: ['Gestion des stocks', 'Planification de la chaine logistique', 'Optimisation des processus logistiques', 'Suivi des expeditions', 'Gestion des retours'],
    Tourisme: ['Planification de voyages', 'Guidage touristique', 'Gestion hotelliere', 'Service a la clientele dans le secteur du tourisme', 'Organisation d\'activites touristiques']
  }

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

  const handleChangeactuelle = (event) => {
    // console.log(event.target.value)
    setSelectedDomaineactuelle(event.target.value)
  }

  const handleChangedinteret = (event) => {
    setSelectedDomainedinteret(event.target.value)
  }

  const handleInputChange = (event) => {
    const value = event.target.value
    setInputValue(value)
    const suggestions = suggestCompetences(value, selectedCompetences)
    setSuggestions(suggestions)
  }

  const handleAddCompetence = (competence, event) => {
    event.preventDefault()
    setSelectedCompetences(prevCompetences => {
      if (!prevCompetences.includes(competence)) {
        return [...prevCompetences, competence]
      }
      return prevCompetences
    })
    setInputValue(prevValue => prevValue ? `${prevValue}, ${competence}` : competence)
    setSuggestions(prevSuggestions => prevSuggestions.filter(s => s !== competence))
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      competences_dinteret: selectedCompetences.join(', ')
    }))

  }

  const handleRemoveCompetence = (competenceToRemove, event) => {
    event.preventDefault()
    setSelectedCompetences(prevCompetences => {
      return prevCompetences.filter((competence) => competence !== competenceToRemove)
    })
  }

  const suggestCompetences = (inputValue, selectedCompetences) => {
    const input = inputValue.toLowerCase()

    // Rechercher le domaine correspondant à l'entrée de l'utilisateur
    const domaine = Object.keys(sousListesCompetence).find((domaine) => {
      const competences = sousListesCompetence[domaine].map((competence) =>
        competence.toLowerCase()
      )
      return competences.includes(input)
    })

    // Si un domaine correspondant est trouvé, renvoyer les compétences de ce domaine
    if (domaine) {
      let suggestions = sousListesCompetence[domaine]
      // Exclure les compétences déjà sélectionnées de la liste de suggestions
      suggestions = suggestions.filter(
        (competence) => !selectedCompetences.includes(competence)
      )
      // Limiter le nombre de suggestions à 20 au maximum
      suggestions = suggestions.slice(0, 20)
      return suggestions
    } else {
      // Si aucun domaine correspondant n'est trouvé, renvoyer un tableau vide
      return []
    }
  }

  const handleChangeDomaine = (event) => {
    setDomaineSelectionne(event.target.value)
    setCompetenceSelectionnee('') // Réinitialiser la compétence sélectionnée lorsque le domaine change
  }

  const handleChangeCompetence = (event) => {
    setCompetenceSelectionnee(event.target.value)
    handleAddCompetence(event.target.value, event)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(preferences)
      // console.log(selectedCompetences);
      setPreferences(prevPreferences => ({
        ...prevPreferences,
        competences_dinteret: selectedCompetences.join(', ')
      }))
    }, 1500)

    return () => clearInterval(timer) // Nettoyer l'intervalle lors du démontage du composant
  }, [preferences, selectedCompetences])

  const handleStateChange = (event) => {
    setSelectedState(event.target.value)
    setSelectedCity('')
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      emplacement_actuelle: event.target.value, // Mettez à jour emplacement_actuelle avec l'état sélectionné
    }))
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      emplacement_actuelle: `${selectedState},${event.target.value}`, // Mettez à jour emplacement_actuelle avec la ville sélectionnée
    }))
  }



  useEffect(() => {
    // Lorsque selectedLanguages change, mettez à jour preferences_linguistiques
    const selectedLanguagesString = Object.keys(selectedLanguages).filter(lang => selectedLanguages[lang]).join(',');
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      preferences_linguistiques: selectedLanguagesString,
    }));
  }, [selectedLanguages]);

  const handleCheckboxChange = (language) => {
    setSelectedLanguages(prevLanguages => ({
      ...prevLanguages,
      [language]: !prevLanguages[language], // Inverse la valeur de la langue sélectionnée
    }));
  };
  const [availability, setAvailability] = useState({
    days: [],
    times: [],
  })

  const handleDayChange = (event) => {
    const { name, checked } = event.target;
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      days: checked ? [...prevAvailability.days, name] : prevAvailability.days.filter((day) => day !== name),
    }));

    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      disponibilite: checked
        ? [...prevPreferences.disponibilite.split(','), name].join(',')
        : prevPreferences.disponibilite.split(',').filter((day) => day !== name).join(','),
    }));
  };

  const handleTimeChange = (event) => {
    const { name, checked } = event.target;
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      times: checked ? [...prevAvailability.times, name] : prevAvailability.times.filter((time) => time !== name),
    }));

    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      duree_preferee: checked
        ? [...prevPreferences.duree_preferee.split(','), name].join(',')
        : prevPreferences.duree_preferee.split(',').filter((time) => time !== name).join(','),
    }));
  };

  function DayCheckbox ({ day, checked, onChange }) {
    return (
      <div>
        <input
          type="checkbox"
          id={`${day}-checkbox`}
          name={day}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={`${day}-checkbox`}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
      </div>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPreferences(preferences, config).then(history.push("/landing"));

    } catch (error) {
      console.error('Error submitting preferences:', error);
      // Gérer les erreurs ici
    }
  };

  return (
    <>
      <div className=" container mx-auto px-1 h-full ">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-9/12 pb-6 ">
            <div
              className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-blueGray-800 border-0">
              <div className="rounded-t px-6 py-6">
                <div className="text-center ">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    {Step === "1" ? ( <>+ 150 pt ✨</> ) :
                      Step === "2" ? (<>+ 150 pt ✨ + 150 pt 💡 = 300 pt ✨💡</>) : (<>+ 150 pt ✨ + 150 pt 💡 + 150 pt 🚀 = 450 pt ✨💡🚀</>) }
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <div className="relative">
                    <div className="flex items-center">
                      {Step === '1' ? (
                        <>
                          <BiSolidBeenHere
                            style={{ fontSize: '30px' }}
                            color="#4fa94d"
                          />
                          <BiBeenHere
                            style={{ fontSize: '30px', marginLeft: '410px' }}
                          />
                          <BiBeenHere
                            style={{ fontSize: '30px', marginLeft: '415px' }}
                          />
                        </>
                      ) : Step === '2' ? (
                        <>
                          <BiSolidBeenHere
                            style={{ fontSize: '30px' }}
                            color="#4fa94d"
                          />
                          <BiSolidBeenHere
                            style={{ fontSize: '30px', marginLeft: '410px' }}
                            color="#4fa94d"
                          />
                          <BiBeenHere
                            style={{ fontSize: '30px', marginLeft: '415px' }}
                          />
                        </>
                      ) : (
                        <>
                          <BiSolidBeenHere
                            style={{ fontSize: '30px' }}
                            color="#4fa94d"
                          />
                          <BiSolidBeenHere
                            style={{ fontSize: '30px', marginLeft: '410px' }}
                            color="#4fa94d"
                          />
                          <BiSolidBeenHere
                            style={{ fontSize: '30px', marginLeft: '415px' }}
                            color="#4fa94d"
                          />
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between w-full">
                      {Step === '1' ? (
                        <>
                          <TbCircleNumber1
                            style={{ fontSize: '30px' }}
                            className="text-white "
                            color="#4fa94d"
                          />
                          <div
                            className="h-2 w-16 bg-blueGray-200"
                            style={{ width: '50%' }}
                          ></div>

                          <TbCircleNumber2
                            style={{ fontSize: '30px' }}
                            className="text-white "
                          />
                          <div
                            className="h-2 w-16 bg-blueGray-200"
                            style={{ width: '50%' }}
                          ></div>
                          <TbCircleNumber3
                            style={{ fontSize: '30px' }}
                            className="text-white "
                          />
                        </>
                      ) : Step === '2' ? (
                        <>
                          <TbCircleNumber1
                            style={{ fontSize: '30px' }}
                            className="text-white "
                            color="#4fa94d"
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-500"
                            style={{ width: '50%' }}
                          ></div>
                          <TbCircleNumber2
                            style={{ fontSize: '30px' }}
                            color="#4fa94d"
                            className="text-white "
                          />
                          <div
                            className="h-2 w-16 bg-blueGray-200"
                            style={{ width: '50%' }}
                          ></div>
                          <TbCircleNumber3
                            style={{ fontSize: '30px' }}
                            className="text-white "
                          />
                        </>
                      ) : (
                        <>
                          <TbCircleNumber1
                            style={{ fontSize: '30px' }}
                            className="text-white "
                            color="#4fa94d"
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-500"
                            style={{ width: '50%' }}
                          ></div>
                          <TbCircleNumber2
                            style={{ fontSize: '30px' }}
                            className="text-white "
                            color="#4fa94d"
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-500 "
                            style={{ width: '50%' }}
                          ></div>
                          <TbCircleNumber3
                            style={{ fontSize: '30px' }}
                            color="#4fa94d"
                            className="text-white "
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300"/>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Chaque réponse vous rapproche de votre objectif ! 🚀 </small>
                </div>
                {Step === '1' ? (
                  <>
                    <form>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="domaine-select"
                            >
                              Votre Domaine Actuel
                            </label>
                            <select
                              id="domaine-select"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              onChange={handleChangeactuelle}
                              value={selectedDomaineactuelle}
                            >
                              <option value="">Sélectionnez votre domaine actuel</option>
                              {Object.keys(sousListes).map((domaine) => (
                                <option key={domaine} value={domaine}>{domaine}</option>
                              ))}
                            </select>
                          </div>
                          {/* Afficher la sous-liste si un domaine est sélectionné */}
                          {selectedDomaineactuelle && (
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="sous-liste-select"
                              >
                                {selectedDomaineactuelle}
                              </label>
                              <select
                                id="sous-liste-select"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                // value={domaine_actuelle}
                                name="domaine_actuelle"
                                onChange={(e) => handleSelectChange(e)}
                              >
                                <option value="">Sélectionnez une spécialisation</option>
                                {sousListes[selectedDomaineactuelle].map((specialisation, index) => (
                                  <option key={index} value={specialisation}>{specialisation}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="domaine-select"
                            >
                              Objectifs De Carrière
                            </label>
                            <select
                              id="domaine-select"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="objectifs_de_carriere"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">votre Objectifs De Carrière</option>
                              <option value="Changer_de_carriere">Changer de carrière</option>
                              <option value="Devenir_un_leader_dans_mon_domaine">Devenir un leader dans mon domaine
                              </option>
                              <option
                                value="Explorer_de_nouvelles_opportunites_professionnelles">Explorer de nouvelles
                                opportunites professionnelles
                              </option>
                              <option
                                value="Diversifier_mes_competences_pour_rester_competitif_sur_le_marche_du_travail">Diversifier
                                mes competences pour rester competitif sur le marche du travail
                              </option>
                              <option value="Demarrer_ma_propre_entreprise">Demarrer ma propre entreprise</option>
                              <option
                                value="Augmenter_mon_revenu_grace_a_des_competences_specialisees">Augmenter mon revenu
                                grace a des competences specialisees
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="domaine-select"
                            >
                              Domaine D'intérêt
                            </label>
                            <select
                              id="domaine-select"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              onChange={handleChangedinteret}
                              value={selectedDomainedinteret}
                            >
                              <option value="">Sélectionnez votre Domaine D'intérêt</option>
                              {Object.keys(sousListes).map((domaine) => (
                                <option key={domaine} value={domaine}>{domaine}</option>
                              ))}
                            </select>
                          </div>
                          {/* Afficher la sous-liste si un domaine est sélectionné */}
                          {selectedDomainedinteret && (
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="sous-liste-select"
                              >
                                {selectedDomainedinteret}
                              </label>
                              <select
                                id="sous-liste-select"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                name="Domaine_dinteret"
                                onChange={(e) => handleSelectChange(e)}
                              >
                                <option value="">Sélectionnez une spécialisation</option>
                                {sousListes[selectedDomainedinteret].map((specialisation, index) => (
                                  <option key={index} value={specialisation}>{specialisation}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <div>
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="domaine-select">
                                Competance par domaine :
                              </label>
                              <select id="domaine" value={domaineSelectionne} name="competences_dinteret"
                                      onChange={handleChangeDomaine}
                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              >
                                {Object.keys(sousListesCompetence).map((domaine) => (
                                  <option key={domaine} value={domaine}>{domaine}</option>
                                ))}
                              </select>
                              {domaineSelectionne && (
                                <div>
                                  <label htmlFor="competence">Sélectionnez une compétence :</label>
                                  <select id="competence" value={competenceSelectionnee} name="competences_dinteret"
                                          onChange={handleChangeCompetence}
                                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                                  >
                                    <option value="">Choisissez une compétence</option>
                                    {sousListesCompetence[domaineSelectionne] && sousListesCompetence[domaineSelectionne].map((competence, index) => (
                                      <option
                                        key={index} value={competence}>{competence}</option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                   htmlFor="competence-input">Compétence D'INTÉRÊT</label>
                            <input
                              type="text"
                              id="competence-input"
                              value={inputValue}
                              onChange={handleInputChange}
                              placeholder="Saisissez une compétence"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                          </div>
                          <div className="flex flex-wrap">
                            {selectedCompetences.map((competence, index) => (
                              <div key={index}
                                   className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">

                                <div className="text-blueGray-400 text-center font-bold">
                                  <small>{competence}</small>
                                  <button onClick={(event) => handleRemoveCompetence(competence, event)}
                                          className="ml-2 focus:outline-none"><CiSquareRemove/>

                                  </button>
                                </div>

                              </div>
                            ))}
                          </div>
                          <div>
                            {suggestions && suggestions.length > 0 && (
                              <p>Compétences recommandées :</p>
                            )}
                            <div className="flex flex-wrap">
                              {suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={(event) => handleAddCompetence(suggestion, event)}
                                  className="inline-block bg-blue-500 text-white rounded-full font-bold px-2 py-1 rounded"
                                  disabled={selectedCompetences.includes(suggestion)}
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="experience-level"
                            >
                              Niveau d'expérience professionnelle
                            </label>
                            <select
                              id="experience-level"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="niveau_dexperience_professionnelle"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">Sélectionnez votre Niveau d'expérience professionnelle</option>
                              <option value="Debutant">Débutant (0-2 ans)</option>
                              <option value="Intermediaire">Intermédiaire (3-5 ans)</option>
                              <option value="Expert">Expert (5-10 ans)</option>
                              <option value="Senior">Senior (10+ ans)</option>
                            </select>
                          </div>
                        </div>

                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="interests"
                            >
                              Intérêts personnels
                            </label>
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="interets_personnels"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">Sélectionnez votre Intérêts personnels</option>
                              <option value="Musique">Musique</option>
                              <option value="Sports">Sports</option>
                              <option value="Arts">Arts</option>
                              <option value="Voyages">Voyages</option>
                              <option value="Lecture">Lecture</option>
                              {/* Ajoutez d'autres options selon vos besoins */}
                            </select>
                          </div>
                        </div>

                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="date-anniversaire"
                            >
                              Date de naissance
                            </label>
                            <input
                              type="date"
                              id="date-anniversaire"
                              name="date_anniversaire"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              onChange={handleSelectChange}
                              max={new Date().toISOString().split('T')[0]} // Définit la date maximale sur aujourd'hui
                            />
                          </div>
                        </div>

                      </div>


                      <div className="text-center mt-4">
                        {/* <Link to="/landing"> */}
                        <button
                          className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={(e) => setStep('2')}
                        >
                          Suivant
                        </button>
                        {/* </Link> */}
                      </div>
                    </form>
                  </>
                ) : Step === '2' ? (
                  <>
                    <form>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              votre Niveau Etude
                            </label>
                            {/*<input*/}
                            {/*  type="text"*/}
                            {/*  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                            {/*  placeholder="votre Niveau Etude Primaire, Secondaire , Baccalauréat , Supérieur , Maîtrise , Formations"*/}
                            {/*/>*/}
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="niveau_etude"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">Sélectionnez votre Niveau Etude</option>
                              <option value="Primaire">Primaire</option>
                              <option value="Secondaire">Secondaire</option>
                              <option value="Baccalaureat">Baccalaureat</option>
                              <option value="Superieur">Superieur</option>
                              <option value="Maitrise">Maitrise</option>
                              <option value="Formations">Formations</option>
                              {/* Ajoutez d'autres options selon vos besoins */}
                            </select>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Votre Niveau D'engagement
                            </label>
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="niveau_dengagement"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">Sélectionnez votre Niveau D'engagement</option>
                              <option value="4S">consacrer du temps régulier à la formation 4 Seance</option>
                              <option value="2S">sessions d'apprentissage plus courtes 2 Seance</option>
                              <option value="1S">intermittentes 1 Seance</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Votre Besoin
                            </label>
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="besoin"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">Sélectionnez votre Besoin</option>
                              <option value="certification">Certification</option>
                              <option value="competences">Acquisition de nouvelles compétences</option>
                              <option value="Experience">Experience Realisation projet</option>
                            </select>
                          </div>
                        </div>

                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Niveau Difficulte
                            </label>
                            {/*<input*/}
                            {/*  type="text"*/}
                            {/*  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                            {/*  placeholder="Niveau Difficulte : débutant ,intermédiaire ,avancé "*/}
                            {/*/>*/}
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="niveau_de_difficulte"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">Sélectionnez votre Niveau Difficulte</option>
                              <option value="Debutant">Débutant</option>
                              <option value="Intermediaire">Intermédiaire</option>
                              <option value="Avance">Avancé</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Style d'apprentissage
                            </label>
                            {/*<input*/}
                            {/*  type="text"*/}
                            {/*  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                            {/*  placeholder="  Style d'apprentissage : enligne, hybride,presentiel"*/}
                            {/*/>*/}
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="style_dapprentissage"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">Sélectionnez votre Style d'apprentissage</option>
                              <option value="Enligne">Enligne</option>
                              <option value="Hybride">Hybride</option>
                              <option value="Presentiel">Présentiel</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-4">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <button
                            className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={(e) => setStep('1')}
                          >
                            précédent
                          </button>
                          <button
                            className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={(e) => setStep('3')}
                          >
                            Suivant
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <form>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="state-select"
                            >
                              État
                            </label>
                            <select
                              id="state-select"
                              value={selectedState}
                              onChange={handleStateChange}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            >
                              <option value="">Sélectionner un état</option>
                              {states.map((state, index) => (
                                <option key={index} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </div>

                          {selectedState && (
                            <div className="relative w-full mb-3">
                              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                     htmlFor="city-select">
                                Ville
                              </label>
                              <select
                                id="city-select"
                                value={selectedCity}
                                onChange={handleCityChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              >
                                <option value="">Sélectionner une ville</option>
                                {citiesByState[selectedState].map((city, index) => (
                                  <option key={index} value={city}>
                                    {city}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Votre Budget
                            </label>
                            {/*<input*/}
                            {/*  type="email"*/}
                            {/*  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                            {/*  placeholder="votre Objectifs De Carrière"*/}
                            {/*/>*/}
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="budget"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">Sélectionnez votre Budget</option>
                              <option value="Gratuit">Gratuit 0$</option>
                              <option value="Limite">Budget limité 0$-100$</option>
                              <option value="Modere">Budget modéré 100$-500$</option>
                              <option value="Eleve">Budget élevé 500$-1000$</option>
                              <option value="Sans">Sans contrainte budgétaire</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Type de contenu prefere
                            </label>
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="type_de_contenu_prefere"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">Sélectionnez votre Type de contenu préféré</option>
                              <option value="Interactifs">Cours interactifs</option>
                              <option value="Workshop">workshop</option>
                              <option value="Projet">Projet</option>
                              <option value="Engroupe">Travaille en groupe</option>
                              <option value="Sans">Sans contrainte</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <div className="availability-container">
                              <h2 className="availability-heading text-blueGray-300">Disponibilité</h2>
                              <div className="days-section text-blueGray-400">
                                <h3 className="text-blueGray-400">Jours de la semaine</h3>
                                <div className="day-checkboxes">
                                  <div className="day-column">
                                    {[' Lundi', ' Jeudi', ' Samedi'].map((day) => (
                                      <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                                   onChange={handleDayChange}/>
                                    ))}
                                  </div>
                                  <div className="day-column">
                                    {[' Mardi', ' Vendredi', ' Dimanche'].map((day) => (
                                      <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                                   onChange={handleDayChange}/>
                                    ))}
                                  </div>
                                  <div className="day-column">
                                    {[' Mercredi'].map((day) => (
                                      <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                                   onChange={handleDayChange}/>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="times-section">
                                <h3 className="text-blueGray-400">Heures de la journée</h3>
                                <div className="time-checkboxes text-blueGray-400">
                                  {['Matin', 'Après-midi', 'Soir'].map((time) => (
                                    <div key={time}>
                                      <input
                                        type="checkbox"
                                        id={`${time}-checkbox`}
                                        name={time}
                                        checked={availability.times.includes(time)}
                                        onChange={handleTimeChange}
                                      />
                                      <label htmlFor={`${time}-checkbox`}
                                             className="ml-2">{time.charAt(0).toUpperCase() + time.slice(1)}</label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <div className="availability-container">
                              <label
                                className="block uppercase text-blueGray-400 text-xs font-bold mb-2"
                                htmlFor="interests"
                              >
                                Preferences linguistiques
                              </label>

                              <div className="flex flex-col">
                                {Object.keys(selectedLanguages).map((language) => (
                                  <div key={language} className="flex items-center mb-2">
                                    <input
                                      type="checkbox"
                                      id={`${language}-checkbox`}
                                      value={language}
                                      checked={selectedLanguages[language]}
                                      onChange={() => handleCheckboxChange(language)}
                                    />
                                    <label htmlFor={`${language}-checkbox`} className="ml-2 text-blueGray-400">{language}</label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      {Step === '3' ? (<>
                        <div className="text-center mt-4">
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                              className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                              type="button"
                              onClick={(e) => setStep('2')}
                            >
                              précédent
                            </button>
                          <button
                            className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={(e) =>handleSubmit(e)}
                          >
                            Valider
                          </button>
                          </div>
                        </div>
                      </>) : (<>
                        {/*<div className="text-center mt-4">*/}
                        {/*  /!* <Link to="/landing"> *!/*/}
                        {/*  <div style={{ display: 'flex', justifyContent: 'space-between' }}>*/}
                        {/*    <button*/}
                        {/*      className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"*/}
                        {/*      type="button"*/}
                        {/*      onClick={(e) => setStep('2')}*/}
                        {/*    >*/}
                        {/*      précédent*/}
                        {/*    </button>*/}
                        {/*    <button*/}
                        {/*      className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"*/}
                        {/*      type="button"*/}
                        {/*      onClick={(e) => setStep('3')}*/}
                        {/*    >*/}
                        {/*      Suivant*/}
                        {/*    </button>*/}
                        {/*  </div>*/}
                        {/*  /!* </Link> *!/*/}
                        {/*</div>*/}
                      </>)}

                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
