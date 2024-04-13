import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { createFormation, deleteFormation, getAllFormations, updateFormation } from '../../../Services/ApiFormation'
import { getCentre, getFormateur } from '../../../Services/ApiUser'
import { CiSquareRemove } from 'react-icons/ci'

export default function ListeFormations ({ color }) {
  const jwt_token = Cookies.get('jwt_token')

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  const [users, setUsers] = useState([])
  const [centres, setCentres] = useState([])
  const [formations, setFormations] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [formationToEdit, setFormationToEdit] = useState(null)
  const [newFormation, setNewFormation] = useState({
    titre: '',
    description: '',
    niveauRequis: '',
    niveauDengagementRequis: '',
    competences: '',
    niveauDeDifficulte: '',
    styleEnseignement: '',
    Prix: '',
    jours: '',
    typeContenu: '',
    langue: '',
    emplacement: '',
    sujetInteret: '',
    Tranches_Horaires: '',
    duree: 0,
    dateDebut: new Date(),
    dateFin: new Date(),
    centre: '', // Ici, vous pouvez stocker l'ID du centre sélectionné
    formateur: '', // Ici, vous pouvez stocker l'ID du formateur sélectionné
  })
  const [errors, setErrors] = useState({
    titre: false,
    description: false,
    niveauRequis: false,
    niveauDengagementRequis: false,
    competences: false,
    niveauDeDifficulte: false,
    styleEnseignement: false,
    Prix: false,
    jours: false,
    typeContenu: false,
    langue: false,
    emplacement: false,
    sujetInteret: false,
    Tranches_Horaires: false,
    duree: false,
    dateDebut: new Date(),
    dateFin: new Date(),
    centre: false, // Ici, vous pouvez stocker l'ID du centre sélectionné
    formateur: false, // Ici, vous pouvez stocker l'ID du formateur sélectionné  });
  });
  const loadFormations = useCallback(async () => {
    try {
      const res = await getAllFormations(config)
      setFormations(res.data.formations)
    } catch (error) {
      console.error('Error loading formations:', error)
    }
  }, [config])

  useEffect(() => {
    loadFormations()
  }, [loadFormations])

  const loadFormateurs = useCallback(async () => {
    try {
      const res = await getFormateur(config)
      setUsers(res.data.users)
    } catch (error) {
      console.error('Error loading formateurs:', error)
    }
  }, [config])

  // Fonction pour charger la liste des centres
  const loadCentres = useCallback(async () => {
    try {
      const res = await getCentre(config)
      setCentres(res.data.users)
    } catch (error) {
      console.error('Error loading centres:', error)
    }
  }, [config])

  useEffect(() => {
    loadFormateurs()
    loadCentres()
  }, [loadFormateurs, loadCentres])
  // Fonction pour gérer le changement d'image
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]
    setNewFormation({ ...newFormation, image: imageFile }) // Stockez l'image dans l'état local
  }

