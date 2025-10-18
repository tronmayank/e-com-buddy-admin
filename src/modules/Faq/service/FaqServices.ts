import apiSlice from "src/services/ApiSlice";

export const FaqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all FAQs
    getFaqs: builder.query({
      providesTags: ["admin-Faq"],
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
    }),

    // ✅ Add FAQ
    addFaq: builder.mutation({
      invalidatesTags: ["admin-Faq"],
      query: (body) => ({
        url: "/faq/add",
        method: "POST",
        body,
      }),
    }),


  }),
});

export const {
  useGetFaqsQuery,
  useAddFaqMutation,

} = FaqApi;
