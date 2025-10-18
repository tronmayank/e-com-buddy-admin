import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, Slice } from "@reduxjs/toolkit";
import {
  authTokenKeyName,
  refreshTokenKeyName,
} from "../utils/configs/authConfig";

export interface AuthSLiceStateType {
  accessToken: string | null;
  refreshToken: string | null;
  returnUrl: string | null;
  userData: any;
  isLogin: boolean;
  permissions: string[];
}

const initialState: AuthSLiceStateType = {
  accessToken: localStorage.getItem(authTokenKeyName) || null,
  refreshToken: localStorage.getItem(refreshTokenKeyName) || null,
  returnUrl: null,
  userData: JSON?.parse(localStorage.getItem("userData") || "{}"),
  isLogin: Boolean(localStorage.getItem("isLogin")) || false,
  permissions: [],
};

const authSlice: Slice<AuthSLiceStateType> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setReturnUrl: (state, action: PayloadAction<string | null>) => {
      state.returnUrl = action.payload;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setPermissions: (state, action: PayloadAction<string[]>) => {
      state.permissions = action.payload;
    },

    resetState: () => {
      return initialState;
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setReturnUrl,
  setUserData,
  setIsLogin,
  setPermissions,
  resetState,
} = authSlice.actions;
export default authSlice.reducer;
