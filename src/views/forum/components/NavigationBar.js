import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { setUser } from "../reducers/userReducer";
import { useHistory } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch } from "react-redux";
const NavigationBar = ({ user, handleThemeSwitch, theme }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    history.push("/");
  };

 // console.log("User in navbar:", user);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ForumIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Forum App
        </Typography>
        {user === null && (
          <Typography variant="h6" component="div">
            Create Post
          </Typography>
        )}
        {user && (
          <Typography variant="h6" component="div">
            Create Post
          </Typography>
        )}
        {user === null && (
          <Typography variant="h6" component="div">
            Log In
          </Typography>
        )}
        {user && (
          <div>
            <IconButton
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              u/{user.user.nom}
            </IconButton>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </Menu>
          </div>
        )}
        <IconButton
          className={theme ? "dark" : ""}
          data-testid="dark-theme-toggle"
          onClick={handleThemeSwitch}
          aria-label="Toggle dark mode"
        >
          {theme ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
