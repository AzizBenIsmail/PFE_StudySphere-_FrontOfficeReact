import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import TableListUser from "views/TableListUser.js";
import UserProfile from "views/UserProfile.js";
import UserDetails from "views/UserDetails.js";

var routes = [
  {
    path: "/tablesUsers",
    name: "List Users",
    icon: "tim-icons icon-single-02",
    component: <TableListUser />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/UserDetails/:id/",
    name: "UserDetails",
    icon: "tim-icons icon-single-02",
    component: <UserDetails />,
    layout: "/admin",
  },
];
export default routes;
