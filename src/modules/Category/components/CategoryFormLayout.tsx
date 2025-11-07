"use client";

import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import { CategoryFormValues } from "../models/Category.model";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import { useState } from "react";

type Props = {
  formikProps: FormikProps<CategoryFormValues>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
  uploadFile: (file: FormData) => Promise<any>; // pass mutation here
};

const CategoryFormLayout = ({ formikProps, onClose, type, isLoading, uploadFile }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;
  const [isUploading, setIsUploading] = useState(false); // track upload status
  const isFormDisabled = isLoading || isSubmitting || isUploading;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true); // start loader
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadFile(formData); // call your mutation

      // Fix: correct path to URL
      const url = result.data?.data?.url;
      if (url) setFieldValue("image", url); // auto-fill input
    } catch (err) {
      console.error("File upload failed", err);
    } finally {
      e.target.value = ""; // reset input
      setIsUploading(false); // stop loader
    }
  };

  return (
    <MOLFormDialog
      title={type === "ADD" ? "Add Category" : "Update Category"}
      onClose={onClose}
      isSubmitting={isSubmitting}
    >
      {(isLoading || isUploading) ? (
        <div className="flex flex-col justify-center items-center h-[185px] gap-2">
          <ATMCircularProgress />
          {isUploading && <p className="text-gray-500 text-sm">Uploading image...</p>}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          <ATMTextField
            name="categoryName"
            value={values.categoryName}
            onChange={(e) => setFieldValue("categoryName", e.target.value)}
            label="Category Name"
            placeholder="Enter category name"
          />

          {/* Image Upload + URL */}
          <div className="flex flex-col gap-2">
            <label
              className={`flex items-center px-4 py-2 bg-green-500 text-white cursor-pointer rounded ${isFormDisabled ? "bg-gray-300 text-gray-600" : ""
                }`}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isFormDisabled}
              />
            </label>

            {values.image && (
              <img
                src={values.image}
                alt="Category"
                className="w-24 h-24 object-contain border p-1 rounded"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/placeholder-image.png";
                }}
              />
            )}

            <ATMTextField
              name="image"
              value={values.image}
              disabled={true}
              onChange={(e) => setFieldValue("image", e.target.value)}
              label="Image URL"
              placeholder="Image URL will auto-fill here after upload"
            />
          </div>
        </div>
      )}
    </MOLFormDialog>
  );
};

export default CategoryFormLayout;
