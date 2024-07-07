import React, { useEffect, useState } from 'react';
import { FormationsByInscriptionByUserAuth, desinscription } from '../../../Services/ApiFormation';
import SiedBarSetting from './SiedBarSetting';

export default function GestionInscription() {
  const [formations, setFormations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formationsPerPage] = useState(3);
  const [error, setError] = useState(null);
  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        };
        const response = await FormationsByInscriptionByUserAuth(config);
        setFormations(response.data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des formations:', error);
        setError('Erreur lors de la récupération des formations');
      }
    };

    fetchFormations();
  }, [jwt_token]);

  const handleDesinscription = async (formationId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      };
      await desinscription(formationId, config);
      setFormations(formations.filter(formation => formation._id !== formationId));
    } catch (error) {
      console.error('Erreur lors de la désinscription de la formation:', error);
      setError('Erreur lors de la désinscription de la formation');
    }
  };

  // Get current formations
  const indexOfLastFormation = currentPage * formationsPerPage;
  const indexOfFirstFormation = indexOfLastFormation - formationsPerPage;
  const currentFormations = formations.slice(indexOfFirstFormation, indexOfLastFormation);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex py-30 flex-wrap">
      <SiedBarSetting code="7" />
      <div className="w-7/12 px-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <h2 className="text-2xl font-semibold">Gestion des Inscriptions</h2>
            <ul className="mt-4">
              {currentFormations.length > 0 ? (
                currentFormations.map(formation => (
                  <li key={formation._id} className="flex items-center justify-between p-4 mb-4 bg-white shadow rounded-lg">
                    <div className="flex items-center">
                      <img
                        className="details-image-custom img-fluid rounded"
                        src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${formation.image_Formation}`}
                        style={{ width: "50px", height: "50px", marginRight: "10px" }}
                        alt={formation.titre}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0px 0px 30px 0px rgba(0,0,0,0.3)")}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                      />
                      <span className="text-lg font-semibold">{formation.titre}</span>
                    </div>
                    <button
                      onClick={() => handleDesinscription(formation._id)}
                      className="bg-red-500 text-white active:bg-red-700 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150"
                    >
                      Désinscrire
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-center text-lg">Aucune formation inscrite</li>
              )}
            </ul>
            <div className="flex justify-center mt-4">
              <nav>
                <ul className="flex list-none">
                  {Array.from({ length: Math.ceil(formations.length / formationsPerPage) }, (_, i) => (
                    <li key={i} className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-pink-400' : 'bg-gray-200 text-gray-700'}`}>
                      <button onClick={() => paginate(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
