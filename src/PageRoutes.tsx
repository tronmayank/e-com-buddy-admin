import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";
import ErrorPage from "./components/ErrorPage";
import SideNavLayout from "./components/layouts/SideNavLayout/SideNavLayout";
// Screens
import LoginFormWrapper from "./modules/Login/LoginFormWrapper";
import UserListingWrapper from "./modules/User/screens/List/UserListingWrapper";
import WebInfoListingWrapper from "./modules/WebInfo/screens/List/WebInfoListingWrapper";
import FaqListingWrapper from "./modules/Faq/screens/List/FaqListingWrapper";
import TACListingWrapper from "./modules/TermsAndCondition/screens/List/TACListingWrapper";
import PAPListingWrapper from "./modules/PrivacyAndPolicy/screens/List/PAPListingWrapper";
import CategoryListingWrapper from "./modules/Category/screens/List/CategoryListingWrapper";
import CouponListingWrapper from "./modules/Coupon/screens/List/CouponListingWrapper";
import ProductListingWrapper from "./modules/Product/screens/List/ProductListingWrapper";
import OrderListingWrapper from "./modules/Order/screens/List/OrderListingWrapper";
import ExpenceListingWrapper from "./modules/Expence/screens/List/ExpenceListingWrapper";
import DashBoardWrapper from "./modules/Dashboard/DashboardWrapper";

const PageRoutes = () => {
  const deviceId = localStorage.getItem("deviceId") || "";

  if (deviceId === "") {
    const uniqueId = uuid();
    localStorage.setItem("deviceId", uniqueId);
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginFormWrapper />,
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <DashBoardWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "user",
          element: <UserListingWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "Webinfo",
          element: <WebInfoListingWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "faq",
          element: <FaqListingWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "tac",
          element: <TACListingWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "pap",
          element: <PAPListingWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "category",
          element: <CategoryListingWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "coupon",
          element: <CouponListingWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "product",
          element: <ProductListingWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "order",
          element: <OrderListingWrapper />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "expence",
          element: <ExpenceListingWrapper />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;
