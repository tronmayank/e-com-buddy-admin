"use client";

import { useState } from "react";
import ProductListing from "./ProductListing";
import { Product } from "../../models/Product.model";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { setIsOpenAddDialog, setIsOpenEditDialog } from "../../slice/ProductSlice";
import AddProductFormWrapper from "../Add/AddProductFormWrapper";
import EditProductFormWrapper from "../Edit/EditProductFormWrapper";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import { useGetProductsQuery, useDeleteProductMutation } from "../../service/ProductServices";
import { showToast } from "src/utils/showToaster";

const ProductListingWrapper = () => {
  const [selectedData, setSelectedData] = useState<Product | null>(null);
  const { isOpenAddDialog, isOpenEditDialog } = useSelector(
    (state: RootState) => state.product
  );

  const dispatch = useDispatch<AppDispatch>();
  const [deleteProduct] = useDeleteProductMutation();

  // Pagination & search
  const { searchQuery, limit, page } = useFilterPagination();
  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetProductsQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["title", "categoryId"]),
        isPaginationRequired: true,
      },
    }
  );

  // Delete product
  const handleDelete = (item: Product, closeDialog: () => void) => {
    if (!item?._id) return;
    deleteProduct(item._id).then((res: any) => {
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

  const tableHeaders: TableHeader<Product>[] = [
    {
      fieldName: "images",
      headerName: "Image",
      flex: "flex-[0.5_1_0%]",
      renderCell: (row) => (
        row?.images?.[0] ? (
          <img
            src={row.images[0]}
            alt={row.title || "Product"}
            className="w-12 h-12 object-cover rounded-md border"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-gray-400 text-xs rounded-md border">
            N/A
          </div>
        )
      ),
    },
    {
      fieldName: "categoryName",
      headerName: "Information",
      flex: "flex-[2_2_0%]",
      renderCell: (row: any) => {
        return (
          <div className="flex flex-col gap-1.5 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 text-sm leading-5">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-800 truncate">{row?.title || "Untitled Product"}</p>
              <span
                className={`text-xs px-2 py-[2px] rounded-full ${row?.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {row?.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-xs text-gray-600 mt-1">
              <p>
                <span className="font-medium text-gray-700">Category:</span>{" "}
                {row?.categoryName || "-"}
              </p>
              <p>
                <span className="font-medium text-gray-700">Delivery:</span>{" "}
                {row?.deliveryTimeline || "-"}
              </p>
              <p>
                <span className="font-medium text-gray-700">Shipping:</span>{" "}
                ₹{row?.shippingCharges ?? "0"}
              </p>
            </div>
          </div>
        );
      },
    }
    ,
    {
      fieldName: "variant",
      headerName: "Variant",
      flex: "flex-[5_5_0%]",
      renderCell: (row: any) => {
        const variants = row?.variant || [];

        if (!variants.length) {
          return (
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-gray-400 text-xs rounded-md border">
              N/A
            </div>
          );
        }

        return (
          <div className="flex flex-wrap gap-2">
            {variants.map((v: any, i: number) => (
              <div
                key={i}
                className="flex flex-col gap-1 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 min-w-[150px]"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 text-sm">{v.name || "Unnamed"}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-[2px] rounded-full">
                    {v.size || "—"}
                  </span>
                </div>

                <div className=" grid grid-cols-2 gap-y-2 items-center gap-x-3 text-[11px] text-gray-600 mt-1">
                  <span className="bg-green-50 text-green-700 px-2 py-[1px] rounded-full">
                    Stock: {v.stockCount ?? 0}
                  </span>
                  <span className="bg-purple-50 text-purple-700 px-2 py-[1px] rounded-full">
                    MRP: ₹{v.mrp}
                  </span>
                  <span className="bg-orange-50 text-orange-700 px-2 py-[1px] rounded-full">
                    Dis: {v.discountPercent}% off
                  </span>
                  <span className="bg-red-50 text-red-700 px-2 py-[1px] rounded-full font-semibold">
                    SP: ₹{v.salePrice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      },
    }
    ,

    // {
    //   fieldName: "categoryName",
    //   headerName: "Category",
    //   flex: "flex-[1_1_0%]",
    //   renderCell: (row) => <span>{row?.categoryName || "-"}</span>,
    // },
    // {
    //   fieldName: "deliveryTimeline",
    //   headerName: "Delivery Timeline",
    //   flex: "flex-[1_1_0%]",
    //   renderCell: (row) => <span>{row?.deliveryTimeline || "-"}</span>,
    // },
    // {
    //   fieldName: "shippingCharges",
    //   headerName: "Shipping Charges",
    //   flex: "flex-[1_1_0%]",
    //   renderCell: (row) => <span>{row?.shippingCharges ?? "-"}</span>,
    // },
    // {
    //   fieldName: "isActive",
    //   headerName: "Active",
    //   flex: "flex-[0.5_0.5_0%]",
    //   renderCell: (row) => <span>{row?.isActive ? "Yes" : "No"}</span>,
    // },


  ];


  return (
    <>
      <ProductListing
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
        <AddProductFormWrapper onClose={() => dispatch(setIsOpenAddDialog(false))} />
      )}

      {isOpenEditDialog && selectedData && (
        <EditProductFormWrapper
          selectedData={selectedData}
          onClose={() => dispatch(setIsOpenEditDialog(false))}
        />
      )}
    </>
  );
};

export default ProductListingWrapper;
