import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

// layouts
const Admin = lazy(() => import("layouts/Admin.js"));
const Auth = lazy(() => import("layouts/Auth.js"));
const First = lazy(() => import("./layouts/First.js"));
const AccountManagement = lazy(() => import("./layouts/AccountManagement.js"));
const Info = lazy(() => import("./layouts/Info.js"));
const LandingLayout = lazy(() => import("./layouts/LandingLayout.js"));

// views without layouts
const Profile = lazy(() => import("./views/FrontOffice/client/Profile.js"));
const Setting = lazy(() => import("./views/FrontOffice/AccountManagement/Setting.js"));
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
          <Route path="/AccountManagement" component={AccountManagement} />
          <Route path="/Info" component={Info} />
          <Route path="/landing" component={LandingLayout} />

          {/* add routes without layouts */}
          <Route path="/listeNotifcation" exact component={listeNotifcation} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/Setting" exact component={Setting} />
          <Route path="/DetailsFormation/:id" exact component={DetailsFormation} />
          <Route path="/" exact component={Index} />
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </>
  );
}

export default Routes;
