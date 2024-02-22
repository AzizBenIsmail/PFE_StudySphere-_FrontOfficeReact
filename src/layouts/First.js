import { lazy, React, Suspense, useMemo } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// components
// import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from 'components/Footers/FooterSmall.js'
import Navbar from '../components/Navbars/NavbarFirst'

// views
// import Login from "views/auth/Login.js";

import { InfinitySpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'
// import Cookies from 'js-cookie'
// import { getUserAuth } from '../Services/Apiauth'
const PreferenceClient = lazy(() => import("../views/FirstStep/PreferenceClient/PreferenceClient.js"));
const UpdatePreferenceClient = lazy(() => import("../views/FirstStep/PreferenceClient/UpdatePreferenceClient.js"));
const announcement = lazy(() => import("../views/FirstStep/PreferenceClient/announcement.js"));
const PreferenceCenter = lazy(() => import("../views/FirstStep/PreferenceCenter/PreferenceCenter.js"));
const announcementCenter = lazy(() => import("../views/FirstStep/PreferenceCenter/announcementCenter.js"));

export default function First () {
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
          if (res.data.user.role === 'admin') {
            window.location.replace(`/admin/`)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  } else {
    window.location.replace(`/`)
  }
  return (
    <>
      <Navbar transparent/>
      <main>
        <section className="relative w-full h-full py-30 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                'url(' + require('assets/img/FirstStep.png').default + ')',
            }}
          ></div>
          <Suspense fallback={<InfinitySpin width="200" height="200" color="#4fa94d"/>}>
            <Switch>
              <Route path="/First/Step" exact component={PreferenceClient}/>
              <Route path="/First/UpdatePreferences" exact component={UpdatePreferenceClient}/>
              <Route path="/First/announcement" exact component={announcement}/>
              <Route path="/First/StepCenter" exact component={PreferenceCenter}/>
              <Route path="/First/announcementCenter" exact component={announcementCenter}/>
              <Redirect from="/First" to="/First/announcement"/>
            </Switch>
          </Suspense>
          <FooterSmall absolute/>
        </section>
      </main>
    </>
  )
}
