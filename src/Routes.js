import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { InfinitySpin } from "react-loader-spinner";

// layouts
const Admin = lazy(() => import("layouts/Admin.js"));
const Auth = lazy(() => import("layouts/Auth.js"));
const First = lazy(() => import("./layouts/First.js"));

// views without layouts
const Landing = lazy(() => import("views/Landing.js"));
const Elearning = lazy(() => import("views/E-learning/Landing.js"));
const Profile = lazy(() => import("views/Profile.js"));
const updateProfile = lazy(() => import("./views/client/updateProfile.js"));
const Bienvenu = lazy(() => import("./views/client/info/Bienvenu.js"));
const recompense = lazy(() => import("./views/client/info/recompense.js"));
const advertisement = lazy(() => import("./views/client/info/advertisement.js"));
const listeNotifcation = lazy(() => import("./views/client/notification/listeNotifcation.js"));
const Index = lazy(() => import("views/Index.js"));

function Routes() {
  return (
    <>
      <Suspense fallback={<InfinitySpin width="200" height="200" color="#4fa94d" />}>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />
          <Route path="/First" component={First} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/Bienvenu" exact component={Bienvenu} />
          <Route path="/recompense" exact component={recompense} />
          <Route path="/advertisement" exact component={advertisement} />
          <Route path="/listeNotifcation" exact component={listeNotifcation} />
          <Route path="/Elearning" exact component={Elearning} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/edit/:id" exact component={updateProfile} />
          <Route path="/" exact component={Index} />
          {/*<Route path="/" component={Auth} />*/}
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </>
  );
}

export default Routes;
