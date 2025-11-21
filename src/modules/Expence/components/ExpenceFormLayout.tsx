"use client";

import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import {
  ExpenseFormValues,
  UpdateExpenseFormValues,
} from "../models/Expence.model";
import { useUploadFileMutation } from "src/services/AuthServices";
import { useState } from "react";
import { showToast } from "src/utils/showToaster";

type Props<T> = {
  formikProps: FormikProps<T>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const ExpenseFormLayout = <
  T extends ExpenseFormValues | UpdateExpenseFormValues
>({
  formikProps,
  onClose,
  type,
  isLoading,
}: Props<T>) => {
  const { values, setFieldValue, isSubmitting, handleBlur } = formikProps;

  const [uploadFile] = useUploadFileMutation();
  const [uploading, setUploading] = useState(false);

  // ⬆️ Same as your product upload API

  const handleReceiptUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadFile(formData).unwrap();
      const url = result?.data?.url;

      if (url) {
        setFieldValue("receipt", url);
        showToast("success", "Receipt uploaded successfully");
      }
    } catch (error) {
      showToast("error", "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <MOLFormDialog
      title={type === "ADD" ? "Add Expense" : "Update Expense"}
      onClose={onClose}
      isSubmitting={isSubmitting}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {/* Title */}
          <ATMTextField
            name="title"
            value={(values as any).title}
            onChange={(e) => setFieldValue("title", e.target.value)}
            label="Title"
            placeholder="Enter expense title"
            onBlur={handleBlur}
          />

          {/* Description */}
          <ATMTextField
            name="description"
            value={(values as any).description}
            onChange={(e) => setFieldValue("description", e.target.value)}
            label="Description"
            placeholder="Enter description"
            onBlur={handleBlur}
          />

          {/* Amount */}
          <ATMTextField
            name="amount"
            type="number"
            value={(values as any).amount}
            onChange={(e) =>
              setFieldValue("amount", Number(e.target.value) || 0)
            }
            label="Amount"
            placeholder="Enter amount"
            onBlur={handleBlur}
          />

          {/* Receipt Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Receipt Upload
            </label>

            <div className="flex items-center gap-3">
              {/* File Input */}
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleReceiptUpload}
                disabled={uploading}
                className="border border-gray-300 p-2 rounded-md text-sm"
              />

              {/* Loader while uploading */}
              {uploading && (
                <ATMCircularProgress size={"small"} />
              )}
            </div>

            {/* Show link after upload */}
            {(values as any).receipt && !uploading && (
              <a
                href={(values as any).receipt}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm underline"
              >
                View Uploaded Receipt
              </a>
            )}

          </div>

        </div>
      )}
    </MOLFormDialog>
  );
};

export default ExpenseFormLayout;
