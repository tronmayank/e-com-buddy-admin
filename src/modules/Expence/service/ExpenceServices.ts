// ExpenseServices.ts
import apiSlice from "src/services/ApiSlice";
import { Expense, ExpenseFormValues, UpdateExpenseFormValues } from "../models/Expence.model";

export const expenseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getExpenses: builder.query<{
      data: Expense[];
      page: number;
      limit: number;
      totalPages: number;
      totalResults: number;
    }, { page?: number; limit?: number; searchValue?: string }>({
      providesTags: ["expense"],
      query: (params) => ({
        url: "/expence/pagination",
        method: "GET",
        params,
      }),
    }),

    // Get Expense By Id
    getExpenseById: builder.query<Expense, string>({
      providesTags: ["expense"],
      query: (id) => ({
        url: `/expence/${id}`,
        method: "GET",
      }),
    }),

    // Add Expense
    addExpense: builder.mutation<Expense, ExpenseFormValues>({
      invalidatesTags: ["expense"],
      query: (body) => ({
        url: "/expence/add",
        method: "POST",
        body,
      }),
    }),

    // Update Expense
    updateExpense: builder.mutation<Expense, { id: string; body: UpdateExpenseFormValues }>({
      invalidatesTags: ["expense"],
      query: ({ id, body }) => ({
        url: `/expence/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // Delete Expense
    deleteExpense: builder.mutation<{ status: boolean; message: string }, string>({
      invalidatesTags: ["expense"],
      query: (id) => ({
        url: `/expence/${id}`,
        method: "DELETE",
      }),
    }),

    // Change Status (if needed)
    changeExpenseStatus: builder.mutation<{ status: boolean; message: string }, string>({
      invalidatesTags: ["expense"],
      query: (id) => ({
        url: `/expence/change-status/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useChangeExpenseStatusMutation,
} = expenseApi;
