import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

// layouts
const Admin = lazy(() => import("layouts/Admin.js"));
const Auth = lazy(() => import("layouts/Auth.js"));
const First = lazy(() => import("./layouts/First.js"));

// views without layouts
const Landing = lazy(() => import("./views/FrontOffice/client/Landing.js"));
const Elearning = lazy(() => import("views/E-learning/Landing.js"));
const Profile = lazy(() => import("./views/FrontOffice/client/Profile.js"));
const DetailsFormation = lazy(() => import("./views/FrontOffice/client/DetailsFormation.js"));
const updateProfile = lazy(() => import("./views/FrontOffice/client/updateProfile.js"));
const welcome = lazy(() => import("./views/FrontOffice/info/welcome.js"));
const BadgesNiveauXp = lazy(() =>
  import("./views/FrontOffice/info/BadgesNiveauXp.js")
);
const reward = lazy(() => import("./views/FrontOffice/info/reward.js"));
const warning = lazy(() => import("./views/FrontOffice/info/warning.js"));
const listeNotifcation = lazy(() =>
  import("./views/FrontOffice/notification/listeNotifcation.js")
);
const Index = lazy(() => import("views/Index.js"));

function Routes() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <InfinitySpin width="200" height="200" color="#4fa94d" />
          </div>
        }
      >
        <Switch>
          {/* add routes with layouts */}
          <Route path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />
          <Route path="/First" component={First} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/Bienvenu" exact component={welcome} />
          <Route path="/BadgesNiveauXp" exact component={BadgesNiveauXp} />
          <Route path="/reward" exact component={reward} />
          <Route path="/warning" exact component={warning} />
          <Route path="/listeNotifcation" exact component={listeNotifcation} />
          <Route path="/Elearning" exact component={Elearning} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/edit/:id" exact component={updateProfile} />
          <Route path="/DetailsFormation/:id" exact component={DetailsFormation} />
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
