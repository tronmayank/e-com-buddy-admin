import { authTokenKeyName, refreshTokenKeyName } from "../configs/authConfig";

export const clearLocalStorage = () => {
  localStorage.removeItem(authTokenKeyName);
  localStorage.removeItem(refreshTokenKeyName);
  localStorage.removeItem("userData");
  localStorage.removeItem("isLogin");
};
