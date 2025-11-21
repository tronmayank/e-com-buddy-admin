import { useState } from "react";
import ExpenseListing from "./ExpenceListing";
import { Expense } from "../../models/Expence.model";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { setIsOpenAddDialog, setIsOpenEditDialog } from "../../slice/ExpenceSlice";
import AddExpenseFormWrapper from "../Add/AddExpenceFormWrapper";
import EditExpenseFormWrapper from "../Edit/EditExpenceFormWrapper";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import { useGetExpensesQuery, useDeleteExpenseMutation } from "../../service/ExpenceServices";
import { showToast } from "src/utils/showToaster";

const ExpenseListingWrapper = () => {
  const [id, setId] = useState<string>("");

  const { isOpenAddDialog, isOpenEditDialog } = useSelector(
    (state: RootState) => state.expence
  );

  const dispatch = useDispatch<AppDispatch>();
  const [deleteApi] = useDeleteExpenseMutation();

  // Pagination & filters
  const { searchQuery, limit, page } = useFilterPagination();

  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetExpensesQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["title", "description"]),
        isPaginationRequired: true,
      },
    }
  );

  // Delete Expense
  const handleDelete = (item: Expense, closeDialog: () => void) => {
    deleteApi(item?._id).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          closeDialog();
        } else {
          showToast("error", res?.data?.message);
        }
      }
    });
  };

  // Table Headers for Expense
  const tableHeaders: TableHeader<Expense>[] = [
    {
      fieldName: "title",
      headerName: "Title",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "description",
      headerName: "Description",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "amount",
      headerName: "Amount",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "receipt",
      headerName: "Receipt",
      flex: "flex-[1_1_0%]",
      renderCell: (row: Expense) =>
        row.receipt ? (
          <a
            href={row.receipt}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View
          </a>
        ) : (
          "-"
        ),
    },
    {
      fieldName: "createdAt",
      headerName: "Created At",
      flex: "flex-[1_1_0%]",
      renderCell: (row: Expense) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <>
      <ExpenseListing
        tableHeaders={tableHeaders}
        rowData={data as Expense[]}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: totalData,
          totalPages: totalPages,
        }}
        isLoading={isLoading}
        onEdit={(value) => {
          dispatch(setIsOpenEditDialog(true));
          setId(value._id);
        }}
        onDelete={handleDelete}
      />

      {isOpenAddDialog && (
        <AddExpenseFormWrapper
          onClose={() => dispatch(setIsOpenAddDialog(false))}
        />
      )}

      {isOpenEditDialog && (
        <EditExpenseFormWrapper
          id={id}
          onClose={() => dispatch(setIsOpenEditDialog(false))}
        />
      )}
    </>
  );
};

export default ExpenseListingWrapper;
