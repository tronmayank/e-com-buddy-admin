import { IconPlus } from "@tabler/icons-react";
import ATMPageHeader from "src/components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "src/components/atoms/ATMPagination/ATMPagination";
import MOLFilterBar from "src/components/molecules/MOLFilterBar/MOLFilterBar";
import MOLTable, { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { Category } from "../../models/Category.model";

type Props = {
  onAddNew: () => void;
  rowData: Category[];
  tableHeaders: TableHeader<Category>[];
  isLoading: boolean;
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
  onEdit?: (item: Category) => void;
  onDelete?: (item: Category, closeDialog: () => void) => void;
};

const CategoryListing = ({
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
        heading="CATEGORIES"
        buttonProps={{
          label: "Add Category",
          icon: IconPlus,
          onClick: onAddNew,
        }}
      />
      <div className="flex flex-col overflow-auto border rounded border-slate-300 h-screen">
        {/* Table Toolbar */}
        <MOLFilterBar />

        <div className="flex-1 overflow-auto">
          <MOLTable<Category>
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

export default CategoryListing;
