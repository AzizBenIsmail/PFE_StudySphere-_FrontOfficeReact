import { React, Suspense, useMemo } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

// import Login from "views/auth/Login.js";
import FirstStep from "views/FirstStep/FirstStep.js";


import { InfinitySpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'
// import Cookies from 'js-cookie'
// import { getUserAuth } from '../Services/Apiauth'

export default function First() {
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
  }else{
    window.location.replace(`/`)
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
                "url(" + require("assets/img/FirstStep.png").default + ")",
            }}
          ></div>
          <Suspense fallback={<InfinitySpin width="200" height="200" color="#4fa94d" />}>
            <Switch>
              <Route path="/First/Step" exact component={FirstStep} />
              <Redirect from="/auth" to="/First/Step" />
            </Switch>
          </Suspense>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
