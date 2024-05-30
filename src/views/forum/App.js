import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers, setUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useRouteMatch, // Import useRouteMatch instead of useMatch
} from "react-router-dom";
import NewBlog from "./components/NewBlog";
import NavigationBar from "./components/NavigationBar";

import { initializeAllUsers } from "./reducers/allUsersReducer";
import BlogView from "./components/BlogView";
import UserView from "./components/UserView";
import ExampleBlog from "./components/ExampleBlog";
import RegisterUser from "./components/RegisterUser";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import BlogEdit from "./components/BlogEdit";
import Notif from "./components/Notif";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const allUsers = useSelector((state) => state.allUsers);
  const [theme, setTheme] = useState(
    localStorage.getItem("color-theme")
      ? JSON.parse(localStorage.getItem("color-theme"))
      : true
  );

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeAllUsers());
  }, [dispatch]);

  const match = useRouteMatch("/posts/:id"); // Change useMatch to useRouteMatch
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  const match2 = useRouteMatch("/posts/edit/:id"); // Change useMatch to useRouteMatch
  const blog1 = match2
    ? blogs.find((blog) => blog.id === match2.params.id)
    : null;

  const match1 = useRouteMatch("/users/:id"); // Change useMatch to useRouteMatch
  const userInView = match1
    ? allUsers.find((user) => user.username === match1.params.id)
    : null;

  const handleThemeSwitch = (event) => {
    event.preventDefault();
    setTheme(!theme);
    localStorage.setItem("color-theme", JSON.stringify(!theme));
  };

  // Log the state to check if they are imported correctly
  console.log("User state:", user);
  console.log("Blogs state:", blogs);
  console.log("AllUsers state:", allUsers);

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
            {" "}
            {/* Replace Routes with Switch */}
            <Route path="/create" component={NewBlog} />
            <Route
              path="/"
              component={() => {
                console.log("Rendering BlogList component");
                return <BlogList />;
              }}
            />
            <Route
              path="/posts/:id"
              render={(props) => <BlogView {...props} blog={blog} />}
            />
            <Route
              path="/users/:id"
              render={(props) => (
                <UserView {...props} userInView={userInView} />
              )}
            />
            <Route path="/example" component={ExampleBlog} />
            <Route path="/register" component={RegisterUser} />
            <Route path="/about" component={About} />
            <Route
              path="/posts/edit/:id"
              render={(props) => <BlogEdit {...props} blog={blog1} />}
            />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </div>
        <Notif />
      </div>
    </div>
  );
};

export default App;
