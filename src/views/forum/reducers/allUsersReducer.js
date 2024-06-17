import { createSlice } from "@reduxjs/toolkit";
import * as userService from "../../../Services/ApiUser";
import * as authService from "../../../Services/Apiauth";
import Cookies from 'js-cookie';

const usersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    create(state, action) {
      const user = action.payload;
      state.push(user);
    },
  },
});

export const { setUsers, create } = usersSlice.actions;

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const jwt_token = Cookies.get('jwt_token');

    if (!jwt_token) {
      window.location.replace('/login-page');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };

    try {
      const response = await userService.getUsers(config);
      const users = response.data; // Only keep necessary data
      dispatch(setUsers(users));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
};

export const registerUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await authService.register(user);
      const newUser = response.data; // Only keep necessary data
      dispatch(create(newUser));
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
};

export default usersSlice.reducer;
