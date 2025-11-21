"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store";
import { useGetWebInfoQuery, useAddWebInfoMutation } from "../../service/WebInfoServices";
import { useUploadFileMutation } from "src/services/AuthServices";
import { showToast } from "src/utils/showToaster";
import { Formik, Form } from "formik";
import { WebInfoFormValues } from "../../models/WebInfo.model";
import WebInfoFormLayout from "../../components/WebInfoFormLayout";

// Define initial values outside the component to prevent re-initialization issues
const initialValues: WebInfoFormValues = {
  logo: "",
  bannerImages: [],
  leftFooterInfo: "",
  copyRightInfo: "",
  socialInfo: [],
  keyWords: [],
};


const WebInfoPage = () => {

  const { data, isLoading, isSuccess, isError } = useGetWebInfoQuery("");
  const [updateWebInfo, { isLoading: isUpdating }] = useAddWebInfoMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation(); // Capture isUploading state

  // Prefill data when API returns
  const prefilledValues: WebInfoFormValues = isSuccess && data?.data
    ? {
      ...initialValues,
      // Ensure data is merged correctly, falling back to empty arrays
      ...data.data as WebInfoFormValues,
      keyWords: (data.data as WebInfoFormValues).keyWords || [],
      bannerImages: (data.data as WebInfoFormValues).bannerImages || [],
      socialInfo: (data.data as WebInfoFormValues).socialInfo || [],
    }
    : initialValues;
  const handleSubmit = async (values: WebInfoFormValues) => {
    try {
      // Create a clean payload with only allowed fields
      const { logo, bannerImages, keyWords, leftFooterInfo, copyRightInfo, socialInfo } = values;

      const payload = {
        logo,
        bannerImages,
        keyWords,
        leftFooterInfo,
        copyRightInfo,
        socialInfo: socialInfo?.map(({ name, link }) => ({ name, link })),
      };

      await updateWebInfo(payload).unwrap();
      showToast("success", "WebInfo updated successfully! 🎉");
    } catch (err: any) {
      showToast("error", err?.data?.message || "WebInfo update failed! 😢");
    }
  };


  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      <p className="ml-3 text-lg text-gray-600">Loading website configuration...</p>
    </div>
  );

  if (isError) return (
    <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      <p className="font-bold">Error loading data</p>
      <p>Could not fetch web configuration details. Please try again later.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      <Formik
        // Use key={JSON.stringify(prefilledValues)} to ensure Formik correctly re-initializes 
        // when new data arrives, even if enableReinitialize is true.
        // However, enableReinitialize should be sufficient for API data load.
        enableReinitialize
        initialValues={prefilledValues}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            {/* HEADER & GLOBAL UPDATE BUTTON */}
            <header className="flex justify-between  items-center mb-8 bg-white p-4 rounded-xl shadow-md border-b border-gray-200  top-0 z-10">
              <h1 className="text-3xl font-extrabold text-gray-800">🌐 Web Configuration</h1>
              <button
                type="submit" // This triggers Formik's handleSubmit
                disabled={isUpdating || isUploading}
                className={`flex items-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] 
                                    ${(isUpdating || isUploading) ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {isUpdating ? "Saving..." : isUploading ? "Uploading..." : "Save All Changes"}
              </button>
            </header>

            {/* Form Layout (Fields) */}
            <WebInfoFormLayout
              formik={formik}
              uploadFile={uploadFile}
              isUpdating={isUpdating || isUploading}
            />

            {/* Footer Update Button (Optional, if you want a second save button at the bottom) */}
            <footer className="mt-8 pt-4 border-t border-gray-200 sticky bottom-0 bg-gray-50 z-10 p-4">
              <div className="flex justify-end max-w-4xl mx-auto">
                <button
                  type="submit"
                  disabled={isUpdating || isUploading}
                  className={`flex items-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg transition duration-300 ease-in-out ${isUpdating || isUploading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                >
                  {isUpdating ? "Saving..." : isUploading ? "Uploading..." : "Save All Changes"}
                </button>
              </div>
            </footer>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WebInfoPage;