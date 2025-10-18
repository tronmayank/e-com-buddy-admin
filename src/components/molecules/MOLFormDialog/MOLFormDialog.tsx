import { ReactNode } from "react";
import { Size } from "../../../utils";
import ATMDialog from "../../atoms/ATMDialog/ATMDialog";
import { ATMButton } from "../../atoms/ATMButton/ATMButton";

type Props = {
  onClose: () => void;
  children: ReactNode;
  title: string;
  isSubmitting: boolean;
  size?: Size;
};

const getWidth = (size: Size) => {
  switch (size) {
    case "small":
      return "md:min-w-[30rem]";
    case "medium":
      return "md:min-w-[50rem]";
    case "large":
      return "md:min-w-[80rem]";
  }
};

const MOLFormDialog = ({
  onClose,
  children,
  title,
  isSubmitting,
  size = "small",
}: Props) => {
  return (
    <ATMDialog>
      <div
        className={`flex flex-col relative ${getWidth(
          size
        )} min-w-[95vw] max-h-[90vh] overflow-auto hide-scrollbar `}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-4 py-2 bg-white z-[10000]">
          <span className="text-lg font-semibold text-slate-700">{title}</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 ">{children}</div>

        {/* Actions */}
        <div className="sticky bottom-0 flex items-center justify-end gap-2 px-4 py-3 bg-white">
          <ATMButton onClick={onClose} variant="outlined" color="neutral">
            Cancel
          </ATMButton>
          <ATMButton type="submit" isLoading={isSubmitting}>
            Submit
          </ATMButton>
        </div>
      </div>
    </ATMDialog>
  );
};

export default MOLFormDialog;
