import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
// components
import Cookies from "js-cookie";
import { getAllFormations } from "../../../Services/ApiFormation";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { GiEmptyHourglass } from "react-icons/gi";

export default function Landing() {
  const [formations, setFormations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const formationsPerPage = 6;
  const jwt_token = Cookies.get("jwt_token");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  const loadFormations = useCallback(async () => {
    try {
      const res = await getAllFormations(config);
      setFormations(res.data.formations);
    } catch (error) {
      console.error("Error loading formations:", error);
    }
  }, [config]);

  useEffect(() => {
    loadFormations();
  }, [loadFormations]);

  const indexOfLastFormation = currentPage * formationsPerPage;
  const indexOfFirstFormation = indexOfLastFormation - formationsPerPage;
  const currentFormations = formations.slice(
    indexOfFirstFormation,
    indexOfLastFormation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(formations.length / formationsPerPage); i++) {
    pageNumbers.push(i);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

// Fonction pour formater l'heure
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric" };
    return date.toLocaleTimeString("fr-FR", options);
  };

  const splitDescription = (description, formationId) => {
    const words = description.split(" ");
    let wordCount = 0;
    let truncated = false;
    return words.map((word, index) => {
      if (wordCount >= 15 && !truncated) {
        truncated = true;
        return (
          <Link key={index} to={`/DetailsFormation/${formationId}`}>
            (... voir plus)
          </Link>
        );
      } else if (wordCount >= 15) {
        return null;
      } else {
        wordCount++;
        if (wordCount % 4 === 0) {
          return (
            <span key={index}>
            {word} <br />
          </span>
          );
        } else {
          return <span key={index}>{word} </span>;
        }
      }
    });
  };

// Fonction pour convertir les minutes en heures
  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}H${remainingMinutes}Min`;
  };

  return (
    <>
    <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1">
              {currentFormations.map((formation) => (
                <div
                  className="pt-6 w-full px-4 "
                  key={formation._id}
                >
                  <div className="relative flex flex-row items-center justify-between min-w-0 break-words bg-centre w-full mb-8 shadow-lg rounded-lg">
                    <div className="p-4">
                      <div className="hover:-mt-4 mt-1 relative flex flex-col min-w-0 break-words bg-centre w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                        <a href={`/DetailsFormation/${formation._id}`}>
                          <img
                            alt="..."
                            className="align-middle border-none max-w-full h-auto rounded-lg"
                            src={`http://localhost:5000/images/Formations/${formation.image_Formation}`}
                            style={{ width: "350px", height: "220px" }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="px-4 py-5 flex-auto">
                      <div className="flex pb-6 flex-wrap">
                        {formation.competences
                          .split(",")
                          .map((competence, index) => (
                            <span
                              key={index}
                              style={{
                                border: "2px solid rgba(226, 232, 240, 1)",
                                marginRight:
                                  index ===
                                  formation.competences.split(",").length - 1
                                    ? "0"
                                    : "5px",
                              }}
                              className="text-xs font-semibold inline-block text-blueGray-500 py-1 px-2 uppercase rounded-full text-black bg-white uppercase last:mr-0 mr-1"
                              >
                              {competence.trim()}
                            </span>
                          ))}
                      </div>
                      <h6 className="text-xl font-semibold">
                        {formation.titre}
                      </h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        {splitDescription(formation.description,formation._id)}
                      </p>
                      <div className="flex items-center mb-4">
                        <img
                          alt="..."
                          className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                          src={`http://localhost:5000/images/Users/${formation.centre.image_user}`}
                          style={{ width: "25px" }}
                        />
                        <p className="text-xs text-blueGray-400 ml-2 ">posté par {formation.centre.nom}</p>
                        <img
                          alt="..."
                          className="shadow ml-2 rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                          src={`http://localhost:5000/images/Users/${formation.formateur.image_user}`}
                          style={{ width: "25px" }}
                        />
                        <p className="text-xs text-blueGray-400 ml-2">posté par {formation.formateur.nom}</p>
                      </div>

                    </div>
                    <div className="px-4 py-5 flex-auto">
                      <h6 className="text-xl font-semibold">Date</h6>
                      <div className="flex items-center">
                        <p className="mt-2 mb-4 text-blueGray-500">
                          {formatDate(formation.dateDebut)}
                        </p>
                        <GiEmptyHourglass  style={{ fontSize: '25px' }}/>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          {formatTime(formation.dateDebut)}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold">
                      Duree
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      {convertMinutesToHours(formation.duree)}

                    </p>
                  </div>
                    <div className="px-4 py-5 flex-auto">
                      <h6 className="text-xl font-semibold">
                        Prix
                      </h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        {formation.Prix} DT
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
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${
                        currentPage === 1
                          ? "bg-lightBlue-500"
                          : "bg-white text-lightBlue-500"
                      }`}
                    >
                      <FaChevronLeft />
                      <FaChevronLeft />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${
                        currentPage === 1
                          ? "bg-lightBlue-500"
                          : "bg-white text-lightBlue-500"
                      }`}
                    >
                      <FaChevronLeft />
                    </button>
                  </li>
                  {pageNumbers.map((number) => (
                    <li key={number}>
                      <button
                        onClick={() => paginate(number)}
                        className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${
                          currentPage === number
                            ? "bg-lightBlue-500"
                            : "bg-white text-lightBlue-500"
                        }`}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(formations.length / formationsPerPage)
                      }
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${
                        currentPage ===
                        Math.ceil(formations.length / formationsPerPage)
                          ? "bg-lightBlue-500"
                          : "bg-white text-lightBlue-500"
                      }`}
                    >
                      <FaChevronRight />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        paginate(
                          Math.ceil(formations.length / formationsPerPage)
                        )
                      }
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${
                        currentPage ===
                        Math.ceil(formations.length / formationsPerPage)
                          ? "bg-lightBlue-500"
                          : "bg-white text-lightBlue-500"
                      }`}
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
