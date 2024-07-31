import { lazy, React, Suspense, useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import FooterSmall from 'components/Footers/FooterSmall.js'
import Navbar from '../components/Navbars/Navbar'


import { InfinitySpin } from 'react-loader-spinner'
// import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'

const center = lazy(() => import("../views/FrontOffice/Center/center"));
const former = lazy(() => import("../views/FrontOffice/Former/former"));
const training = lazy(() => import("../views/FrontOffice/Training/training"));
const Landing = lazy(() => import("../views/FrontOffice/client/Landing"));
const notification = lazy(() => import("../views/FrontOffice/notification/listeNotifcation"));
const detailscours = lazy(() => import("../views/FrontOffice/client/detailscours.js"));
const Event = lazy(() => import("../views/FrontOffice/Event/Event"));
const EventDetail = lazy(() => import("../views/FrontOffice/Event/EventDetail"));

export default function LandingLayout () {
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
                    "Chaque formation est une passerelle vers de nouvelles opportunités.
                    Inscris-toi aujourd'hui et dessine ton avenir avec assurance."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <InfinitySpin width="200" height="200" color="#4fa94d" />
            </div>
          }
        >
          <Switch>
            <Route path="/landing/center" exact component={center} />
            <Route path="/landing/Formateurs" exact component={former} />
          <Route path="/landing/training" exact component={training} />
            <Route path="/landing/landing" exact render={(props) => <Landing {...props} user={user} />} />
          <Route path="/landing/notification" exact component={notification} />
            <Route path="/landing/detailscours/:id" exact component={detailscours} />
            <Route path="/landing/Event" exact component={Event} />
            <Route path="/landing/EventDetail/:id" exact component={EventDetail} />

            <Redirect from="/landing" to="/landing/landing"/>
        </Switch>
      </Suspense>
      </main>
      <FooterSmall />
    </>
  )
}
