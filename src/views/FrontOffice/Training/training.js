import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { GiEmptyHourglass } from 'react-icons/gi'
import { getAllFormations } from '../../../Services/ApiFormation'

export default function Landing () {
  const [formations, setFormations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFormations, setFilteredFormations] = useState([])
  const [sortOrder, setSortOrder] = useState('')

  const formationsPerPage = 6
  const jwt_token = Cookies.get('jwt_token')

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  const loadFormations = useCallback(async () => {
    try {
      const res = await getAllFormations(config)
      setFormations(res.data.formations)
    } catch (error) {
      console.error('Error loading formations:', error)
    }
  }, [config])

  useEffect(() => {
    loadFormations()
  }, [loadFormations])

  useEffect(() => {
    const sortedFormations = formations
    .filter((formation) =>
      formation.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.competences.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.Prix - b.Prix
      } else if (sortOrder === 'desc') {
        return b.Prix - a.Prix
      }
    })

    setFilteredFormations(sortedFormations)
  }, [formations, searchTerm, sortOrder])

  const indexOfLastFormation = currentPage * formationsPerPage
  const indexOfFirstFormation = indexOfLastFormation - formationsPerPage
  const currentFormations = filteredFormations.slice(
    indexOfFirstFormation,
    indexOfLastFormation
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredFormations.length / formationsPerPage); i++) {
    pageNumbers.push(i)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('fr-FR', options)
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const options = { hour: 'numeric', minute: 'numeric' }
    return date.toLocaleTimeString('fr-FR', options)
  }

  const splitDescription = (description, formationId) => {
    const words = description.split(' ')
    let wordCount = 0
    let truncated = false
    return words.map((word, index) => {
      if (wordCount >= 15 && !truncated) {
        truncated = true
        return (
          <Link key={index} to={`/DetailsFormation/${formationId}`}>
            (... voir plus)
          </Link>
        )
      } else if (wordCount >= 15) {
        return null
      } else {
        wordCount++
        if (wordCount % 4 === 0) {
          return (
            <span key={index}>
              {word} <br/>
            </span>
          )
        } else {
          return <span key={index}>{word} </span>
        }
      }
    })
  }

  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}H${remainingMinutes}Min`
  }

  return (
    <>
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="pt-6 w-full md:w-2/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  Trouvez des Formations par Nom ou par competences !
                  <br></br>
                  <input
                    type="text"
                    placeholder="Nom , Competences ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="  rounded-lg px-12 py-2"
                  />
                </div>
              </div>
            </div>
            <div className="pt-6 w-full md:w-2/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  Trier les formations par !
                  <br></br>
                  <button
                    className="bg-bleu-500 hover:bg-blue-700 text-orange-500 font-bold py-2 px-4 rounded transition duration-300 mr-2"
                    onClick={() => setSortOrder('asc')}>
                     Prix croissant
                  </button>
                  <button
                    className="bg-bleu-500 hover:bg-blue-700 text-orange-500 font-bold py-2 px-4 rounded transition duration-300"
                    onClick={() => setSortOrder('desc')}>
                    Prix décroissant
                  </button>

                </div>
              </div>
            </div>
            <div className="pt-6 w-full md:w-1/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  Trouvez des Formation par un center !
                </div>
              </div>
            </div>

          </div>
          <div className="grid grid-cols-1">
            {currentFormations.map((formation) => (
              <div
                className="pt-6 w-full px-4 "
                key={formation._id}
              >
                <div
                  className="relative flex flex-row items-center justify-between min-w-0 break-words bg-centre w-full mb-8 shadow-lg rounded-lg"
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div className="p-4">
                    {/*<div className="hover:-mt-4 mt-1 relative flex flex-col min-w-0 break-words bg-centre w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">*/}
                    <div className="">
                      <a href={`/DetailsFormation/${formation._id}`}>
                        <img
                          onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                          alt="..."
                          className="align-middle border-none max-w-full h-auto rounded-lg"
                          src={`http://localhost:5000/images/Formations/${formation.image_Formation}`}
                          style={{ width: '350px', height: '220px' }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="px-4 py-5 flex-auto">
                    <div className="flex pb-6 flex-wrap">
                      {formation.competences
                      .split(',')
                      .map((competence, index) => (
                        <span
                          key={index}
                          style={{
                            border: '2px solid rgba(226, 232, 240, 1)',
                            marginRight:
                              index ===
                              formation.competences.split(',').length - 1
                                ? '0'
                                : '5px',
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
                      {splitDescription(formation.description, formation._id)}
                    </p>
                    <div className="flex items-center mb-4">
                      <Link to={`/profile/ProfileCenter/${formation.centre._id}`}>
                        <img
                          onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                          alt="..."
                          className="shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                          src={`http://localhost:5000/images/Users/${formation.centre.image_user}`}
                          style={{ width: '25px' }}
                        />
                      </Link>
                      <p className="text-xs text-blueGray-400 ml-2 ">posté par {formation.centre.nom}</p>
                      <Link to={`/profile/ProfileFormateur/${formation.formateur._id}`}>
                        <img
                          onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                          alt="..."
                          className="shadow ml-2 rounded-full max-w-full h-auto align-middle border-none bg-indigo-500"
                          src={`http://localhost:5000/images/Users/${formation.formateur.image_user}`}
                          style={{ width: '25px' }}
                        />
                      </Link>
                      <p className="text-xs text-blueGray-400 ml-2">posté par {formation.formateur.nom}</p>
                    </div>

                  </div>
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold">Date</h6>
                    <div className="flex items-center">
                      <p className="mt-2 mb-4 text-blueGray-500">
                        {formatDate(formation.dateDebut)}
                      </p>
                      <GiEmptyHourglass style={{ fontSize: '25px' }}/>
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
                        ? 'bg-lightBlue-500'
                        : 'bg-white text-lightBlue-500'
                    }`}
                  >
                    <FaChevronLeft/>
                    <FaChevronLeft/>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${
                      currentPage === 1
                        ? 'bg-lightBlue-500'
                        : 'bg-white text-lightBlue-500'
                    }`}
                  >
                    <FaChevronLeft/>
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ${
                        currentPage === number
                          ? 'bg-lightBlue-500'
                          : 'bg-white text-lightBlue-500'
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
                        ? 'bg-lightBlue-500'
                        : 'bg-white text-lightBlue-500'
                    }`}
                  >
                    <FaChevronRight/>
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
                        ? 'bg-lightBlue-500'
                        : 'bg-white text-lightBlue-500'
                    }`}
                  >
                    <FaChevronRight/>
                    <FaChevronRight/>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}
