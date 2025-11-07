import { useState } from "react";
import CouponListing from "./CouponListing";
import { Coupon } from "../../models/Coupon.model";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { setIsOpenAddDialog, setIsOpenEditDialog } from "../../slice/CouponSlice";
import AddCouponFormWrapper from "../Add/AddCouponFormWrapper";
import EditCouponFormWrapper from "../Edit/EditCouponFormWrapper";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import { useGetCouponsQuery, useDeleteCouponMutation } from "../../service/CouponServices";
import { showToast } from "src/utils/showToaster";

type Props = {};

const CouponListingWrapper = (props: Props) => {
  const [id, setId] = useState<string>("");
  const { isOpenAddDialog, isOpenEditDialog } = useSelector(
    (state: RootState) => state?.coupon
  );

  const dispatch = useDispatch<AppDispatch>();
  const [deleteApi] = useDeleteCouponMutation();

  // Pagination & search
  const { searchQuery, limit, page } = useFilterPagination();
  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetCouponsQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["couponName", "type"]),
        isPaginationRequired: true,
      },
    }
  );

  // Delete coupon
  const handleDelete = (item: Coupon, closeDialog: () => void) => {
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

  const tableHeaders: TableHeader<Coupon>[] = [
    {
      fieldName: "couponName",
      headerName: "Coupon Name",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "type",
      headerName: "Type",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "amountOrPercent",
      headerName: "Amount/Percent",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "useCount",
      headerName: "Use Count",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "remainingCount",
      headerName: "Remaining Count",
      flex: "flex-[1_1_0%]",
    },
    {
      fieldName: "expiry",
      headerName: "Expiry",
      flex: "flex-[1_1_0%]",
      renderCell: (row: Coupon) => <span>{new Date(row.expiry).toLocaleDateString()}</span>,
    },
  ];

  return (
    <>
      <CouponListing
        tableHeaders={tableHeaders}
        rowData={data as Coupon[]}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: totalData,
          totalPages: totalPages,
        }}
        isLoading={isLoading}
        onEdit={(value) => {
          dispatch(setIsOpenEditDialog(true));
          setId(value?._id);
        }}
        onDelete={handleDelete}
      />

      {isOpenAddDialog && (
        <AddCouponFormWrapper onClose={() => dispatch(setIsOpenAddDialog(false))} />
      )}

      {isOpenEditDialog && (
        <EditCouponFormWrapper
          id={id}
          onClose={() => dispatch(setIsOpenEditDialog(false))}
        />
      )}
    </>
  );
};

export default CouponListingWrapper;
