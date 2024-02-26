import React, { useState, useEffect, useMemo ,useCallback} from 'react'
import PropTypes from "prop-types";
import { getAllNiveaux, deleteNiveau, createNiveau , updateNiveau } from "../../../Services/ApiNiveau";
import { FaAngleDown } from 'react-icons/fa'
import Cookies from 'js-cookie' // Importez les fonctions CRUD depuis le fichier apiNiveau

export default function ListeNiveau({ color }) {
  const jwt_token = Cookies.get('jwt_token')

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])
  const [niveaux, setNiveaux] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false); // État pour contrôler l'affichage du popup de confirmation
  const [showAddNiveau, setShowAddNiveau] = useState(false); // État pour contrôler l'affichage du popup d'ajout de niveau
  const [showEditNiveau, setShowEditNiveau] = useState(false); // État pour contrôler l'affichage du popup de modification de niveau
  const [niveauToDelete, setNiveauToDelete] = useState(null); // État pour stocker l'ID du niveau à supprimer
  const [niveauToEdit, setNiveauToEdit] = useState(null); // État pour stocker les informations du niveau à modifier
  const [newNiveau, setNewNiveau] = useState({
    nom: "",
    description: "",
    xpRequis: 0
  }); // État pour stocker les informations du nouveau niveau
  const [errors, setErrors] = useState({
    nom: "",
    description: "",
    xpRequis: ""
  }); // État pour stocker les erreurs de saisie

  // Fonction pour vérifier les erreurs de saisie
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!newNiveau.nom.trim()) {
      newErrors.nom = "Le nom du niveau est requis";
      valid = false;
    }

    if (!newNiveau.description.trim()) {
      newErrors.description = "La description du niveau est requise";
      valid = false;
    }

    if (!newNiveau.xpRequis) {
      newErrors.xpRequis = "L'XP requis est requis";
      valid = false;
    } else if (newNiveau.xpRequis <= 0) {
      newErrors.xpRequis = "L'XP requis doit être supérieur à zéro";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  // Fonction pour charger les niveaux depuis l'API
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

  // Fonction pour supprimer un niveau
  const handleDeleteNiveau = async (id) => {
    try {
      await deleteNiveau(id,config);
      // Rechargez les niveaux après suppression
      loadNiveaux(config);
      // Fermez le popup de confirmation
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting niveau:", error);
    }
  };

  // Fonction pour ajouter un nouveau niveau
  const handleAddNiveau = async () => {
    if (validateForm()) {
      try {
        await createNiveau(newNiveau,config);
        // Rechargez les niveaux après ajout
        loadNiveaux();
        // Fermez le popup d'ajout
        setShowAddNiveau(false);
        // Réinitialisez les informations du nouveau niveau
        setNewNiveau({
          nom: "",
          description: "",
          xpRequis: 0
        });
        // Réinitialisez les erreurs
        setErrors({
          nom: "",
          description: "",
          xpRequis: ""
        });
      } catch (error) {
        console.error("Error adding niveau:", error);
      }
    }
  };

  // Fonction pour afficher le popup de confirmation
  const showDeleteConfirmation = (id) => {
    setShowConfirm(true);
    setNiveauToDelete(id);
  };

  // Fonction pour fermer le popup de confirmation sans supprimer le niveau
  const cancelDelete = () => {
    setShowConfirm(false);
    setNiveauToDelete(null);
  };

  // Fonction pour afficher le popup d'ajout de niveau
  const showAddNiveauPopup = () => {
    setShowAddNiveau(true);
  };

  // Fonction pour fermer le popup d'ajout de niveau
  const cancelAddNiveau = () => {
    setShowAddNiveau(false);
    // Réinitialisez les informations du nouveau niveau
    setNewNiveau({
      nom: "",
      description: "",
      xpRequis: 0
    });
  };
// Fonction pour modifier un niveau
  const handleEditNiveau = async () => {
    if (validateForm()) {
      try {
        await updateNiveau(niveauToEdit._id, newNiveau);
        // Rechargez les niveaux après modification
        loadNiveaux();
        // Fermez le popup de modification
        setShowEditNiveau(false);
        // Réinitialisez les informations du niveau à modifier
        setNiveauToEdit(null);
        // Réinitialisez les informations du nouveau niveau
        setNewNiveau({
          nom: "",
          description: "",
          xpRequis: 0
        });
        // Réinitialisez les erreurs
        setErrors({
          nom: "",
          description: "",
          xpRequis: ""
        });
      } catch (error) {
        console.error("Error updating niveau:", error);
      }
    }
  };

  // Fonction pour afficher le popup de modification
  const showEditNiveauPopup = (niveau) => {
    setNiveauToEdit(niveau);
    setNewNiveau(niveau);
    setShowEditNiveau(true);
  };
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-white"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg text-white"
                }
              >
                Liste Niveau
              </h3>
            </div>
            <button
              className="bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={showAddNiveauPopup}
            >
              <div className="flex items-center">
                Ajouter un niveau
                <FaAngleDown className="ml-3"/>
              </div>
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                }
              >
                Nom
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                }
              >
                Description
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                }
              >
                xp
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                }
              >
                Actions
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                }
              ></th>
            </tr>
            </thead>
            <tbody>
            {niveaux.map((niveau) => (
              <tr key={niveau._id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                  {niveau.nom}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {niveau.description}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {niveau.xpRequis}

                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => showDeleteConfirmation(niveau._id)}>Supprimer</button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => showEditNiveauPopup(niveau)}>Modifier le niveau</button>

                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup de confirmation */}
      {showConfirm && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <p>Êtes-vous sûr de vouloir supprimer ce niveau ?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-4" onClick={() => handleDeleteNiveau(niveauToDelete)}>Confirmer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={cancelDelete}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'ajout de niveau */}
      {showAddNiveau && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Ajouter un nouveau niveau</h3>
            <div className="mb-4">
              <input type="text" placeholder="Nom du niveau" value={newNiveau.nom} onChange={(e) => setNewNiveau({...newNiveau, nom: e.target.value})} />
              {errors.nom && <p className="text-red-500 text-xs">{errors.nom}</p>}
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Description" value={newNiveau.description} onChange={(e) => setNewNiveau({...newNiveau, description: e.target.value})} />
              {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <input type="number" placeholder="xp requis" value={newNiveau.xpRequis} onChange={(e) => setNewNiveau({...newNiveau, xpRequis: parseInt(e.target.value)})} />
              {errors.xpRequis && <p className="text-red-500 text-xs">{errors.xpRequis}</p>}
            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleAddNiveau}>Ajouter</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => cancelAddNiveau()}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      {showEditNiveau && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Modifier le niveau</h3>
            <div className="mb-4">
              <input type="text" placeholder="Nom du niveau" value={newNiveau.nom} onChange={(e) => setNewNiveau({...newNiveau, nom: e.target.value})} />
              {errors.nom && <p className="text-red-500 text-xs">{errors.nom}</p>}
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Description" value={newNiveau.description} onChange={(e) => setNewNiveau({...newNiveau, description: e.target.value})} />
              {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <input type="number" placeholder="xp requis" value={newNiveau.xpRequis} onChange={(e) => setNewNiveau({...newNiveau, xpRequis: parseInt(e.target.value)})} />
              {errors.xpRequis && <p className="text-red-500 text-xs">{errors.xpRequis}</p>}
            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleEditNiveau}>Enregistrer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowEditNiveau(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ListeNiveau.defaultProps = {
  color: "light",
};

ListeNiveau.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
