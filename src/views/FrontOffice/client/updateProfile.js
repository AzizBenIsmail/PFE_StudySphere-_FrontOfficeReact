import React, { useEffect, useMemo, useState } from "react";

// components
import Cookies from "js-cookie";
import { getUserAuth } from "../../../Services/Apiauth";
import { updatecentre, updateUser } from "../../../Services/ApiUser";

import { useHistory, useLocation } from 'react-router-dom'
import Navbar from "../../../components/Navbars/Navbar";
import Footer from "../../../components/Footers/FooterSmall";
// import { NotificationManager } from 'react-notifications'

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard() {
  //cookies
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
          const config = {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          };
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
  }, [history, jwt_token]); // Inclure history et jwt_token dans le tableau de dépendances
  const location = useLocation();
  const message = new URLSearchParams(location.search).get("u");


  const [n, setN] = useState(0); // Ajout de la variable n
  const [emailError, setEmailError] = useState("");
  const [image, setImage] = useState()

  const [User, setUser] = useState({
    role: message ,
  });




  const handlechange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
    // console.log(User)

    if (e.target.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(e.target.value);

      if (!isValidEmail) {
        setEmailError("Veuillez entrer une adresse e-mail valide.");
      } else {
        setEmailError("");
      }
    }
  };

  const handlechangeFile = (e) => {
    setImage(e.target.files[0])
    console.log(e.target.files[0])
  }


    const [messageerr, setmessageerr] = useState();

  let formData = new FormData();

  const update = async (e) => {
    if (
      User.nom === "" &&
      User.prenom === "" &&
      User.email === ""
    ) {
      setN(4); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === "" && User.prenom === "") {
      setN(5); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.prenom === "" ) {
      setN(6); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === "" ) {
      setN(7); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === "") {
      setN(1); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.prenom === "") {
      setN(2);
    } else if (emailError !== "") {
      setN(9);
    } else {
      formData.append("email", User.email);
      formData.append("nom", User.nom);
      formData.append("prenom", User.prenom);
      if (image !== undefined) {
        formData.append("image_user", image, `${User.nom}+.png`);
      }
        const res = await updateUser(formData, User._id, config);
        console.log(res.data);
        if (res.data.message === undefined) {
          window.location.replace(`/profile`)
        } else {
          setmessageerr(res.data.message);
        }
    }
  };

  const addCentre = async (e) => {
    const normalizedNom = User.nom.toLowerCase();
    const passwordLowerCase = User.password.toLowerCase();
    if (emailError === "Veuillez entrer une adresse e-mail valide.") {
    } else if (User.nom === "" && User.email === "" && User.password === "") {
      setN(4); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === "" && User.email === "") {
      setN(5); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.email === "" && User.password === "") {
      setN(6); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === "" && User.password === "") {
      setN(7); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === "") {
      setN(1); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.email === "") {
      setN(2);
    } else if (User.password === "") {
      setN(3);
    } else if (passwordLowerCase.includes(normalizedNom)) {
      setN(8);
    } else {
      formData.append("email", User.email);
      formData.append("nom", User.nom);
      formData.append("prenom", User.prenom);
      formData.append("password", User.password);
      if (image === undefined) {
        setN(9);
      } else {
        formData.append("image_user", image, `${User.nom}+.png`);
        const res = await updatecentre(formData, User._id, config);
        console.log(res.data);
        if (res.data.message === undefined) {
          window.location.replace(`/admin/tables/`);
        } else {
          setmessageerr(res.data.message);
          console.log(res.data.message);
          // showNotification('error', res.data.message, 'Erreur')
        }
      }
    }
  };
  return (
    <>
      <Navbar user={User} />
      <main className="profile-page">
        <section className="relative block h-550-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            // style={{
            //   backgroundImage:
            //     "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            // }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-100 bg-bleu-500"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
          </div>
          <div className="flex py-40 flex-wrap">
            <div className="w-full px-12">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      Modifier {User.nom}
                      {message === "client" ? (
                        <span> Client</span>
                      ) : message === "formateur" ? (
                        <span> Formateur</span>
                      ) : message === "centre" ? (
                        <span> Centre de Formation</span>
                      ) : message === "moderateur" ? (
                        <span> moderateur</span>
                      ) : message === "admin" ? (
                        <span> admin</span>
                      ) : null}
                    </h6>
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={message === "client" || message === "formateur" || message === "admin" || message === "moderateur" ? (e) => update(e) : message === "centre" ? (e) => addCentre(e) : null}
                    >
                      Modifier
                      {message === "client" ? (
                        <span> Client</span>
                      ) : message === "formateur" ? (
                        <span> Formateur</span>
                      ) : message === "centre" ? (
                        <span> Centre de Formation</span>
                      ) : message === "moderateur" ? (
                        <span> Moderateur</span>
                      ) : message === "admin" ? (
                        <span> Admin</span>
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
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="nom"
                            type="text"
                            name="nom"
                            onChange={(e) =>
                              setUser({ ...User, nom: e.target.value })
                            }
                            label="nom"
                            aria-label="nom"
                            value={User.nom}

                          />
                          {n === 1 ||
                          n === 4 ||
                          n === 5 ||
                          n === 7 ||
                          messageerr ===
                          "Le Nom doit contenir plus de 3 caractères" ||
                          messageerr ===
                          "Le Nom doit contenir moins de 15 caractères" ? (
                            <label style={{ color: "red" }}>
                              Le Nom doit contenir plus de 3 et moin de 15
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {message === "client" || message === "formateur" || message === "moderateur" || message === "admin" ? (
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Prenom
                            </label>
                            <input
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="prenom"
                              type="text"
                              name="prenom"
                              onChange={(e) =>
                                setUser({ ...User, prenom: e.target.value })
                              }
                              label="prenom"
                              aria-label="prenom"
                              value={User.prenom}

                            />
                            {n === 2 ||
                            n === 4 ||
                            n === 5 ||
                            n === 6 ||
                            messageerr ===
                            "Le Prenom doit contenir plus de 3 characters" ||
                            messageerr ===
                            "Le Prenom doit contenir plus de 15 characters" ? (
                              <label style={{ color: "red" }}>
                                Le Prenom doit contenir plus de 3 et moin de 15
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ) : message === "centre" ? (
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Image
                            </label>
                            <input
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="image_user"
                              type="file"
                              name="image_user"
                              onChange={(e) => handlechangeFile(e)}
                              label="image_user"
                              aria-label="image_user"
                              // value={User.image_user}
                            />
                          </div>
                        </div>
                      ): null}

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Email Address"
                            type="text"
                            name="email"
                            onChange={(e) => handlechange(e)}
                            label="Email"
                            aria-label="Email"
                            value={User.email}
                          />
                          {n === 4 ? (
                            <label style={{ color: "red" }}>
                              Email obligatoires
                            </label>
                          ) : emailError ? (
                            <label
                              style={{
                                color: "red",
                                display: "block",
                                marginTop: "10px",
                              }}
                            >
                              {emailError}
                            </label>
                          ) : messageerr === "Email exists deja" ? (
                            <label style={{ color: "red" }}>
                              Email exists deja{" "}
                            </label>
                          ) : null}
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Image
                          </label>
                          <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="image_user"
                            type="file"
                            name="image_user"
                            onChange={(e) => handlechangeFile(e)}
                            label="image_user"
                            aria-label="image_user"
                            // value={User.image_user}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/*<div className="py-41">*/}
      <Footer absolute />
      {/*</div>*/}
    </>
  );
}