// Fonction pour ajouter une nouvelle formation avec image
  const handleAddFormation = async () => {
    try {
        const newErrors = {};
        let hasErrors = false;

        // Valider le titre
        if (newFormation.titre.trim() === "") {
          newErrors.titre = true;
          hasErrors = true;
        }

        // Valider la description (exemple)
        if (newFormation.description.trim() === "") {
          newErrors.description = true;
          hasErrors = true;
        }

        // // Valider le centre (exemple)
        // if (newFormation.centre.trim() === "") {
        //   newErrors.centre = true;
        //   hasErrors = true;
        // }

        // Valider le formateur (exemple)
        if (newFormation.formateur.trim() === "") {
          newErrors.formateur = true;
          hasErrors = true;
        }

        if (newFormation.styleEnseignement.trim() === "") {
          newErrors.styleEnseignement = true;
          hasErrors = true;
        }

        if (newFormation.Prix.trim() === "") {
          newErrors.Prix = true;
          hasErrors = true;
        }

        if (newFormation.jours.trim() === "") {
          newErrors.jours = true;
          hasErrors = true;
        }

        if (newFormation.typeContenu.trim() === "") {
          newErrors.typeContenu = true;
          hasErrors = true;
        }

        if (newFormation.langue.trim() === "") {
          newErrors.langue = true;
          hasErrors = true;
        }

        if (newFormation.emplacement.trim() === "") {
          newErrors.emplacement = true;
          hasErrors = true;
        }
        if (newFormation.sujetInteret.trim() === "") {
          newErrors.sujetInteret = true;
          hasErrors = true;
        }

        if (newFormation.Tranches_Horaires.trim() === "") {
          newErrors.Tranches_Horaires = true;
          hasErrors = true;
        }
        // if (newFormation.duree.trim() === '') {
        //   newErrors.duree = true;
        //   hasErrors = true;
        // }
        if (newFormation.niveauDengagementRequis.trim() === "") {
          newErrors.niveauDengagementRequis = true;
          hasErrors = true;
        }
        if (newFormation.niveauDeDifficulte.trim() === "") {
          newErrors.niveauDeDifficulte = true;
          hasErrors = true;
        }
        if (newFormation.niveauRequis.trim() === "") {
          newErrors.niveauRequis = true;
          hasErrors = true;
        }
        // if (newFormation.dateDebut.trim() === '') {
        //   newErrors.dateDebut = true;
        //   hasErrors = true;
        // }
        // if (newFormation.dateFin.trim() === '') {
        //   newErrors.dateFin = true;
        //   hasErrors = true;
        // }
        // Si des erreurs sont trouvées, les mettre à jour et arrêter le processus
        if (hasErrors) {
          setErrors(newErrors);
          return;
        }
      const formData = new FormData()
      formData.append('image_Formation', newFormation.image) // Ajoutez l'image à l'objet FormData
      formData.append('titre', newFormation.titre) // Ajoutez l'image à l'objet FormData
      formData.append('description', newFormation.description) // Ajoutez l'image à l'objet FormData
      formData.append('competences', newFormation.competences) // Ajoutez l'image à l'objet FormData
      formData.append('styleEnseignement', newFormation.styleEnseignement) // Ajoutez l'image à l'objet FormData
      formData.append('Prix', newFormation.Prix) // Ajoutez l'image à l'objet FormData
      formData.append('jours', newFormation.jours) // Ajoutez l'image à l'objet FormData
      formData.append('typeContenu', newFormation.typeContenu) // Ajoutez l'image à l'objet FormData
      formData.append('langue', newFormation.langue) // Ajoutez l'image à l'objet FormData
      formData.append('emplacement', newFormation.emplacement) // Ajoutez l'image à l'objet FormData
      formData.append('sujetInteret', newFormation.sujetInteret) // Ajoutez l'image à l'objet FormData
      formData.append('Tranches_Horaires', newFormation.Tranches_Horaires) // Ajoutez l'image à l'objet FormData
      formData.append('duree', newFormation.duree) // Ajoutez l'image à l'objet FormData
      formData.append('niveauDengagementRequis', newFormation.niveauDengagementRequis) // Ajoutez l'image à l'objet FormData
      formData.append('niveauDeDifficulte', newFormation.niveauDeDifficulte) // Ajoutez l'image à l'objet FormData
      formData.append('niveauRequis', newFormation.niveauRequis) // Ajoutez l'image à l'objet FormData
      formData.append('dateDebut', newFormation.dateDebut) // Ajoutez l'image à l'objet FormData
      formData.append('dateFin', newFormation.dateFin) // Ajoutez l'image à l'objet FormData
      formData.append('centre', newFormation.centre) // Ajoutez l'image à l'objet FormData
      formData.append('formateur', newFormation.formateur) // Ajoutez l'image à l'objet FormData

      // Ajoutez d'autres champs de formation à formData
      await createFormation(formData, config).then(showAddForm(false))
      // Reste du code pour ajouter la formation sans image
    } catch (error) {
      console.error('Error adding formation:', error)
    }
  }

