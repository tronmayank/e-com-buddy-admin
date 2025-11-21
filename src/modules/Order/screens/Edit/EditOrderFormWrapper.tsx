"use client";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import OrderFormLayout from "../../components/OrderFormLayout";
import { UpdateOrderFormValues, Order, OrderStatus } from "../../models/Order.model";
import { useUpdateOrderMutation } from "../../service/OrderServices";
import { showToast } from "src/utils/showToaster";
import EditOrderFormLayout from "../../components/EditOrderFormLayout";

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
      state: Yup.string().nullable(""),
      city: Yup.string().nullable(""),
      pincode: Yup.string().nullable(""),
      address1: Yup.string().nullable(""),
      address2: Yup.string().nullable(),
      orderNote: Yup.string().nullable(),
    }),
    orderStatus: Yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)).required("Select Order status"),
  });

  const handleSubmit = async (
    values: UpdateOrderFormValues,
    { setSubmitting }: FormikHelpers<UpdateOrderFormValues>
  ) => {
    setSubmitting(true);
    try {
      let newProducts: any = [];

      values.products?.forEach((ele) => {
        const { _id, ...rest } = ele; // destructure _id out
        newProducts.push(rest);        // push the remaining fields
      });


      const payload = {
        billingDetails: values.billingDetails,
        orderStatus: values.orderStatus,
        products: newProducts,
        orderAmount: values.orderAmount,
        orderNumber: values.orderNumber

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
          <EditOrderFormLayout formikProps={formikProps} onClose={onClose} type="EDIT" />
        </Form>
      )}
    </Formik>
  );
};

export default EditOrderFormWrapper;
