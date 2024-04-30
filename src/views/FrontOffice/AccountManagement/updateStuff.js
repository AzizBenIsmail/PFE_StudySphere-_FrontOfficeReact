import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { getFormateur, affecterEnseignant, desinfecterFormateur } from '../../../Services/ApiUser';
import SiedBarSetting from "../AccountManagement/SiedBarSetting";
import { getUserAuth } from '../../../Services/Apiauth';

export default function ListeFormations({ color }) {
  const jwt_token = Cookies.get("jwt_token");
  const [user, setUser] = useState(null);
  const [formateurs, setFormateurs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const formateursPerPage = 3;

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserAuth(config);
        const data = res.data.user;
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ config, jwt_token]);

  const loadFormateurs = useCallback(async () => {
    try {
      const res = await getFormateur(config);
      setFormateurs(res.data.users);
    } catch (error) {
      console.error("Error loading formateurs:", error);
    }
  }, [config]);

  useEffect(() => {
    loadFormateurs();
  }, [loadFormateurs]);

  // Définition de la fonction fetchData ici
  const fetchData = async () => {
    try {
      const res = await getUserAuth(config);
      const data = res.data.user;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const affecterFormateur = async (formateurId) => {
    try {
      await affecterEnseignant(formateurId, config);
      loadFormateurs();
      fetchData();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error affecting formateur to centre:", error);
    }
  };

  const desaffecterFormateur = async (formateurId) => {
    try {
      await desinfecterFormateur(formateurId, config);
      loadFormateurs();
      fetchData();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error affecting formateur to centre:", error);
    }
  };

  const getCurrentFormateurs = () => {
    const startIndex = (currentPage - 1) * formateursPerPage;
    const endIndex = startIndex + formateursPerPage;
    return formateurs.slice(startIndex, endIndex);
  };

  const [currentPagestaff_enseignant, setCurrentPagestaff_enseignant] = useState(1);
  const staff_enseignantPerPage = 6;
  const getCurrentstaff_enseignant  = () => {
    const startIndex = (currentPagestaff_enseignant - 1) * staff_enseignantPerPage;
    const endIndex = startIndex + staff_enseignantPerPage;
    return user.staff_enseignant.slice(startIndex, endIndex);
  };

  const totalPagesstaff_enseignant = user && user.staff_enseignant
    ? Math.ceil(user.staff_enseignant.length / staff_enseignantPerPage)
    : 0;
  const totalPages = Math.ceil(formateurs.length / formateursPerPage);

  const goToPreviousPagestaff_enseignant = () => {
    setCurrentPagestaff_enseignant((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPagestaff_enseignant = () => {
    setCurrentPagestaff_enseignant((prevPage) => Math.min(prevPage + 1, totalPagesstaff_enseignant));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  return (
    <>
      <div className="flex py-30 flex-wrap">
        <SiedBarSetting code="6" />
        <div className="w-7/12 px-6">
          <div className="relative flex flex-col min-w-0 break-words  mb-6 shadow-lg rounded bg-lightBlue-900 text-white">
            <div className="rounded-t mb-0 px-4 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-white">
                    Liste des Formateurs pour le centre {user && user.nom}
                  </h3>
                </div>
                <button
                  className="bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowAddForm(true)}
                >
                  <div className="flex items-center">Ajouter un Formation</div>
                </button>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                <tr>
                  <th>image</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {user && user.staff_enseignant && user.staff_enseignant.length > 0 ? (
                  getCurrentstaff_enseignant().map((formateur) => (
                    <tr key={formateur._id}>
                      <td colSpan="1" >
                        <img
                          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                          onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                          alt="..."
                          className="align-middle border-none max-w-full ml-4 h-auto rounded-lg"
                          src={`http://localhost:5000/images/Users/${formateur.image_user}`}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td colSpan="2" >{formateur.nom}</td>
                      <td colSpan="3" >{formateur.prenom}</td>
                      <td colSpan="4" >
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded"
                          onClick={() => desaffecterFormateur(formateur._id)}
                        >
                          Désaffecter du centre
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="ml-4 ">Aucun formateur n'est affecté à ce centre pour le moment.</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-5">
              <ul className="flex list-none rounded-md mr-28">
                <li className="mr-2">
                  <button
                    className="px-3 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
                    onClick={goToPreviousPagestaff_enseignant}
                    disabled={currentPagestaff_enseignant === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPagesstaff_enseignant }).map((_, index) => {
                  if (
                    index === 0 || // Première page
                    index === totalPagesstaff_enseignant - 1 || // Dernière page
                    Math.abs(index + 1 - currentPagestaff_enseignant) <= 1 || // Pages proches de la page actuelle
                    (index + 1 <= 1 && currentPagestaff_enseignant <= 2) || // Premières pages
                    (index + 1 >= totalPagesstaff_enseignant - 1 && currentPagestaff_enseignant >= totalPagesstaff_enseignant - 1) // Dernières pages
                  ) {
                    return (
                      <li key={index}>
                        <button
                          onClick={() => setCurrentPagestaff_enseignant(index + 1)}
                          className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 ${
                            currentPagestaff_enseignant === index + 1
                              ? 'bg-lightBlue-500 text-white'
                              : 'bg-white text-lightBlue-500'
                          }`}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  } else if (
                    (index === 1 && currentPagestaff_enseignant > 3) ||
                    (index === totalPagesstaff_enseignant - 2 && currentPagestaff_enseignant < totalPagesstaff_enseignant - 2)
                  ) {
                    return (
                      <li key={index}>
                        <span className="text-xs mx-1">...</span>
                      </li>
                    )
                  }
                  return null;
                })}
                <li className="ml-2">
                  <button
                    className="px-3 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
                    onClick={goToNextPagestaff_enseignant}
                    disabled={currentPagestaff_enseignant === totalPagesstaff_enseignant}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
            {showAddForm && (
              <div className="absolute top-8 left-0 w-full h-full text-blueGray-600 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-8 bg-centre rounded shadow lg:w-8/12">
                  <h3 className="mb-4">Ajouter une nouvelle Formateur</h3>
                  <div className="">
                    <div className="grid grid-cols-3 gap-4 flex items-center">
                      <table className="items-center  w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                          <th>Image</th>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Affecter</th>
                        </tr>
                        </thead>
                        <tbody>
                        {getCurrentFormateurs().map((formateur) => (
                          <tr key={formateur._id}>
                            <td>
                              <img
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                                alt="..."
                                className="align-middle border-none max-w-full h-auto rounded-lg"
                                src={`http://localhost:5000/images/Users/${formateur.image_user}`}
                                style={{ width: "100px", height: "50px" }}
                              />
                            </td>
                            <td>{formateur.nom}</td>
                            <td>{formateur.prenom}</td>
                            <td>
                              <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                                onClick={() => affecterFormateur(formateur._id, config)}
                              >
                                Affecter au centre
                              </button>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-end mt-5">
                      <ul className="flex list-none rounded-md mr-18">
                        <li className="mr-2">
                          <button
                            className="px-3 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from({ length: totalPages }).map((_, index) => {
                          if (
                            index === 0 || // Première page
                            index === totalPages - 1 || // Dernière page
                            Math.abs(index + 1 - currentPage) <= 1 || // Pages proches de la page actuelle
                            (index + 1 <= 1 && currentPage <= 2) || // Premières pages
                            (index + 1 >= totalPages - 1 && currentPage >= totalPages - 1) // Dernières pages
                          ) {
                            return (
                              <li key={index}>
                                <button
                                  onClick={() => setCurrentPage(index + 1)}
                                  className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 ${
                                    currentPage === index + 1
                                      ? 'bg-lightBlue-500 text-white'
                                      : 'bg-white text-lightBlue-500'
                                  }`}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            )
                          } else if (
                            (index === 1 && currentPage > 3) ||
                            (index === totalPages - 2 && currentPage < totalPages - 2)
                          ) {
                            return (
                              <li key={index}>
                                <span className="text-xs mx-1">...</span>
                              </li>
                            )
                          }
                          return null;
                        })}
                        <li className="ml-2">
                          <button
                            className="px-3 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                      <button
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => setShowAddForm(false)}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
