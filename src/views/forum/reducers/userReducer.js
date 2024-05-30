import { createSlice } from "@reduxjs/toolkit";
import * as authService from "../../../Services/Apiauth";
import Cookies from 'js-cookie';

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state) {
      return null;
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
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

      const response = await authService.getUserAuth(config);
      const user = response.data; // Only keep necessary data
      dispatch(setUser(user));
    } catch (error) {
      console.error("Failed to fetch user:", error);
      dispatch(clearUser());
    }
  };
};

export default userSlice.reducer;
