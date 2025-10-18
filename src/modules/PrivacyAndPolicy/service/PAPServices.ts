// src/services/PapServices.ts
import apiSlice from "src/services/ApiSlice";

export const PapApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get PAP
    getPap: builder.query({
      providesTags: ["admin-Pap"],
      query: () => ({
        url: "/pap",   // Main route for PAP
        method: "GET",
      }),
    }),

    // ✅ Add or Update PAP
    addPap: builder.mutation({
      invalidatesTags: ["admin-Pap"],
      query: (body: { papData: string }) => ({
        url: "/pap/add",  // Adjust to your backend endpoint
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPapQuery,
  useAddPapMutation,
} = PapApi;
