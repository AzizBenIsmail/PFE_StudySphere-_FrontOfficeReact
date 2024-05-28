import { lazy, React, Suspense, useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

// components
// import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from 'components/Footers/FooterSmall.js'
import Navbar from '../components/Navbars/Navbar'

// views
// import Login from "views/auth/Login.js";

import { InfinitySpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'
// import Cookies from 'js-cookie'
// import { getUserAuth } from '../Services/Apiauth'
const updatePassword = lazy(() => import("../views/FrontOffice/AccountManagement/updatePassword.js"));
const createFormation = lazy(() => import("../views/FrontOffice/Center/GestionFormation"));
const updateProfile = lazy(() => import("../views/FrontOffice/AccountManagement/updateProfile.js"));
const updateStuff = lazy(() => import("../views/FrontOffice/AccountManagement/updateStuff.js"));
const BadgesNiveauXp = lazy(() =>
  import("../views/FrontOffice/AccountManagement/BadgesNiveauXp.js")
);
export default function AccountManagement () {
  const jwt_token = Cookies.get('jwt_token')
  const [user, setUser] = useState(null);
  const history = useHistory()

  //session
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
          const data = res.data.user
          setUser(data)
          if (res.data.user.role === "admin") {
            history.replace("/admin/");
          }
        } else {
          history.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [history, jwt_token]); // Inclure history et jwt_token dans le tableau de dépendances
  return (
    <>
        <Navbar user={user} />
        <main className="profile-page">
          <section className="relative block h-550-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
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
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-screen">
                  <InfinitySpin width="200" height="200" color="#4fa94d" />
                </div>
              }
            >
              <Switch>
              <Route path="/AccountManagement/createFormation" exact component={createFormation} />
                <Route path="/AccountManagement/updatePassword" exact component={updatePassword} />
                <Route path="/AccountManagement/edit/:id" exact component={updateProfile} />
                <Route path="/AccountManagement/stuff" exact component={updateStuff} />
              <Route path="/AccountManagement/BadgesNiveauXp" exact component={BadgesNiveauXp} />
              <Redirect from="/AccountManagement" to="Setting"/>
            </Switch>
          </Suspense>
        </section>
          <div className="pt-28">
            <FooterSmall />
          </div>
      </main>
    </>
  )
}
