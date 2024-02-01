import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { SiCriticalrole, SiVerizon, SiVexxhost } from 'react-icons/si'

// components
import TableDropdown from 'components/Dropdowns/TableDropdown.js'
import Cookies from 'js-cookie'
import {
  active,
  deleteUser,
  desactive,
  downgrade,
  forgetPassword,
  getAdmin,
  getSimpleUser,
  getUserActive,
  getUserAuth,
  getUserDesactive,
  getUsers,
  searchUsers,
  upgrade,
} from '../../Services/ApiUser'
import { RiAdminFill } from 'react-icons/ri'
import { AiOutlineReload, AiOutlineUser } from 'react-icons/ai'
import { Puff } from 'react-loader-spinner'

export default function ListUsers ({ color }) {
  //cookies
  const jwt_token = Cookies.get('jwt_token')

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  //session
  if (Cookies.get('jwt_token')) {
    const fetchData = async () => {
      try {
        await getUserAuth(config).then((res) => {
          if (res.data.user.role === 'client') {
            window.location.replace(`/landing/`)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  } else {
    window.location.replace(`/`)
  }

  const getAllUsers = useCallback(async (config) => {
    await getUsers(config)
    .then((res) => {
      setUsers(res.data.users)
      // console.log(res.data.users)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const getAllAdmin = useCallback(async (config) => {
    await getAdmin(config)
    .then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const getAllSimpleUser = useCallback(async (config) => {
    await getSimpleUser(config)
    .then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const getAllUserActive = useCallback(async (config) => {
    await getUserActive(config)
    .then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const getAllUserDesactive = useCallback(async (config) => {
    await getUserDesactive(config)
    .then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const [users, setUsers] = useState([])
  const [deletedUsers, setDeletedUsers] = useState([])

  useEffect(() => {
    getAllUsers(config)

    const interval = setInterval(() => {
      getAllUsers(config)
    }, 1000000)

    return () => clearInterval(interval)
  }, [getAllUsers, config])

  const deleteAuser = async (user, config) => {
    const result = window.confirm(
      'Êtes-vous sûr de vouloir supprimer de la base ? ' + user.username + '?'
    )
    if (result) {
      deleteUser(user._id, config)
      getAllUsers(config)
    } else {
      setDeletedUsers([...deletedUsers, user])
    }
  }

  const forget = async (email) => {
    forgetPassword(email)
  }

  const upgradeAuser = async (user, config) => {
    upgrade(user._id, config)
    setTimeout(() => {
      getAllUsers(config)
    }, 1000) // Appeler getAllUsers(config) après un délai de 2 secondes
  }

  const downgradeAuser = async (user, config) => {
    downgrade(user._id, config)
    setTimeout(() => {
      getAllUsers(config)
    }, 1000) // Appeler getAllUsers(config) après un délai de 2 secondes
  }

  const ActiveCompte = async (user, config) => {
    active(user._id, config)
    setTimeout(() => {
      getAllUsers(config)
    }, 1000) // Appeler getAllUsers(config) après un délai de 2 secondes
  }

  const DesactiveCompte = async (user, config) => {
    desactive(user._id, config)
    setTimeout(() => {
      getAllUsers(config)
    }, 1000) // Appeler getAllUsers(config) après un délai de 2 secondes
  }

  function getFirstTenWords (str) {
    const splittedWord = str.split('@') // Diviser le mot en fonction du caractère "@"
    const firstPart = splittedWord[0] // Récupérer la première partie du mot (avant "@")

    return firstPart
  }

  function getUserTypeAbbreviation (userType) {
    if (userType === 'admin') {
      return (
        <RiAdminFill
          className="mr-2"
          color="#4fa94d"
          style={{ fontSize: '24px' }}
        />
      )
    } else if (userType === 'user') {
      return <AiOutlineUser className="mr-2" style={{ fontSize: '24px' }}/>
    } else {
      return '' // Valeur par défaut si le type d'utilisateur n'est ni "admin" ni "user"
    }
  }

  const getsearchUser = useCallback(async (term, config) => {
    await searchUsers(term, config)
    .then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Faites quelque chose avec le terme de recherche (par exemple, effectuez une requête API)
    getsearchUser(searchTerm, config)

    console.log('Recherche effectuée:', searchTerm)
  }
  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white')
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <AiOutlineReload
              onClick={() => getAllUsers(config)}
              className="ml-2"
              style={{ fontSize: '25px' }}
            />
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={'font-semibold text-lg ' + (color === 'light')}>
                Liste des utilisateurs
                <Puff
                  height="20"
                  width="20"
                  radius={1}
                  color="#4fa94d"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  onClick={() => getAllUsers(config)}
                />
              </h3>
            </div>
          </div>
        </div>
        <div sm="1" className="ml-4">
          <button onClick={() => getAllAdmin(config)}>
            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
              Admin
            </span>
            <span className="d-block d-sm-none">
              <i className="tim-icons icon-single-02"/>
            </span>
          </button>
          <button onClick={() => getAllSimpleUser(config)}>
            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
              Simple
            </span>
            <span className="d-block d-sm-none">
              <i className="tim-icons icon-gift-2"/>
            </span>
          </button>
          <button onClick={() => getAllUserActive(config)}>
            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
              Verifier
            </span>
            <span className="d-block d-sm-none">
              <i className="tim-icons icon-tap-02"/>
            </span>
          </button>
          <button onClick={() => getAllUserDesactive(config)}>
            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
              Désactive
            </span>
            <span className="d-block d-sm-none">
              <i className="tim-icons icon-single-02"/>
            </span>
          </button>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Project
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Email
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Role
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Status
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Users
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Completion
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              ></th>
            </tr>
            </thead>
            <tbody responsive="true">
            {users
            .filter((user) => !deletedUsers.includes(user))
            .map((user) => (
              <tr key={user._id}>
                <th
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  {user.image_user ? (
                    <img
                      // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                      alt="User Image"
                      src={`http://localhost:5000/images/${user.image_user}`}
                      style={{ width: '80px', height: '80px' }}
                    />
                  ) : (
                    <div>
                      <img
                        // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                        alt="User Image"
                        src={require('assets/img/empty.png').default}
                        style={{ width: '80px', height: '80px' }}
                      />
                    </div>
                  )}
                  <span
                    className={
                      'ml-3 font-bold ' +
                      +(color === 'light'
                        ? 'text-blueGray-600'
                        : 'text-white')
                    }
                  >
                        {user.nom ? (
                          user.nom
                        ) : (
                          <SiVexxhost
                            className="mr-2"
                            style={{ fontSize: '24px' }}
                          />
                        )} &nbsp;
                    {user.prenom ? (
                      user.prenom
                    ) : (
                      <SiVexxhost
                        className="mr-2"
                        style={{ fontSize: '24px' }}
                      />
                    )}
                      </span>
                </th>
                <td>
                  <a href={`/admin/UserDetails/${user._id}`}>
                    {getFirstTenWords(user.email)}
                    <i className="fa fa-sort-desc" aria-hidden="true"></i>
                  </a>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {getUserTypeAbbreviation(user.role)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-red-500 mr-2"></i>
                  <i className="fas fa-circle  text-emerald-500  mr-2"></i>

                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {user.etat ? (<SiVerizon
                    className="mr-2"
                    color="#4fa94d"
                    style={{ fontSize: '24px' }}
                  />) : (<SiVexxhost
                    className="mr-2"
                    style={{ fontSize: '24px' }}
                  />)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                </td>
                <td
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <TableDropdown/>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

ListUsers.defaultProps = {
  color: 'light',
}

ListUsers.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
}
