import React, { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  title: string;
}

const ATMToolTip: React.FC<TooltipProps> = ({
  children,
  title,
  position = "top",
}) => {
  const showTooltip = (event: React.MouseEvent) => {
    const { top, left, width, height } =
      event.currentTarget.getBoundingClientRect();
    const tooltip = document.getElementById("tooltip");

    if (tooltip) {
      tooltip.style.display = "block";

      switch (position) {
        case "top":
          tooltip.style.top = `${top - tooltip.offsetHeight}px`;
          tooltip.style.left = `${left + width / 2 - tooltip.offsetWidth / 2}px`;
          break;
        case "bottom":
          tooltip.style.top = `${top + height}px`;
          tooltip.style.left = `${left + width / 2 - tooltip.offsetWidth / 2
            }px`;
          break;
        case "left":
          tooltip.style.top = `${top + height / 2 - tooltip.offsetHeight / 2
            }px`;
          tooltip.style.left = `${left - tooltip.offsetWidth}px`;
          break;
        case "right":
          tooltip.style.top = `${top + height / 2 - tooltip.offsetHeight / 2
            }px`;
          tooltip.style.left = `${left + width}px`;
          break;
        default:
          break;
      }
    }
  };

  const hideTooltip = () => {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) {
      tooltip.style.display = "none";
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseOver={showTooltip}
      onMouseOut={hideTooltip}
    >
      {children}
      <div
        id="tooltip"
        className="absolute hidden p-2 text-white bg-gray-800 rounded"
      >
        {title}
      </div>
    </div>
  );
};

export default ATMToolTip;
