import React, { useEffect, useMemo } from "react";

// components
import Cookies from "js-cookie";
import { getUserAuth } from "../../Services/Apiauth";
import { useHistory, useLocation } from "react-router-dom";

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard() {
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

  const location = useLocation();
  const message = new URLSearchParams(location.search).get("u");
  const history = useHistory();

  useEffect(() => {
    console.log(message);

    const interval = setInterval(() => {}, 1000000);

    return () => clearInterval(interval);
  }, [config, message]);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Nouveaux{" "}
                  {message === "Client" ? (
                    <span> Client</span>
                  ) : message === "Formateur" ? (
                    <span> Formateur</span>
                  ) : message === "Centre" ? (
                    <span> Centre de Formation</span>
                  ) : message === "Moderateur" ? (
                    <span> Moderateur</span>
                  ) : null}
                </h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Ajouter un
                  {message === "Client" ? (
                    <span> Client</span>
                  ) : message === "Formateur" ? (
                    <span> Formateur</span>
                  ) : message === "Centre" ? (
                    <span> Centre de Formation</span>
                  ) : message === "Moderateur" ? (
                    <span> Moderateur</span>
                  ) : null}
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  client Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="lucky.jesse"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Prenom
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Lucky"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="jesse@example.com"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        mot de passe
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Jesse"
                      />
                    </div>
                  </div>
                </div>

                {/*<hr className="mt-6 border-b-1 border-blueGray-300"/>*/}

                {/*<h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">*/}
                {/*  d'autre Information*/}
                {/*</h6>*/}
                {/*<div className="flex flex-wrap">*/}
                {/*  <div className="w-full lg:w-12/12 px-4">*/}
                {/*    <div className="relative w-full mb-3">*/}
                {/*      <label*/}
                {/*        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
                {/*        htmlFor="grid-password"*/}
                {/*      >*/}
                {/*        Address*/}
                {/*      </label>*/}
                {/*      <input*/}
                {/*        type="text"*/}
                {/*        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                {/*        defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"*/}
                {/*      />*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*  <div className="w-full lg:w-4/12 px-4">*/}
                {/*    <div className="relative w-full mb-3">*/}
                {/*      <label*/}
                {/*        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
                {/*        htmlFor="grid-password"*/}
                {/*      >*/}
                {/*        spécialité*/}
                {/*      </label>*/}
                {/*      <input*/}
                {/*        type="email"*/}
                {/*        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                {/*        defaultValue="New York"*/}
                {/*      />*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*  <div className="w-full lg:w-4/12 px-4">*/}
                {/*    <div className="relative w-full mb-3">*/}
                {/*      <label*/}
                {/*        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
                {/*        htmlFor="grid-password"*/}
                {/*      >*/}
                {/*        Langue*/}
                {/*      </label>*/}
                {/*      <input*/}
                {/*        type="text"*/}
                {/*        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                {/*        defaultValue="United States"*/}
                {/*      />*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*  <div className="w-full lg:w-4/12 px-4">*/}
                {/*    <div className="relative w-full mb-3">*/}
                {/*      <label*/}
                {/*        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
                {/*        htmlFor="grid-password"*/}
                {/*      >*/}
                {/*        Postal Code*/}
                {/*      </label>*/}
                {/*      <input*/}
                {/*        type="text"*/}
                {/*        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                {/*        defaultValue="Postal Code"*/}
                {/*      />*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<hr className="mt-6 border-b-1 border-blueGray-300"/>*/}

                {/*<h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">*/}
                {/*  About Me*/}
                {/*</h6>*/}
                {/*<div className="flex flex-wrap">*/}
                {/*  <div className="w-full lg:w-12/12 px-4">*/}
                {/*    <div className="relative w-full mb-3">*/}
                {/*      <label*/}
                {/*        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
                {/*        htmlFor="grid-password"*/}
                {/*      >*/}
                {/*        About me*/}
                {/*      </label>*/}
                {/*      <textarea*/}
                {/*        type="text"*/}
                {/*        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                {/*        defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."*/}
                {/*        rows="4"*/}
                {/*      ></textarea>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
