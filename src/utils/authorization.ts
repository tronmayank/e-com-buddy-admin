import store from "../store";

export enum Permission {
  NAV_DASHBOARD = "NAV_DASHBOARD",
  NAV_ADMIN_ROLE = "NAV_ADMIN_ROLE",
  NAV_ADMIN_USER = "NAV_ADMIN_USER",
  NAV_USER = "NAV_USER",
  NAV_SEARCH_HISTORY = "NAV_SEARCH_HISTORY",
  NAV_HOTEL_BOOKING = "NAV_HOTEL_BOOKING",

  ADMIN_ROLE_ADD = "ADMIN_ROLE_ADD",
  ADMIN_ROLE_UPDATE = "ADMIN_ROLE_UPDATE",
  ADMIN_ROLE_DELETE = "ADMIN_ROLE_DELETE",
  ADMIN_ROLE_ACTIVE_DEACTIVE = "ADMIN_ROLE_ACTIVE_DEACTIVE",
  ADMIN_ROLE_LIST = "ADMIN_ROLE_LIST",

  ADMIN_USER_ADD = "ADMIN_USER_ADD",
  ADMIN_USER_UPDATE = "ADMIN_USER_UPDATE",
  ADMIN_USER_ACTIVE_DEACTIVE = "ADMIN_USER_ACTIVE_DEACTIVE",
  ADMIN_USER_LIST = "ADMIN_USER_LIST",

  SEARCH_HISTORY_LIST = "SEARCH_HISTORY_LIST",
  SEARCH_HISTORY_VIEW = "SEARCH_HISTORY_VIEW",

  HOTEL_BOOKING_LIST = "HOTEL_BOOKING_LIST",
  HOTEL_BOOKING_VIEW = "HOTEL_BOOKING_VIEW",

  USER_ACTIVE_DEACTIVE = "USER_ACTIVE_DEACTIVE",
  USER_LIST = "USER_LIST",
  USER_VIEW = "USER_VIEW",
}

export type PermissionType = keyof typeof Permission;

export const isAuthorized: (
  permission: PermissionType | undefined
) => boolean = (permission) => {
  const isSuperAdmin =
    store.getState()?.auth?.userData?.userType === "SUPER_ADMIN";

  const permissions = store.getState()?.auth?.permissions;

  if (isSuperAdmin) {
    return true;
  }

  return permission ? permissions?.includes(Permission[permission]) : true;
};
