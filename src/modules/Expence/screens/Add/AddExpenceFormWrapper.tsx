"use client";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import ExpenseFormLayout from "../../components/ExpenceFormLayout";
import { ExpenseFormValues } from "../../models/Expence.model";
import { useAddExpenseMutation } from "../../service/ExpenceServices";
import { showToast } from "src/utils/showToaster";

type Props = { onClose: () => void };

const AddExpenseFormWrapper = ({ onClose }: Props) => {
  const [addExpense] = useAddExpenseMutation();

  const initialValues: ExpenseFormValues = {
    title: "",
    description: "",
    amount: 0,
    receipt: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter title"),
    description: Yup.string().required("Please enter description"),
    amount: Yup.number()
      .required("Please enter amount")
      .min(1, "Amount must be at least 1"),
    receipt: Yup.string().optional(),

  });

  const handleSubmit = async (
    values: ExpenseFormValues,
    { resetForm, setSubmitting }: FormikHelpers<ExpenseFormValues>
  ) => {
    setSubmitting(true);

    try {
      const res: any = await addExpense(values);

      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Expense added successfully!");
        resetForm();
        onClose();
      } else {
        showToast("error", res?.error?.data?.message || "Failed to add expense");
      }
    } catch {
      showToast("error", "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<ExpenseFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <ExpenseFormLayout formikProps={formikProps} onClose={onClose} type="ADD" />
        </Form>
      )}
    </Formik>
  );
};

export default AddExpenseFormWrapper;
