/*eslint-disable*/
import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

import UserDropdownDashboard from "../Dropdowns/UserDropdownDashboard.js";
import { SiCoursera } from "react-icons/si";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";
import { SiOpenbadges } from "react-icons/si";
import { SiOpslevel } from "react-icons/si";
import { MdEventAvailable } from "react-icons/md";
import { LuFolderRoot } from "react-icons/lu";

export default function Sidebar( user ) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-60 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/admin"
          >
            <img
              src={require('assets/img/LogoDark.png').default}
              alt="..."
            />
          </Link>
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdownDashboard />
            </li>
          </ul>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/admin"
                  >
                    StudySphere
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            <hr className="my-4 md:min-w-full" />

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/dashboard"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/dashboard") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              {user.user.role === "admin" ?
                <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block flex " +
                    (window.location.href.indexOf("/admin/tables") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/tables"
                >
                  <div
                    className={
                      "text-sm " +
                      (window.location.href.indexOf("/admin/tables") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  >
                    <FaUsersCog className="mr-2" />
                  </div>
                  Gestion Utilisateurs
                </Link>
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block flex " +
                      (window.location.href.indexOf("/admin/logs") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/logs"
                  >
                    <div
                      className={
                        "text-sm " +
                        (window.location.href.indexOf("/admin/logs") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    >
                      <LuFolderRoot className="mr-2"/>

                    </div>
                    Logs
                  </Link>
              </li>
                : null }
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block flex " +
                    (window.location.href.indexOf("/admin/ListeBadge") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/ListeBadge"
                >
                  <div
                    className={
                      "mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/ListeBadge") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }

                    >
                    <SiOpenbadges />
                  </div>
                  Gestion Badges
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block flex " +
                    (window.location.href.indexOf("/admin/ListeNiveau") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/ListeNiveau"
                >
                  <div
                    className={
                      " mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/ListeNiveau") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  >
                    <SiOpslevel className="mr-2"/>
                  </div>
                  Gestion Niveaux
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/LitseXp") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/LitseXp"
                >
                  <i
                    className={
                      "fas fa-map-marked mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/LitseXp") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Gestion Xps
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold flex  " +
                    (window.location.href.indexOf("/admin/Notification") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/Notification"
                >
                  <div
                    className={
                      "text-sm " +
                      (window.location.href.indexOf("/admin/Notification") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  >
                  <IoNotificationsSharp  className="mr-2" />
                  </div>
                  Gestion Notifications
                </Link>
              </li>

              <hr className="my-4 md:min-w-full" />

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold flex " + // Added 'flex items-center' for flexbox alignment
                    (window.location.href.indexOf("/admin/Formation") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/Formation"
                >
                  <div
                    className={
                      "text-sm " +
                      (window.location.href.indexOf("/admin/Formation") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  >
                  <SiCoursera className="mr-2" />
                  </div>
                  Gestion Formations
                </Link>
              </li>


              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block flex " +
                    (window.location.href.indexOf("/admin/Event") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/Event"
                >
                  <div
                    className={
                      " mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/Event") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ><MdEventAvailable />
                  </div>
                  Gestion Evenements
                </Link>
              </li>

            </ul>

            <hr className="my-4 md:min-w-full" />

          </div>
        </div>
      </nav>
    </>
  );
}
