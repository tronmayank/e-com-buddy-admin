import { clearLocalStorage } from "src/utils/auth/authUtils";
import { apiSlice } from "../services/ApiSlice";
import {
  setAccessToken,
  setIsLogin,
  setRefreshToken,
  setUserData,
} from "../slices/AuthSlice";
import {
  authTokenKeyName,
  refreshTokenKeyName,
} from "../utils/configs/authConfig";

const apiSliceType: any = apiSlice;

export const authMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const token = localStorage.getItem(authTokenKeyName);
  const refreshToken = localStorage.getItem(refreshTokenKeyName);
  const userData = localStorage.getItem("userData");

  if (result.error && result?.payload?.status === 401) {
    store
      .dispatch(
        apiSliceType.endpoints.refreshToken.initiate({
          refreshToken: refreshToken,
        })
      )
      .then((res: any) => {
        if (
          res?.error &&
          (res?.error?.status === 401 || res?.error?.status === 500)
        ) {
          // console.log(
          //   "res?.error?.status === 401 || res?.error?.status === 500",
          //   res?.error,
          //   res?.error?.status,
          //   res?.error?.status
          // );
          clearLocalStorage();
          window.location.replace("/login");
        } else {
          const userData = {
            name: res?.data?.data?.user?.name,
            userId: res?.data?.data?.user?._id,
            userType: res?.data?.data?.user?.userType,
            email: res?.data?.data?.user?.email,
            // mobile: res?.data?.data?.user?.mobile,
          };

          store?.dispatch(setUserData(userData));
          store?.dispatch(setIsLogin(true));
          store?.dispatch(setAccessToken(res?.data?.data?.accessToken));
          store?.dispatch(setRefreshToken(res?.data?.data?.refreshToken));
          localStorage.setItem(authTokenKeyName, res?.data?.data?.accessToken);
          localStorage.setItem(
            refreshTokenKeyName,
            res?.data?.data?.refreshToken
          );
        }
      });
  } else if (token && refreshToken && !userData) {
    clearLocalStorage();
    window.location.replace("/login");
  }
  return result;
};
