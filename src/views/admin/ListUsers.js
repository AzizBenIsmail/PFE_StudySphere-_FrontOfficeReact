import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { SiVerizon, SiVexxhost } from "react-icons/si";

// components
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import Cookies from "js-cookie";
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
} from "../../Services/ApiUser";
import { RiAdminFill } from "react-icons/ri";
import { AiOutlineReload, AiOutlineUser } from "react-icons/ai";
import { Puff } from "react-loader-spinner";

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
    await getUserActive(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllUserDesactive = useCallback(async (config) => {
    await getUserDesactive(config)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);

  useEffect(() => {
    getAllUsers(config);

    const interval = setInterval(() => {
      getAllUsers(config);
    }, 1000000);

    return () => clearInterval(interval);
  }, [getAllUsers, config]);

  const deleteAuser = async (user, config) => {
    const result = window.confirm(
      "Êtes-vous sûr de vouloir supprimer de la base ? " + user.username + "?"
    );
    if (result) {
      deleteUser(user._id, config);
      getAllUsers(config);
    } else {
      setDeletedUsers([...deletedUsers, user]);
    }
  };

  const forget = async (email) => {
    forgetPassword(email);
  };

  const upgradeAuser = async (user, config) => {
    upgrade(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  const downgradeAuser = async (user, config) => {
    downgrade(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  const ActiveCompte = async (user, config) => {
    active(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  const DesactiveCompte = async (user, config) => {
    desactive(user._id, config);
    setTimeout(() => {
      getAllUsers(config);
    }, 1000); // Appeler getAllUsers(config) après un délai de 2 secondes
  };

  function getUserTypeAbbreviation(userType) {
    if (userType === "admin") {
      return (
        <RiAdminFill
          className="mr-2"
          color="#4fa94d"
          style={{ fontSize: "24px" }}
        />
      );
    } else if (userType === "user") {
      return <AiOutlineUser className="mr-2" style={{ fontSize: "24px" }} />;
    } else {
      return ""; // Valeur par défaut si le type d'utilisateur n'est ni "admin" ni "user"
    }
  }

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
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <nav className="relative flex flex-wrap items-center justify-between navbar-expand-lg  rounded">
              <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                  {/*<a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white" href="#pablo">*/}
                  {/*  Rechercher*/}
                  {/*</a>*/}
                  {/*  <form onSubmit={handleSubmit} className="flex items-center"> /!* Utilisation de flex pour aligner les éléments en ligne *!/*/}
                  {/*    <div className="mb-3 pt-0 flex items-center">*/}
                  {/*      <input*/}
                  {/*        placeholder="Rechercher..."*/}
                  {/*        type="text"*/}
                  {/*        name="username"*/}
                  {/*        value={searchTerm}*/}
                  {/*        onChange={handleInputChange}*/}
                  {/*        label="Username"*/}
                  {/*        aria-label="Username"*/}
                  {/*        className="px-2 py-1 h-8 border border-solid  border-lightBlue-600 rounded-full text-sm leading-snug text-lightBlue-700 bg-lightBlue-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-lightBlue-300"                        />*/}
                  {/*      <span className="ml-2 text-xl text-white"></span>*/}
                  {/*    </div>*/}
                  {/*  </form>*/}
                  <button
                    className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                  >
                    <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                    <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                    <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                  </button>
                </div>
                <div
                  className="flex lg:flex-grow items-center"
                  id="example-navbar-info"
                >
                  <ul className="flex flex-col lg:flex-row list-none ml-auto">
                    <li className="nav-item"></li>
                    <li className="nav-item"></li>
                    <li className="nav-item"></li>
                    <li className="nav-item"></li>
                  </ul>
                </div>
              </div>
            </nav>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg mb-3">
              <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                  {/*<a*/}
                  {/*  className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"*/}
                  {/*  href="#pablo"*/}
                  {/*>*/}
                  {/*  lightBlue Notus*/}
                  {/*</a>*/}

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
                      <button
                        onClick={() => getAllAdmin(config)}
                        className=" bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Admin
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={() => getAllSimpleUser(config)}
                        className=" bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Simple
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={() => getAllUserActive(config)}
                        className=" bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Verifier
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={() => getAllUserDesactive(config)}
                        className="bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        type="button"
                      >
                        Désactive
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
              {users
                .filter((user) => !deletedUsers.includes(user))
                .map((user) => (
                  <tr key={user._id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      {user.image_user ? (
                        <img
                          // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                          alt="User Image"
                          src={`http://localhost:5000/images/${user.image_user}`}
                          style={{ width: "80px", height: "80px" }}
                        />
                      ) : (
                        <div>
                          <img
                            // onClick={() => navigate(`/admin/UserDetails/${user._id}`)}
                            alt="User Image"
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
                      <i className="fas fa-circle text-red-500 mr-2"></i>
                      <i className="fas fa-circle  text-emerald-500  mr-2"></i>
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
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"></td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <TableDropdown />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
