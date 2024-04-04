import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useHistory } from "react-router-dom";
// components
// import Navbar from "../../../components/Navbars/Navbar.js";
// import Footer from "../../../components/Footers/FooterSmall.js";
import Cookies from "js-cookie";
// import { getUserAuth } from "../../../Services/Apiauth";
import { getByCurrUser } from "../../../Services/ApiXp";
import { getAllNiveaux } from "../../../Services/ApiNiveau";
import SiedBarSetting from './SiedBarSetting'

export default function BadgesNiveauXp() {
  // const [user, setUser] = useState(null);
  const jwt_token = Cookies.get("jwt_token");
  if (!Cookies.get("jwt_token")) {
    window.location.replace("/login-page");
  }
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);
  // const history = useHistory();
  const [xpEntry, setXPEntry] = useState(null);
  const [niveaux, setNiveaux] = useState([]);

  const loadXPEntries = useCallback(async () => {
    try {
      const res = await getByCurrUser(config);
      setXPEntry(res.data);
    } catch (error) {
      console.error("Error loading XP entries:", error);
    }
  }, [config]);

  useEffect(() => {
    loadXPEntries();
  }, [loadXPEntries]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (jwt_token) {
  //         const config = {
  //           headers: {
  //             Authorization: `Bearer ${jwt_token}`,
  //           },
  //         };
  //         const res = await getUserAuth(config);
  //         setUser(() => {
  //           if (res.data.user.role === "admin") {
  //             history.replace("/admin/");
  //           }
  //           return res.data.user;
  //         });
  //       } else {
  //         history.replace("/");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //
  //   fetchData();
  // }, [history, jwt_token]); // Inclure history et jwt_token dans le tableau de dépendances

  const loadNiveaux = useCallback(async () => {
    try {
      const res = await getAllNiveaux(config);
      setNiveaux(res.data);
    } catch (error) {
      console.error("Error loading niveaux:", error);
    }
  }, [config]); // Assurez-vous d'inclure toutes les dépendances nécessaires ici

  // Effet pour charger les niveaux au chargement du composant
  useEffect(() => {
    loadNiveaux();
  }, [loadNiveaux]);

  const calculerPourcentageProgression = () => {
    if (!xpEntry || niveaux.length === 0) return 0;

    const niveauActuel = niveaux.find(
      (niveau) => niveau.nom === xpEntry.niveauAtteint.nom
    );
    const indexNiveauActuel = niveaux.indexOf(niveauActuel);

    if (indexNiveauActuel === niveaux.length - 1) {
      // L'utilisateur a atteint le dernier niveau
      return 100;
    }

    const xpRequisNiveauActuel = niveauActuel.xpRequis;
    const xpRequisNiveauSuivant = niveaux[indexNiveauActuel + 1].xpRequis;

    const xpNiveauActuel = xpEntry.pointsGagnes - xpRequisNiveauActuel;
    const xpNiveauSuivant = xpRequisNiveauSuivant - xpRequisNiveauActuel;

    const pourcentageProgression = (xpNiveauActuel / xpNiveauSuivant) * 100;
    return pourcentageProgression;
  };

  return (
    <>
      {/*<main className="profile-page">*/}
      {/*  <section className="relative block h-550-px">*/}
      {/*    <div*/}
      {/*      className="absolute top-0 w-full h-full bg-center bg-cover"*/}
      {/*    >*/}
      {/*      <span*/}
      {/*        id="blackOverlay"*/}
      {/*        className="w-full h-full absolute opacity-100 bg-bleu-500"*/}
      {/*      ></span>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"*/}
      {/*      style={{ transform: "translateZ(0)" }}*/}
      {/*    >*/}
      {/*    </div>*/}
      {/*<Navbar user={user} />*/}
      {/*<main className="profile-page">*/}
      {/*  <section className="relative block h-550-px">*/}
      {/*    <div className="absolute top-0 w-full h-full bg-center bg-cover">*/}
      {/*      <div className="flex flex-wrap justify-center"></div>*/}
      {/*    </div>*/}

        {xpEntry ? (
          <div className="flex py-30 flex-wrap">
          <SiedBarSetting code="5"/>
            <div className="w-7/12 px-6">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 items-center text-blueGray-100 border-0">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-5xl mt-4 font-semibold">
                  {xpEntry.niveauAtteint.nom} | Xp : {xpEntry.pointsGagnes}{" "}
                </h2>
              </div>
            </div>
            <section className=" pb-48">
              <div className="container mx-auto ">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        {xpEntry.niveauAtteint.nom} in progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        {calculerPourcentageProgression()}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                    <div
                      style={{ width: `${calculerPourcentageProgression()}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                    ></div>
                  </div>
                </div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 ">
                  Badges
                </span>

                <div className="flex flex-wrap">
                  {xpEntry.badgeIds.map((badge) => (
                    <div
                      className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4"
                      key={badge._id}
                    >
                      <div className="px-6">
                        <img
                          alt="..."
                          src={`http://localhost:5000/images/badges/${badge.image_badge}`}
                          className="shadow-lg rounded-full bg-blueGray-100 mx-auto max-w-120-px"
                        />
                        <div className="pt-6 text-center">
                          <h5 className="text-xl font-bold">{badge.nom}</h5>
                          <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center text-center ">
            <p>Loading...</p>
          </div>
        )}
      {/*  </section>*/}
      {/*</main>*/}
      {/*<Footer />*/}
    </>
  );
}
