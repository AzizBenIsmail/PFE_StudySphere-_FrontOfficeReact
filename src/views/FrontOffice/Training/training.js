import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// components
import Navbar from "../../../components/Navbars/Navbar.js";
import Footer from "../../../components/Footers/Footer.js";
import Cookies from "js-cookie";
import { getUserAuth } from "../../../Services/Apiauth";
import { getAllFormations } from "../../../Services/ApiFormation";
import { FaChevronRight , FaChevronLeft  } from "react-icons/fa";

export default function Landing() {
  const [user, setUser] = useState(null);
  const [formations, setFormations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const formationsPerPage = 6;
  const jwt_token = Cookies.get("jwt_token");
  const history = useHistory();

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
        if (jwt_token) {
          const res = await getUserAuth(config);
          setUser(() => {
            if (res.data.user.role === "admin") {
              history.replace("/admin/");
            }
            return res.data.user;
          });
        } else {
          history.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [config, history, jwt_token]);

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

  const indexOfLastFormation = currentPage * formationsPerPage;
  const indexOfFirstFormation = indexOfLastFormation - formationsPerPage;
  const currentFormations = formations.slice(indexOfFirstFormation, indexOfLastFormation);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(formations.length / formationsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <Navbar user={user} />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-55">
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-100 bg-bleu-500"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 pt-12 mt-2">
                  <h1 className="text-white font-semibold text-5xl">
                    Your story starts with us.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    This is a simple example of a Landing Page you can build
                    using Notus React. It features multiple CSS components based
                    on the Tailwind CSS design system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {currentFormations.map((formation) => (
                <div
                  className="pt-6 w-full md:w-2/12 px-4 text-center"
                  key={formation._id}
                >
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="hover:-mt-4 mt-1 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                        <a href={`/DetailsFormation/${formation._id}`}>
                          <img
                            alt="..."
                            className="align-middle border-none max-w-full h-auto rounded-lg"
                            src={`http://localhost:5000/images/Formations/${formation.image_Formation}`}
                            // style={{ width: "350px", height: "350px" }}
                            style={{ width: "350px", height: "220px" }}
                          />
                        </a>
                        <span
                          style={{
                            position: "absolute",
                            top: "5%",
                            left: "82%",
                            transform: "translate(-50%, -50%) ",
                          }}
                        >
                          <Link to="/landing">
                            <img
                              alt="..."
                              className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                              src={`http://localhost:5000/images/Users/${formation.formateur.image_user}`}
                              style={{ width: "70px" }}
                            />
                          </Link>
                        </span>
                        <span
                          style={{
                            position: "absolute",
                            top: "94%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <Link to="/landing">
                            <img
                              alt="..."
                              className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                              src={`http://localhost:5000/images/Users/${formation.centre.image_user}`}
                              style={{ width: "70px" }}
                            />
                          </Link>
                        </span>
                      </div>
                      <div className="flex flex-wrap">
                        {formation.competences
                        .split(",")
                        .map((competence, index) => (
                          <span
                            key={index}
                            style={{
                              border: "2px solid rgba(186, 230, 253, 1)",
                              marginRight:
                                index ===
                                formation.competences.split(",").length - 1
                                  ? "0"
                                  : "5px", // Ne pas ajouter de marge à droite pour la dernière compétence
                            }}
                            className="text-xs font-semibold mb-2 inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 uppercase last:mr-0 mr-1"
                          >
                              {competence.trim()}
                            </span>
                        ))}
                      </div>
                      <h6 className="text-xl font-semibold">
                        {formation.titre}
                      </h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        {formation.description}
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
                      disabled={currentPage === Math.ceil(formations.length / formationsPerPage)}
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === Math.ceil(formations.length / formationsPerPage) ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
                    >
                      <FaChevronRight />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => paginate(Math.ceil(formations.length / formationsPerPage))}
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${currentPage === Math.ceil(formations.length / formationsPerPage) ? 'bg-lightBlue-500' : 'bg-white text-lightBlue-500'}`}
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
      </main>
      <Footer />
    </>
  );
}
