import apiSlice from "src/services/ApiSlice";

export const WebInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getWebInfo: builder.query({
      providesTags: ["admin-WebInfo"],
      query: () => {
        return {
          url: "/web-info",
          method: "GET",
        };
      },
    }),


    // Add
    addWebInfo: builder.mutation({
      invalidatesTags: ["admin-WebInfo"],
      query: (body) => {
        return {
          url: "/web-info/add",
          method: "POST",
          body,
        };
      },
    }),





  }),
});

export const {
  useGetWebInfoQuery,
  useAddWebInfoMutation,

} = WebInfoApi;
