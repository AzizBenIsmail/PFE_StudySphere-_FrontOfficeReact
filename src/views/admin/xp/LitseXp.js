import React, { useState, useEffect, useMemo ,useCallback } from 'react'
import PropTypes from "prop-types";
import { getAllXP, deleteXP, createXP, updateXP } from "../../../Services/ApiXp";
import { getAllNiveaux } from "../../../Services/ApiNiveau"; // Importez le service pour récupérer les niveaux
import { getUsers } from "../../../Services/ApiUser"; // Importez le service pour récupérer les utilisateurs
import { FaAngleDown } from 'react-icons/fa';
import Cookies from 'js-cookie'
import { getAllBadges } from '../../../Services/ApiBadge'

export default function ListeXP({ color }) {
  const jwt_token = Cookies.get('jwt_token')

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])
  const [xpEntries, setXPEntries] = useState([]);
  const [badges, setBadges] = useState([]);
  const [niveaux, setNiveaux] = useState([]); // État pour stocker les niveaux
  const [selectedNiveau, setSelectedNiveau] = useState(""); // État pour suivre le niveau sélectionné
  const [users, setUsers] = useState([]); // État pour stocker les utilisateurs
  const [selectedUser, setSelectedUser] = useState(""); // État pour suivre l'utilisateur sélectionné
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddXP, setShowAddXP] = useState(false);
  const [showEditXP, setShowEditXP] = useState(false);
  const [xpToDelete, setXPToDelete] = useState(null);
  const [xpToEdit, setXPToEdit] = useState(null);
  const [newXP, setNewXP] = useState({
    pointsGagnes: 0,
    niveauAtteint: "",
    badgeIds: [], // Utilisez un tableau pour stocker les identifiants des badges sélectionnés
    userId: ""
  });
  const [errors, setErrors] = useState({
    pointsGagnes: "",
    niveauAtteint: "",
    badgeId: "",
    userId: ""
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!newXP.pointsGagnes) {
      newErrors.pointsGagnes = 'Le nombre de points gagnés est requis';
      valid = false;
    }

    if (!newXP.niveauAtteint.trim()) {
      newErrors.niveauAtteint = 'Le niveau atteint est requis';
      valid = false;
    }

    if (!newXP.userId.trim()) {
      newErrors.userId = "L'utilisateur est requis";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const loadXPEntries = useCallback(async () => {
    try {
      const res = await getAllXP(config);
      setXPEntries(res.data);
    } catch (error) {
      console.error("Error loading XP entries:", error);
    }
  }, [config]);

  const loadNiveaux = useCallback(async () => {
    try {
      const res = await getAllNiveaux(config);
      setNiveaux(res.data);
    } catch (error) {
      console.error("Error loading niveaux:", error);
    }
  }, [config]);

  const loadUsers = useCallback(async () => {
    try {
      const res = await getUsers(config);
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }, [config]);

  const loadBadges = useCallback(async () => {
    try {
      const res = await getAllBadges(config);
      setBadges(res.data);
    } catch (error) {
      console.error("Error loading badges:", error);
    }
  }, [config]);

  useEffect(() => {
    loadBadges();
    loadUsers();
    loadNiveaux();
    loadXPEntries();
  }, [loadBadges,loadUsers, loadNiveaux, loadXPEntries]);


  const handleDeleteXP = async (id) => {
    try {
      await deleteXP(id,config);
      loadXPEntries();
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting XP entry:", error);
    }
  };

  const handleAddXP = async () => {
      try {
        await createXP(newXP,config);
        loadXPEntries();
        setShowAddXP(false);
        setNewXP({
          pointsGagnes: 0,
          niveauAtteint: "",
          badgeIds: [], // Réinitialisez la liste des identifiants des badges
          userId: ""
        });
        setErrors({
          pointsGagnes: "",
          niveauAtteint: "",
          badgeId: "",
          userId: ""
        });
      } catch (error) {
        console.error("Error adding XP entry:", error);
      }

  };

  const showDeleteConfirmation = (id) => {
    setShowConfirm(true);
    setXPToDelete(id);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setXPToDelete(null);
  };

  const showAddXPPopup = () => {
    setShowAddXP(true);
  };

  const cancelAddXP = () => {
    setShowAddXP(false);
    setNewXP({
      pointsGagnes: 0,
      niveauAtteint: "",
      badgeId: "",
      userId: ""
    });
  };

  const handleEditXP = async () => {
    if (validateForm()) {
      try {
        await updateXP(xpToEdit._id, newXP,config);
        loadXPEntries();
        setShowEditXP(false);
        setXPToEdit(null);
        setNewXP({
          pointsGagnes: 0,
          niveauAtteint: "",
          badgeId: "",
          userId: ""
        });
        setErrors({
          pointsGagnes: "",
          niveauAtteint: "",
          badgeId: "",
          userId: ""
        });
      } catch (error) {
        console.error("Error updating XP entry:", error);
      }
    }
  };

  const showEditXPPopup = (xpEntry) => {
    setXPToEdit(xpEntry);
    setNewXP(xpEntry);
    setShowEditXP(true);
  };

  const niveauOptions = niveaux.map((niveau) => (
    <option key={niveau._id} value={niveau._id}>
      {niveau.nom} {/* Supposons que le nom du niveau est stocké dans un champ "nom" */}
    </option>
  ));

  const userOptions = users.map((user) => (
    <option key={user._id} value={user._id}>
      {user.nom} {/* Supposons que le nom d'utilisateur est stocké dans un champ "username" */}
    </option>
  ));

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
                Liste XP
              </h3>
            </div>
            <button
              className="bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={showAddXPPopup}
            >
              <div className="flex items-center">
                Ajouter une entrée XP
                <FaAngleDown className="ml-3"/>
              </div>
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* XP entries table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                }
              >
                Utilisateur
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                }
              >
                Niveau Atteint
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                }
              >
                Points Gagnés
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                }
              >
                Badges
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
            {xpEntries.map((xp) => (
              <tr key={xp._id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                  {xp.user.nom}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {xp.niveauAtteint.nom}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {xp.pointsGagnes}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex" >
                  {xp.badgeIds.map((badge) => (
                    <>
                    <img  key={badge._id}
                      src={`http://localhost:5000/images/${badge.image_badge}`}
                      alt="..."
                  className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                ></img>
                    </>
                    ))}
                </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => showDeleteConfirmation(xp._id)}>Supprimer</button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => showEditXPPopup(xp)}>Modifier l'entrée</button>
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
            <p>Êtes-vous sûr de vouloir supprimer cette entrée XP ?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-4" onClick={() => handleDeleteXP(xpToDelete)}>Confirmer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={cancelDelete}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'ajout d'XP */}
      {showAddXP && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Ajouter une nouvelle entrée XP</h3>
            <div className="mb-4">
              <input type="number" placeholder="Points Gagnés" value={newXP.pointsGagnes} onChange={(e) => setNewXP({...newXP, pointsGagnes: e.target.value})} />
              {errors.pointsGagnes && <p className="text-red-500 text-xs">{errors.pointsGagnes}</p>}
            </div>
            <div className="mb-4">
              <select
                value={selectedNiveau}
                onChange={(e) => setSelectedNiveau(e.target.value)}
                className="bg-white shadow border rounded px-3 py-2 outline-none"
              >
                <option value="">Sélectionnez un niveau</option>
                {niveauOptions}
              </select>
            </div>
            <div className="mb-4">
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="bg-white shadow border rounded px-3 py-2 outline-none"
              >
                <option value="">Sélectionnez un utilisateur</option>
                {userOptions}
              </select>
            </div>
            <div className="mb-4">
              <select
                multiple
                value={newXP.badgeIds}
                onChange={(e) => setNewXP({...newXP, badgeIds: Array.from(e.target.selectedOptions, option => option.value)})}
                className="bg-white shadow border rounded px-3 py-2 outline-none"
              >
                {/* Options de sélection des badges */}
                {badges.map(badge => (
                  <option key={badge._id} value={badge._id}>
                    {badge.nom} {/* Supposons que le nom du badge est stocké dans un champ "nom" */}
                  </option>
                ))}
              </select>

            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleAddXP}>Ajouter</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={cancelAddXP}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'édition d'XP */}
      {showEditXP && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Modifier l'entrée XP</h3>
            <div className="mb-4">
              <input type="number" placeholder="Points Gagnés" value={newXP.pointsGagnes} onChange={(e) => setNewXP({...newXP, pointsGagnes: e.target.value})} />
              {errors.pointsGagnes && <p className="text-red-500 text-xs">{errors.pointsGagnes}</p>}
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Source" value={newXP.source} onChange={(e) => setNewXP({...newXP, source: e.target.value})} />
              {errors.source && <p className="text-red-500 text-xs">{errors.source}</p>}
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Niveau Atteint" value={newXP.niveauAtteint} onChange={(e) => setNewXP({...newXP, niveauAtteint: e.target.value})} />
              {errors.niveauAtteint && <p className="text-red-500 text-xs">{errors.niveauAtteint}</p>}
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Utilisateur" value={newXP.userId} onChange={(e) => setNewXP({...newXP, userId: e.target.value})} />
              {errors.userId && <p className="text-red-500 text-xs">{errors.userId}</p>}
            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleEditXP}>Enregistrer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowEditXP(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ListeXP.defaultProps = {
  color: "light",
};

ListeXP.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
