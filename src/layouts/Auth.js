import { lazy, React, Suspense, useMemo } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

// components

import { InfinitySpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/ApiUser'

const Navbar = lazy(() => import("components/Navbars/AuthNavbar.js"));
const FooterSmall = lazy(() => import("components/Footers/FooterSmall.js"));
// views
const Login = lazy(() => import("views/auth/Login.js"));
const RegisterEmail = lazy(() => import("views/auth/RegisterEmail.js"));
const Register = lazy(() => import("views/auth/Register.js"));
const RegisterCentre = lazy(() => import("views/auth/RegisterCentre.js"));
const VerificationEmail = lazy(() => import("views/auth/VerificationEmail.js"));
const VerificationMotDePasse = lazy(() => import("views/auth/VerificationMotDePasse.js"));
const Resetmdp = lazy(() => import("views/auth/Resetmdp.js"));



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
          if (res.data.user.role === 'client') {
            window.location.replace(`/landing/`)
          }
          if (res.data.user.role === 'admin') {
            window.location.replace(`/admin/`)
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
          <Suspense fallback={<InfinitySpin width="200" height="200" color="#4fa94d" />}>
            <Switch>
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/registerEmail" exact component={RegisterEmail} />
              <Route path="/auth/register" exact component={Register} />
              <Route path="/auth/registerCentre" exact component={RegisterCentre} />
              <Route path="/auth/registerCentre" exact component={RegisterCentre} />
              <Route path="/auth/VerificationEmail" exact component={VerificationEmail} />
              <Route path="/auth/VerificationEmail" exact component={VerificationEmail} />
              <Route path="/auth/VerificationMotDePasse" exact component={VerificationMotDePasse} />
              <Route path="/auth/Resetmdp" exact component={Resetmdp} />
              <Redirect from="/auth" to="/auth/login" />
            </Switch>
          </Suspense>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
