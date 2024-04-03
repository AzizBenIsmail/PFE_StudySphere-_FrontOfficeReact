import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

// layouts
const Admin = lazy(() => import("layouts/Admin.js"));
const Auth = lazy(() => import("layouts/Auth.js"));
const First = lazy(() => import("./layouts/First.js"));
const GestionCompte = lazy(() => import("./layouts/GestionCompte.js"));
const Info = lazy(() => import("./layouts/Info.js"));

// views without layouts
const Landing = lazy(() => import("./views/FrontOffice/client/Landing.js"));
const training = lazy(() => import("./views/FrontOffice/Training/training.js"));
const center = lazy(() => import("./views/FrontOffice/Center/center"));
const Profile = lazy(() => import("./views/FrontOffice/client/Profile.js"));
const Setting = lazy(() => import("./views/FrontOffice/client/Setting/Setting.js"));
const DetailsFormation = lazy(() => import("./views/FrontOffice/client/DetailsFormation.js"));
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
          <Route path="/GestionCompte" component={GestionCompte} />
          <Route path="/Info" component={Info} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/listeNotifcation" exact component={listeNotifcation} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/center" exact component={center} />
          <Route path="/training" exact component={training} />
          <Route path="/Setting" exact component={Setting} />
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
