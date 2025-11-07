import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import SideNavLayoutSlice from "./slices/SideNavLayoutSlice";
import { apiSlice } from "./services/ApiSlice";
import { fileExplorerSlice } from "./services/FileExplorer";
import { authMiddleware } from "./middlewares/authMiddleware";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserSlice from "./modules/User/slice/UserSlice";
import WebInfoSlice from "./modules/WebInfo/slice/WebInfoSlice";
import CategorySlice from "./modules/Category/slice/CategorySlice";
import CouponSlice from "./modules/Coupon/slice/CouponSlice";
import ProductSlice from "./modules/Product/slice/ProductSlice";
import OrderSlice from "./modules/Order/slice/OrderSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    sideNavLayout: SideNavLayoutSlice,
    user: UserSlice,
    webinfo: WebInfoSlice,
    category: CategorySlice,
    coupon: CouponSlice,
    product: ProductSlice,
    order: OrderSlice,

    [apiSlice.reducerPath]: apiSlice.reducer,
    [fileExplorerSlice.reducerPath]: fileExplorerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authMiddleware,
      apiSlice.middleware,
      fileExplorerSlice.middleware,
    ]),
});

setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
