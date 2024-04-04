import { lazy, React, Suspense, useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import FooterSmall from 'components/Footers/FooterSmall.js'
import Navbar from '../components/Navbars/Navbar'


import { InfinitySpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'

const center = lazy(() => import("../views/FrontOffice/Center/center"));
const training = lazy(() => import("../views/FrontOffice/Training/training"));
const Landing = lazy(() => import("../views/FrontOffice/client/Landing"));

export default function LandingLayout () {
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
          setUser(() => {
            if (res.data.user.role === 'admin') {
              history.replace('/admin/');
            }
            return res.data.user;
          });
        } else {
          history.replace('/');
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
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-55">
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-100 bg-bleu-500"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 pt-12 mt-2">
                  <h1 className="text-white font-semibold text-5xl">
                    Your story starts with us.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    This is a simple example of a Landing Page you can build
                    using Notus React. It features multiple CSS components based
                    on the Tailwind CSS design system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Suspense fallback={<InfinitySpin width="200" height="200" color="#4fa94d"/>}>
        <Switch>
          <Route path="/landing/center" exact component={center} />
          <Route path="/landing/training" exact component={training} />
          <Route path="/landing/landing" exact component={Landing} />
          <Redirect from="/landing" to="/landing/landing"/>
        </Switch>
      </Suspense>
      </main>
      <FooterSmall />
    </>
  )
}
