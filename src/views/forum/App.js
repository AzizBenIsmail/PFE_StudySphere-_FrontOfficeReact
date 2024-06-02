// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { initializeBlogs } from "./reducers/blogReducer";
// import { initializeUsers, setUser } from "./reducers/userReducer";
// import { initializeAllUsers } from "./reducers/allUsersReducer";
// import BlogList from "./components/BlogList";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   useParams,
//   useRouteMatch, // Import useRouteMatch instead of useMatch
// } from "react-router-dom";
// import NewBlog from "./components/NewBlog";
// import NavigationBar from "./components/NavigationBar";

// import BlogView from "./components/BlogView";
// import UserView from "./components/UserView";
// import ExampleBlog from "./components/ExampleBlog";
// import RegisterUser from "./components/RegisterUser";
// import About from "./components/About";
// import ErrorPage from "./components/ErrorPage";
// import BlogEdit from "./components/BlogEdit";
// import Notif from "./components/Notif";

// const App = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const user = useSelector((state) => state.users);
//   const blogs = useSelector((state) => state.blogs);
//   const allUsers = useSelector((state) => state.allUsers);
//   const [theme, setTheme] = useState(
//     localStorage.getItem("color-theme")
//       ? JSON.parse(localStorage.getItem("color-theme"))
//       : true
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(initializeBlogs());
//       await dispatch(initializeUsers());
//       await dispatch(initializeAllUsers());
//       setLoading(false); // Set loading to false once data is fetched
//     };
//     fetchData();
//   }, [dispatch]);

//   const match = useRouteMatch("/forum/posts/:id");
//  // console.log("Match object for /posts/:id:", match); // Log the match object
//   const blog = match
//     ? blogs.find((blog) => blog._id === match.params.id)
//     : null;
//  console.log("Blog found:", blog); // Log the blog found

//   // // Inside your component
//   // const param = useParams();
//   // const staticId = "664faf9408731d49539fed0e"; // Static ID for testing
//   // const match = useRouteMatch("/forum/posts/:id"); // Update to dynamic route pattern
//   // const blog = match ? blogs.find((blog) => blog._id === staticId) : null;

//   // Log the values
//   //console.log("ID from URL:", param);
//   // console.log("Match object:", match);
//   // console.log("Blog found:", blog);

//     const match2 = useRouteMatch("/forum/posts/edit/6650f3fff5b201b66b2b42c2"); // Change useMatch to useRouteMatch
//     const blog1 = match2
//       ? blogs.find((blog) => blog._id === match2.params.id)
//       : null;


//       console.log("Blog1:", blog1);
//     // const match1 = useRouteMatch("/users/:id"); // Change useMatch to useRouteMatch
//     // const userInView = match1
//     //   ? allUsers.find((user) => user.username === match1.params.id)
//     //   : null;

//   const handleThemeSwitch = (event) => {
//     event.preventDefault();
//     setTheme(!theme);
//     localStorage.setItem("color-theme", JSON.stringify(!theme));
//   };

//   // Log the state to check if they are imported correctly
//   // console.log("User state:", user);
//   // console.log("Blogs state:", blogs);
//   // console.log("AllUsers state:", allUsers);
//   // console.log("Current blog being viewed:", blog);

//   if (loading) {
//     return <div>Loading...</div>; // Or a loading spinner
//   }

//   return (
//     <div className={theme ? "dark" : ""}>
//       <div>
//         <div>
//           <NavigationBar
//             user={user}
//             handleThemeSwitch={handleThemeSwitch}
//             theme={theme}
//           />

