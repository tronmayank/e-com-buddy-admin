import { IconPlus } from "@tabler/icons-react";
import ATMPageHeader from "src/components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "src/components/atoms/ATMPagination/ATMPagination";
import MOLFilterBar from "src/components/molecules/MOLFilterBar/MOLFilterBar";
import MOLTable, { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { Product } from "../../models/Product.model";

type Props = {
  onAddNew: () => void;
  rowData: Product[];
  tableHeaders: TableHeader<Product>[];
  isLoading: boolean;
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
  onEdit?: (item: Product) => void;
  onDelete?: (item: Product, closeDialog: () => void) => void;
};

const ProductListing = ({
  onAddNew,
  tableHeaders,
  rowData,
  isLoading,
  filterPaginationData: { totalCount, totalPages },
  onEdit,
  onDelete,
}: Props) => {
  // Filter out null/undefined rows for safety
  const safeRowData = (rowData || []).filter(Boolean);

  return (
    <div className="flex flex-col h-full gap-2">
      <ATMPageHeader
        heading="PRODUCTS"
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
          <MOLTable<Product>
            tableHeaders={tableHeaders}
            data={safeRowData}
            getKey={(item) => item?._id || Math.random().toString()}
            onEdit={onEdit}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        <ATMPagination
          totalPages={totalPages}
          rowCount={totalCount}
          rows={safeRowData}
        />
      </div>
    </div>
  );
};

export default ProductListing;
