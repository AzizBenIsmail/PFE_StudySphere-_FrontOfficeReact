import { createSlice } from "@reduxjs/toolkit";
import * as blogService from "../../../Services/ApiBlog";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUsers = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("AKAppSessionID");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
     
    }
  };
};

export default userSlice.reducer;
