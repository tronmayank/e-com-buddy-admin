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
  const [orderStatus, setOrderStatus] = useState("")

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
        ...(orderStatus !== "" && {
          filterBy: JSON.stringify([{ fieldName: "orderStatus", value: orderStatus }]),
        }),
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
      flex: "flex-[0.5_0.5_0%]",
      renderCell: (row) => <span>#{row?.orderNumber || "-"}</span>,
    },
    {
      fieldName: "orderNumber",
      headerName: "Customer Details",
      flex: "flex-[1.2_1.2_0%]",
      renderCell: (row: any) => {
        const billing = row?.billingDetails || {};

        // helper function to truncate long text
        const truncate = (text: string, length = 30) => {
          if (!text) return "-";
          return text.length > length ? text.substring(0, length) + "..." : text;
        };

        return (
          <div className="flex flex-col text-sm leading-tight">
            <span className="font-semibold text-gray-800">{billing.name || "-"}</span>
            <span className="text-gray-600">{billing.phone || "-"}</span>

            {/* Address */}
            <span
              className="text-gray-600 cursor-pointer"
              title={`${billing.address1 || ""}${billing.address2 ? ", " + billing.address2 : ""}`}
            >
              {truncate(`${billing.address1 || ""}${billing.address2 ? ", " + billing.address2 : ""}`, 30)}
            </span>

            {/* City/State */}
            <span className="text-gray-600">
              {billing.city || ""}{billing.state ? `, ${billing.state}` : ""}
            </span>

            {/* Pincode */}
            <span className="text-gray-600">{billing.pincode || ""}</span>

            {/* Order Note */}
            {billing.orderNote && (
              <span
                className="italic text-gray-500 mt-1"
                title={billing.orderNote}
              >
                📝 {truncate(billing.orderNote, 30)}
              </span>
            )}
          </div>
        );
      },
    }
    ,
    {
      fieldName: "orderNumber",
      headerName: "Product Details",
      flex: "flex-[3_3_0%]",
      renderCell: (row: any) => {
        const products = row?.products || [];

        const truncate = (text: string, length = 30) => {
          if (!text) return "-";
          return text.length > length ? text.substring(0, length) + "..." : text;
        };

        return (
          <div className="flex flex-col text-sm leading-tight gap-2">
            {/* Product Section */}
            {products.length > 0 && (
              <div className="mt-2 border-t pt-2 border-gray-200">
                <div className="font-medium text-gray-700 mb-1 text-xs uppercase tracking-wide">
                  🛍️ Products
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                  {products.map((p: any, i: number) => (
                    <div
                      key={i}
                      className="border rounded-xl p-2 bg-gray-50 hover:bg-gray-100 transition-all shadow-sm"
                    >
                      <div
                        className="font-semibold text-gray-800 text-sm"
                        title={p.title}
                      >
                        {truncate(p.title, 25)}
                      </div>

                      <div
                        className="text-gray-600 text-[11px] mt-0.5"
                        title={p.description}
                      >
                        {truncate(p.description, 35)}
                      </div>

                      <div className="text-gray-700 text-[11px] mt-1">
                        <span className="font-medium">{p.variantName}</span>
                        {p.size && <span> • {p.size}</span>}
                      </div>

                      <div className="text-gray-800 font-semibold text-xs mt-1">
                        ₹{p.salePrice}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      },
    }


    ,
    {
      fieldName: "orderStatus",
      headerName: "Order Summary",
      flex: "flex-[2_2_0%]",
      renderCell: (row: any) => {
        const getStatusStyle = (status: string) => {
          switch (status) {
            case "NEW_ORDER":
              return "bg-blue-100 text-blue-700";
            case "ORDER_CONFIRMED":
              return "bg-indigo-100 text-indigo-700";
            case "IN_TRANSIT":
              return "bg-yellow-100 text-yellow-700";
            case "DILIVERED":
              return "bg-green-100 text-green-700";
            case "RETURNED":
              return "bg-orange-100 text-orange-700";
            case "CANCELLED":
              return "bg-red-100 text-red-700";
            default:
              return "bg-gray-100 text-gray-700";
          }
        };

        const getPaymentStatusStyle = (status: string) => {
          switch (status) {
            case "CONFIRM":
              return "bg-green-100 text-green-700";
            case "CANCELED":
              return "bg-red-100 text-red-700";
            default:
              return "bg-yellow-100 text-yellow-700";
          }
        };

        const formatStatusLabel = (status: string) => {
          if (!status) return "-";
          return status
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase());
        };

        const chipClass =
          "px-2 py-1 text-xs rounded-full font-semibold w-fit min-w-[90px] text-center shadow-sm";

        return (
          <div className="w-full bg-white border border-gray-200 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Title */}
            <h4 className="text-gray-800 text-sm font-semibold mb-2 border-b border-gray-100 pb-1">
              Order Summary
              <small className="ml-8">
                {new Date(row?.createdAt).toLocaleDateString("en-GB")}
              </small>            </h4>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
              {/* Order Status */}
              <div className="flex flex-col">
                <span className="font-medium text-gray-500 mb-1 text-[11px]">
                  Order Status
                </span>
                <span className={`${chipClass} ${getStatusStyle(row?.orderStatus)}`}>
                  {formatStatusLabel(row?.orderStatus)}
                </span>
              </div>

              {/* Payment Type */}
              <div className="flex flex-col">
                <span className="font-medium text-gray-500 mb-1 text-[11px]">Payment Type</span>
                <span className={`${chipClass} bg-gray-100 text-gray-700`}>
                  {row?.paymentType || "-"}
                </span>
              </div>

              {/* Payment Status */}
              <div className="flex flex-col">
                <span className="font-medium text-gray-500 mb-1 text-[11px]">Payment Status</span>
                <span
                  className={`${chipClass} ${getPaymentStatusStyle(row?.paymentStatus)}`}
                >
                  {formatStatusLabel(row?.paymentStatus)}
                </span>
              </div>

              {/* Total */}
              <div className="flex flex-col">
                <span className="font-medium text-gray-500 mb-1 ml-4 text-[11px]">Total</span>
                <span className={`${chipClass} bg-emerald-100 text-emerald-700`}>
                  ₹{row?.orderTotal?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </div>
        );
      },
    }




  ];

  return (
    <>

      {/* 🟦 Order Status Filter */}

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
        {...{ orderStatus, setOrderStatus }}

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
