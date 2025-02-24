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
const Profiles = lazy(() => import("./layouts/Profiles.js"));

// views without layouts
const Setting = lazy(() => import("./views/FrontOffice/AccountManagement/Setting.js"));
const DetailsFormation = lazy(() => import("./views/FrontOffice/Visisteur/DetailsFormation.js"));
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
          <Route path="/profile" component={Profiles} />

          {/* add routes without layouts */}
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
