import React, { useEffect, useMemo, useState } from 'react'
// import { Link } from 'react-router-dom'
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3, } from 'react-icons/tb'
import { BiBeenHere, BiSolidBeenHere } from 'react-icons/bi'
// import { useLocation } from 'react-router-dom'
import { CiSquareRemove } from 'react-icons/ci'
import {updatePrefClient , getPreferences  }from '../../../Services/ApiPref'
import Cookies from 'js-cookie'
import { getUserAuth } from '../../../Services/Apiauth'
// import { useHistory } from 'react-router-dom'

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

// Assurez-vous de déclarer `user` avant de l'utiliser
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserAuth(config);
        setUser(userResponse.data.user);

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



  const initialSelectedLanguages = {
    Francais: false,
    Anglais: false,
    Langue_maternelle: false,
  };

  // const history = useHistory()
  const [user, setUser] = useState([]);
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
    // domaine_actuelle: '',
    // objectifs_de_carriere: '',
    // Domaine_dinteret: '',
    // competences_dinteret: '',
    // niveau_dexperience_professionnelle: '',
    // interets_personnels: '',
    // date_anniversaire: '',
    // niveau_etude: '',
    // niveau_de_difficulte: '',
    // niveau_dengagement: '',
    // besoin: '',
    // emplacement_actuelle: '',
    // style_dapprentissage: '',
    // budget: '',
    // disponibilite: '',
    // duree_preferee: '',
    // type_de_contenu_prefere: '',
    // preferences_linguistiques: '',
    // historique_dapprentissage: '',
  })


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
    Etudiant: ['Étudiant', 'Lycéen', 'Apprenti', 'Stagiaire'],
    RH: ['Recruteur', 'Gestionnaire de la paie', 'Responsable des ressources humaines', 'Analyste des avantages sociaux', 'Spécialiste de la formation et du développement'],
    IT: ['Developpeur logiciel', 'Administrateur système', 'Ingenieur en sécurité informatique', 'Analyste en assurance qualité', 'Architecte cloud'],
    Developpeur: ['Developpeur FullStack', 'Developpeur front-end', 'Developpeur back-end', 'Concepteur UX/UI', 'Integrateur web', 'Developpeur mobile', 'Specialiste en SEO'],
    Architecture: ['Architecte', 'Urbaniste', 'Technicien en batiment', 'Designer d\'interieur', 'Ingenieur structure'],
    Finance: ['Analyste financier', 'Comptable', 'Controleur financier', 'Conseiller en investissement', 'Trader'],
    Marketing: ['Chef de produit', 'Responsable marketing digital', 'Analyste de marche', 'Charge de communication', 'Gestionnaire de marque'],
    Medical: ['Medecin generaliste', 'Infirmier', 'Chirurgien', 'Pharmacien', 'Radiologue'],
    Juridique: ['Avocat', 'Juge', 'Notaire', 'Huissier de justice', 'Conseiller juridique'],
    Education: ['Enseignant', 'Professeur d\'universite', 'Formateur', 'Conseiller pedagogique', 'Directeur d\'ecole'],
    Ingenierie: ['Ingenieur civil', 'Ingenieur mecanique', 'Ingenieur electrique', 'Ingenieur en aerospatiale', 'Ingenieur logiciel'],
    Art_et_culture: ['Artiste', 'Ecrivain', 'Musicien', 'Acteur', 'Historien d\'art'],
    Vente: ['Commercial', 'Vendeur', 'Chef de secteur', 'Conseiller de vente', 'Representant commercial'],
    Communication: ['Responsable communication', 'Charge de relations publiques', 'Community manager', 'Attache de presse', 'Responsable des evenements'],
    Recherche: ['Chercheur', 'Assistant de recherche', 'Technicien de laboratoire', 'Ingenieur de recherche', 'Analyste de donnees'],
    Consultation: ['Consultant en gestion', 'Consultant en strategie', 'Consultant financier', 'Consultant en informatique', 'Consultant RH'],
    Logistique: ['Responsable logistique', 'Gestionnaire des stocks', 'Planificateur de production', 'Coordinateur de transport', 'Agent de fret'],
    Transport: ['Chauffeur de camion', 'Pilote d\'avion', 'Mecanicien d\'avion', 'Agent de service a la clientele', 'Agent de bord'],
    Tourisme: ['Agent de voyage', 'Guide touristique', 'Directeur d\'hotel', 'Responsable des reservations', 'Animateur touristique']
  }

  const sousListesCompetence = {
    RH: ['Recrutement', 'Selection', 'Gestion', 'Gestion de la paie', 'Formation', 'Formation des employes', 'Gestion des performances', 'Relations', 'Relations employes', 'Resolution', 'Resolution de conflits'],
    IT: ['Developpement de logiciels', 'Administration systeme', 'Securite informatique', 'Analyse de donnees', 'Architecture cloud'],
    Developpement_Web: ['HTML', 'CSS', 'JavaScript', 'Python', 'PHP', 'Java', 'C#', 'TypeScript', 'SQL'],
    Developpement_mobile: ['Flutter', 'React Native', 'Ionic', 'Swift', 'Kotlin'],
    Developpement_frontend: ['React', 'Angular', 'Vue', 'Svelte', 'Ember'],
    Developpement_backend: ['Node.js', 'Express', 'Django', 'Ruby on Rails', 'Spring Boot'],
    Architecture: ['Conception architecturale', 'Dessin technique', 'Modelisation 3D', 'Gestion de projet', 'Etude de faisabilite'],
    Finance: ['Analyse financiere', 'Comptabilite', 'Gestion des investissements', 'Evaluation des risques', 'Planification financiere'],
    Marketing: ['Strategie marketing', 'Analyse de marche', 'Marketing digital', 'Gestion de la marque', 'Communication publicitaire'],
    Medical: ['Diagnostic et traitement des patients', 'Soins infirmiers', 'Chirurgie', 'Pharmacologie', 'Interpretation des resultats d\'examens'],
    Juridique: ['Recherche juridique', 'Plaidoyer', 'Redaction de contrats', 'Consultation juridique', 'Resolution de litiges'],
    Education: ['Planification de cours', 'Enseignement', 'Evaluation des eleves', 'Developpement de programmes scolaires', 'Conseil aux etudiants'],
    Ingenierie: ['Conception', 'Analyse des structures', 'Gestion de projets d\'ingenierie', 'Resolution de problemes techniques', 'Maintenance preventive et corrective'],
    Art_et_culture: ['Creation artistique', 'Ecriture creative', 'Performance musicale', 'Interpretation artistique', 'Gestion d\'evenements culturels'],
    Vente: ['Negociation', 'Prospection commerciale', 'Gestion de la relation client', 'Closing de ventes', 'Elaboration de propositions commerciales'],
    Communication: ['Communication ecrite et verbale', 'Competences interpersonnelles', 'Redaction et edition', 'Presentation orale', 'Negociation'],
    Recherche: ['Methodes de recherche', 'Analyse de donnees', 'Interpretation des resultats', 'Redaction scientifique', 'Utilisation d\'outils de recherche'],
    Consultation: ['Analyse de processus', 'Strategie d\'entreprise', 'Conseil en gestion', 'Evaluation des besoins des clients', 'Implementation de solutions'],
    Logistique: ['Gestion des stocks', 'Planification de la chaine logistique', 'Optimisation des processus logistiques', 'Suivi des expeditions', 'Gestion des retours'],
    Transport: ['Conduite en toute securite', 'Maintenance des vehicules', 'Planification des itineraires', 'Service a la clientele', 'Respect des reglementations'],
    Tourisme: ['Planification de voyages', 'Guidage touristique', 'Gestion hotelliere', 'Service a la clientele dans le secteur du tourisme', 'Organisation d\'activites touristiques']
  }

  const states = ['Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine',
    'Kébili', 'Le Kef', 'Mahdia', 'La Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid',
    'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan']

  const citiesByState = {
    Ariana: ['Ariana', 'Ettadhamen', 'Kalâat el-Andalous', 'La Soukra', 'Sidi Thabet'],
    Béja: ['Béja', 'Amdoun', 'Goubellat', 'Medjez el-Bab', 'Nefza', 'Téboursouk', 'Testour', 'Thibar'],
    'Ben Arous': ['Ben Arous', 'Bou Mhel el-Bassatine', 'El Mourouj', 'Ezzahra', 'Fouchana', 'Hammam Lif', 'Hammam Chott', 'Megrine', 'Mohamedia', 'Rades'],
    Bizerte: ['Bizerte', 'Ghar el-Melh', 'Mateur', 'Menzel Bourguiba', 'Menzel Jemil', 'Ras Jebel', 'Sejnane', 'Tinja', 'Utique', 'Zarzouna'],
    Gabès: ['Gabès', 'El Hamma', 'Ghannouch', 'Matmata', 'Mareth', 'Menzel Habib', 'Métouia'],
    Gafsa: ['Gafsa', 'El Ksar', 'Belkhir', 'Moulares', 'Redeyef', 'Mdhilla', 'El Guettar', 'Sened', 'Oum El Araies', 'Metlaoui'],
    Jendouba: ['Jendouba', 'Bou Salem', 'Tabarka', 'Aïn Draham', 'Fernana', 'Ghardimaou', 'Oued Meliz', 'Amdoun'],
    Kairouan: ['Kairouan', 'Bou Hajla', 'Chebika', 'Echrarda', 'Haffouz', 'Hajeb El Ayoun', 'Menouf', 'Nasrallah', 'Oueslatia', 'Sbikha', 'Alaâ', 'Haj Kacem', 'Menzel Mehiri'],
    Kasserine: ['Kasserine', 'Fériana', 'Sbeïtla', 'Thala', 'Hassi El Ferid', 'Ezzouhour', 'Ayoun El Atrous', 'El Ayoun', 'Foussana', 'Hidra', 'Jedelienne', 'Majel Bel Abbès', 'Sbiba', 'Thélepte'],
    Kébili: ['Kébili', 'Douz', 'Souk Lahad', 'Bechlioul', 'Faouar'],
    'Le Kef': ['Le Kef', 'Dahmani', 'Jérissa', 'Sakiet Sidi Youssef', 'Tajerouine', 'El Ksour', 'Nebeur', 'Sers', 'Kalâat Senan'],
    Mahdia: ['Mahdia', 'Bou Merdes', 'Chebba', 'El Djem', 'Ksour Essef', 'Mellouleche', 'Ouled Chamekh', 'Sidi Alouane'],
    'La Manouba': ['La Manouba', 'Den Den', 'Douar Hicher', 'El Battan', 'Mornaguia', 'Oued Ellil', 'Tebourba'],
    Médenine: ['Médenine', 'Ben Gardane', 'Djerba Ajim', 'Djerba Houmt Souk', 'Djerba Midoun', 'Zarzis'],
    Monastir: ['Monastir', 'Amiret El Fhoul', 'Bekalta', 'Bembla', 'Beni Hassen', 'Jammel', 'Ksar Hellal', 'Ksibet El Mediouni', 'Moknine', 'Ouerdanine', 'Sahline Moôtmar', 'Sayada-Lamta-Bou Hajar', 'Téboulba', 'Zéramdine'],
    Nabeul: ['Nabeul', 'Béni Khiar', 'Bou Argoub', 'Dar Chaâbane', 'El Haouaria', 'Grombalia', 'Hammam Ghezèze', 'Hammamet', 'Kelibia', 'Korba', 'Menzel Bouzelfa', 'Menzel Temime', 'Soliman', 'Takelsa'],
    Sfax: ['Sfax', 'Agareb', 'Bir Ali Ben Khalifa', 'El Amra', 'Ghraïba', 'Jebeniana', 'Kerkennah', 'Mahares', 'Menzel Chaker', 'Sakiet Ezzit', 'Sakiet Eddaïer', 'Thyna'],
    'Sidi Bouzid': ['Sidi Bouzid', 'Bir El Hafey', 'Cebbala Ouled Asker', 'Jilma', 'Menzel Bouzaiane', 'Meknassy', 'Mezzouna', 'Ouled Haffouz', 'Regueb', 'Sidi Ali Ben Aoun'],
    Siliana: ['Siliana', 'Bargou', 'Bou Arada', 'El Aroussa', 'Gaâfour', 'Kesra', 'Makthar', 'Rouhia'],
    Sousse: ['Sousse', 'Akouda', 'Bouficha', 'Enfidha', 'Hammam Sousse', 'Hergla', 'Kalâa Kebira', 'Kalâa Seghira', 'Kondar', 'Msaken', 'Sidi Bou Ali', 'Sidi El Hani', 'Zaouiet Sousse'],
    Tataouine: ['Tataouine', 'Bir Lahmar', 'Dehiba', 'Ghomrassen', 'Remada', 'Smar'],
    Tozeur: ['Tozeur', 'Degache', 'Hamet Jerid', 'Nafta', 'Tamerza', 'Nefta'],
    Tunis: ['Tunis', 'Carthage', 'La Marsa', 'Le Bardo', 'Sidi Bou Saïd'],
    Zaghouan: ['Zaghouan', 'Bir Mcherga', 'Djebel Oust', 'El Fahs', 'Nadhour'],
  }

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
      emplacement_actuelle: `${selectedState}, ${event.target.value}`, // Mettez à jour emplacement_actuelle avec la ville sélectionnée
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
      await updatePrefClient(user._id, preferences, config).then(
        // history.push("/landing")
      );

    } catch (error) {
      console.error('Error submitting preferences:', error);
      // Gérer les erreurs ici
    }
  };

  return (
    <>
      <div className=" container mx-auto px-1 h-full ">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-9/12 px-1 ">
            <div
              className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-blueGray-800 border-0">
              <div className="rounded-t  px-6 py-6">
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
                              <option value="">{preferences.objectifs_de_carriere}</option>
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
                              <option value="">{preferences.Domaine_dinteret}</option>
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
                                <option value="">{preferences.Domaine_dinteret}</option>
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
                              <option value="">{preferences.niveau_dexperience_professionnelle}</option>
                              <option value="debutant">Débutant (0-2 ans)</option>
                              <option value="intermediaire">Intermédiaire (3-5 ans)</option>
                              <option value="expert">Expert (5-10 ans)</option>
                              <option value="senior">Senior (10+ ans)</option>
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
                              <option value="">{preferences.interets_personnels}</option>
                              <option value="musique">Musique</option>
                              <option value="sports">Sports</option>
                              <option value="arts">Arts</option>
                              <option value="voyages">Voyages</option>
                              <option value="lecture">Lecture</option>
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
                              defaultValue={preferences.date_anniversaire}
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
                              <option value="">{preferences.niveau_etude}</option>
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
                            {/*<input*/}
                            {/*  type="email"*/}
                            {/*  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                            {/*  placeholder="votre Niveau D'engagement : 4S ,2S ,1S"*/}
                            {/*/>*/}
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="niveau_dengagement"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">{preferences.niveau_dengagement}</option>
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
                              <option value="">{preferences.besoin}</option>
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
                              <option value="">{preferences.niveau_de_difficulte}</option>
                              <option value="debutant">Débutant</option>
                              <option value="intermediaire">Intermédiaire</option>
                              <option value="avance">Avancé</option>
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
                              <option value="">{preferences.style_dapprentissage}</option>
                              <option value="enligne">Enligne</option>
                              <option value="hybride">Hybride</option>
                              <option value="presentiel">Présentiel</option>
                            </select>
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
                              <option value="">{preferences.budget}</option>
                              <option value="gratuit">Gratuit 0$</option>
                              <option value="limite">Budget limité 0$-100$</option>
                              <option value="modere">Budget modéré 100$-500$</option>
                              <option value="eleve">Budget élevé 500$-1000$</option>
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
                            {/*<input*/}
                            {/*  type="text"*/}
                            {/*  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                            {/*  placeholder="cours interactifs, workshop, projet , Travaille en groupe etc."*/}
                            {/*/>*/}
                            <select
                              id="interests"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              name="type_de_contenu_prefere"
                              onChange={(e) => handleSelectChange(e)}
                            >
                              <option value="">{preferences.type_de_contenu_prefere}</option>
                              <option value="interactifs">Cours interactifs</option>
                              <option value="workshop">workshop</option>
                              <option value="projet">Projet</option>
                              <option value="engroupe">Travaille en groupe</option>
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
                                    {[' lundi', ' jeudi', ' samedi'].map((day) => (
                                      <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                                   onChange={handleDayChange}/>
                                    ))}
                                  </div>
                                  <div className="day-column">
                                    {[' mardi', ' vendredi', ' dimanche'].map((day) => (
                                      <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                                   onChange={handleDayChange}/>
                                    ))}
                                  </div>
                                  <div className="day-column">
                                    {[' mercredi'].map((day) => (
                                      <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                                   onChange={handleDayChange}/>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="times-section">
                                <h3 className="text-blueGray-400">Heures de la journée</h3>
                                <div className="time-checkboxes text-blueGray-400">
                                  {['matin', 'après-midi', 'soir'].map((time) => (
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
      </div>
    </>
  )
}
