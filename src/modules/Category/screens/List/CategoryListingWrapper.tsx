import { useState } from "react";
import CategoryListing from "./CategoryListing";
import { Category } from "../../models/Category.model";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { setIsOpenAddDialog, setIsOpenEditDialog } from "../../slice/CategorySlice";
import AddCategoryFormWrapper from "../Add/AddCategoryFormWrapper";
import EditCategoryFormWrapper from "../Edit/EditUserFormWrapper";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import { useGetCategoryQuery, useDeleteCategoryMutation } from "../../service/CategoryServices";
import { showToast } from "src/utils/showToaster";

type Props = {};

const CategoryListingWrapper = (props: Props) => {
  const [id, setId] = useState<string>("");
  const { isOpenAddDialog, isOpenEditDialog } = useSelector(
    (state: RootState) => state?.category
  );

  const dispatch = useDispatch<AppDispatch>();

  const [deleteApi] = useDeleteCategoryMutation();

  // API
  const { searchQuery, limit, page } = useFilterPagination();
  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetCategoryQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["categoryName"]),
        isPaginationRequired: true,
      },
    }
  );

  // Delete
  const handleDelete = (item: Category, closeDialog: () => void) => {
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

  const tableHeaders: TableHeader<Category>[] = [
    {
      fieldName: "categoryName",
      headerName: "Category Name",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "image",
      headerName: "Image",
      flex: "flex-[1_1_0%]",
      renderCell: (row: any) => (
        <img src={row.image} alt={row.categoryName} className="w-20 h-20 object-cover rounded" />
      ),
    },
    // {
    //   fieldName: "status",
    //   headerName: "Status",
    //   flex: "flex-[1_1_0%]",
    //   renderCell: (row: any) => (row.isActive ? "Active" : "Inactive"),
    // },
  ];

  return (
    <>
      <CategoryListing
        tableHeaders={tableHeaders}
        rowData={data as Category[]}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: totalData,
          totalPages: totalPages,
        }}
        isLoading={isLoading}
        onDelete={handleDelete}
        onEdit={(value) => {
          dispatch(setIsOpenEditDialog(true));
          setId(value?._id);
        }}
      />

      {isOpenAddDialog && (
        <AddCategoryFormWrapper onClose={() => dispatch(setIsOpenAddDialog(false))} />
      )}

      {isOpenEditDialog && (
        <EditCategoryFormWrapper
          id={id}
          onClose={() => dispatch(setIsOpenEditDialog(false))}
        />
      )}
    </>
  );
};

export default CategoryListingWrapper;
