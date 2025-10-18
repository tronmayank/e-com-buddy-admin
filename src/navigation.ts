import {
  Icon,
  IconHome,
  IconUserCog,
  IconArrowsSort,
  IconHistory,
  IconLayoutDistributeHorizontal,
  IconUsers,
} from "@tabler/icons-react";
import { PermissionType } from "./utils/authorization";
import { getPermittedNavigations } from "./utils/getPermittedNavigations";

export type GroupItemWithChildren = {
  title: string;
  icon: Icon;
  path?: never;
  searchParams?: never;
  children: GroupItem[];
  badgeContent?: string;
  permission?: PermissionType;
};

export type GroupItemWithPath = {
  title: string;
  icon: Icon;
  path: string;
  searchParams?: {
    [field: string]: string;
  };
  children?: never;
  badgeContent?: string;
  permission?: PermissionType;
};

export type GroupItem = GroupItemWithPath | GroupItemWithChildren;

export type NavigationItem = {
  groupLable: string;
  permissions?: PermissionType[];
  items: GroupItem[];
};

const navigation: (params?: {
  badgeData: { batches: string; courses: string };
}) => NavigationItem[] = (params) => {
  const navigations: NavigationItem[] = [
    {
      groupLable: "Dashboard",
      items: [
        {
          title: "Dashboard",
          icon: IconHome,
          path: "",
          // permission: "NAV_ADMIN_USER",
        },

        {
          title: "Users",
          icon: IconUserCog,
          path: "user",
          searchParams: {
            page: "1",
            limit: "10",
          },
        },
        {
          title: "Web Info",
          icon: IconUserCog,
          path: "webinfo",
          searchParams: {
            page: "1",
            limit: "10",
          },
        },
        {
          title: "FAQ",
          icon: IconUserCog,
          path: "faq",
          searchParams: {
            page: "1",
            limit: "10",
          },
        },
        {
          title: "Terms & Condistions",
          icon: IconUserCog,
          path: "tac",
          searchParams: {
            page: "1",
            limit: "10",
          },
        },
        {
          title: "Privacy & Policy",
          icon: IconUserCog,
          path: "pap",
          searchParams: {
            page: "1",
            limit: "10",
          },
        },
      ],
    },
  ];

  return getPermittedNavigations(navigations);
};

export default navigation;
