import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { InfinitySpin } from "react-loader-spinner";

// layouts
const Admin = lazy(() => import("layouts/Admin.js"));
const Auth = lazy(() => import("layouts/Auth.js"));

// views without layouts
const Landing = lazy(() => import("views/Landing.js"));
const Profile = lazy(() => import("views/Profile.js"));
const Index = lazy(() => import("views/Index.js"));

function App() {
  return (
    <>
      <Suspense fallback={<InfinitySpin width="200" height="200" color="#4fa94d" />}>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/index" exact component={Index} />
          <Route path="/" component={Auth} />
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
