// src/services/CategoryServices.ts
import apiSlice from "src/services/ApiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getCategory: builder.query({
      providesTags: ["admin-category"],
      query: (params) => ({
        url: "/category/pagination",
        method: "GET",
        params,
      }),
    }),

    // Get Category By Id
    getCategoryById: builder.query({
      providesTags: ["admin-category"],
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
    }),

    // Add Category
    addCategory: builder.mutation({
      invalidatesTags: ["admin-category"],
      query: (body: { categoryName: string; image: string }) => ({
        url: "/category/add",
        method: "POST",
        body,
      }),
    }),

    // Update Category
    updateCategory: builder.mutation({
      invalidatesTags: ["admin-category"],
      query: ({ id, body }: { id: string; body: { categoryName: string; image: string } }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // Change Status
    changeCategoryStatus: builder.mutation({
      invalidatesTags: ["admin-category"],
      query: (id: string) => ({
        url: `/category/change-status/${id}`,
        method: "PUT",
      }),
    }),

    // Delete Category
    deleteCategory: builder.mutation({
      invalidatesTags: ["admin-category"],
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useChangeCategoryStatusMutation,
  useDeleteCategoryMutation,
} = categoryApi;
