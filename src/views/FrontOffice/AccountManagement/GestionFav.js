import React, { useEffect, useState, } from 'react';
import { getFavoris, removeFavori } from '../../../Services/ApiFav';
import SiedBarSetting from './SiedBarSetting';

export default function GestionFav() {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    const fetchFavoris = async () => {
      try {
        const favorisList = await getFavoris();
        setFavoris(favorisList);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
      }
    };

    fetchFavoris();
  }, []);

  const handleRemoveFavori = async (favoriId) => {
    try {
      await removeFavori(favoriId);
      setFavoris(favoris.filter(favori => favori._id !== favoriId));
    } catch (error) {
      console.error('Erreur lors de la suppression du favori:', error);
    }
  };

  return (
    <>
      <div className="flex py-30 flex-wrap">
        <SiedBarSetting code="4" />
        <div className="w-7/12 px-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <h2>Gestion des Favoris</h2>
              <ul>
                {favoris.map(favori => (
                  <li key={favori._id} style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className="details-image-custom img-fluid"
                      src={`http://localhost:5000/images/Formations/${favori.formation.image_Formation}`}
                      style={{ width: "50px", height: "50px", marginRight: "10px" }}
                      alt="React Course"
                      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0px 0px 30px 0px rgba(0,0,0,0.3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                    <span style={{ marginRight: "10px" }}>{favori.formation.titre}</span>
                    <div><button onClick={() => handleRemoveFavori(favori._id)}
                                 className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    >Supprimer</button></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