//           <Switch>
//             {" "}
//             {/* Replace Routes with Switch */}
//             <Route
//               path="/forum/posts/:id"
//               render={(props) => {
//                 // console.log("Props in /posts/:id route:", props);
//                 // console.log("Rendering BlogView component");
//                 return  (
//                   <BlogView {...props} blog={blog} />
//                 ) 
//               }}
//             />
//             <Route
//               path="/forum/create"
//               render={() => {
//                 //console.log("Rendering new blog component");
//                 return <NewBlog />;
//               }}
//             />
//             <Route
//               path="/forum/"
//               component={() => {
//                 //console.log("Rendering BlogList component");
//                 return <BlogList user={user} setUser={setUser} />;
//               }}
//             />
//             {/* <Route
//               path="/users/:id"
//               render={(props) => (
//                 <UserView {...props} userInView={userInView} />
//               )}
//             /> */}
//             {/* <Route path="/forum/example" component={ExampleBlog} />
//             <Route path="/forum/register" component={RegisterUser} />
//             <Route path="/forum/about" component={About} /> */}
//             <Route
//               path="/forum/posts/edit/6650f3fff5b201b66b2b42c2"
//               render={(props) => <BlogEdit {...props} blog={blog1} />}
//             /> 
//             <Route path="*" component={ErrorPage} />
//           </Switch>
//         </div>
//         <Notif />
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers, setUser } from "./reducers/userReducer";
import { initializeAllUsers } from "./reducers/allUsersReducer";
import BlogList from "./components/BlogList";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import NewBlog from "./components/NewBlog";
import NavigationBar from "./components/NavigationBar";

import BlogView from "./components/BlogView";
import UserView from "./components/UserView";
import ErrorPage from "./components/ErrorPage";
import BlogEdit from "./components/BlogEdit";
import Notif from "./components/Notif";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const allUsers = useSelector((state) => state.allUsers);
  const [theme, setTheme] = useState(
    localStorage.getItem("color-theme")
      ? JSON.parse(localStorage.getItem("color-theme"))
      : true
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(initializeBlogs());
      await dispatch(initializeUsers());
      await dispatch(initializeAllUsers());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const match = useRouteMatch("/forum/posts/:id");
  //console.log("Match object for /posts/:id:", match);

  // if (match) {
  // //  console.log("match.params.id:", match.params.id);
  // }

  const blog = match ? blogs.find((blog) => blog._id === match.params.id) : null;
  //console.log("Blog found:", blog);

  const matchEdit = useRouteMatch("/forum/posts/edit/:id");
  const blogEdit = matchEdit
    ? blogs.find((blog) => blog._id === matchEdit.params.id)
    : null;
 // console.log("BlogEdit found:", blogEdit);

  // const match1 = useRouteMatch("/forum/users/:id"); // Change useMatch to useRouteMatch
  //   const userInView = match1
  //      ? allUsers.find((user) => user._id === match1.params.id)
  //     : null;
  //   console.log("userinview found:", userInView);


  const handleThemeSwitch = (event) => {
    event.preventDefault();
    setTheme(!theme);
    localStorage.setItem("color-theme", JSON.stringify(!theme));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={theme ? "dark" : ""}>
      <div>
        <div>
          <NavigationBar
            user={user}
            handleThemeSwitch={handleThemeSwitch}
            theme={theme}
          />

          <Switch>
            <Route
              path="/forum/posts/edit/:id"
              render={(props) => <BlogEdit {...props} blog={blogEdit} />}
            />
            <Route
              path="/forum/posts/:id"
              render={(props) => {
                console.log("Props in /posts/:id route:", props);
                console.log("Rendering BlogView component");
                return <BlogView {...props} blog={blog} />;
              }}
            />
            <Route
              path="/forum/create"
              render={() => <NewBlog />}
            />
            <Route
              path="/forum/"
              component={() => <BlogList user={user} setUser={setUser} />}
            />
             {/* <Route
              path="/forum/users/:id"
               render={(props) => (
                <UserView {...props} userInView={userInView} />
              )}
            /> */}
            <Route path="*" component={ErrorPage} />
          </Switch>
        </div>
        <Notif />
      </div>
    </div>
  );
};

export default App;
