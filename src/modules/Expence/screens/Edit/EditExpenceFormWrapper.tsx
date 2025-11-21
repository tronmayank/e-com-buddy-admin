"use client";

import { Formik, FormikHelpers, Form } from "formik";
import { UpdateExpenseFormValues, Expense } from "../../models/Expence.model";
import ExpenseFormLayout from "../../components/ExpenceFormLayout";
import { object, string, number } from "yup";
import {
  useGetExpenseByIdQuery,
  useUpdateExpenseMutation,
} from "../../service/ExpenceServices";
import { showToast } from "src/utils/showToaster";
import useFetchDataByIdCustomQuery from "src/hooks/useFetchDataByIdCustomQuery";

type Props = {
  id: string;
  onClose: () => void;
};

const EditExpenseFormWrapper = ({ id, onClose }: Props) => {
  const { items, isLoading } = useFetchDataByIdCustomQuery<Expense>({
    useEndPointHook: useGetExpenseByIdQuery(id),
  });

  const [updateExpense] = useUpdateExpenseMutation();

  // Initial Formik values
  const initialValues: UpdateExpenseFormValues = {
    title: items?.title || "",
    description: items?.description || "",
    amount: items?.amount || 0,
    receipt: items?.receipt || "",
  };

  // Validation schema
  const validationSchema = object().shape({
    title: string().required("Please enter title"),
    description: string().required("Please enter description"),
    amount: number().required("Please enter amount").min(1, "Amount must be at least 1"),
    receipt: string().optional(),
  });

  // Submit handler
  const handleSubmit = async (
    values: UpdateExpenseFormValues,
    { resetForm, setSubmitting }: FormikHelpers<UpdateExpenseFormValues>
  ) => {
    setSubmitting(true);
    try {
      const body: UpdateExpenseFormValues = { ...values };

      const res: any = await updateExpense({ id, body });

      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Expense updated successfully!");
        onClose();
        resetForm();
      } else {
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
    <Formik<UpdateExpenseFormValues>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <ExpenseFormLayout
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

export default EditExpenseFormWrapper;
