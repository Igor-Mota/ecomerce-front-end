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
      state.login = true;
      state.userData = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { logIn } = authSlice.actions;

export default authSlice.reducer;
