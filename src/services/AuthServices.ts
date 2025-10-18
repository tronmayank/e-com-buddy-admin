import apiSlice from "./ApiSlice";
import { v4 as uuid } from "uuid";

const deviceId = localStorage.getItem("deviceId") || uuid();
interface UploadData {
  url: string;
  public_id: string;
}

export interface UploadResponse {
  message: string;
  data: UploadData;
  status: boolean;
  code: string;
  issue: string | null;
}
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (body: {
        // companyCode: string;
        email: string;
        password: string;
      }) => {
        return {
          url: "/auth/login",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: any) => {
        return { ...response, data: { ...response?.data, deviceId } };
      },
    }),

    // Get Access Token
    refreshToken: builder.mutation({
      query: (body: any) => {
        return {
          url: "/auth/refresh",
          method: "POST",
          body,
        };
      },
    }),
    // Assuming this is in your WebInfoServices.ts or similar API slice file

    uploadFile: builder.mutation<UploadResponse, FormData>({
      // Type correction: Change the input type from 'File' to 'FormData'
      query: (formData: FormData) => {
        // NOTE: Since you're receiving FormData now, 
        // you don't need to manually create a new FormData object here 
        // or append the file again. The component already did that.

        return {
          url: "/auth/upload-file",
          method: "POST",
          body: formData, // Directly use the FormData object passed in
          headers: {
            // Keep the headers object empty or omit it to let the browser
            // set the correct 'Content-Type: multipart/form-data' boundary.
          },
        };
      },
    }),

    // Change Password
    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/user-change-password",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation, useUploadFileMutation } = authApi;
