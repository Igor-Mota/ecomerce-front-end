import { createSlice } from "@reduxjs/toolkit";
import { UserLists } from "@/data/Users";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: false,
    userData: {},
    token: undefined,
  },
  reducers: {
    logIn(state, action) {
      window.localStorage.setItem("token", action.payload.token);
      state.login = true;
      state.userData = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state, action) {
      window.localStorage.removeItem("token");
      state = initialState
    },
  },
});

export const { logIn } = authSlice.actions;

export default authSlice.reducer;
