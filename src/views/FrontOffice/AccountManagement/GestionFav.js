import React, { useEffect, useState } from 'react'
import { getFavoris, removeFavori } from '../../../Services/ApiFav'
import SiedBarSetting from './SiedBarSetting'

export default function GestionFav () {
  const [favoris, setFavoris] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [favorisPerPage] = useState(3)

  useEffect(() => {
    const fetchFavoris = async () => {
      try {
        const favorisList = await getFavoris()
        setFavoris(favorisList)
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error)
      }
    }

    fetchFavoris()
  }, [])

  const handleRemoveFavori = async (favoriId) => {
    try {
      await removeFavori(favoriId)
      setFavoris(favoris.filter(favori => favori._id !== favoriId))
    } catch (error) {
      console.error('Erreur lors de la suppression du favori:', error)
    }
  }

  // Get current favoris
  const indexOfLastFavori = currentPage * favorisPerPage
  const indexOfFirstFavori = indexOfLastFavori - favorisPerPage
  const currentFavoris = favoris.slice(indexOfFirstFavori, indexOfLastFavori)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <div className="flex py-30 flex-wrap">
        <SiedBarSetting code="4"/>
        <div className="w-7/12 px-6">
          <div
            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <h2 className="text-2xl font-semibold">Gestion des Favoris</h2>
              <ul className="mt-4">
                {currentFavoris.length > 0 ? (
                  currentFavoris.map(favori => (
                  <li key={favori._id}
                      className="flex items-center justify-between p-4 mb-4 bg-white shadow rounded-lg">
                    <div className="flex items-center">
                      <img
                        className="details-image-custom img-fluid rounded"
                        src={`${process.env.REACT_APP_API_URL_IMAGE_FORMATIONS}/${favori.formation.image_Formation}`}
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        alt={favori.formation.titre}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)')}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                      />
                      <span className="text-lg font-semibold">{favori.formation.titre}</span>
                    </div>

                    <button onClick={() => handleRemoveFavori(favori._id)}
                            className="bg-red-500 text-white active:bg-red-700 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150"
                    >Supprimer
                    </button>
                  </li>
                  ))
                ) : (
                <li className="text-center text-lg">Aucune Fav</li>
                )}
              </ul>
              <div className="flex justify-center mt-4">
                <nav>
                  <ul className="flex list-none">
                    {Array.from({ length: Math.ceil(favoris.length / favorisPerPage) }, (_, i) => (
                      <li key={i}
                          className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-pink-400' : 'bg-gray-200 text-gray-700'}`}>
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
    </>
  )
}
