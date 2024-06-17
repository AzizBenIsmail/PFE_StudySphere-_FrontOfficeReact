import React, { Suspense, useMemo, useState , useEffect} from 'react'

import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
// import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Profile from "views/admin/Profile.js";
import ListUsers from "views/admin/users/ListUsers.js";
import { InfinitySpin } from 'react-loader-spinner'
import AddUser from "../views/admin/users/AddUser.js";
import UpdateUser from "../views/admin/users/UpdateUser.js";
import UpdatePassword from "../views/admin/users/UpdatePassword.js";
import ListeNiveau from "../views/admin/Niveau/ListeNiveau.js";
import ListeBadge from "../views/admin/Badge/ListeBadge.js";
import LitseXp from "../views/admin/xp/LitseXp.js";
import DetailsFormation from "../views/admin/Formation/DetailsFormation.js";
import Notification from "../views/admin/Notification/Notification";
import Formation from "../views/admin/Formation/Formation";
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'
import Calendar from "../views/admin/calendar/App.js"

export default function Admin() {
  const jwt_token = Cookies.get('jwt_token');
  const [user, setUser] = useState(null);

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserAuth(config);
        if (res.data.user.role === 'client' || res.data.user.role === 'centre' || res.data.user.role === 'formateur') {
          window.location.replace(`/landing/`)
        }
        setUser(res.data.user);
      } catch (error) {
        console.log(error)
      }
    };

    if (jwt_token) {
      fetchData();
    } else {
      window.location.replace(`/`);
    }
  }, [jwt_token, config]);

  useEffect(() => {
    console.log(user);
  }, [user]);


  return (
    <>
    {user !== null && (
      <>
        <Sidebar user={user}/>
      <div className="relative md:ml-60 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-screen">
                  <InfinitySpin width="200" height="200" color="#4fa94d" />
                </div>
              }
            >
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/ListeNiveau" exact component={ListeNiveau} />
            <Route path="/admin/Notification" exact component={Notification} />
            <Route path="/admin/Formation" exact component={Formation} />
            <Route path="/admin/LitseXp" exact component={LitseXp} />
            <Route path="/admin/ListeBadge" exact component={ListeBadge} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/Profile/:id" exact component={Profile} />
            <Route path="/admin/tables" exact component={ListUsers} />
            <Route path="/admin/DetailsFormation/:id" exact component={DetailsFormation} />
            <Route path="/admin/Ajouterutilisateur" exact component={AddUser} />
            <Route path="/admin/Modifierutilisateur/:id" exact component={UpdateUser} />
            <Route path="/admin/UpdatePassword/:id" exact component={UpdatePassword} />
            <Route path="/admin/calender" exact component={Calendar} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          </Suspense>
          <FooterAdmin />
        </div>
      </div>
      </>
    )}
    </>
  );
}
