"use client";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import OrderFormLayout from "../../components/OrderFormLayout";
import { UpdateOrderFormValues, Order, OrderStatus } from "../../models/Order.model";
import { useUpdateOrderMutation } from "../../service/OrderServices";
import { showToast } from "src/utils/showToaster";

type Props = {
  onClose: () => void;
  selectedData: Order; // full order object from listing
};

const EditOrderFormWrapper = ({ onClose, selectedData }: Props) => {
  const [updateOrder] = useUpdateOrderMutation();

  // ✅ Only fields that can be updated: billingDetails & orderStatus
  const validationSchema = Yup.object().shape({
    billingDetails: Yup.object().shape({
      name: Yup.string().required("Enter name"),
      phone: Yup.string().required("Enter phone"),
      state: Yup.string().required("Enter state"),
      city: Yup.string().required("Enter city"),
      pincode: Yup.string().required("Enter pincode"),
      address1: Yup.string().required("Enter address line 1"),
      address2: Yup.string().nullable(),
      orderNote: Yup.string().nullable(),
    }),
    orderStatus: Yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)),
  });

  const handleSubmit = async (
    values: UpdateOrderFormValues,
    { setSubmitting }: FormikHelpers<UpdateOrderFormValues>
  ) => {
    setSubmitting(true);
    try {
      const payload = {
        billingDetails: values.billingDetails,
        orderStatus: values.orderStatus,
      };

      const res: any = await updateOrder({
        id: values._id as string,
        body: payload,
      });

      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Order updated successfully!");
        onClose();
      } else {
        showToast("error", res?.error?.data?.message || "Failed to update order");
      }
    } catch {
      showToast("error", "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<UpdateOrderFormValues>
      initialValues={selectedData}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <OrderFormLayout formikProps={formikProps} onClose={onClose} type="EDIT" />
        </Form>
      )}
    </Formik>
  );
};

export default EditOrderFormWrapper;
