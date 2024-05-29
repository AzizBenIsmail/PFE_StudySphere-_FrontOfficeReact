import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Notif from "./components/Notif";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams, // Import useParams
  Redirect,
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
import Cookies from 'js-cookie'
import {
  active,
  archiver,
  deleteUser,
  desactive,
  desarchiver,
  downgrade,
  getAdmin,
  getCentre,
  getFormateur,
  getModerateur,
  getSimpleUser,
  getUserActive,
  getUserConnecter,
  getUserDeConnecter,
  getUserDesactive,
  getUsers,
  getUsersarchive,
  upgrade,
  upgradeFormateur,
  upgradeModerateur,
} from '../../Services/ApiUser'

const App = () => {

  const jwt_token = Cookies.get('jwt_token')
  const [users, setUsers] = useState([])

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  

  const getAllUsers = useCallback(async (config) => {

    console.log(config);
    await getUsers(config)
    .then((res) => {
      setUsers(res.data.users)
      console.log(res.data.users)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
useEffect(() => {
    getAllUsers(config)
   // console.log(users)

    const interval = setInterval(() => {
      getAllUsers(config)
    }, 1000000)

    return () => clearInterval(interval)
  }, [getAllUsers, config])

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
    dispatch(initializeUsers());
    dispatch(initializeAllUsers());
  }, [dispatch]);

  // Use useParams hook instead of useMatch
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);
  const blog1 = blogs.find((blog) => blog.id === id);

  const userInView = allUsers.find((user) => user.username === id);

  const handleThemeSwitch = (event) => {
    event.preventDefault();
    setTheme(!theme);
    localStorage.setItem("color-theme", JSON.stringify(!theme));
  };


   // Log allUsers state
   console.log("allUsers state:", users);


  return (
    <div className={theme ? "dark" : ""}>
      <div>
        <NavigationBar
          user={user}
          handleThemeSwitch={handleThemeSwitch}
          theme={theme}
        />
        <Switch>
          <Route path="/create" element={<NewBlog />} />
          <Route path="/" element={<BlogList user={user} />} />
          <Route path="/posts/:id" element={<BlogView blog={blog} />} />
          <Route
            path="/users/:id"
            element={<UserView userInView={userInView} />}
          />
          <Route path="/example" element={<ExampleBlog />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/posts/edit/:id" element={<BlogEdit blog={blog1} />} />
        </Switch>
        <Notif />
      </div>
    </div>
  );
};

export default App;
