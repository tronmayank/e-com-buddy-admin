import {
  // useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ATMCircularProgress from "../atoms/ATMCircularProgress/ATMCircularProgress";
import { AppDispatch, RootState } from "../../store";
import {
  // setIsLogin,
  // setPermissions,
  setReturnUrl,
  // setUserData,
} from "../../slices/AuthSlice";

type Props = {
  children: JSX.Element;
};

const AuthWrapper = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLogin } = useSelector((state: RootState) => state?.auth);
  const { pathname } = useLocation();
  const [
    isChecking,
    // setIsChecking
  ] = useState(true);

  // console.log('userData', { userData, refreshToken, accessToken });

  // const { data, isLoading } = useFetchData(useGetRolesOfAnAdminQuery);

  // useEffect(() => {
  //   if (!isLoading) {
  //     const userData = {
  //       userName: data?.[0]?.userName,
  //       name: data?.[0]?.name,
  //       userId: data?.[0]?.adminId,
  //       userType: data?.[0]?.userType,
  //       email: data?.[0]?.email,
  //       mobile: data?.[0]?.mobile,
  //     };
  //     dispatch(setUserData(userData));
  //     dispatch(setIsLogin(true));
  //     dispatch(setPermissions(data?.[0]?.uniqueModules));
  //     setTimeout(() => {
  //       setIsChecking(false);
  //     }, 500);
  //   } else {
  //     setIsChecking(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading, data]);

  if (!isChecking) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <ATMCircularProgress />
        <div className="text-center">
          Please wait, We are checking your authentication
        </div>
      </div>
    );
  }

  if (!isLogin) {
    dispatch(setReturnUrl(pathname));
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
};

export default AuthWrapper;
