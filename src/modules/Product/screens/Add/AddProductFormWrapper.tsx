"use client";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import ProductFormLayout from "../../components/ProductFormLayout";
import { ProductFormValues } from "../../models/Product.model";
import { useAddProductMutation } from "../../service/ProductServices";
import { showToast } from "src/utils/showToaster";

type Props = { onClose: () => void };

const AddProductFormWrapper = ({ onClose }: Props) => {
  const [addProduct] = useAddProductMutation();

  const initialValues: ProductFormValues = {
    title: "",
    description: "",
    categoryId: "",
    variant: [
      {
        name: "",
        size: "",
        description: "",
        mrp: 0,
        discountPercent: 0,
        stockCount: 0,
      },
    ],
    tags: [],
    deliveryTimeline: "",
    shippingCharges: 0,
    images: [],
    // isActive: true,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter product title"),
    description: Yup.string().required("Please enter product description"),
    categoryId: Yup.string().required("Please select a category"),
    deliveryTimeline: Yup.string().required("Please enter delivery timeline"),
    shippingCharges: Yup.number()
      .required("Please enter shipping charges")
      .min(0, "Cannot be negative"),
    tags: Yup.array().of(Yup.string()).nullable(),
    images: Yup.array()
      .of(Yup.string().url("Invalid image URL"))
      .min(1, "Please provide at least one image"),
    variant: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Please enter variant name"),
          size: Yup.string().required("Please enter size"),
          description: Yup.string().required("Please enter variant description"),
          mrp: Yup.number().required("Please enter MRP").min(1, "MRP must be at least 1"),
          discountPercent: Yup.number()
            .min(0, "Cannot be negative")
            .max(100, "Cannot exceed 100%")
            .required("Please enter discount percent"),
          stockCount: Yup.number()
            .required("Please enter stock count")
            .min(0, "Cannot be negative"),
        })
      )
      .min(1, "At least one variant is required"),
  });

  const handleSubmit = async (
    values: ProductFormValues,
    { resetForm, setSubmitting }: FormikHelpers<ProductFormValues>
  ) => {
    setSubmitting(true);
    try {
      const { isActive, ...rest } = values
      const res: any = await addProduct(rest);
      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Product added successfully!");
        resetForm();
        onClose();
      } else {
        showToast("error", res?.error?.data?.message || "Failed to add product");
      }
    } catch {
      showToast("error", "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<ProductFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <ProductFormLayout formikProps={formikProps} onClose={onClose} type="ADD" />
        </Form>
      )}
    </Formik>
  );
};

export default AddProductFormWrapper;