// Fonction pour modifier une formation avec image
  const handleEditFormation = async () => {
    try {
      const formData = new FormData()
      formData.append('image', newFormation.image) // Ajoutez l'image à l'objet FormData
      // Ajoutez d'autres champs de formation à formData
      await updateFormation(formationToEdit._id, formData, config)
      // Reste du code pour modifier la formation sans image
    } catch (error) {
      console.error('Error updating formation:', error)
    }
  }

  const handleDeleteFormation = async (id) => {
    try {
      await deleteFormation(id, config)
      loadFormations()
    } catch (error) {
      console.error('Error deleting formation:', error)
    }
  }

  const showEditFormPopup = (formation) => {
    setFormationToEdit(formation)
    setNewFormation({
      titre: formation.titre,
      description: formation.description,
    })
    setShowEditForm(true)
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

  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedCompetences, setSelectedCompetences] = useState([])
  const [domaineSelectionne, setDomaineSelectionne] = useState('')
  const [competenceSelectionnee, setCompetenceSelectionnee] = useState('')

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
    setNewFormation(prevPreferences => ({
      ...prevPreferences,
      competences: selectedCompetences.join(', ')
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
    setNewFormation({ ...newFormation, [event.target.name]: event.target.value })
    console.log(newFormation)
    setDomaineSelectionne(event.target.value)
    setCompetenceSelectionnee('') // Réinitialiser la compétence sélectionnée lorsque le domaine change
  }

  const handleChangeCompetence = (event) => {
    setCompetenceSelectionnee(event.target.value)
    handleAddCompetence(event.target.value, event)
  }

  const handleSelectChange = (event) => {
    setNewFormation({ ...newFormation, [event.target.name]: event.target.value })
    console.log(newFormation)
  }

  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

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

  const handleStateChange = (event) => {
    setSelectedState(event.target.value)
    setSelectedCity('')
    setNewFormation(prevPreferences => ({
      ...prevPreferences,
      emplacement: event.target.value, // Mettez à jour emplacement_actuelle avec l'état sélectionné
    }))
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
    setNewFormation(prevPreferences => ({
      ...prevPreferences,
      emplacement: `${selectedState}, ${event.target.value}`, // Mettez à jour emplacement_actuelle avec la ville sélectionnée
    }))
  }

  const [availability, setAvailability] = useState({
    days: [],
    times: [],
  })

  const handleDayChange = (event) => {
    const { name, checked } = event.target
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      days: checked ? [...prevAvailability.days, name] : prevAvailability.days.filter((day) => day !== name),
    }))

    setNewFormation((prevPreferences) => ({
      ...prevPreferences,
      jours: checked
        ? [...prevPreferences.jours.split(','), name].join(',')
        : prevPreferences.jours.split(',').filter((day) => day !== name).join(','),
    }))
  }

  const handleTimeChange = (event) => {
    const { name, checked } = event.target
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      times: checked ? [...prevAvailability.times, name] : prevAvailability.times.filter((time) => time !== name),
    }))

    setNewFormation((prevPreferences) => ({
      ...prevPreferences,
      Tranches_Horaires: checked
        ? [...prevPreferences.Tranches_Horaires.split(','), name].join(',')
        : prevPreferences.Tranches_Horaires.split(',').filter((time) => time !== name).join(','),
    }))
  }

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

  return (
    <>
      <div
        className={'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-white'}>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={'font-semibold text-lg text-white'}>
                Liste Formations
              </h3>
            </div>
            <button
              className="bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button" onClick={() => setShowAddForm(true)}>
              <div className="flex items-center">
                Ajouter une Formation
              </div>
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Titre
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Description
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Niveau Requis
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Niveau d'Engagement Requis
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Compétences
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Niveau de Difficulté
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Style d'Enseignement
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Prix
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Jours
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Type de Contenu
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Langue
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Emplacement
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Sujet d'Intérêt
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Tranches Horaires
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Durée
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Date de Début
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Date de Fin
              </th>
              <th
                className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Actions
              </th>
            </tr>
            </thead>
            <tbody>
            {formations.length > 0 ? (
              formations.map((formation) => (
              <tr key={formation._id}>
                <td
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 font-bold">
                  {formation.titre}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 ">
                  {formation.description}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 ">
                  {formation.niveauRequis}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 ">
                  {formation.niveauDengagementRequis}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 ">
                  {formation.competences}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 ">
                  {formation.niveauDeDifficulte}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 ">
                  {formation.styleEnseignement}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 ">
                  {formation.Prix}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 ">
                  {formation.jours}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4">
                  {formation.typeContenu}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4">
                  {formation.langue}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4">
                  {formation.emplacement}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4">
                  {formation.sujetInteret}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4">
                  {formation.Tranches_Horaires}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4">
                  {formation.duree}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4">
                  {formation.dateDebut}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4">
                  {formation.dateFin}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded"
                          onClick={() => showEditFormPopup(formation)}>Modifier
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => handleDeleteFormation(formation._id)}>Supprimer
                  </button>
                </td>
              </tr>
            ))
              ) : (
              <tr>
              <td colSpan="20" className="text-center">Aucune formation disponible</td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showAddForm && (
        <div
          className="absolute top-11 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow lg:w-8/12">
            <h3>Ajouter une nouvelle formation</h3>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div className="w-full">
                  <label htmlFor="titre">titre</label>
                  <input type="text" placeholder="titre" value={newFormation.titre}
                         onChange={(e) => setNewFormation({ ...newFormation, titre: e.target.value })}
                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {errors.titre && (
                    <span className="text-red-500">
                          Veuillez saisir un titre pour la formation.
                        </span>
                  )}
                </div>
                <div className="px-4 w-full">
                  <label htmlFor="description">description</label>
                  <input type="text" placeholder="description" value={newFormation.description}
                         onChange={(e) => setNewFormation({ ...newFormation, description: e.target.value })}
                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {errors.description && (
                    <span className="text-red-500">
                          Veuillez saisir une description pour la formation.
                        </span>
                  )}
                </div>
                <div className=" w-full">
                  <label htmlFor="centre">Centre :</label>
                  <select id="centre" value={newFormation.centre}
                          onChange={(e) => setNewFormation({ ...newFormation, centre: e.target.value })}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                  >
                    <option value="">Sélectionner un</option>
                    {centres.map((centre) => (
                      <option key={centre._id} value={centre._id}>{centre.nom}</option>
                    ))}
                  </select>
                    {errors.centre && (
                      <span className="text-red-500">
                        Veuillez choisire un centre pour la formation.
                      </span>
                    )}
                </div>
                <div className="px-3 w-full">
                  <label htmlFor="formateur">Formateur :</label>
                  <select id="formateur" value={newFormation.formateur}
                          onChange={(e) => setNewFormation({ ...newFormation, formateur: e.target.value })}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Sélectionner un</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>{user.nom}</option>
                    ))}
                  </select>
                  {errors.formateur && (
                    <span className="text-red-500">
                          Veuillez choisire un formateur pour la formation.
                        </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div className=" w-full">
                  <label htmlFor="Prix">Prix</label>
                  <input type="number" placeholder="Prix" value={newFormation.Prix}
                         onChange={(e) => setNewFormation({ ...newFormation, Prix: e.target.value })}
                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {errors.Prix && (
                    <span className="text-red-500">
                          Veuillez saisir un Prix pour la formation.
                        </span>
                  )}
                </div>
                <div className="px-4 w-full">
                  <label htmlFor="Style d'enseignement">styleEnseignement</label>
                  <select
                    id="styleEnseignement"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="styleEnseignement"
                    onChange={(e) => handleSelectChange(e)}
                  >
                    <option value="">Style d'Enseignement</option>
                    <option value="enligne">Enligne</option>
                    <option value="hybride">Hybride</option>
                    <option value="presentiel">Présentiel</option>
                  </select>
                  {errors.styleEnseignement && (
                    <span className="text-red-500">
                          Veuillez saisir un styleEnseignement pour la
                          formation.
                        </span>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="niveauRequis">niveauRequis</label>
                  <select
                    id="niveauRequis"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="niveauRequis"
                    onChange={(e) => handleSelectChange(e)}
                  >
                    <option value="">Niveau Etude</option>
                    <option value="Primaire">Primaire</option>
                    <option value="Secondaire">Secondaire</option>
                    <option value="Baccalaureat">Baccalaureat</option>
                    <option value="Superieur">Superieur</option>
                    <option value="Maitrise">Maitrise</option>
                    <option value="Formations">Formations</option>
                  </select>
                  {errors.niveauRequis && (
                    <span className="text-red-500">
                          Veuillez saisir un niveauRequis pour la formation.
                        </span>
                  )}
                </div>
                <div className="px-4 w-full">
                  <label htmlFor="Type de contenu">typeContenu</label>
                  <select
                    id="typeContenu"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="typeContenu"
                    onChange={(e) => handleSelectChange(e)}
                  >
                    <option value="">Type de contenu</option>
                    <option value="interactifs">Cours interactifs</option>
                    <option value="workshop">workshop</option>
                    <option value="projet">Projet</option>
                    <option value="engroupe">Travaille en groupe</option>
                    <option value="Sans">Sans contrainte</option>
                  </select>
                  {errors.typeContenu && (
                    <span className="text-red-500">
                          Veuillez saisire un typeContenu pour la formation.
                        </span>
                  )}
                </div>
              </div>
            </div>
            {/* Deuxième groupe de champs */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div>
                  <label htmlFor="Langue">langue</label>
                  <select
                    id="langue"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="langue"
                    onChange={(e) => handleSelectChange(e)}
                  >
                    <option value="">langue</option>
                    <option value="Francais">Francais</option>
                    <option value="Anglais">Anglais</option>
                    <option value="Langue_maternelle">Langue_maternelle</option>
                  </select>
                  {errors.langue && (
                    <span className="text-red-500">
                          Veuillez saisire un langue pour la formation.
                        </span>
                  )}
                </div>
                <div className="px-4">
                  <label htmlFor="Durée">duree :</label>
                  <select
                    id="duree"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="duree"
                    onChange={(e) => handleSelectChange(e)}
                  >
                    <option value="">duree</option>
                    <option value="60">1H00/60Min</option>
                    <option value="90">1H30/90Min</option>
                    <option value="120">2H00/120Min</option>
                    <option value="150">2H30/150Min</option>
                    <option value="180">3H00/180Min</option>
                    <option value="210">3H30/210Min</option>
                    <option value="240">4H00/240Min</option>
                    <option value="270">4H30/270Min</option>
                    <option value="300">5H00/300Min</option>
                    <option value="330">5H30/330Min</option>
                  </select>
                  {errors.duree && (
                    <span className="text-red-500">
                          Veuillez saisire un duree pour la formation.
                        </span>
                  )}
                </div>
                <div>
                  <label htmlFor="Durée">Photo de couverture :</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)}
                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  /></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div>
                  <div className="grid grid-cols-3 gap-4 flex items-center">
                    <div>
                      <label htmlFor="Sujet d'intérêt">Domaine de Formation</label>
                      <select id="domaine" value={domaineSelectionne} name="sujetInteret"
                              onChange={handleChangeDomaine}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        {Object.keys(sousListesCompetence).map((domaine) => (
                          <option key={domaine} value={domaine}>{domaine}</option>
                        ))}
                      </select>
                      {errors.sujetInteret && (
                        <span className="text-red-500">
                              Veuillez saisir votre sujet Interet pour la
                              formation.
                            </span>
                      )}
                    </div>
                    <div>
                      {domaineSelectionne && (
                        <div className="px-4 w-full">
                          <label htmlFor="competence">Sélectionnez compétence </label>
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
                      {errors.competences && (
                        <span className="text-red-500">
                              Veuillez saisir une competence pour la formation.
                            </span>
                      )}
                    </div>
                    <div className="px-4 w-full">
                      <div className="grid grid-cols-3 gap-4 flex items-center">
                        <div className="w-full">
                          <label htmlFor="Emplacement"> Emplacement </label>
                          {/*<input type="text" placeholder="Emplacement" value={newFormation.emplacement} onChange={(e) => setNewFormation({ ...newFormation, emplacement: e.target.value })}/>*/}
                          <div>
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
                        </div>
                        <div className="px-4 w-full">
                          {selectedState && (
                            <div>
                              <label
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
                          {errors.emplacement && (
                            <span className="text-red-500">
                                  Veuillez saisir votre emplacement pour la
                                  formation.
                                </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-4 flex items-center">
                  <div className="w-full ">
                    <div className="relative w-full ">
                      {/*<label className="block uppercase text-blueGray-600 text-xs font-bold "*/}
                      {/*       htmlFor="competence-input">Compétence Formation</label>*/}
                      <label htmlFor="Sujet d'intérêt">Compétence Formation</label>
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
                            className="inline-block bg-blue-500 text-dark rounded-full font-bold px-2 py-1 rounded"
                            disabled={selectedCompetences.includes(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-4 flex items-center">
                  <div className="w-full">
                    <label htmlFor="niveauDeDifficulte">niveauDeDifficulte</label>
                    {/*<input type="Date de début" placeholder="niveauDeDifficulte" value={newFormation.niveauDeDifficulte} onChange={(e) => setNewFormation({ ...newFormation, niveauDeDifficulte: e.target.value })}/>*/}
                    <select
                      id="niveauDeDifficulte"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="niveauDeDifficulte"
                      onChange={(e) => handleSelectChange(e)}
                    >
                      <option value="">Niveau Difficulte</option>
                      <option value="debutant">Débutant</option>
                      <option value="intermediaire">Intermédiaire</option>
                      <option value="avance">Avancé</option>
                    </select>
                    {errors.niveauDeDifficulte && (
                      <span className="text-red-500">
                            Veuillez saisir un niveauDeDifficulte pour la
                            formation.
                          </span>
                    )}
                  </div>
                  <div className="px-4 ">
                    <div className=" w-full">
                      <label htmlFor="niveauDengagementRequis">niveauDengagementRequis</label>
                      {/*<input type="number" placeholder="niveauDengagementRequis" value={newFormation.niveauDengagementRequis} onChange={(e) => setNewFormation({ ...newFormation, niveauDengagementRequis: e.target.value })}/>*/}
                      <select
                        id="niveauDengagementRequis"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="niveauDengagementRequis"
                        onChange={(e) => handleSelectChange(e)}
                      >
                        <option value="">Niveau D'engagement</option>
                        <option value="4S">consacrer du temps régulier à la formation 4 Seance</option>
                        <option value="2S">sessions d'apprentissage plus courtes 2 Seance</option>
                        <option value="1S">intermittentes 1 Seance</option>
                      </select>
                      {errors.niveauDengagementRequis && (
                        <span className="text-red-500">
                              Veuillez saisir un niveauDengagementRequis pour la
                              formation.
                            </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    {/*<input type="date" placeholder="Date de début" value={newFormation.dateDebut} onChange={(e) => setNewFormation({ ...newFormation, dateDebut: e.target.value })}/>*/}
                    <label htmlFor="dateDebut">Date Debut </label>
                    <input
                      type="datetime-local"
                      id="dateDebut"
                      name="dateDebut"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={handleSelectChange}
                      max={new Date().toISOString().split('T')[0]} // Définit la date maximale sur aujourd'hui
                    />
                  </div>
                  <div className="px-4 w-full">
                    {/*<input type="date" placeholder="Date de fin" value={newFormation.dateFin} onChange={(e) => setNewFormation({ ...newFormation, dateFin: e.target.value })}/>*/}
                    <label htmlFor="dateFin w-full">Date Fin</label>
                    <input
                      type="datetime-local"
                      id="dateFin"
                      name="dateFin"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={handleSelectChange}
                      max={new Date().toISOString().split('T')[0]} // Définit la date maximale sur aujourd'hui
                    />
                  </div>
                  {/*<div>*/}
                  {/*  <label htmlFor="niveauRequis">niveauRequis :</label>*/}
                  {/*  /!*<input type="text" placeholder="niveauRequis" value={newFormation.niveauRequis} onChange={(e) => setNewFormation({ ...newFormation, niveauRequis: e.target.value })}/>*!/*/}
                  {/*  <select*/}
                  {/*    id="niveauRequis"*/}
                  {/*    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                  {/*    name="niveauRequis"*/}
                  {/*    onChange={(e) => handleSelectChange(e)}*/}
                  {/*  >*/}
                  {/*    <option value="">Niveau Etude</option>*/}
                  {/*    <option value="Primaire">Primaire</option>*/}
                  {/*    <option value="Secondaire">Secondaire</option>*/}
                  {/*    <option value="Baccalaureat">Baccalaureat</option>*/}
                  {/*    <option value="Superieur">Superieur</option>*/}
                  {/*    <option value="Maitrise">Maitrise</option>*/}
                  {/*    <option value="Formations">Formations</option>*/}
                  {/*    /!* Ajoutez d'autres options selon vos besoins *!/*/}
                  {/*  </select>*/}
                  {/*</div>*/}
                </div>
              </div>
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-4 flex items-center">

                </div>
              </div>
            </div>
            {/* Quatrième groupe de champs */}
            <div className="mb-4">
              <div>
                <div className="availability-container">
                  <h2 className="availability-heading text-blueGray-300">Disponibilité</h2>
                  <div className="days-section text-blueGray-400">
                    <h3 className="text-blueGray-400">Jours de la semaine</h3>
                    <div className="day-checkboxes">
                      <div className="day-column">
                        {[' lundi'].map((day) => (
                          <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                       onChange={handleDayChange}/>
                        ))}
                      </div>
                      <div className="day-column">
                        {[' mardi'].map((day) => (
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
                      <div className="day-column">
                        {[' jeudi'].map((day) => (
                          <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                       onChange={handleDayChange}/>
                        ))}
                      </div>
                      <div className="day-column">
                        {[' vendredi'].map((day) => (
                          <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                       onChange={handleDayChange}/>
                        ))}
                      </div>
                      <div className="day-column">
                        {[' samedi'].map((day) => (
                          <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                       onChange={handleDayChange}/>
                        ))}
                      </div>
                      <div className="day-column">
                        {[' dimanche'].map((day) => (
                          <DayCheckbox key={day} day={day} checked={availability.days.includes(day)}
                                       onChange={handleDayChange}/>
                        ))}
                      </div>
                    </div>
                  </div>
                  {errors.jours && (
                    <span className="text-red-500">
                          Veuillez saisir un jours pour la formation.
                        </span>
                  )}
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
                      {errors.Tranches_Horaires && (
                        <span className="text-red-500">
                              Veuillez saisir une Tranches_Horaires pour la
                              formation.
                            </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">

              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">

              {/*<div>*/}
              {/*  <label htmlFor="Tranches horaires">Tranches_Horaires :</label>*/}
              {/*  <input type="text" placeholder="Tranches horaires" value={newFormation.Tranches_Horaires}*/}
              {/*         onChange={(e) => setNewFormation({ ...newFormation, Tranches_Horaires: e.target.value })}/>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*  <label htmlFor="Jours">jours</label>*/}
              {/*  <input type="text" placeholder="Jours" value={newFormation.jours}*/}
              {/*         onChange={(e) => setNewFormation({ ...newFormation, jours: e.target.value })}/>*/}
              {/*</div>*/}
            </div>

            {/* Boutons de soumission et d'annulation */}
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4"
                      onClick={handleAddFormation}>Ajouter
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowAddForm(false)}>Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Popup d'édition de formation */}
      {showEditForm && (
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Modifier la formation</h3>
            <div className="mb-4">
              <input type="text" placeholder="Titre" value={newFormation.titre}
                     onChange={(e) => setNewFormation({ ...newFormation, titre: e.target.value })}/>
            </div>
            <div className="mb-4">
              <textarea placeholder="Description" value={newFormation.description}
                        onChange={(e) => setNewFormation({ ...newFormation, description: e.target.value })}></textarea>
            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4"
                      onClick={handleEditFormation}>Enregistrer
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowEditForm(false)}>Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
