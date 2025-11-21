"use client";


import { useGetTacQuery, useAddTacMutation } from "../../service/TACServices"; // Replace with your TAC service
import { showToast } from "src/utils/showToaster";
import { Formik, Form, Field } from "formik";
import { TacFormValues } from "../../models/TAC.model";

const TacPage = () => {
  const { data, isLoading, isSuccess, isError } = useGetTacQuery("");
  const [updateTac, { isLoading: isUpdating }] = useAddTacMutation();

  // Convert API response to Formik-friendly structure
  const prefilledValues: TacFormValues = {
    tacData: isSuccess && data?.data?.tacData ? data.data.tacData : "",
  };

  const handleSubmit = async (values: TacFormValues) => {
    try {
      const payload = {
        tacData: values.tacData,
      };
      await updateTac(payload).unwrap();
      showToast("success", "Terms and Conditions updated successfully! 🎉");
    } catch (err: any) {
      showToast("error", err?.data?.message || "TAC update failed! 😢");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="ml-3 text-lg text-gray-600">Loading Terms and Conditions...</p>
      </div>
    );

  if (isError)
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p className="font-bold">Error loading data</p>
        <p>Could not fetch Terms and Conditions. Please try again later.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <Formik enableReinitialize initialValues={prefilledValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form className="space-y-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md border-b border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-800">📄 Terms and Conditions</h1>
              <button
                type="submit"
                disabled={isUpdating}
                className={`flex items-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] ${isUpdating ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </header>

            {/* Form Content */}
            <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto space-y-6">
              {/* Textarea */}
              <div>
                <label htmlFor="tacData" className="block text-gray-700 font-semibold mb-2">
                  Enter Terms and Conditions (HTML)
                </label>
                <Field
                  as="textarea"
                  id="tacData"
                  name="tacData"
                  value={formik.values.tacData}
                  onChange={formik.handleChange}
                  placeholder="Enter Terms and Conditions in HTML"
                  rows={15}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </div>

              {/* Live Preview */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm w-full">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Preview</h3>
                <div
                  className="prose max-w-full"
                  style={{ minHeight: "200px" }}
                  dangerouslySetInnerHTML={{
                    __html: formik.values.tacData || "<p>Nothing to preview yet...</p>",
                  }}
                />
              </div>
            </div>

            {/* Footer Save Button */}
            <footer className="mt-4 sticky bottom-0 bg-gray-50 z-10 p-4 border-t border-gray-200">
              <div className="flex justify-end max-w-4xl mx-auto">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`flex items-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg transition duration-300 ease-in-out ${isUpdating ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </footer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TacPage;
