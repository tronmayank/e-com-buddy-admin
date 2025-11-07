"use client";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import OrderFormLayout from "../../components/OrderFormLayout";
import { OrderFormValues } from "../../models/Order.model";
import { useAddOrderMutation } from "../../service/OrderServices";
import { showToast } from "src/utils/showToaster";
import { PaymentType, PaymentStatus, OrderStatus } from "../../models/Order.model";

type Props = { onClose: () => void };

const AddOrderFormWrapper = ({ onClose }: Props) => {
  const [addOrder] = useAddOrderMutation();

  const initialValues: OrderFormValues = {
    products: [
      {
        title: "",
        description: "",
        variantName: "",
        size: "",
        salePrice: 0,
      },
    ],
    // orderTotal: 0,
    userId: null,
    // couponName: "",
    // discountAmount: 0,
    shippingCharges: 0,
    // orderAmount: 0,
    billingDetails: {
      name: "",
      phone: "",
      state: "",
      city: "",
      pincode: "",
      address1: "",
      address2: "",
      orderNote: "",
    },
    paymentType: PaymentType.cod,
    paymentStatus: PaymentStatus.NONE,
    // transactionId: "",
    // metaData: "",
    orderStatus: OrderStatus.NEW_ORDER,
  };

  const validationSchema = Yup.object().shape({
    products: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("Enter product title"),
          description: Yup.string().required("Enter product description"),
          variantName: Yup.string().required("Enter variant name"),
          size: Yup.string().nullable(),
          salePrice: Yup.number()
            .required("Enter sale price")
            .min(1, "Price must be greater than 0"),
        })
      )
      .min(1, "Add at least one product"),

    // orderTotal: Yup.number().required().min(0),
    userId: Yup.string().nullable(),
    // couponName: Yup.string().nullable(),
    // discountAmount: Yup.number().min(0),
    shippingCharges: Yup.number().min(0),
    // orderAmount: Yup.number().required().min(0),

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

    paymentType: Yup.mixed<PaymentType>().oneOf(Object.values(PaymentType)),
    paymentStatus: Yup.mixed<PaymentStatus>().oneOf(Object.values(PaymentStatus)),
    orderStatus: Yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)),
  });

  const handleSubmit = async (
    values: OrderFormValues,
    { resetForm, setSubmitting }: FormikHelpers<OrderFormValues>
  ) => {
    setSubmitting(true);
    try {
      const res: any = await addOrder(values);
      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Order added successfully!");
        resetForm();
        onClose();
      } else {
        showToast("error", res?.error?.data?.message || "Failed to add order");
      }
    } catch {
      showToast("error", "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <Formik<OrderFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <OrderFormLayout formikProps={formikProps} onClose={onClose} type="ADD" />
        </Form>
      )}
    </Formik>
  );
};

export default AddOrderFormWrapper;
