"use client";

import React from "react";
import { FormikProps } from "formik";
import { TacFormValues } from "../models/TAC.model";

type Props = {
    formik: FormikProps<TacFormValues>;
    isUpdating: boolean;
};

const TacFormLayout = ({ formik, isUpdating }: Props) => {
    const { values, handleChange, setFieldValue, isSubmitting } = formik;
    const isFormDisabled = isUpdating || isSubmitting;

    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-6">
            {/* Textarea */}
            <div className="relative p-4 border border-gray-200 rounded-lg bg-white shadow-sm w-full">
                <label htmlFor="tacData" className="block text-gray-700 font-semibold mb-2">
                    Terms and Conditions (HTML)
                </label>

                <textarea
                    id="tacData"
                    name="tacData"
                    value={values.tacData}
                    onChange={(e) => setFieldValue("tacData", e.target.value)}
                    disabled={isFormDisabled}
                    placeholder="Enter Terms and Conditions in HTML"
                    rows={12}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
            </div>

            {/* Live Preview */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm w-full">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Preview</h3>
                <div
                    className="prose max-w-full"
                    style={{ minHeight: "200px" }}
                    dangerouslySetInnerHTML={{ __html: values.tacData || "<p>Nothing to preview yet...</p>" }}
                />
            </div>
        </div>
    );
};

export default TacFormLayout;
