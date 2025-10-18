import { IconX } from "@tabler/icons-react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import navigation from "../../navigation";
import MOLNavItem from "./MOLNavItem/MOLNavItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setIsNavBarExpanded } from "../../slices/SideNavLayoutSlice";

type Props = {};

const MOLVerticalNavbar = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const currentPath = location?.pathname?.split("/")?.[1];

  const badgeData = {
    batches: "1",
    courses: "27",
  };

  return (
    <div className="w-full h-full px-2 py-4 overflow-x-hidden overflow-y-auto border-r shadow bg-black">
      {/* Cross Button - will be shown on small screens only */}
      <button
        type="button"
        onClick={() => dispatch(setIsNavBarExpanded(false))}
        className="absolute flex justify-end p-1 text-white transition-all duration-500 rounded-full right-2 top-2 lg:hidden"
      >
        <IconX size={20} />
      </button>

      <div className="flex flex-col gap-6 ">
        {navigation({ badgeData })?.map((navItem, navItemIndex) => {
          return (
            <div key={navItemIndex} className="flex flex-col gap-4">
              <div className="flex items-center px-5 text-[12px] font-bold tracking-widest text-white uppercase ">
                {navItem?.groupLable}
              </div>

              <div className="flex flex-col gap-1">
                {navItem?.items?.map((item) => {
                  return (
                    <MOLNavItem
                      onClick={(path, searchParams) => {
                        navigate({
                          pathname: `/${path}`,
                          search: createSearchParams(searchParams).toString(),
                        });
                      }}
                      item={item}
                      isSelected={(path) => path === currentPath}
                      key={item?.path}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MOLVerticalNavbar;
