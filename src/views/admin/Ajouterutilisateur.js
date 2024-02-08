import React, { useEffect, useMemo, useState } from "react";

// components
import Cookies from "js-cookie";
import { getUserAuth, register, registerCentre } from '../../Services/Apiauth'
import { useLocation } from "react-router-dom";
// import { NotificationManager } from 'react-notifications'

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

  useEffect(() => {
    console.log(message);

    const interval = setInterval(() => {}, 1000000);

    return () => clearInterval(interval);
  }, [config, message]);

  const [n, setN] = useState(0); // Ajout de la variable n
  const [emailError, setEmailError] = useState("");
  const [image, setImage] = useState()

  const [User, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: message ,
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setUser({ ...User, password: newPassword });

    const strengthCode = checkPasswordStrength(newPassword, User.nom);
    setPasswordStrength(strengthCode);
  };

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


  const checkPasswordStrength = (password, nom) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const normalizedNom = nom.toLowerCase();
    const passwordLowerCase = password.toLowerCase();

    if (password.length === 0) {
      return 0; // Le nom existe dans le mot de passe (Faible)
    } else if (passwordLowerCase.includes(normalizedNom)) {
      return 1; // Le nom existe dans le mot de passe (Faible)
    } else if (password.length < 3) {
      return 1; // Faible
    } else if (password.length < 8) {
      return 2; // Faible
    } else if (hasUppercase && hasLowercase && hasDigit) {
      return 4; // Très fort (ajoutez vos propres critères)
    } else {
      return 2; // Moyen
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
        return "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500";
      case 1:
        return "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500";
      case 2:
        return "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500";
      case 3:
        return "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500";
      case 4:
        return "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500";
      default:
        return "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500";
    }
  };

  const getColor = (strength) => {
    switch (strength) {
      case 0:
        return "overflow-hidden h-2 mb-4 text-xs flex rounded bg-lightBlue-200";
      case 1:
        return "overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200";
      case 2:
        return "overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200";
      case 3:
        return "overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200";
      case 4:
        return "overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-200";
      default:
        return "overflow-hidden h-2 mb-4 text-xs flex rounded bg-lightBlue-200";
    }
  };
  const [messageerr, setmessageerr] = useState();

  const add = async (e) => {
    const normalizedNom = User.nom.toLowerCase();
    const passwordLowerCase = User.password.toLowerCase();
    if (
      User.nom === "" &&
      User.prenom === "" &&
      User.password === "" &&
      User.email === ""
    ) {
      setN(4); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === "" && User.prenom === "") {
      setN(5); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.prenom === "" && User.password === "") {
      setN(6); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === "" && User.password === "") {
      setN(7); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === "") {
      setN(1); // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.prenom === "") {
      setN(2);
    } else if (User.password === "") {
      setN(3);
    } else if (passwordLowerCase.includes(normalizedNom)) {
      setN(8);
    } else if (emailError !== "") {
      setN(9);
    } else {
      const res = await register(User);
      console.log(res.data);
      if (res.data.message === undefined) {
        window.location.replace(`/admin/tables/`)
      } else {
        setmessageerr(res.data.message);
      }
    }
  };

  let formData = new FormData()
  const addCentre = async (e) => {
    const normalizedNom = User.nom.toLowerCase()
    const passwordLowerCase = User.password.toLowerCase()
    if (emailError === 'Veuillez entrer une adresse e-mail valide.') {
    } else if (User.nom === '' && User.email === '' && User.password === '') {
      setN(4) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === '' && User.email === '') {
      setN(5) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.email === '' && User.password === '') {
      setN(6) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === '' && User.password === '') {
      setN(7) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === '') {
      setN(1) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.email === '') {
      setN(2)
    } else if (User.password === '') {
      setN(3)
    } else if (passwordLowerCase.includes(normalizedNom)) {
      setN(8);
    } else {
      formData.append('email', User.email)
      formData.append('nom', User.nom)
      formData.append('prenom', User.prenom)
      formData.append('password', User.password)
      if (image === undefined) {
        setN(9)
      } else {
        formData.append('image_user', image, `${User.username}+.png`)
        const res = await registerCentre(formData)
        console.log(res.data)
        if (res.data.message === undefined) {
          window.location.replace(`/admin/tables/`)
        } else {
          setmessageerr(res.data.message)
          console.log(res.data.message)
          // showNotification('error', res.data.message, 'Erreur')
        }
      }
    }
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Nouveaux
                  {message === "client" ? (
                    <span> Client</span>
                  ) : message === "formateur" ? (
                    <span> Formateur</span>
                  ) : message === "Centre" ? (
                    <span> Centre de Formation</span>
                  ) : message === "moderateur" ? (
                    <span> moderateur</span>
                  ) : null}
                </h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={message === "client" || message === "formateur" || message === "moderateur" ? (e) => add(e) : message === "Centre" ? (e) => addCentre(e) : null}
                >
                  Ajouter un
                  {message === "client" ? (
                    <span> Client</span>
                  ) : message === "formateur" ? (
                    <span> Formateur</span>
                  ) : message === "Centre" ? (
                    <span> Centre de Formation</span>
                  ) : message === "moderateur" ? (
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
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="nom"
                        type="text"
                        name="nom"
                        onChange={(e) =>
                          setUser({ ...User, nom: e.target.value })
                        }
                        label="nom"
                        aria-label="nom"
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
                  {message === "client" || message === "formateur" || message === "moderateur" ? (
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
                  ) : message === "Centre" ? (
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
                        />
                        {n === 9 ? (
                          <label style={{ color: "red" }}>
                            image obligatoire
                          </label>
                        ) : (
                          ""
                        )}
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
                        mot de passe
                      </label>
                      <input
                        defaultValue=""
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={(e) => handlePasswordChange(e)}
                        label="Password"
                        aria-label="Password"
                      />
                      {n === 3 ||
                      n === 4 ||
                      n === 6 ||
                      n === 7 ||
                      messageerr ===
                        "Le Mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole Exemple mdp : Exemple@123 | Exemple#123 | Exemple.123 | Exemple/123 | Exemple*123" ||
                      messageerr ===
                        "Le Mot de passe doit contenir au moins 8 caractères" ? (
                        <label style={{ color: "red" }}>
                          Le Mot de passe doit contenir au moins une lettre
                          majuscule, une lettre minuscule, un chiffre et un
                          symbole Exemple mdp : Exemple@123 | Exemple#123 |
                          Exemple.123 | Exemple/123 | Exemple*123{" "}
                        </label>
                      ) : n === 8 ? (
                        <label style={{ color: "red" }}>
                          Il est important de ne pas inclure ton nom dans le mot
                          de passe. Nom dans le mot de passe
                        </label>
                      ) : (
                        ""
                      )}
                      <div className="relative pt-1">
                        <div className={`${getColor(passwordStrength)}`}>
                          <div
                            style={{
                              width: `${(passwordStrength / 3) * 100}%`,
                            }}
                            className={`${getStrengthColor(passwordStrength)}`}
                          ></div>
                        </div>
                      </div>
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
