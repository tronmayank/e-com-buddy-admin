"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store";
import { useGetFaqsQuery, useAddFaqMutation } from "../../service/FaqServices";
import { showToast } from "src/utils/showToaster";
import { Formik, Form } from "formik";
import { FaqFormValues, Faq } from "../../models/Faq.model";
import FaqFormLayout from "../../component/FaqFormLayout";

const initialValues: FaqFormValues = {
  faqList: [],
};

const FaqPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isSuccess, isError } = useGetFaqsQuery("");
  const [updateFaq, { isLoading: isUpdating }] = useAddFaqMutation();

  // Convert API data to Formik-friendly structure
  // Convert API data to Formik-friendly structure
  const prefilledValues: FaqFormValues = {
    faqList:
      isSuccess && Array.isArray(data?.data?.faqData)
        ? data.data.faqData.map((faq: any) => ({
          question: faq.question || "",
          answer: faq.answer || "",
        }))
        : [],
  };


  const handleSubmit = async (values: FaqFormValues) => {
    try {
      const payload = {
        faqData: values.faqList.map(({ question, answer }) => ({ question, answer })),
      };
      await updateFaq(payload).unwrap();
      showToast("success", "FAQs updated successfully! 🎉");
    } catch (err: any) {
      showToast("error", err?.data?.message || "FAQ update failed! 😢");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="ml-3 text-lg text-gray-600">Loading FAQ data...</p>
      </div>
    );

  if (isError)
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p className="font-bold">Error loading data</p>
        <p>Could not fetch FAQ details. Please try again later.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <Formik enableReinitialize initialValues={prefilledValues} onSubmit={handleSubmit}>
        {formik => (
          <Form>
            <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-md border-b border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800">❓ FAQs Management</h1>
              <button
                type="submit"
                disabled={isUpdating}
                className={`flex items-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] ${isUpdating ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                {isUpdating ? "Saving..." : "Save All Changes"}
              </button>
            </header>

            <FaqFormLayout formik={formik} isUpdating={isUpdating} />

            <footer className="mt-8 pt-4 border-t border-gray-200 sticky bottom-0 bg-gray-50 z-10 p-4">
              <div className="flex justify-end max-w-4xl mx-auto">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`flex items-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg transition duration-300 ease-in-out ${isUpdating ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                  {isUpdating ? "Saving..." : "Save All Changes"}
                </button>
              </div>
            </footer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FaqPage;
