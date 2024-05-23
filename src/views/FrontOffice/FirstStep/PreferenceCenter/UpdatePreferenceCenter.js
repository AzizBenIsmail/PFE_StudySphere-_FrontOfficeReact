import React, { useEffect, useMemo, useState , useCallback} from 'react'
// import { Link } from 'react-router-dom'
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3, } from 'react-icons/tb'
import { BiBeenHere, BiSolidBeenHere } from 'react-icons/bi'
// import { useLocation } from 'react-router-dom'
import { CiSquareRemove } from 'react-icons/ci'
import { getPreferences, updatePrefCenter } from '../../../../Services/ApiPref'
import Cookies from 'js-cookie'
import { getUserAuth } from '../../../../Services/Apiauth'
import { useHistory } from 'react-router-dom'
import SiedBarSetting from '../../AccountManagement/SiedBarSetting'

export default function PreferenceCenter () {

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

// Assurez-vous de déclarer `user` avant de l'utiliser
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserAuth(config);
        const prefResponse = await getPreferences(userResponse.data.user._id, config);
        setPreferences(prefResponse.data); // Remplir le state preferences avec les données de préférences
        setSelectedCompetences(convertToFrameworkArray(prefResponse.data.competences_dinteret));

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData(); // appel répété toutes les 10 secondes
    }, 300000);

    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  }, [config]); // `user` n'est pas inclus ici car il est initialisé dans le useEffect



  const initialSelectedLanguages = useMemo(() => ({
    Francais: false,
    Anglais: false,
    Langue_maternelle: false,
  }), []);


  const history = useHistory()
  // const location = useLocation()
  const [Step, setStep] = useState('1')
  const [selectedDomaineactuelle, setSelectedDomaineactuelle] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState(initialSelectedLanguages)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedCompetences, setSelectedCompetences] = useState([])
  const [domaineSelectionne, setDomaineSelectionne] = useState('')
  const [competenceSelectionnee, setCompetenceSelectionnee] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [preferences, setPreferences] = useState({})


  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log(selectedCompetences);
  //   }, 90000)
  //
  //   return () => clearInterval(timer) // Nettoyer l'intervalle lors du démontage du composant
  // }, [preferences.competences_dinteret, selectedCompetences]);


  const handleSelectChange = (event) => {
    setPreferences({ ...preferences, [event.target.name]: event.target.value })
  }

  const sousListes = {
    Informatique: ['Developpement', 'Securite informatique', 'Base de donnees', 'Reseaux'],
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
    intelligence_artificielle: ["Machine Learning", "Deep Learning", "Chatbots", "Data Mining"],
    Developpement_Web_Frontend: ['React', 'Angular', 'Vue', 'Svelte', 'Ember'],
    Developpement_Web_Backend: ['Node.js', 'Express', 'Django', 'Ruby on Rails', 'Spring Boot'],
    Art_et_culture: ['Creation artistique', 'Ecriture creative', 'Performance musicale', 'Interpretation artistique', 'Gestion d\'evenements culturels'],
    Lettres: ['Analyse de texte','Communication ecrite et verbale', 'Competences interpersonnelles', 'Redaction et edition', 'Presentation orale','Recherche historique', 'Comprehension des evenements passes et de leur impact sur le present', 'Connaissance des differents contextes culturels',"Comprehension des processus geologiques","Capacite a interpreter les roches"],
    Langues_etrangeres: ['Anglais','Espagnol','Chinois (Mandarin)','Français','Arabe','Russe','Portugais','Allemand','Japonais','Hindi','Bengali','Swahili','Italien','Coréen','Néerlandais','Turc','Polonais','Persan (Farsi)','Vietnamien','Suédois'],
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
  function convertToFrameworkArray(string) {
    // Supprime les espaces en début et fin de chaîne
    string = string.trim();

    // Vérifie si la chaîne est vide
    if (!string) {
      return [];
    }

    // Divise la chaîne en un tableau en utilisant la virgule comme délimiteur
    const frameworks = string.split(',');

    // Supprime les espaces en début et fin de chaque élément du tableau
    const trimmedFrameworks = frameworks.map(framework => framework.trim());

    return trimmedFrameworks;
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
      console.log(selectedCompetences);
      setPreferences(prevPreferences => ({
        ...prevPreferences,
        competences_dinteret: selectedCompetences.join(', ')
      }))
    }, 3000)

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

  const updateSelectedLanguages = useCallback(() => {
    const languages = preferences.preferences_linguistiques.split(',');
    const updatedLanguages = { ...initialSelectedLanguages }; // Initialiser avec les valeurs par défaut

    // Mettre à jour les langues sélectionnées en fonction des préférences linguistiques
    languages.forEach(language => {
      updatedLanguages[language.trim()] = true; // Cocher la langue sélectionnée
    });

    setSelectedLanguages(updatedLanguages); // Mettre à jour le state des langues sélectionnées
  }, [preferences.preferences_linguistiques, initialSelectedLanguages]);


  useEffect(() => {
    if (preferences.preferences_linguistiques) {
      updateSelectedLanguages();
    }
  }, [preferences.preferences_linguistiques, updateSelectedLanguages]);


