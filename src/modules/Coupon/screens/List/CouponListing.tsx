import { IconPlus } from "@tabler/icons-react";
import ATMPageHeader from "src/components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "src/components/atoms/ATMPagination/ATMPagination";
import MOLFilterBar from "src/components/molecules/MOLFilterBar/MOLFilterBar";
import MOLTable, { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { Coupon } from "../../models/Coupon.model";

type Props = {
  onAddNew: () => void;
  rowData: Coupon[];
  tableHeaders: TableHeader<Coupon>[];
  isLoading: boolean;
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
  onEdit?: (item: Coupon) => void;
  onDelete?: (item: Coupon, closeDialog: () => void) => void;
};

const CouponListing = ({
  onAddNew,
  tableHeaders,
  rowData,
  isLoading,
  filterPaginationData: { totalCount, totalPages },
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="flex flex-col h-full gap-2">
      <ATMPageHeader
        heading="COUPONS"
        buttonProps={{
          label: "Add",
          icon: IconPlus,
          onClick: onAddNew,
        }}
      />
      <div className="flex flex-col overflow-auto border rounded border-slate-300 h-screen">
        {/* Table Toolbar */}
        <MOLFilterBar />

        <div className="flex-1 overflow-auto">
          <MOLTable<Coupon>
            tableHeaders={tableHeaders}
            data={rowData}
            getKey={(item) => item?._id}
            onEdit={onEdit}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        <ATMPagination
          totalPages={totalPages}
          rowCount={totalCount}
          rows={rowData}
        />
      </div>
    </div>
  );
};

export default CouponListing;
