"use client";

import React from "react";
import { FieldArray, FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import { FaqFormValues } from "../models/Faq.model";
import { PlusIcon, TrashIcon } from "../../WebInfo/components/WebInfoFormLayout";

type Props = {
    formik: FormikProps<FaqFormValues>;
    isUpdating: boolean;
};

const FaqFormLayout = ({ formik, isUpdating }: Props) => {
    const { values, setFieldValue, isSubmitting } = formik;
    const isFormDisabled = isUpdating || isSubmitting;

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            <FieldArray name="faqList">
                {({ push, remove }) => (
                    <>
                        {Array.isArray(values.faqList) && values.faqList.length > 0
                            ? values.faqList.map((faq, i) => (
                                <div
                                    key={i}
                                    className="relative mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm w-full"
                                >
                                    {/* Remove Button */}
                                    <div className="flex justify-end mb-2">
                                        <button
                                            type="button"
                                            onClick={() => remove(i)}
                                            className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition duration-150"
                                            disabled={isFormDisabled}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Question */}
                                    <div className="mb-4">
                                        <ATMTextField
                                            label="Question"
                                            name={`faqList[${i}].question`}
                                            value={faq.question}
                                            onChange={e => setFieldValue(`faqList[${i}].question`, e.target.value)}
                                            placeholder="Enter FAQ question"
                                            disabled={isFormDisabled}
                                        />
                                    </div>

                                    {/* Answer */}
                                    <div>
                                        <ATMTextArea
                                            label=""
                                            name={`faqList[${i}].answer`}
                                            value={faq.answer}
                                            onChange={e => setFieldValue(`faqList[${i}].answer`, e.target.value)}
                                            placeholder="Enter FAQ answer"
                                            disabled={isFormDisabled}
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            ))
                            : null}

                        {/* Add New FAQ */}
                        <button
                            type="button"
                            onClick={() => push({ question: "", answer: "" })}
                            className="mt-2 flex items-center justify-center w-full px-4 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                            disabled={isFormDisabled}
                        >
                            <PlusIcon className="w-5 h-5 mr-2" /> Add New FAQ
                        </button>
                    </>
                )}
            </FieldArray>
        </div>
    );
};

export default FaqFormLayout;
