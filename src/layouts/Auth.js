import { React, Suspense, useMemo } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import RegisterEmail from "views/auth/RegisterEmail.js";
import RegisterCentre from "views/auth/RegisterCentre.js";
import VerificationEmail from "views/auth/VerificationEmail.js";
import VerificationPw from "../views/auth/VerificationPw.js";
import ResetPw from "../views/auth/ResetPw.js";

import { InfinitySpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'

export default function Auth() {
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
          if (res.data.user.role === 'client' || res.data.user.role === 'centre' || res.data.user.role === 'formateur') {
           // window.location.replace(`/landing/`)
          }
          if (res.data.user.role === 'admin') {
            //window.location.replace(`/admin/`)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <InfinitySpin width="200" height="200" color="#4fa94d" />
              </div>
            }
          >
            <Switch>
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/registerEmail" exact component={RegisterEmail} />
              <Route path="/auth/register" exact component={Register} />
              <Route path="/auth/Resetmdp" exact component={ResetPw} />
              <Route path="/auth/registerCentre" exact component={RegisterCentre} />
              <Route path="/auth/registerCentre" exact component={RegisterCentre} />
              <Route path="/auth/VerificationEmail" exact component={VerificationEmail} />
              <Route path="/auth/VerificationMotDePasse" exact component={VerificationPw} />
              <Redirect from="/auth" to="/auth/login" />
            </Switch>
          </Suspense>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
