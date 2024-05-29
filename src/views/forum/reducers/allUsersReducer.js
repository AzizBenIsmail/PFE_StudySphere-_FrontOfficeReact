import { createSlice } from "@reduxjs/toolkit";
import * as  userService from "../../../Services/ApiUser";
import * as authService from "../../../Services/Apiauth";
import { initializeUsers } from "./userReducer";

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
    try {
      // Fetch users data from the API
      const users = await userService.getUsers();
      
      // Log the users data
      console.log("Users data from API:", users);

      // Dispatch the setUsers action to update the state
      dispatch(setUsers(users));
    } catch (error) {
      console.error('Error fetching users:', error);
      // Dispatch an error action or handle the error as needed
    }
  };
};

export const registerUser = (user) => {
  return async (dispatch) => {
    try {
      const user1 = await authService.register(user);
      dispatch(create(user1));
    } catch (error) {
      // Dispatch an action to handle the error, or log it
      console.error('Error registering user:', error);
      // Optionally, dispatch an action to store the error in the Redux state
      // dispatch(registerUserFailure(error));
    }
  };
};

export default usersSlice.reducer;
