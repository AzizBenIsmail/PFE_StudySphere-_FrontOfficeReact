import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { getAllFormations, createFormation, updateFormation, deleteFormation } from '../../../Services/ApiFormation';
import { getFormateur, getCentre } from '../../../Services/ApiUser';

export default function ListeFormations({ color }) {
  const jwt_token = Cookies.get('jwt_token');

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  const [users, setUsers] = useState([]);
  const [centres, setCentres] = useState([]);
  const [formations, setFormations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formationToEdit, setFormationToEdit] = useState(null);
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
  });
  const loadFormations = useCallback(async () => {
    try {
      const res = await getAllFormations(config);
      setFormations(res.data.formations);
    } catch (error) {
      console.error('Error loading formations:', error);
    }
  }, [config]);

  useEffect(() => {
    loadFormations();
  }, [loadFormations]);

  const loadFormateurs = useCallback(async () => {
    try {
      const res = await getFormateur(config);
      setUsers(res.data.users);
    } catch (error) {
      console.error('Error loading formateurs:', error);
    }
  }, [config]);

  // Fonction pour charger la liste des centres
  const loadCentres = useCallback(async () => {
    try {
      const res = await getCentre(config);
      setCentres(res.data.users);
    } catch (error) {
      console.error('Error loading centres:', error);
    }
  }, [config]);

  useEffect(() => {
    loadFormateurs();
    loadCentres();
  }, [loadFormateurs, loadCentres]);
  // Fonction pour gérer le changement d'image
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setNewFormation({ ...newFormation, image: imageFile }); // Stockez l'image dans l'état local
  };

// Fonction pour ajouter une nouvelle formation avec image
  const handleAddFormation = async () => {
    try {
      const formData = new FormData();
      formData.append('image_Formation', newFormation.image); // Ajoutez l'image à l'objet FormData
      formData.append('titre', newFormation.titre); // Ajoutez l'image à l'objet FormData
      formData.append('description', newFormation.description); // Ajoutez l'image à l'objet FormData
      formData.append('competences', newFormation.competences); // Ajoutez l'image à l'objet FormData
      formData.append('styleEnseignement', newFormation.styleEnseignement); // Ajoutez l'image à l'objet FormData
      formData.append('Prix', newFormation.Prix); // Ajoutez l'image à l'objet FormData
      formData.append('jours', newFormation.jours); // Ajoutez l'image à l'objet FormData
      formData.append('typeContenu', newFormation.typeContenu); // Ajoutez l'image à l'objet FormData
      formData.append('langue', newFormation.langue); // Ajoutez l'image à l'objet FormData
      formData.append('emplacement', newFormation.emplacement); // Ajoutez l'image à l'objet FormData
      formData.append('sujetInteret', newFormation.sujetInteret); // Ajoutez l'image à l'objet FormData
      formData.append('Tranches_Horaires', newFormation.Tranches_Horaires); // Ajoutez l'image à l'objet FormData
      formData.append('duree', newFormation.duree); // Ajoutez l'image à l'objet FormData
      formData.append('niveauDengagementRequis', newFormation.niveauDengagementRequis); // Ajoutez l'image à l'objet FormData
      formData.append('niveauDeDifficulte', newFormation.niveauDeDifficulte); // Ajoutez l'image à l'objet FormData
      formData.append('niveauRequis', newFormation.niveauRequis); // Ajoutez l'image à l'objet FormData
      formData.append('dateDebut', newFormation.dateDebut); // Ajoutez l'image à l'objet FormData
      formData.append('dateFin', newFormation.dateFin); // Ajoutez l'image à l'objet FormData
      formData.append('centre', newFormation.centre); // Ajoutez l'image à l'objet FormData
      formData.append('formateur', newFormation.formateur); // Ajoutez l'image à l'objet FormData

      // Ajoutez d'autres champs de formation à formData
      await createFormation(formData, config);
      // Reste du code pour ajouter la formation sans image
    } catch (error) {
      console.error('Error adding formation:', error);
    }
  };

