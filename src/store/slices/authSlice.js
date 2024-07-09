import BillingAddress from "@/app/dashboard/addresses-edit/billing/page";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: false,
    userData: { user: {} },
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
      state.login = false;
      state.userData = { user: {} };
      state.token = undefined;
    },
    shippingAddress(state, action) {
      state.userData.user.shippingAddress = action.payload;
    },
    billingAddress(state, action) {
      state.userData.user.billingAddress = action.payload;
    },
  },
});

export const { logIn, logout, shippingAddress, billingAddress } =
  authSlice.actions;

export default authSlice.reducer;
