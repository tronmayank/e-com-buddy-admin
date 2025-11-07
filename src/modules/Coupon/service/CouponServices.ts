// CouponServices.ts
import apiSlice from "src/services/ApiSlice";
import { Coupon, CouponFormValues, UpdateCouponFormValues } from "../models/Coupon.model";

export const couponApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getCoupons: builder.query<{
      data: Coupon[];
      page: number;
      limit: number;
      totalPages: number;
      totalResults: number;
    }, { page?: number; limit?: number; searchValue?: string }>({
      providesTags: ["coupon"],
      query: (params) => ({
        url: "/coupon/pagination",
        method: "GET",
        params,
      }),
    }),

    // Get Coupon By Id
    getCouponById: builder.query<Coupon, string>({
      providesTags: ["coupon"],
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "GET",
      }),
    }),

    // Add Coupon
    addCoupon: builder.mutation<Coupon, CouponFormValues>({
      invalidatesTags: ["coupon"],
      query: (body) => ({
        url: "/coupon/add",
        method: "POST",
        body,
      }),
    }),

    // Update Coupon
    updateCoupon: builder.mutation<Coupon, { id: string; body: UpdateCouponFormValues }>({
      invalidatesTags: ["coupon"],
      query: ({ id, body }) => ({
        url: `/coupon/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // Delete Coupon
    deleteCoupon: builder.mutation<{ status: boolean; message: string }, string>({
      invalidatesTags: ["coupon"],
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
    }),

    // Change Status
    changeCouponStatus: builder.mutation<{ status: boolean; message: string }, string>({
      invalidatesTags: ["coupon"],
      query: (id) => ({
        url: `/coupon/change-status/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useChangeCouponStatusMutation,
} = couponApi;
