// OrderServices.ts
import apiSlice from "src/services/ApiSlice";
import {
  Order,
  OrderFormValues,
  UpdateOrderFormValues,
} from "../models/Order.model";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination - Get All Orders
    getOrders: builder.query<{
      data: Order[];
      page: number;
      limit: number;
      totalPages: number;
      totalResults: number;
    }, { page?: number; limit?: number; searchValue?: string }>({
      providesTags: ["order"],
      query: (params) => ({
        url: "/order/pagination",
        method: "GET",
        params,
      }),
    }),

    // Get Order By Id
    getOrderById: builder.query<Order, string>({
      providesTags: ["order"],
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
    }),

    // Add Order
    addOrder: builder.mutation<Order, OrderFormValues>({
      invalidatesTags: ["order"],
      query: (body) => ({
        url: "/order/add",
        method: "POST",
        body,
      }),
    }),

    // Update Order
    updateOrder: builder.mutation<Order, { id: string; body: UpdateOrderFormValues }>({
      invalidatesTags: ["order"],
      query: ({ id, body }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // Delete Order
    deleteOrder: builder.mutation<{ status: boolean; message: string }, string>({
      invalidatesTags: ["order"],
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
    }),

    // Change Order Status (e.g., Pending / Completed / Cancelled)
    changeOrderStatus: builder.mutation<{ status: boolean; message: string }, { id: string; status: string }>({
      invalidatesTags: ["order"],
      query: ({ id, status }) => ({
        url: `/order/change-status/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useChangeOrderStatusMutation,
} = orderApi;
