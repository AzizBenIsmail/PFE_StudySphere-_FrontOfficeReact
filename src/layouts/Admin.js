import React, { Suspense, useMemo } from 'react'

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
import ListeNiveau from "../views/admin/Niveau/ListeNiveau.js";
import ListeBadge from "../views/admin/Badge/ListeBadge.js";
import LitseXp from "../views/admin/xp/LitseXp.js";
import Cookies from 'js-cookie'
import { getUserAuth } from '../Services/Apiauth'


export default function Admin() {
  //cookies
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
          if (res.data.user.role === 'client' || res.data.user.role === 'centre' || res.data.user.role === 'formateur') {
            window.location.replace(`/landing/`)
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
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Suspense fallback={<InfinitySpin width="200" height="200" color="#4fa94d" />}>
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/ListeNiveau" exact component={ListeNiveau} />
            <Route path="/admin/LitseXp" exact component={LitseXp} />
            <Route path="/admin/ListeBadge" exact component={ListeBadge} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/Profile/:id" exact component={Profile} />
            <Route path="/admin/tables" exact component={ListUsers} />
            <Route path="/admin/Ajouterutilisateur" exact component={AddUser} />
            <Route path="/admin/Modifierutilisateur/:id" exact component={UpdateUser} />

            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          </Suspense>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
