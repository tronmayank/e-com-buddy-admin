"use client";

import { Formik, FormikHelpers, Form } from "formik";
import { CategoryFormValues } from "../../models/Category.model";
import CategoryFormLayout from "../../components/CategoryFormLayout";
import { object, string } from "yup";
import { useAddCategoryMutation } from "../../service/CategoryServices";
import { useUploadFileMutation } from "src/services/AuthServices";

import { showToast } from "src/utils/showToaster";

type Props = {
  onClose: () => void;
};

const AddCategoryFormWrapper = ({ onClose }: Props) => {
  const [addCategory] = useAddCategoryMutation();
  const [uploadFile] = useUploadFileMutation(); // Add file upload mutation

  const initialValues: CategoryFormValues = {
    categoryName: "",
    image: "",
  };

  const validationSchema = object().shape({
    categoryName: string().required("Please enter category name"),
    image: string().url("Please enter a valid image URL").required("Please enter image URL"),
  });

  const handleSubmit = async (
    values: CategoryFormValues,
    { resetForm, setSubmitting }: FormikHelpers<CategoryFormValues>
  ) => {
    setSubmitting(true);

    try {
      const res: any = await addCategory(values);
      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Category added successfully!");
        onClose();
        resetForm();
      } else {
        if (res?.error) {
          showToast("error", res?.error?.data?.message || "Failed to add category");
        }
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<CategoryFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <CategoryFormLayout
            formikProps={formikProps}
            onClose={onClose}
            type="ADD"
            uploadFile={uploadFile} // Pass upload function here
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddCategoryFormWrapper;
