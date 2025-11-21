"use client";

import { FormikProps, FieldArray } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMSelect from "src/components/atoms/FormElements/ATMSelect/ATMSelect";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import { ProductFormValues, UpdateProductFormValues } from "../models/Product.model";
import { useGetCategoryQuery } from "../../Category/service/CategoryServices";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import { useUploadFileMutation } from "src/services/AuthServices";
import { useState } from "react";
import { showToast } from "src/utils/showToaster";

type Props<T> = {
  formikProps: FormikProps<T>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const ProductFormLayout = <T extends ProductFormValues | UpdateProductFormValues>({
  formikProps,
  onClose,
  type,
  isLoading,
}: Props<T>) => {
  const { data: categoriesData, isLoading: isCategoryLoading } = useGetCategoryQuery({
    limit: 100,
  });

  const {
    values,
    setFieldValue,
    isSubmitting,
    handleBlur,
    errors,
    touched,
  } = formikProps;

  const [uploadFile] = useUploadFileMutation();
  const [uploading, setUploading] = useState(false);

  const isProductFormValues = (v: any): v is ProductFormValues =>
    "title" in v && "description" in v && "variant" in v;



  return (
    <MOLFormDialog
      title={type === "ADD" ? "Add Product" : "Update Product"}
      onClose={onClose}
      isSubmitting={isSubmitting}
    // className="max-w-6xl w-full h-[90vh]" // ✅ Make dialog large
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <ATMTextField
            name="title"
            value={(values as any).title}
            onChange={(e) => setFieldValue("title", e.target.value)}
            label="Product Title & Description"
            placeholder="Enter product title"
            onBlur={handleBlur}
          />

          {/* Description */}
          <ATMTextArea
            name="description"
            value={(values as any).description}
            onChange={(e) => setFieldValue("description", e.target.value)}
            label=""
            placeholder="Enter product description"
            onBlur={handleBlur}
          />

          {/* Category */}
          <ATMSelect
            name="categoryId"
            label="Category"
            value={(values as any).categoryId}
            onChange={(newValue: any) => setFieldValue("categoryId", newValue?.value)}
            options={
              categoriesData?.data?.map((cat: any) => ({
                label: cat.categoryName,
                value: cat._id,
              })) || []
            }
            valueAccessKey="value"
            placeholder={isCategoryLoading ? "Loading categories..." : "Select category"}
            isTouched={(touched as any).categoryId}
            isValid={!(errors as any).categoryId}
            onBlur={handleBlur}
          />

          {/* Delivery Timeline */}
          <ATMTextField
            name="deliveryTimeline"
            value={(values as any).deliveryTimeline}
            onChange={(e) => setFieldValue("deliveryTimeline", e.target.value)}
            label="Delivery Timeline"
            placeholder="e.g. 3-5 business days"
            onBlur={handleBlur}
          />

          {/* Shipping Charges */}
          <ATMTextField
            name="shippingCharges"
            type="number"
            value={(values as any).shippingCharges}
            onChange={(e) => setFieldValue("shippingCharges", Number(e.target.value))}
            label="Shipping Charges"
            placeholder="Enter shipping charges"
            onBlur={handleBlur}
          />

          {/* Tags */}
          <ATMTextField
            name="tags"
            value={(values as any).tags?.join(", ") || ""}
            onChange={(e) =>
              setFieldValue(
                "tags",
                e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
              )
            }
            label="Tags"
            placeholder="Enter tags separated by commas"
            onBlur={handleBlur}
          />

          {/* ✅ Image Upload Section */}
          {/* ✅ Dynamic Image Upload Section with + and - buttons */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Product Images</label>

            <FieldArray
              name="images"
              render={(arrayHelpers) => (
                <div className="flex flex-col gap-3">
                  {(values as any).images?.map((url: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      {/* Image Preview */}
                      {url ? (
                        <div className="relative">
                          <img
                            src={url}
                            alt={`Product ${index}`}
                            className="w-20 h-20 object-cover rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ) : null}

                      {/* Upload Input */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            setUploading(true);
                            const formData = new FormData();
                            formData.append("file", file);
                            const result = await uploadFile(formData).unwrap();
                            const url = result?.data?.url;
                            if (url) {
                              const updated = [...(values as any).images];
                              updated[index] = url;
                              setFieldValue("images", updated);
                              showToast("success", "Image uploaded");
                            }
                          } catch (err) {
                            showToast("error", "Upload failed");
                          } finally {
                            setUploading(false);
                          }
                        }}
                        disabled={uploading}
                        className="border border-gray-300 p-2 rounded-md text-sm w-full"
                      />

                      {/* ➕ Add new image button */}
                      {index === (values as any).images.length - 1 && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          +
                        </button>
                      )}

                      {/* ➖ Remove image button */}
                      {values.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}

                  {/* If no image exists, show Add button */}
                  {!(values as any).images?.length && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-fit"
                    >
                      + Add Image
                    </button>
                  )}
                </div>
              )}
            />
          </div>


          {/* ✅ Variants Section */}
          {isProductFormValues(values) && (
            <FieldArray
              name="variant"
              render={(arrayHelpers) => (
                <div className="flex flex-col gap-y-3 border-t pt-3">
                  <h3 className="text-lg font-semibold">Variants</h3>
                  {values.variant.map((variant, index) => (
                    <div
                      key={index}
                      className="border p-3 rounded-lg flex flex-col gap-y-3 bg-gray-50"
                    >
                      <ATMTextField
                        name={`variant[${index}].name`}
                        value={variant.name}
                        onChange={(e) =>
                          setFieldValue(`variant[${index}].name`, e.target.value)
                        }
                        label="Variant Name"
                        placeholder="e.g. Small - Blue"
                        onBlur={handleBlur}
                      />

                      <ATMTextField
                        name={`variant[${index}].size`}
                        value={variant.size}
                        onChange={(e) =>
                          setFieldValue(`variant[${index}].size`, e.target.value)
                        }
                        label="Size"
                        placeholder="e.g. S, M, L"
                        onBlur={handleBlur}
                      />

                      <ATMTextField
                        name={`variant[${index}].description`}
                        value={variant.description}
                        onChange={(e) =>
                          setFieldValue(`variant[${index}].description`, e.target.value)
                        }
                        label="Description"
                        placeholder="Enter variant description"
                        onBlur={handleBlur}
                      />

                      <ATMTextField
                        name={`variant[${index}].mrp`}
                        type="number"
                        value={variant.mrp}
                        onChange={(e) =>
                          setFieldValue(`variant[${index}].mrp`, Number(e.target.value))
                        }
                        label="MRP"
                        placeholder="Enter price"
                        onBlur={handleBlur}
                      />

                      <ATMTextField
                        name={`variant[${index}].discountPercent`}
                        type="number"
                        value={variant.discountPercent}
                        onChange={(e) => {
                          let val = Math.min(Math.max(Number(e.target.value), 0), 100);
                          setFieldValue(`variant[${index}].discountPercent`, val);
                        }}
                        label="Discount (%)"
                        placeholder="Enter discount percent (0-100)"
                        onBlur={handleBlur}
                      />

                      <ATMTextField
                        name={`variant[${index}].stockCount`}
                        type="number"
                        value={variant.stockCount}
                        onChange={(e) =>
                          setFieldValue(`variant[${index}].stockCount`, Number(e.target.value))
                        }
                        label="Stock Count"
                        placeholder="Enter stock quantity"
                        onBlur={handleBlur}
                      />

                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                        className="text-sm text-red-600 underline mt-1"
                      >
                        Remove Variant
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        name: "",
                        size: "",
                        description: "",
                        mrp: 0,
                        discountPercent: 0,
                        stockCount: 0,
                      })
                    }
                    className="text-blue-600 text-sm underline"
                  >
                    + Add Variant
                  </button>
                </div>
              )}
            />
          )}
        </div>
      )}
    </MOLFormDialog>
  );
};

export default ProductFormLayout;