// Fonction pour modifier une formation avec image
  const handleEditFormation = async () => {
    try {
      const formData = new FormData();
      formData.append('image', newFormation.image); // Ajoutez l'image à l'objet FormData
      // Ajoutez d'autres champs de formation à formData
      await updateFormation(formationToEdit._id, formData, config);
      // Reste du code pour modifier la formation sans image
    } catch (error) {
      console.error('Error updating formation:', error);
    }
  };

  const handleDeleteFormation = async (id) => {
    try {
      await deleteFormation(id, config);
      loadFormations();
    } catch (error) {
      console.error('Error deleting formation:', error);
    }
  };

  const showEditFormPopup = (formation) => {
    setFormationToEdit(formation);
    setNewFormation({
      titre: formation.titre,
      description: formation.description,
    });
    setShowEditForm(true);
  };

  return (
    <>
      <div className={'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-white'}>
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
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Titre
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Description
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Niveau Requis
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Niveau d'Engagement Requis
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Compétences
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Niveau de Difficulté
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Style d'Enseignement
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Prix
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Jours
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Type de Contenu
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Langue
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Emplacement
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Sujet d'Intérêt
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Tranches Horaires
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Durée
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Date de Début
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Date de Fin
              </th>
              <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}>
                Actions
              </th>
            </tr>
            </thead>
            <tbody>
            {formations.map((formation) => (
              <tr key={formation._id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4 font-bold">
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
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => showEditFormPopup(formation)}>Modifier</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteFormation(formation._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Popup d'ajout de formation */}
      {showAddForm && (
        <div className="absolute top-11 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow lg:w-8/12">
            <h3>Ajouter une nouvelle formation</h3>
            {/* Premier groupe de champs */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div>
                  <label htmlFor="centre">titre :</label>
                  <input type="text" placeholder="titre" value={newFormation.titre} onChange={(e) => setNewFormation({ ...newFormation, titre: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="centre">description :</label>
                  <input type="text" placeholder="description" value={newFormation.description} onChange={(e) => setNewFormation({ ...newFormation, description: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="centre">competences :</label>
                  <input type="text" placeholder="competences" value={newFormation.competences} onChange={(e) => setNewFormation({ ...newFormation, competences: e.target.value })}/>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div>
                  <label htmlFor="centre">styleEnseignement :</label>
                  <input type="text" placeholder="Style d'enseignement" value={newFormation.styleEnseignement} onChange={(e) => setNewFormation({ ...newFormation, styleEnseignement: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="centre">Prix :</label>
                  <input type="text" placeholder="Prix" value={newFormation.Prix} onChange={(e) => setNewFormation({ ...newFormation, Prix: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="centre">jours :</label>
                  <input type="text" placeholder="Jours" value={newFormation.jours} onChange={(e) => setNewFormation({ ...newFormation, jours: e.target.value })}/>
                </div>
              </div>
            </div>
            {/* Deuxième groupe de champs */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div>
                  <label htmlFor="centre">typeContenu :</label>
                  <input type="text" placeholder="Type de contenu" value={newFormation.typeContenu} onChange={(e) => setNewFormation({ ...newFormation, typeContenu: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="centre">langue :</label>
                  <input type="text" placeholder="Langue" value={newFormation.langue} onChange={(e) => setNewFormation({ ...newFormation, langue: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="centre">emplacement :</label>
                  <input type="text" placeholder="Emplacement" value={newFormation.emplacement} onChange={(e) => setNewFormation({ ...newFormation, emplacement: e.target.value })}/>
                </div>
              </div>
            </div>
            {/* Troisième groupe de champs */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div>
                  <label htmlFor="centre">sujetInteret :</label>
                  <input type="text" placeholder="Sujet d'intérêt" value={newFormation.sujetInteret} onChange={(e) => setNewFormation({ ...newFormation, sujetInteret: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="centre">Tranches_Horaires :</label>
                  <input type="text" placeholder="Tranches horaires" value={newFormation.Tranches_Horaires} onChange={(e) => setNewFormation({ ...newFormation, Tranches_Horaires: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="centre">duree :</label>
                  <input type="number" placeholder="Durée" value={newFormation.duree} onChange={(e) => setNewFormation({ ...newFormation, duree: e.target.value })}/>
                </div>
              </div>
            </div>
            {/* Quatrième groupe de champs */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div>
                  <label htmlFor="centre">niveauDeDifficulte :</label>
                  <input type="number" niveauDeDifficulte="Durée" value={newFormation.niveauDeDifficulte} onChange={(e) => setNewFormation({ ...newFormation, niveauDeDifficulte: e.target.value })}/>
                </div>
                <div>
                  <input type="date" placeholder="Date de début" value={newFormation.dateDebut} onChange={(e) => setNewFormation({ ...newFormation, dateDebut: e.target.value })}/>
                </div>
                <div>
                  <input type="date" placeholder="Date de fin" value={newFormation.dateFin} onChange={(e) => setNewFormation({ ...newFormation, dateFin: e.target.value })}/>
                </div>
                <div>
                  {/* Ajoutez ici les champs pour les références aux utilisateurs */}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div>
                  <label htmlFor="centre">niveauDengagementRequis :</label>
                  <input type="number" placeholder="niveauDengagementRequis" value={newFormation.niveauDengagementRequis} onChange={(e) => setNewFormation({ ...newFormation, niveauDengagementRequis: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="centre">niveauRequis :</label>
                  <input type="text" placeholder="niveauRequis" value={newFormation.niveauRequis} onChange={(e) => setNewFormation({ ...newFormation, niveauRequis: e.target.value })}/>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 flex items-center">
                <div>
                  <label htmlFor="centre">Centre :</label>
                  <select id="centre" value={newFormation.centre} onChange={(e) => setNewFormation({ ...newFormation, centre: e.target.value })}>
                    <option value="">Sélectionner un</option>
                    {centres.map((centre) => (
                      <option key={centre._id} value={centre._id}>{centre.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="formateur">Formateur :</label>
                  <select id="formateur" value={newFormation.formateur} onChange={(e) => setNewFormation({ ...newFormation, formateur: e.target.value })}>
                    <option value="">Sélectionner un</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>{user.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />


            {/* Boutons de soumission et d'annulation */}
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleAddFormation}>Ajouter</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowAddForm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      {/* Popup d'édition de formation */}
      {showEditForm && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Modifier la formation</h3>
            <div className="mb-4">
              <input type="text" placeholder="Titre" value={newFormation.titre} onChange={(e) => setNewFormation({ ...newFormation, titre: e.target.value })}/>
            </div>
            <div className="mb-4">
              <textarea placeholder="Description" value={newFormation.description} onChange={(e) => setNewFormation({ ...newFormation, description: e.target.value })}></textarea>
            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleEditFormation}>Enregistrer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowEditForm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
