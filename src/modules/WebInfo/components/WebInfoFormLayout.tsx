"use client";

import { FieldArray, FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import { WebInfoFormValues } from "../models/WebInfo.model";
import React from 'react';

// Icons for better UI (using SVG placeholders)
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>;

// PlusIcon.tsx
export const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-5 h-5"} // default size if not passed
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

// TrashIcon.tsx
export const TrashIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-5 h-5"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.42 5.61a.75.75 0 00-.73-1.07l-6.42-.924a.5.5 0 00-.47 0l-6.42.924a.75.75 0 00-.73 1.07L4.74 8.79.43 19.5c-.246.666.372 1.341.675 1.096l2.126-2.126m10.038 0l2.126 2.126c.303.245.92-.43.674-1.096l-4.31-10.71-4.788 0"
    />
  </svg>
);


type Props = {
  formik: FormikProps<WebInfoFormValues>;
  uploadFile: any; // Upload mutation
  isUpdating: boolean;
};

const FormField = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="mb-6">
    <label className="block text-gray-700 font-semibold mb-1 text-base">{label}</label>
    {children}
  </div>
);


const WebInfoFormLayout = ({ formik, uploadFile, isUpdating }: Props) => {
  const { values, setFieldValue, isSubmitting } = formik;
  const isFormDisabled = isUpdating || isSubmitting;

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo" | "bannerImages",
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadFile(formData).unwrap();
      const url = result.data.url;

      if (field === "logo") setFieldValue("logo", url);
      else if (field === "bannerImages" && index !== undefined) {
        const newBannerImages = [...values.bannerImages];
        newBannerImages[index] = url;
        setFieldValue("bannerImages", newBannerImages);
      }
    } catch (err: any) {
      console.error("File upload failed", err);
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">

      {/* 1. Branding & Media Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">🎨 Branding & SEO</h2>

        {/* Logo Field */}
        <FormField label="Website Logo">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <label
              className={`flex items-center px-4 py-2 font-medium rounded-lg shadow-sm transition duration-150 cursor-pointer ${isFormDisabled ? 'bg-gray-300 text-gray-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>
              <UploadIcon /> Upload Logo
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "logo")}
                className="hidden"
                disabled={isFormDisabled}
              />
            </label>

            <div className="flex items-center gap-4">
              {values.logo && (
                <img
                  src={values.logo}
                  alt="Logo"
                  className="w-16 h-16 object-contain border border-gray-200 p-1 rounded-md bg-white shadow-sm"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder-image.png"; }}
                />
              )}
            </div>
          </div>
          <div className="mt-4">
            <ATMTextField
              label="Logo URL (or edit directly)"
              name="logo"
              value={values.logo}
              onChange={(e) => setFieldValue("logo", e.target.value)}
              placeholder="Paste image URL here"
              disabled={isFormDisabled}
            />
          </div>
        </FormField>

        {/* Keywords Field (using ATMTextField) */}
        <FormField label="SEO Keywords (Comma Separated)">
          <ATMTextField
            label="Keywords"
            name="keyWords"
            value={values.keyWords.join(", ")}
            onChange={(e) => {
              const keywords = e.target.value
                .split(",")
                .map((s: string) => s.trim())
                .filter((s: string) => s.length > 0);
              setFieldValue("keyWords", keywords);
            }}
            placeholder="keyword1, keyword2, keyword3"
            disabled={isFormDisabled}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {values.keyWords.map((kw, i) => (
              <span
                key={i}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
              >
                {kw}
              </span>
            ))}
          </div>
        </FormField>
      </div>

      {/* 2. Banner Images */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">🖼️ Banner Images</h2>
        <FieldArray name="bannerImages">
          {({ push, remove }) => (
            <>
              {values.bannerImages.map((img, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50 w-full"
                >
                  {/* Image Preview */}
                  <div className="w-full sm:w-1/4 h-24 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                    {img ? (
                      <img
                        src={img}
                        alt={`Banner ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">No Image</span>
                    )}
                  </div>

                  {/* Input Field */}
                  <div className="w-full sm:flex-1">
                    <ATMTextField
                      label={`Banner ${i + 1} URL`}
                      name={`bannerImages[${i}]`}
                      value={img}
                      onChange={(e) => setFieldValue(`bannerImages[${i}]`, e.target.value)}
                      placeholder={`Banner ${i + 1} URL`}
                      className="w-full"
                      disabled={isFormDisabled}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0 mt-2 sm:mt-0">
                    <label className={`flex items-center px-3 py-2 text-white rounded-lg cursor-pointer ${isFormDisabled ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600'}`}>
                      <UploadIcon />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "bannerImages", i)}
                        className="hidden"
                        disabled={isFormDisabled}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition duration-150"
                      disabled={isFormDisabled}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => push("")}
                className="mt-4 flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                disabled={isFormDisabled}
              >
                <PlusIcon /> Add New Banner Slot
              </button>
            </>
          )}
        </FieldArray>
      </div>

      {/* 3. Footer Information */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">📝 Footer Information</h2>
        <FormField label="Left Footer Text/Info">
          <ATMTextArea
            label=""
            name="leftFooterInfo"
            value={values.leftFooterInfo}
            onChange={(e) => setFieldValue("leftFooterInfo", e.target.value)}
            placeholder="Brief company description or contact details..."
            disabled={isFormDisabled}
          />
        </FormField>

        <FormField label="Copyright Information">
          <ATMTextArea
            label=""
            name="copyRightInfo"
            value={values.copyRightInfo}
            onChange={(e) => setFieldValue("copyRightInfo", e.target.value)}
            placeholder="e.g., © 2024 Your Company Name. All Rights Reserved."
            disabled={isFormDisabled}
          />
        </FormField>
      </div>
      {/* 4. Social Info */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">🔗 Social Links</h2>
        <FieldArray name="socialInfo">
          {({ push, remove }) => (
            <>
              {values.socialInfo.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50 w-full"
                >
                  {/* Platform Name */}
                  <div className="w-full sm:flex-1">
                    <ATMTextField
                      label="Platform Name"
                      name={`socialInfo[${i}].name`}
                      value={s.name}
                      onChange={(e) => setFieldValue(`socialInfo[${i}].name`, e.target.value)}
                      placeholder="e.g., Facebook"
                      className="w-full"
                    />
                  </div>

                  {/* Link URL */}
                  <div className="w-full sm:flex-1">
                    <ATMTextField
                      label="Link URL"
                      name={`socialInfo[${i}].link`}
                      value={s.link}
                      onChange={(e) => setFieldValue(`socialInfo[${i}].link`, e.target.value)}
                      placeholder="Full Link URL"
                      className="w-full"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition duration-150 mt-2 sm:mt-0"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => push({ name: "", link: "" })}
                className="mt-2 flex items-center justify-center w-full px-4 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
              >
                <PlusIcon className="w-5 h-5 mr-2" /> Add Social Link
              </button>
            </>
          )}
        </FieldArray>
      </div>



    </div>
  );
};

export default WebInfoFormLayout;