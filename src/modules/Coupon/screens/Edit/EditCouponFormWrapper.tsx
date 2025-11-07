"use client";

import { Formik, FormikHelpers, Form } from "formik";
import { UpdateCouponFormValues, Coupon } from "../../models/Coupon.model";
import CouponFormLayout from "../../components/CouponFormLayout";
import { object, string } from "yup";
import { useGetCouponByIdQuery, useUpdateCouponMutation } from "../../service/CouponServices";
import { showToast } from "src/utils/showToaster";
import useFetchDataByIdCustomQuery from "src/hooks/useFetchDataByIdCustomQuery";

type Props = {
  id: string;
  onClose: () => void;
};

const EditCouponFormWrapper = ({ id, onClose }: Props) => {
  const { items, isLoading } = useFetchDataByIdCustomQuery<Coupon>({
    useEndPointHook: useGetCouponByIdQuery(id),
  });

  const [updateCoupon] = useUpdateCouponMutation();

  // Initial values for Formik
  const initialValues: UpdateCouponFormValues = {
    couponName: items?.couponName || "",
  };

  // Validation schema for Formik (only couponName is required in EDIT mode)
  const validationSchema = object().shape({
    couponName: string().required("Please enter coupon name"),
  });

  // Submit handler
  const handleSubmit = async (
    values: UpdateCouponFormValues,
    { resetForm, setSubmitting }: FormikHelpers<UpdateCouponFormValues>
  ) => {
    setSubmitting(true);
    try {
      const body: UpdateCouponFormValues = {
        couponName: values.couponName,

      };

      const res: any = await updateCoupon({ id, body });
      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Coupon updated successfully!");
        onClose();
        resetForm();
      } else if (res?.error) {
        showToast("error", res?.error?.data?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Formik<UpdateCouponFormValues>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <CouponFormLayout
            formikProps={formikProps}
            onClose={onClose}
            isLoading={isLoading}
            type="EDIT"
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditCouponFormWrapper;

