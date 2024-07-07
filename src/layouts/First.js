import { lazy, React, Suspense, useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

// components
// import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from 'components/Footers/FooterSmall.js'
import Navbar from '../components/Navbars/Navbar'

// views
// import Login from "views/auth/Login.js";

import { InfinitySpin } from 'react-loader-spinner'
// import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'
// import Cookies from 'js-cookie'
// import { getUserAuth } from '../Services/Apiauth'
const PreferenceClient = lazy(() => import("../views/FrontOffice/FirstStep/PreferenceClient/PreferenceClient.js"));
const UpdatePreferenceClient = lazy(() => import("../views/FrontOffice/FirstStep/PreferenceClient/UpdatePreferenceClient.js"));
const UpdatePreferenceCenter = lazy(() => import("../views/FrontOffice/FirstStep/PreferenceCenter/UpdatePreferenceCenter.js"));
const announcement = lazy(() => import("../views/FrontOffice/FirstStep/PreferenceClient/announcement.js"));
const PreferenceCenter = lazy(() => import("../views/FrontOffice/FirstStep/PreferenceCenter/PreferenceCenter.js"));
const announcementCenter = lazy(() => import("../views/FrontOffice/FirstStep/PreferenceCenter/announcementCenter.js"));
const announcementFormateur = lazy(() => import("../views/FrontOffice/FirstStep/PreferenceFormateur/announcementFormateur.js"));
const PreferenceFormateur = lazy(() => import("../views/FrontOffice/FirstStep/PreferenceFormateur/PreferenceFormateur.js"));
const UpdatePreferenceFormateur = lazy(() => import("../views/FrontOffice/FirstStep/PreferenceFormateur/UpdatePreferenceFormateur.js"));

export default function First () {
  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');
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
          setUser(() => {
            if (res.data.user.role === 'admin') {
              history.replace('/admin/');
            }
            return res.data.user;
          });
        } else {
          history.replace('/auth/login');
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [history, jwt_token]); // Inclure history et jwt_token dans le tableau de dépendances
  return (
    <>
      <Navbar user={user}/>
      <main>
        <section className="relative w-full h-full py-11 bg-bleu-500 min-h-screen-55">
          {/*<div*/}
          {/*  className="absolute top-0 w-full h-full  bg-no-repeat bg-full"*/}
          {/*  // style={{*/}
          {/*  //   backgroundImage:*/}
          {/*  //     'url(' + require('assets/img/FirstStep.png').default + ')',*/}
          {/*  // }}*/}
          {/*></div>*/}
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <InfinitySpin width="200" height="200" color="#4fa94d" />
              </div>
            }
          >
            <Switch>
              <Route path="/First/Step" exact component={PreferenceClient}/>
              <Route path="/First/UpdatePreferences" exact component={UpdatePreferenceClient}/>
              <Route path="/First/UpdatePreferencesCenter" exact component={UpdatePreferenceCenter}/>
              <Route path="/First/announcement" exact component={announcement}/>
              <Route path="/First/StepCenter" exact component={PreferenceCenter}/>
              <Route path="/First/announcementCenter" exact component={announcementCenter}/>
              <Route path="/First/announcementFormateur" exact component={announcementFormateur}/>
              <Route path="/First/StepFormateur" exact component={PreferenceFormateur}/>
              <Route path="/First/UpdatePreferenceFormateur" exact component={UpdatePreferenceFormateur}/>
              <Redirect from="/First" to="/First/announcement"/>
            </Switch>
          </Suspense>
        </section>
        <FooterSmall />
      </main>
    </>
  )
}
