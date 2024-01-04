import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginUser, forgetPassword } from "../../Services/ApiUser";
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
    // console.log(User);
  };
  const Login = async (user) => {
    try {
      const res = await LoginUser(user);
      // console.log(res.data.message);
      // console.log(res.status);
      // const jwt_token = Cookies.get("jwt_token");
      // console.log("Valeur du cookie jwt_token :", jwt_token);
      // console.log(res.data.user.userType);
      if (res.data.user.userType === "admin") {
        window.location.replace(`/admin/tablesUsers`);
      } else {
        window.location.replace(`/landing-page/`);
      }
    } catch (error) {
      if (error.response.data.erreur === "compte desactive" )
      {
        toast("Compte Desactive  !", { position: "top-center" });
      }else if(error.response.data.erreur === "incorrect password" )
      {
        toast("password incorrect  !", { position: "top-center" });
      }else if(error.response.data.erreur === "incorrect email" )
      {
        toast("email incorrect  !", { position: "top-center" });
      }
      // console.log(error.response.data);
    }
  };
  const forget = async (email) => {
    try {
      const res = await forgetPassword(email);
      console.log(res);
      if (res.data.message === "mot de passe modifié avec succès vérifier votre boîte mail") {
        toast("Vérifier votre boîte mail  !", {position: "top-center"});
      }
    }catch (error) {
      if (error.response.data.message === "User not found!" )
      {
        toast("Email n'existe pas !", { position: "top-center" });
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
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
                      aria-label="Email"                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={(e) => handlechange(e)}
                      label="Password"
                      aria-label="Password"                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => Login(User)}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={ (e) => forget(User.email) }
                  className="text-blueGray-200"
                >
                  <small> Réinitialiser mon mot de passe ?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
