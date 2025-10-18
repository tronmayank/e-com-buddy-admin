import React, { useState } from "react";
import type { GroupItem } from "../../../navigation";
import { IconChevronRight } from "@tabler/icons-react";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "contained" | "outlined";
  shape?: "circle" | "rectangle";
};

const Badge = ({ children }: BadgeProps) => {
  const className = `
               rounded-full
               px-2
               bg-red-500
               text-white  
               text-[10px]
            `;

  return <div className={className}> {children} </div>;
};

type NavItemProps = {
  item: GroupItem;
  isSelected: (path: string) => boolean;
  onClick: (path: string, searchParams?: any) => void;
};

const MOLNavItem = ({
  item: { title, icon: Icon, path = "", children, badgeContent, searchParams },
  isSelected,
  onClick,
}: NavItemProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpened((prev) => !prev);
  };

  const className = `
       flex justify-between items-center
       py-2
       px-4
       transition-all duration-300
       w-full
       font-semibold
       text-sm
       border-l-4
       rounded
       ${isSelected(path)
      ? "bg-primary text-white border-primary-40"
      : "text-white border-transparent"
    }
       `;

  return (
    <div>
      <button
        onClick={children ? toggleOpen : () => onClick(path, searchParams)}
        className={className}
      >
        <div className={`flex items-center gap-3`}>
          <Icon className="size-4" />
          <span className="text-xs">{title}</span>
        </div>

        <div className="flex items-center gap-2 ">
          {badgeContent ? <Badge> {badgeContent} </Badge> : null}
          {children && (
            <IconChevronRight
              className={`transition-all ${isOpened ? "rotate-90" : "rotate-0"
                }`}
            />
          )}
        </div>
      </button>

      {isOpened && (
        <div className="py-3 pl-4">
          {children?.map((childItem: GroupItem) => {
            return (
              <MOLNavItem
                item={childItem}
                isSelected={(path) => isSelected(path)}
                onClick={(path) => onClick(path)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MOLNavItem;
