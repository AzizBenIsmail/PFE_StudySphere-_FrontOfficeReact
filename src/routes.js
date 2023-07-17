import React, { lazy } from 'react'

const Dashboard = lazy(() => import('views/Dashboard.js'))
// const Notifications = lazy(() => import('views/Notifications.js'))
const TableListUser = lazy(() => import('views/TableListUser.js'))
// const UserProfile = lazy(() => import('views/UserProfile.js'))
// const UserDetails = lazy(() => import('views/UserDetails.js'))
const AddUser = lazy(() => import('views/AddUser.js'))
const UpdateUser = lazy(() => import('views/UpdateUser.js'))
const TableListCompagne = lazy(() => import('views/TableListCompagne'))

var routes = [{
  path: '/tablesUsers',
  name: 'List Users',
  icon: 'tim-icons icon-single-02',
  component: <TableListUser/>,
  layout: '/admin',
}, {
  path: '/UserDetails/:id/',
  name: 'Compagne',
  icon: 'tim-icons icon-single-02',
  component: <TableListCompagne/>,
  layout: '/admin',
}, {
  path: '/dashboard',
  name: 'Dashboard',
  icon: 'tim-icons icon-chart-pie-36',
  component: <Dashboard/>,
  layout: '/admin',
}//,
 //    {
 //  path: '/notifications',
 //  name: 'Notifications',
 //  icon: 'tim-icons icon-bell-55',
 //  component: <Notifications/>,
 //  layout: '/admin',
 // }, {
//   path: '/user-profile',
//   name: 'User Profile',
//   icon: 'tim-icons icon-single-02',
//   component: <UserProfile/>,
//   layout: '/admin',
// }
 , {
  path: '/AddUser', component: <AddUser/>, layout: '/admin',
}, {
  path: '/UpdateUser/:id/', component: <UpdateUser/>, layout: '/admin',
},]
export default routes
