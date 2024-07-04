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

const welcome = lazy(() => import("../views/FrontOffice/info/welcome.js"));
const reward = lazy(() => import("../views/FrontOffice/info/reward.js"));
const warning = lazy(() => import("../views/FrontOffice/info/warning.js"));
const warningAuth = lazy(() => import("../views/FrontOffice/info/warningAuth.js"));

export default function Info () {
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
    <section className="py-20 bg-bleu-500 overflow-hidden">
      <div className="container mx-auto pb-20">
        <div className="flex flex-wrap justify-center">
        </div>
      </div>
    </section>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <InfinitySpin width="200" height="200" color="#4fa94d" />
          </div>
        }
      >            <Switch>
              <Route path="/Info/Bienvenu" exact component={welcome} />
              <Route path="/Info/reward" exact component={reward} />
              <Route path="/Info/warning" exact component={warning} />
              <Route path="/Info/warningAuth" exact component={warningAuth} />
              <Redirect from="/Info" to="/Info/Bienvenu"/>
            </Switch>
          </Suspense>
        <FooterSmall />
    </>
  )
}
