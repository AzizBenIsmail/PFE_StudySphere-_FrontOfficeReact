import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from "prop-types";
import { getAllBadges, deleteBadge, createBadge, updateBadge } from "../../../Services/ApiBadge";
import { FaAngleDown } from 'react-icons/fa';
import Cookies from 'js-cookie'

export default function ListeBadge({ color }) {
  const jwt_token = Cookies.get('jwt_token')

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])
  const [badges, setBadges] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddBadge, setShowAddBadge] = useState(false);
  const [showEditBadge, setShowEditBadge] = useState(false);
  const [badgeToDelete, setBadgeToDelete] = useState(null);
  const [badgeToEdit, setBadgeToEdit] = useState(null);
  const [newBadge, setNewBadge] = useState({
    nom: "",
    description: "",
    image_badge: null // État pour stocker le fichier d'image
  });

  const [errors, setErrors] = useState({
    nom: "",
    description: "",
    image_badge: ""
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!newBadge.nom.trim()) {
      newErrors.nom = "Le nom du badge est requis";
      valid = false;
    }

    if (!newBadge.description.trim()) {
      newErrors.description = "La description du badge est requise";
      valid = false;
    }

    if (!newBadge.image_badge.trim()) {
      newErrors.image_badge = "La image_badge du badge est requise";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const loadBadges = async () => {
    try {
      const res = await getAllBadges();
      setBadges(res.data);
    } catch (error) {
      console.error("Error loading badges:", error);
    }
  };

  useEffect(() => {
    loadBadges();
  }, []);

  const handleDeleteBadge = async (id) => {
    try {
      await deleteBadge(id,config);
      loadBadges();
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting badge:", error);
    }
  };

  const handleAddBadge = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append('nom', newBadge.nom);
        formData.append('description', newBadge.description);
        formData.append('image_badge', newBadge.image_badge);
        await createBadge(formData,config);
        loadBadges();
        setShowAddBadge(false);
        setNewBadge({
          nom: "",
          description: "",
          image_badge: ""
        });
        setErrors({
          nom: "",
          description: "",
          image_badge: ""
        });
      } catch (error) {
        console.error("Error adding badge:", error);
      }
    }
  };

  const showDeleteConfirmation = (id) => {
    setShowConfirm(true);
    setBadgeToDelete(id);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setBadgeToDelete(null);
  };

  const showAddBadgePopup = () => {
    setShowAddBadge(true);
  };

  const cancelAddBadge = () => {
    setShowAddBadge(false);
    setNewBadge({
      nom: "",
      description: "",
      image_badge: ""
    });
  };

  const handleEditBadge = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append('nom', newBadge.nom);
        formData.append('description', newBadge.description);
        formData.append('image_badge', newBadge.image_badge);
        await updateBadge(badgeToEdit._id, formData ,config);
        loadBadges();
        setShowEditBadge(false);
        setBadgeToEdit(null);
        setNewBadge({
          nom: "",
          description: "",
          image_badge: ""
        });
        setErrors({
          nom: "",
          description: "",
          image_badge: ""
        });
      } catch (error) {
        console.error("Error updating badge:", error);
      }
    }
  };

  const showEditBadgePopup = (badge) => {
    setBadgeToEdit(badge);
    setNewBadge(badge);
    setShowEditBadge(true);
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
                Liste Badge
              </h3>
            </div>
            <button
              className="bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={showAddBadgePopup}
            >
              <div className="flex items-center">
                Ajouter un badge
                <FaAngleDown className="ml-3"/>
              </div>
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Badges table */}
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
            {badges.map((badge) => (
              <tr key={badge._id}>
                <img
                  // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                  alt="UserImage"
                  src={`http://localhost:5000/images/${badge.image_badge}`}
                  style={{ width: '80px', height: '80px' }}
                />
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                  {badge.nom}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {badge.description}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => showDeleteConfirmation(badge._id)}>Supprimer</button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => showEditBadgePopup(badge)}>Modifier le badge</button>
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
            <p>Êtes-vous sûr de vouloir supprimer ce badge ?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-4" onClick={() => handleDeleteBadge(badgeToDelete)}>Confirmer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={cancelDelete}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'ajout de badge */}
      {showAddBadge && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Ajouter un nouveau badge</h3>
            <div className="mb-4">
              <input type="text" placeholder="Nom du badge" value={newBadge.nom} onChange={(e) => setNewBadge({...newBadge, nom: e.target.value})} />
              {errors.nom && <p className="text-red-500 text-xs">{errors.nom}</p>}
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Description" value={newBadge.description} onChange={(e) => setNewBadge({...newBadge, description: e.target.value})} />
              {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <input type="file" onChange={(e) => setNewBadge({...newBadge, image_badge: e.target.files[0]})} />
              {errors.image_badge && <p className="text-red-500 text-xs">{errors.image_badge}</p>}
            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleAddBadge}>Ajouter</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => cancelAddBadge()}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'édition de badge */}
      {showEditBadge && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Modifier le badge</h3>
            <div className="mb-4">
              <input type="text" placeholder="Nom du badge" value={newBadge.nom} onChange={(e) => setNewBadge({...newBadge, nom: e.target.value})} />
              {errors.nom && <p className="text-red-500 text-xs">{errors.nom}</p>}
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Description" value={newBadge.description} onChange={(e) => setNewBadge({...newBadge, description: e.target.value})} />
              {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <input type="file" onChange={(e) => setNewBadge({...newBadge, image_badge: e.target.files[0]})} />
              {errors.image_badge && <p className="text-red-500 text-xs">{errors.image_badge}</p>}

            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleEditBadge}>Enregistrer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowEditBadge(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ListeBadge.defaultProps = {
  color: "light",
};

ListeBadge.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
