import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
const welcome = lazy(() => import("./views/client/info/welcome.js"));
const reward = lazy(() => import("./views/client/info/reward.js"));
const warning = lazy(() => import("./views/client/info/warning.js"));
const listeNotifcation = lazy(() =>
  import("./views/client/notification/listeNotifcation.js")
);
const Index = lazy(() => import("views/Index.js"));

const Chat = lazy(() => import("./views/chat/Main.js"));

function Routes() {
  return (
    <>
      <Suspense
        fallback={<InfinitySpin width="200" height="200" color="#4fa94d" />}
      >
        <Switch>
          {/* add routes with layouts */}
          <Route path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />
          <Route path="/First" component={First} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/Bienvenu" exact component={welcome} />
          <Route path="/reward" exact component={reward} />
          <Route path="/warning" exact component={warning} />
          <Route path="/listeNotifcation" exact component={listeNotifcation} />
          <Route path="/Elearning" exact component={Elearning} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/edit/:id" exact component={updateProfile} />
          <Route path="/" exact component={Index} />
          {/*<Route path="/" component={Auth} />*/}

          {/* New route for the chat page */}
          <Route path="/chat" exact component={Chat} />

          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </>
  );
}

export default Routes;
