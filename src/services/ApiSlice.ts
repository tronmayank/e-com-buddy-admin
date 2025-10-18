import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants/index";
import { Mutex } from "async-mutex";
import { setAccessToken, setRefreshToken } from "src/slices/AuthSlice";
import {
  authTokenKeyName,
  refreshTokenKeyName,
} from "../utils/configs/authConfig";

const tagTypes = ["admin-user", "accounts", "place-order"];

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const authToken =
      (getState() as any)?.auth?.accessToken ||
      localStorage.getItem(authTokenKeyName) ||
      "";

    localStorage.getItem(authTokenKeyName);
    const deviceId = localStorage.getItem("deviceId");

    if (authToken) {
      headers.set("Authorization", `Bearer ${authToken}`);
    }

    if (deviceId) {
      headers.set("device-id", endpoint !== "logoutFromAll" ? deviceId : "");
      
    }

    return headers;
  },
});

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers) => {
    const refreshToken = localStorage.getItem(refreshTokenKeyName) || "";
    const deviceId = localStorage.getItem("deviceId");

    if (refreshToken) {
      headers.set("Authorization", `Bearer ${refreshToken}`);
    }
    if (deviceId) {
      headers.set("device-id", deviceId || "");
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.status === 401) {
    if (!mutex?.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult: any = await refreshBaseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
          },
          api,
          extraOptions
        );

        if (refreshResult?.data) {
          localStorage.setItem(
            authTokenKeyName,
            refreshResult?.data?.data?.accessToken
          );
          localStorage.setItem(
            refreshTokenKeyName,
            refreshResult?.data?.data?.refreshToken
          );

          api.dispatch(setAccessToken(refreshResult?.data?.data?.accessToken));
          api.dispatch(
            setRefreshToken(refreshResult?.data?.data?.refreshToken)
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          // localStorage.clear();
          // window.location.replace("/");
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${BASE_URL}`,
  // credentials: "include",
  //   prepareHeaders: (headers, { getState, endpoint }) => {
  //     const token = (getState() as any)?.auth?.accessToken;
  //     const deviceId = localStorage.getItem("deviceId");

  //     // if (token && endpoint !== "getAccessModules") {
  //     //   headers.set("authorization", token);
  //     // }
  //     if (token && endpoint !== "getAccessModules") {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }
  //     if (deviceId) {
  //       headers.set("device-id", endpoint !== "logoutFromAll" ? deviceId : "");
  //     }
  //     return headers;
  //   },
  // }),
  tagTypes: tagTypes,
  keepUnusedDataFor: 0,
  endpoints: () => ({}),
});

export default apiSlice;
