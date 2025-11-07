"use client";

import { useState } from "react";
import OrderListing from "./OrderListing";
import { Order } from "../../models/Order.model";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { setIsOpenAddDialog, setIsOpenEditDialog } from "../../slice/OrderSlice";
import AddOrderFormWrapper from "../Add/AddOrderFormWrapper";
import EditOrderFormWrapper from "../Edit/EditOrderFormWrapper";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "../../service/OrderServices";
import { showToast } from "src/utils/showToaster";

const OrderListingWrapper = () => {
  const [selectedData, setSelectedData] = useState<Order | null>(null);
  const { isOpenAddDialog, isOpenEditDialog } = useSelector(
    (state: RootState) => state.order
  );

  const dispatch = useDispatch<AppDispatch>();
  const [deleteOrder] = useDeleteOrderMutation();

  // Pagination & search
  const { searchQuery, limit, page } = useFilterPagination();
  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetOrdersQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["orderNumber", "billingDetails.name", "billingDetails.phone"]),
        isPaginationRequired: true,
      },
    }
  );

  // Delete order
  const handleDelete = (item: Order, closeDialog: () => void) => {
    if (!item?._id) return;
    deleteOrder(item._id).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
      } else if (res?.data?.status) {
        showToast("success", res?.data?.message);
        closeDialog();
      } else {
        showToast("error", res?.data?.message);
      }
    });
  };

  // Table headers for Orders
  const tableHeaders: TableHeader<Order>[] = [
    {
      fieldName: "orderNumber",
      headerName: "Order Number",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => <span>#{row?.orderNumber || "-"}</span>,
    },
    {
      fieldName: "orderNumber",
      headerName: "Customer",
      flex: "flex-[2_2_0%]",
      renderCell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium">{row?.billingDetails?.name || "-"}</span>

        </div>
      ),
    },
    {
      fieldName: "orderStatus",
      headerName: "Order Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${row?.orderStatus === "DILIVERED"
            ? "bg-green-100 text-green-700"
            : row?.orderStatus === "CANCELLED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {row?.orderStatus || "-"}
        </span>
      ),
    },
    {
      fieldName: "paymentType",
      headerName: "Payment Type",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => (
        <span className="text-sm font-medium text-gray-700">
          {row?.paymentType || "-"}
        </span>
      ),
    },
    {
      fieldName: "paymentStatus",
      headerName: "Payment Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${row?.paymentStatus === "CONFIRM"
            ? "bg-green-100 text-green-700"
            : row?.paymentStatus === "CANCELED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {row?.paymentStatus || "-"}
        </span>
      ),
    },
    {
      fieldName: "orderTotal",
      headerName: "Total Amount",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => (
        <span className="font-semibold text-gray-800">
          ₹{row?.orderTotal?.toFixed(2) || "0.00"}
        </span>
      ),
    },
  ];

  return (
    <>
      <OrderListing
        tableHeaders={tableHeaders}
        rowData={data || []}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: totalData || 0,
          totalPages: totalPages || 0,
        }}
        isLoading={isLoading}
        onEdit={(item) => {
          if (!item) return;
          setSelectedData(item);
          dispatch(setIsOpenEditDialog(true));
        }}
        onDelete={handleDelete}
      />

      {isOpenAddDialog && (
        <AddOrderFormWrapper onClose={() => dispatch(setIsOpenAddDialog(false))} />
      )}

      {isOpenEditDialog && selectedData && (
        <EditOrderFormWrapper
          selectedData={selectedData}
          onClose={() => dispatch(setIsOpenEditDialog(false))}
        />
      )}
    </>
  );
};

export default OrderListingWrapper;
