// src/services/TermsAndConditionsServices.ts
import apiSlice from "src/services/ApiSlice";

export const TacApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get Terms and Conditions
    getTac: builder.query({
      providesTags: ["admin-Tac"],
      query: () => ({
        url: "/tac",
        method: "GET",
      }),
    }),

    // ✅ Add / Update Terms and Conditions
    addTac: builder.mutation({
      invalidatesTags: ["admin-Tac"],
      query: (body) => ({
        url: "/tac/add",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetTacQuery,
  useAddTacMutation,
} = TacApi;
