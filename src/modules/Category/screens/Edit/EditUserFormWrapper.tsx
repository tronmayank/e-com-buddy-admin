"use client";

import { Formik, FormikHelpers, Form } from "formik";
import { CategoryFormValues, Category } from "../../models/Category.model";
import CategoryFormLayout from "../../components/CategoryFormLayout";
import { object, string } from "yup";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../../service/CategoryServices";
import { useUploadFileMutation } from "src/services/AuthServices";

import { showToast } from "src/utils/showToaster";
import useFetchDataByIdCustomQuery from "src/hooks/useFetchDataByIdCustomQuery";

type Props = {
  id: string;
  onClose: () => void;
};

const EditCategoryFormWrapper = ({ id, onClose }: Props) => {
  const { items, isLoading } = useFetchDataByIdCustomQuery<Category>({
    useEndPointHook: useGetCategoryByIdQuery(id),
  });

  const [updateCategory] = useUpdateCategoryMutation();
  const [uploadFile] = useUploadFileMutation();

  const initialValues: CategoryFormValues = {
    categoryName: items?.categoryName || "",
    image: items?.image || "",
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
      const res: any = await updateCategory({ id, body: values });
      if (res?.data?.status) {
        showToast("success", res?.data?.message || "Category updated successfully!");
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
    <Formik<CategoryFormValues>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <CategoryFormLayout
            formikProps={formikProps}
            onClose={onClose}
            isLoading={isLoading}
            type="EDIT"
            uploadFile={uploadFile} // pass the RTK mutation directly
          />
        </Form>
      )}
    </Formik>

  );
};

export default EditCategoryFormWrapper;
