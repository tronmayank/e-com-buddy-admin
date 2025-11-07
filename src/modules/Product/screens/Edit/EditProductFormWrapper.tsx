"use client";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import ProductFormLayout from "../../components/ProductFormLayout";
import { UpdateProductFormValues, Product } from "../../models/Product.model";
import { useUpdateProductMutation } from "../../service/ProductServices";
import { showToast } from "src/utils/showToaster";

type Props = {
  onClose: () => void;
  selectedData: Product; // full product object from listing
};

const EditProductFormWrapper = ({ onClose, selectedData }: Props) => {
  const [updateProduct] = useUpdateProductMutation();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter product title"),
    categoryId: Yup.string().required("Please select category"),
    deliveryTimeline: Yup.string().required("Please enter delivery timeline"),
    shippingCharges: Yup.number().required("Please enter shipping charges").min(0),
    // Add more validation for variants, images, etc. if needed
  });
  const handleSubmit = async (
    values: UpdateProductFormValues,
    { setSubmitting }: FormikHelpers<UpdateProductFormValues>
  ) => {
    setSubmitting(true);
    try {
      // Clean top-level fields
      const { _id, createdAt, updatedAt, __v, salePrice, variant, categoryName, ...rest } = values as any;

      // Clean variant array
      const cleanedVariants = variant?.map((v: any) => {
        const { _id, salePrice, createdAt, updatedAt, __v, ...allowedVariantFields } = v;
        return allowedVariantFields;
      }) || [];

      // Final payload
      const payload = {
        ...rest,
        variant: cleanedVariants,
      };

      const res: any = await updateProduct({
        id: values._id,
        body: payload,
      });

      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Product updated successfully!");
        onClose();
      } else {
        showToast("error", res?.error?.data?.message || "Failed to update product");
      }
    } catch {
      showToast("error", "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <Formik<UpdateProductFormValues>
      initialValues={selectedData}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <ProductFormLayout formikProps={formikProps} onClose={onClose} type="EDIT" />
        </Form>
      )}
    </Formik>
  );
};

export default EditProductFormWrapper;
