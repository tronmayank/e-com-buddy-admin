import apiSlice from "src/services/ApiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getUser: builder.query({
      providesTags: ["admin-user"],
      query: (body) => {
        return {
          url: "/user/pagination",
          method: "GET",
          params: body,
        };
      },
    }),

    // Get User By Id
    getUserById: builder.query({
      providesTags: ["admin-user"],
      query: (id: string) => {
        return {
          url: `/user/${id}`,
          method: "GET",
        };
      },
    }),

    // Add
    addUser: builder.mutation({
      invalidatesTags: ["admin-user"],
      query: (body) => {
        return {
          url: "/user/add",
          method: "POST",
          body,
        };
      },
    }),

    // Update
    updateUser: builder.mutation({
      invalidatesTags: ["admin-user"],
      query: ({ id, body }) => {
        return {
          url: `/user/${id}`,
          method: "PUT",
          body,
        };
      },
    }),

    // Change Status
    changeUserStatus: builder.mutation({
      invalidatesTags: ["admin-user"],
      query: (id: string) => {
        return {
          url: `/user/change-status/${id}`,
          method: "PUT",
        };
      },
    }),

    // Delete
    deleteUser: builder.mutation({
      invalidatesTags: ["admin-user"],
      query: (id: string) => {
        return {
          url: `/user/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useChangeUserStatusMutation,
  useDeleteUserMutation,
} = userApi;
