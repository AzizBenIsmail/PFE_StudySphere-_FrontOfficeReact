import { lazy, React, Suspense, useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import FooterSmall from 'components/Footers/FooterSmall.js'
import Navbar from '../components/Navbars/Navbar'


import { InfinitySpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'

const Profile = lazy(() => import("../views/FrontOffice/Profiles/Profile"));
const ProfileCenter = lazy(() => import("../views/FrontOffice/Profiles/ProfileCenter"));
const ProfileFormateur = lazy(() => import("../views/FrontOffice/Profiles/ProfileFormateur"));

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
      <Navbar user={user}/>
      <main className="profile-page">
        <section className="relative block h-350-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            // style={{
            //   backgroundImage:
            //     "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            // }}
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
        </section>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <InfinitySpin width="200" height="200" color="#4fa94d" />
            </div>
          }
        >
          <Switch>
          <Route path="/profile/Profile" exact component={Profile} />
          <Route path="/profile/ProfileCenter" exact component={ProfileCenter} />
          <Route path="/profile/ProfileFormateur" exact component={ProfileFormateur} />
            <Redirect from="/profile" to="/profile/Profile"/>
        </Switch>
      </Suspense>
      </main>
      <FooterSmall />
    </>
  )
}