// Gérer le changement d'état des cases à cocher
  const handleCheckboxChange = (language) => {
    const updatedLanguages = { ...selectedLanguages };
    updatedLanguages[language] = !updatedLanguages[language]; // Inverser l'état de la langue sélectionnée
    setSelectedLanguages(updatedLanguages); // Mettre à jour le state des langues sélectionnées
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

  function DayCheckbox ({ day, checked, onChange, disponibilite }) {
    return (
      <div>
        <input
          type="checkbox"
          id={`${day}-checkbox`}
          name={day}
          checked={checked || disponibilite.includes(day.trim())} // Vérifie si le jour est inclus dans la disponibilité
          onChange={onChange}
        />
        <label htmlFor={`${day}-checkbox`}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
      </div>
    )
  }
  function TimeCheckbox({ time, checked, onChange, dureePreferee }) {
    return (
      <div>
        <input
          type="checkbox"
          id={`${time}-checkbox`}
          name={time}
          checked={checked || dureePreferee.includes(time.trim())} // Vérifie si le temps est inclus dans les plages horaires préférées
          onChange={onChange}
        />
        <label htmlFor={`${time}-checkbox`}>{time.charAt(0).toUpperCase() + time.slice(1)}</label>
      </div>
    );
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updatePrefCenter(preferences, config).then(
        history.push("/landing")
      );

    } catch (error) {
      console.error('Error submitting preferences:', error);
      // Gérer les erreurs ici
    }
  };

  return (
    <>
    <div className="flex flex-wrap mt-4">
          <SiedBarSetting code="2"/>
          <div className="w-7/12 px-6 ">
            <div
              className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-blueGray-800 border-0">
              <div className="rounded-t  px-6 py-4">
                <div className="text-center ">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    {Step === "1" ? ( <> Step 1 ✨</> ) :
                      Step === "2" ? (<> Step 2 ✨💡</>) : (<> Step 3 ✨💡🚀</>) }
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
                        <div className="w-full lg:w-12/12 px-4">
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
                              <option value="">{preferences.domaine_actuelle}</option>
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
                                <option value="">{preferences.domaine_actuelle}</option>
                                {sousListes[selectedDomaineactuelle].map((specialisation, index) => (
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
                        <div className="w-full lg:w-12/12 px-4">
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
                              defaultValue={preferences.date_anniversaire}
                              max={new Date().toISOString().split('T')[0]} // Définit la date maximale sur aujourd'hui
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <button
                          className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={(e) => setStep('3')}
                        >
                          Suivant
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <form>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
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
                              <option value="">{preferences.emplacement_actuelle}</option>
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
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <div className="availability-container">
                              <h2 className="availability-heading text-blueGray-300">Disponibilité</h2>
                              <div className="days-section text-blueGray-400">
                                <h3 className="text-blueGray-400">Jours de la semaine</h3>
                                <div className="day-checkboxes">
                                  <div className="day-column">
                                    {[' Lundi', ' Jeudi', ' Samedi'].map((day) => (
                                      <DayCheckbox
                                        key={day}
                                        day={day}
                                        checked={availability.days.includes(day)}
                                        onChange={handleDayChange}
                                        disponibilite={preferences.disponibilite} // Passer la disponibilité comme prop
                                      />
                                    ))}
                                  </div>
                                  <div className="day-column">
                                    {[' Mardi', ' Vendredi', ' Dimanche'].map((day) => (
                                      <DayCheckbox
                                        key={day}
                                        day={day}
                                        checked={availability.days.includes(day)}
                                        onChange={handleDayChange}
                                        disponibilite={preferences.disponibilite} // Passer la disponibilité comme prop
                                      />
                                    ))}
                                  </div>
                                  <div className="day-column">
                                    {[' Mercredi'].map((day) => (
                                      <DayCheckbox
                                        key={day}
                                        day={day}
                                        checked={availability.days.includes(day)}
                                        onChange={handleDayChange}
                                        disponibilite={preferences.disponibilite} // Passer la disponibilité comme prop
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="times-section">
                                <h3 className="text-blueGray-400">Heures de la journée</h3>
                                <div className="time-checkboxes text-blueGray-400">
                                  {['Matin', 'Après-midi', 'Soir'].map((time) => (
                                    <TimeCheckbox
                                      key={time}
                                      time={time}
                                      checked={availability.times.includes(time)}
                                      onChange={handleTimeChange}
                                      dureePreferee={preferences.duree_preferee} // Passer les plages horaires préférées comme prop
                                    />
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
                          {/* <Link to="/landing"> */}
                          <button
                            className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={(e) =>handleSubmit(e)}
                          >
                            Valider
                          </button>
                          {/* </Link> */}
                        </div>
                      </>) : (<>
                        <div className="text-center mt-4">
                          {/* <Link to="/landing"> */}
                          <button
                            className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={(e) => setStep('3')}
                          >
                            Suivant
                          </button>
                          {/* </Link> */}
                        </div>
                      </>)}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
