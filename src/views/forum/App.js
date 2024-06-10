

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers, setUser } from "./reducers/userReducer";
import { initializeAllUsers } from "./reducers/allUsersReducer";
import BlogList from "./components/BlogList";
import {

  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import NewBlog from "./components/NewBlog";
import Navbar from "./components/Navbar"
import BlogView from "./components/BlogView";
import ErrorPage from "./components/ErrorPage";
import BlogEdit from "./components/BlogEdit";
import Notif from "./components/Notif";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  //const allUsers = useSelector((state) => state.allUsers);
  

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



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div>
          
           <Navbar  />

          <Switch>
            <Route
              path="/forum/posts/edit/:id"
              render={(props) => <BlogEdit {...props} blog={blogEdit} />}
            />
            <Route
              path="/forum/posts/:id"
              render={(props) => {
                //console.log("Props in /posts/:id route:", props);
              //  console.log("Rendering BlogView component");
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
            
            <Route path="*" component={ErrorPage} />
          </Switch>
        </div>
        <Notif />
      </div>
    </div>
  );
};

export default App;
