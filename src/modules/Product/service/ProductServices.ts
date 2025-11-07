// ProductServices.ts
import apiSlice from "src/services/ApiSlice";
import { Product, ProductFormValues, UpdateProductFormValues } from "../models/Product.model";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getProducts: builder.query<{
      data: Product[];
      page: number;
      limit: number;
      totalPages: number;
      totalResults: number;
    }, { page?: number; limit?: number; searchValue?: string }>({
      providesTags: ["product"],
      query: (params) => ({
        url: "/product/pagination",
        method: "GET",
        params,
      }),
    }),

    // Get Product By Id
    getProductById: builder.query<Product, string>({
      providesTags: ["product"],
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),

    // Add Product
    addProduct: builder.mutation<Product, ProductFormValues>({
      invalidatesTags: ["product"],
      query: (body) => ({
        url: "/product/add",
        method: "POST",
        body,
      }),
    }),

    // Update Product
    updateProduct: builder.mutation<Product, { id: string; body: UpdateProductFormValues }>({
      invalidatesTags: ["product"],
      query: ({ id, body }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // Delete Product
    deleteProduct: builder.mutation<{ status: boolean; message: string }, string>({
      invalidatesTags: ["product"],
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),

    // Change Status (Active / Inactive)
    changeProductStatus: builder.mutation<{ status: boolean; message: string }, string>({
      invalidatesTags: ["product"],
      query: (id) => ({
        url: `/product/change-status/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useChangeProductStatusMutation,
} = productApi;
