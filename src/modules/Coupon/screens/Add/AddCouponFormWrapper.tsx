"use client";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import CouponFormLayout from "../../components/CouponFormLayout";
import { CouponFormValues } from "../../models/Coupon.model";
import { useAddCouponMutation } from "../../service/CouponServices";
import { showToast } from "src/utils/showToaster";

type Props = { onClose: () => void };

const AddCouponFormWrapper = ({ onClose }: Props) => {
  const [addCoupon] = useAddCouponMutation();

  const initialValues: CouponFormValues = {
    couponName: "",
    type: "FLAT",
    amountOrPercent: 0,
    useCount: 0,
    expiry: "",
  };

  const validationSchema = Yup.object().shape({
    couponName: Yup.string().required("Please enter coupon name"),
    type: Yup.string().required("Please enter coupon type"),
    amountOrPercent: Yup.number()
      .required("Please enter amount or percent")
      .min(1, "Must be at least 1")
      .test("max-percent", "Percent cannot exceed 100", function (value) {
        const { type } = this.parent as CouponFormValues;
        if (type === "PERCENT" && value !== undefined) {
          return value <= 100;
        }
        return true;
      }),
    useCount: Yup.number().required("Please enter use count").min(1, "Must be at least 1"),
    expiry: Yup.string().required("Please select expiry date"),
  });


  const handleSubmit = async (
    values: CouponFormValues,
    { resetForm, setSubmitting }: FormikHelpers<CouponFormValues>
  ) => {
    setSubmitting(true);
    try {
      const res: any = await addCoupon(values);
      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Coupon added successfully!");
        resetForm();
        onClose();
      } else {
        showToast("error", res?.error?.data?.message || "Failed to add coupon");
      }
    } catch {
      showToast("error", "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<CouponFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <CouponFormLayout formikProps={formikProps} onClose={onClose} type="ADD" />
        </Form>
      )}
    </Formik>
  );
};

export default AddCouponFormWrapper;
