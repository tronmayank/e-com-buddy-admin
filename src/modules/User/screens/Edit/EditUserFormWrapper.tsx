import { Formik, FormikHelpers, Form } from "formik";
import { UserFormValues, User } from "../../models/User.model";
import UserFormLayout from "../../components/UserFormLayout";
import { object, string } from "yup";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../service/UserServices";
import { showToast } from "src/utils/showToaster";
import useFetchDataByIdCustomQuery from "src/hooks/useFetchDataByIdCustomQuery";

type Props = {
  id: string;
  onClose: () => void;
};

const EditUserFormWrapper = ({ id, onClose }: Props) => {
  const { items, isLoading } = useFetchDataByIdCustomQuery<User>({
    useEndPointHook: useGetUserByIdQuery(id),
  });

  const [updateUser] = useUpdateUserMutation();

  // ✅ Ensure safe fallback for undefined items
  const initialValues: UserFormValues = {
    name: items?.name || "",
    email: items?.email || "",
    phone: items?.phone || "",
    password: items?.password || "",
    state: items?.state || "",
    city: items?.city || "",
    pincode: items?.pincode || "",
    address1: items?.address1 || "",
    address2: items?.address2 || "",
  };

  const validationSchema = object().shape({
    name: string().required("Please enter full name"),
    email: string().email().required("Please enter email"),
    password: string().required("Please enter password"),
    phone: string().required("Please enter phone"),
    state: string().required("Please enter state"),
    city: string().required("Please enter city"),
    pincode: string().required("Please enter pincode"),
    address1: string().required("Please enter address1"),
    address2: string().required("Please enter address2"),
    // userType: string().required("Please enter user type"),
  });

  const handleSubmit = async (
    values: UserFormValues,
    { resetForm, setSubmitting }: FormikHelpers<UserFormValues>
  ) => {
    try {
      const res: any = await updateUser({ id, body: values });
      if (res?.data?.status) {
        showToast("success", res?.data?.message);
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
    <Formik<UserFormValues>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <UserFormLayout
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

export default EditUserFormWrapper;
