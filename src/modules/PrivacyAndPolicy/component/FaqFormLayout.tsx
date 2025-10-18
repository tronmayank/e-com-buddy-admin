"use client";

import React from "react";
import { FormikProps } from "formik";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import { PapFormValues } from "../models/PAP.model";

type Props = {
    formik: FormikProps<PapFormValues>;
    isUpdating: boolean;
};

const PapFormLayout = ({ formik, isUpdating }: Props) => {
    const { values, setFieldValue, isSubmitting } = formik;
    const isFormDisabled = isUpdating || isSubmitting;

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            <div className="relative p-4 border border-gray-200 rounded-lg bg-white shadow-sm w-full">
                <ATMTextArea
                    label="Privacy and Policy (HTML)"
                    name="papData"
                    value={values.papData}
                    onChange={(e) => setFieldValue("papData", e.target.value)}
                    placeholder="Enter Privacy and Policy in HTML"
                    disabled={isFormDisabled}
                    rows={15}
                />
            </div>

            {/* Live Preview */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm w-full">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Preview</h3>
                <div
                    className="prose max-w-full"
                    style={{ minHeight: "200px" }}
                    dangerouslySetInnerHTML={{
                        __html: values.papData || "<p>Nothing to preview yet...</p>",
                    }}
                />
            </div>
        </div>
    );
};

export default PapFormLayout;
