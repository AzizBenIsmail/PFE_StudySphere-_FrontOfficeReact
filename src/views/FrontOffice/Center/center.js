import React, { useCallback, useEffect, useMemo, useState } from "react";
// components
import Cookies from "js-cookie";
import { FaChevronRight , FaChevronLeft  } from "react-icons/fa";
import { getCentre } from '../../../Services/ApiUser'
import { Link } from "react-router-dom";

export default function Landing() {
  const [centers, setCenters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const centersPerPage = 6;
  const jwt_token = Cookies.get("jwt_token");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);


  const loadCenters = useCallback(async () => {
    try {
      const res = await getCentre(config);
      setCenters(res.data.users);
    } catch (error) {
      console.error('Error loading centers:', error);
    }
  }, [config]);

  useEffect(() => {
    loadCenters();
  }, [loadCenters]);

  const indexOfLastCenter = currentPage * centersPerPage;
  const indexOfFirstCenter = indexOfLastCenter - centersPerPage;
  const currentCenters = centers.slice(indexOfFirstCenter, indexOfLastCenter);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(centers.length / centersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {currentCenters.map((center) => (
                <div
                  className="pt-6 w-full md:w-1/12 px-4 text-center"
                  key={center._id}
                >
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="hover:-mt-4 mt-1 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                        <Link to={`/profile/ProfileCenter/${center._id}`}>
                          <img
                            alt="..."
                            className="align-middle border-none max-w-full h-auto rounded-lg"
                            src={`http://localhost:5000/images/Users/${center.image_user}`}
                            // style={{ width: "350px", height: "350px" }}
                            style={{ width: "200px", height: "120px" }}
                          />
                        </Link>
                      </div>
                      <h6 className="text-xl font-semibold">
                        {center.nom}
                      </h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        {center.preferences && center.preferences.domaine_actuelle ? center.preferences.domaine_actuelle : "Le centre ne prend pas en compte les détails."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <nav className="block">
                <ul className="flex pl-0 rounded list-none flex-wrap">
                  <li>
                    <button
                      onClick={() => paginate(1)}
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === 1 ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                    >
                      <FaChevronLeft />
                      <FaChevronLeft />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === 1 ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                    >
                      <FaChevronLeft />
                    </button>
                  </li>
                  {pageNumbers.map((number) => (
                    <li key={number}>
                      <button
                        onClick={() => paginate(number)}
                        className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === number ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(centers.length / centersPerPage)}
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === Math.ceil(centers.length / centersPerPage) ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                    >
                      <FaChevronRight />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => paginate(Math.ceil(centers.length / centersPerPage))}
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === Math.ceil(centers.length / centersPerPage) ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                    >
                      <FaChevronRight />
                      <FaChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
    </>
  );
}
