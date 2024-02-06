import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { SiVerizon, SiVexxhost } from "react-icons/si";
import {
  FaAngleDown,
  FaArchive,
  FaChevronDown,
  FaUserAltSlash,
  FaUserCog,
} from "react-icons/fa";
import { MagnifyingGlass, Puff } from "react-loader-spinner";
// components
import { GiUpgrade, GiWideArrowDunk } from "react-icons/gi";

import Cookies from "js-cookie";
import { getUserAuth } from "../../Services/Apiauth";
import {
  active,
  archiver,
  deleteUser,
  desactive,
  downgrade,
  getAdmin,
  getSimpleUser,
  getUserActive,
  getUserConnecter,
  getUserDeConnecter,
  getUserDesactive,
  getUsers,
  getUsersarchive,
  searchUsers,
  upgrade,
} from "../../Services/ApiUser";
import { AiOutlineReload } from "react-icons/ai";
import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router-dom";

export default function ListUsers({ color }) {
  //cookies
  const jwt_token = Cookies.get("jwt_token");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  //session
  if (Cookies.get("jwt_token")) {
    const fetchData = async () => {
      try {
        await getUserAuth(config).then((res) => {
          if (res.data.user.role === "client") {
            window.location.replace(`/landing/`);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  } else {
    window.location.replace(`/`);
  }

  const getAllUsers = useCallback(async (config) => {
    closeDropdownPopover();
    await getUsers(config)
      .then((res) => {
        setUsers(res.data.users);
        // console.log(res.data.users)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllAdmin = useCallback(async (config) => {
    closeDropdownPopover();
    await getAdmin(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllSimpleUser = useCallback(async (config) => {
    closeDropdownPopover();
    await getSimpleUser(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllUserActive = useCallback(async (config) => {
    closeDropdownPopover();
    await getUserActive(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllUserconnecter = useCallback(async (config) => {
    closeDropdownPopover();
    await getUserConnecter(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllUserdeconnecter = useCallback(async (config) => {
    closeDropdownPopover();
    await getUserDeConnecter(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllUserDesactive = useCallback(async (config) => {
    closeDropdownPopover();
    await getUserDesactive(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllUserarchive = useCallback(async (config) => {
    closeDropdownPopover();
    await getUsersarchive(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [users, setUsers] = useState([]);
  // const [deletedUsers, setDeletedUsers] = useState([]);

  useEffect(() => {
    getAllUsers(config);

    const interval = setInterval(() => {
      getAllUsers(config);
    }, 1000000);

    return () => clearInterval(interval);
  }, [getAllUsers, config]);

  const deleteAuser = async (user, config) => {
    closeDropdown(user._id);
    const result = window.confirm(
      "Êtes-vous sûr de vouloir supprimer de la base ? " + user.nom + "?"
    );
    if (result) {
      deleteUser(user._id, config);
      getAllUsers(config);
    } else {
      // setDeletedUsers([...deletedUsers, user]);
    }
  };

  // const forget = async (email) => {
  //   forgetPassword(email)
  // }

  const upgradeAuser = async (user, config) => {
    closeDropdown(user._id);
    upgrade(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  const archiveruser = async (user, config) => {
    console.log(user);
    closeDropdown(user._id);
    archiver(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  const downgradeAuser = async (user, config) => {
    closeDropdown(user._id);
    downgrade(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  const ActiveCompte = async (user, config) => {
    closeDropdown(user._id);
    active(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  const DesactiveCompte = async (user, config) => {
    closeDropdown(user._id);
    desactive(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  const getsearchUser = useCallback(async (term, config) => {
    await searchUsers(term, config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const handleInputChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Adding a small delay before making the API call to avoid rapid firing on each key press
    const delay = 500; // milliseconds
    setTimeout(() => {
      getsearchUser(term, config);
    }, delay);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Faites quelque chose avec le terme de recherche (par exemple, effectuez une requête API)
    getsearchUser(searchTerm, config);

    console.log("Recherche effectuée:", searchTerm);
  };
  const [dropdownStates, setDropdownStates] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const history = useHistory();

  const openDropdown = (userId) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [userId]: true,
    }));
    setOpenDropdownId(userId);
  };

  const closeDropdown = (userId) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [userId]: false,
    }));
  };

  const toggleDropdown = (userId) => {
    closeDropdownPopover();
    if (openDropdownId === userId) {
      // Si le même dropdown est cliqué, fermez-le
      closeDropdown(userId);
      setOpenDropdownId(null);
    } else {
      // Sinon, ouvrez le dropdown actuel et fermez l'ancien
      closeDropdown(openDropdownId);
      openDropdown(userId);
    }
  };
  const usersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const getCurrentUsers = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return users.slice(startIndex, endIndex);
  };
  const totalPages = Math.ceil(users.length / usersPerPage);
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const countUsers = () => {
    return users.length;
  };

  const [dropdownOpen, setDropdownOpen] = useState(false); // Utilisation du même état pour les deux composants

  const toggleDropdownn = () => {
    setDropdownOpen(!dropdownOpen); // Inversion de l'état de dropdownOpen
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <AiOutlineReload
              onClick={() => getAllUsers(config)}
              className="ml-2"
              style={{ fontSize: "25px" }}
            />
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg " + (color === "light")}>
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
            <div>
              {/*<button*/}
              {/*  className=" bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ml-6"*/}
              {/*  onClick={() => history.push("/admin/Ajouterutilisateur")}*/}
              {/*>*/}
              {/*  ajouter un utilisateur*/}
              {/*</button>*/}
              <button
                className="bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={toggleDropdownn} // Appel de la fonction toggleDropdown pour changer l'état
              >

                <div className="flex items-center">
                  ajouter un utilisateur
                  <FaAngleDown className="ml-3" />
                </div>
              </button>
              {/* Contenu du dropdown */}
              {dropdownOpen && (
                <div className="absolute bg-indigo-500 text-base z-50 py-2 list-none text-left rounded shadow-lg mt-1 min-w-48">
                  {/* Options du dropdown */}
                  <button className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-no-wrap bg-transparent text-white" type="button">
                    Client
                  </button>
                  <button className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-no-wrap bg-transparent text-white" type="button">
                    Formateur
                  </button>
                  <button className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-no-wrap bg-transparent text-white" type="button">
                    Centre De Formation
                  </button>
                  <button className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-no-wrap bg-transparent text-white" type="button">
                    Moderateur
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <nav className="relative flex flex-wrap items-center justify-between navbar-expand-lg ">
              <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                  <div className="text-xl font-normal leading-normal mt-0 mb-2 ">
                    Filtre les utilisateurs
                  </div>
                  <button
                    className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
                <div
                  className={
                    "lg:flex flex-grow items-center" +
                    (navbarOpen ? " flex" : " hidden")
                  }
                  id="example-navbar-danger"
                >
                  <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li className="nav-item">
                      <form
                        onSubmit={handleSubmit}
                        className="flex items-center"
                      >
                        <div className="mb-3 pt-0 flex items-center">
                          <span className="ml-2 text-xl text-white">
                            <MagnifyingGlass
                              visible={true}
                              height="35"
                              width="35"
                              ariaLabel="magnifying-glass-loading"
                              wrapperStyle={{}}
                              wrapperClass="magnifying-glass-wrapper"
                              glassColor="#c0efff"
                              color="#e15b64"
                            />
                          </span>
                          <input
                            placeholder="Rechercher..."
                            type="text"
                            name="username"
                            value={searchTerm}
                            onChange={handleInputChange}
                            label="Username"
                            aria-label="Username"
                            className="px-2 py-1 h-8 border border-solid border-lightBlue-600 rounded-full text-sm leading-snug text-black bg-lightBlue-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-lightBlue-300"
                          />
                        </div>
                      </form>
                    </li>
                    <li>
                      <div className="flex flex-wrap">
                        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
                          <div className="relative inline-flex align-middle w-full">
                            <button
                              // className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 ease-linear transition-all duration-150"
                              className=" bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              ref={btnDropdownRef}
                              onClick={() => {
                                dropdownPopoverShow
                                  ? closeDropdownPopover()
                                  : openDropdownPopover();
                              }}
                            >
                              <div className="flex items-center">
                                filtrer
                                <FaAngleDown className="ml-3" />
                              </div>
                            </button>
                            <div
                              ref={popoverDropdownRef}
                              className={
                                (dropdownPopoverShow ? "block " : "hidden ") +
                                "bg-indigo-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
                              }
                            >
                              <button
                                onClick={() => getAllAdmin(config)}
                                className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-no-wrap bg-transparent text-white"
                                type="button"
                              >
                                Liste d'utilisateurs Admin
                              </button>
                              <button
                                onClick={() => getAllSimpleUser(config)}
                                className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-no-wrap bg-transparent text-white"
                                type="button"
                              >
                                Liste d'utilisateurs Client
                              </button>
                              <button
                                onClick={() => getAllUserActive(config)}
                                className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-no-wrap bg-transparent text-white"
                                type="button"
                              >
                                Liste d'utilisateurs Verifier
                              </button>
                              <button
                                onClick={() => getAllUserDesactive(config)}
                                className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-no-wrap bg-transparent text-white"
                                type="button"
                              >
                                Liste d'utilisateurs Désactive
                              </button>
                              <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
                              <button
                                className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-no-wrap bg-transparent text-white"
                                onClick={(e) => getAllUserarchive(config)}
                              >
                                Liste d'utilisateurs archiver
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={() => getAllUserconnecter(config)}
                        className=" bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Connecter
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={() => getAllUserdeconnecter(config)}
                        className=" bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        déconnecter
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="ml-3"></div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Utilisateurs
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Role
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Activer
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Completion
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody responsive="true">
              {/*{users*/}
              {/*  .filter((user) => !deletedUsers.includes(user))*/}
              {/*  .map((user) => (*/}
              {getCurrentUsers().map((user) => (
                <tr key={user._id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    {user.image_user ? (
                      <img
                        // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                        alt="UserImage"
                        src={`http://localhost:5000/images/${user.image_user}`}
                        style={{ width: "80px", height: "80px" }}
                      />
                    ) : (
                      <div>
                        <img
                          alt="UserImage"
                          src={require("assets/img/empty.png").default}
                          style={{ width: "80px", height: "80px" }}
                        />
                      </div>
                    )}
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {user.nom ? (
                        user.nom
                      ) : (
                        <SiVexxhost
                          className="mr-2"
                          style={{ fontSize: "24px" }}
                        />
                      )}{" "}
                      &nbsp;
                      {user.prenom ? (
                        user.prenom
                      ) : (
                        <SiVexxhost
                          className="mr-2"
                          style={{ fontSize: "24px" }}
                        />
                      )}
                    </span>
                  </th>
                  <td>
                    <a href={`/admin/UserDetails/${user._id}`}>
                      {user.email}
                      <i className="fa fa-sort-desc" aria-hidden="true"></i>
                    </a>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.role}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.statu === "true" ? (
                      <i className="fas fa-circle  text-emerald-500 mr-2">
                        En_ligne
                      </i>
                    ) : (
                      <i className="fas fa-circle text-red-500 mr-2">
                        Hors_ligne
                      </i>
                    )}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.etat ? (
                      <SiVerizon
                        className="mr-2"
                        color="#4fa94d"
                        style={{ fontSize: "24px" }}
                      />
                    ) : (
                      <SiVexxhost
                        className="mr-2"
                        style={{ fontSize: "24px" }}
                      />
                    )}
                  </td>
                  {/*<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"></td>*/}
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right relative ">
                    <button
                      className={`bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${
                        color === "light" ? "text-blueGray-600" : "text-white"
                      }`}
                      type="button"
                      onClick={() => toggleDropdown(user._id)} // Utilisez toggleDropdown au lieu de openDropdown
                    >
                      <FaChevronDown style={{ fontSize: "15px" }} />
                    </button>
                    {dropdownStates[user._id] && (
                      <div
                        className={`absolute bg-indigo-500 text-base z-50 float-left py-1 list-none text-center rounded shadow-lg mt-2 min-w-48`}
                        // className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        style={{ top: "0px", right: "75px" }} // Adjusté de gauche à droite
                      >
                        {user.statu === "true" ? (
                          <button
                            onClick={() => archiveruser(user, config)}
                            className="text-sm py-2 px-4 font-normal block w-full flex items-center justify-start bg-transparent text-white"
                            type="button"
                          >
                            <FaArchive
                              className="mr-2"
                              style={{ fontSize: "20px" }}
                            />
                            <span>Archiver</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => archiveruser(user, config)}
                            className="text-sm py-2 px-4 font-normal block w-full flex items-center justify-start bg-transparent text-white"
                            type="button"
                          >
                            <FaArchive
                              className="mr-2"
                              style={{ fontSize: "20px" }}
                            />
                            <span>DesArchiver</span>
                          </button>
                        )}

                        <button
                          onClick={() => deleteAuser(user, config)}
                          className="text-sm py-2 px-4 font-normal block w-full flex items-center justify-start bg-transparent text-white"
                          type="button"
                        >
                          <FaUserCog
                            className="mr-2"
                            style={{ fontSize: "20px" }}
                          />
                          <span>Modifier</span>
                        </button>
                        {user.role === "client" ? (
                          <button
                            className="text-sm py-2 px-4 font-normal block w-full flex items-center justify-start bg-transparent text-white"
                            onClick={() => upgradeAuser(user, config)}
                          >
                            <GiUpgrade
                              className="mr-2"
                              style={{ fontSize: "20px" }}
                            />
                            mise à niveau vers administrateur
                          </button>
                        ) : (
                          <button
                            className="text-sm py-2 px-4 font-normal block w-full flex items-center justify-start bg-transparent text-white"
                            onClick={() => downgradeAuser(user, config)}
                          >
                            <GiWideArrowDunk
                              className="mr-2"
                              style={{ fontSize: "20px" }}
                            />
                            mise à niveau vers un simple utilisateur
                          </button>
                        )}
                        {user.etat === false ? (
                          <button
                            className="text-sm py-2 px-4 font-normal block w-full flex items-center justify-start bg-transparent text-white"
                            onClick={() => ActiveCompte(user, config)}
                          >
                            <SiVerizon
                              className="mr-2"
                              style={{ fontSize: "20px" }}
                            />
                            Active Un Compte
                          </button>
                        ) : (
                          <button
                            className="text-sm py-2 px-4 font-normal block w-full flex items-center justify-start bg-transparent text-white"
                            onClick={() => DesactiveCompte(user, config)}
                          >
                            <SiVexxhost
                              className="mr-2"
                              style={{ fontSize: "20px" }}
                            />
                            Desactive Un Compte
                          </button>
                        )}
                        <button
                          onClick={() => deleteAuser(user, config)}
                          className="text-sm py-2 px-4 font-normal block w-full flex items-center justify-start bg-transparent text-white"
                          type="button"
                        >
                          <FaUserAltSlash
                            className="mr-2"
                            style={{ fontSize: "20px" }}
                          />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <br></br>
            <br></br>
            <div className="ml-3 mr-4 mb-6 flex items-center text-xl">
              <span className="mr-2 ml-4 ">Nombre total d'utilisateurs :</span>
              <h1 className="text-orange-500 mr-2 ml-4">{countUsers()}</h1>
            </div>
          </table>
        </div>
      </div>
      <div className="py-2">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            <li>
              <button
                onClick={goToPreviousPage}
                className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 ${
                  currentPage === 1
                    ? "bg-white text-lightBlue-500"
                    : "bg-lightBlue-500 text-white"
                }`}
              >
                <i className="fas fa-chevron-left -ml-px"></i>
                <i className="fas fa-chevron-left -ml-px"></i>
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 ${
                    currentPage === index + 1
                      ? "bg-lightBlue-500 text-white"
                      : "bg-white text-lightBlue-500"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={goToNextPage}
                className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 ${
                  currentPage === totalPages
                    ? "bg-white text-lightBlue-500"
                    : "bg-lightBlue-500 text-white"
                }`}
              >
                <i className="fas fa-chevron-right -mr-px"></i>
                <i className="fas fa-chevron-right -mr-px"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

ListUsers.defaultProps = {
  color: "light",
};

ListUsers.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
