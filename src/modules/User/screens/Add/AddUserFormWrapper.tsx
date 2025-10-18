import { Formik, FormikHelpers, Form } from "formik";
import { UserFormValues } from "../../models/User.model";
import UserFormLayout from "../../components/UserFormLayout";
import { object, string } from "yup";
import { useAddUserMutation } from "../../service/UserServices"
import { showToast } from "src/utils/showToaster";

type Props = {
  onClose: () => void;
};

const AddUserFormWrapper = ({ onClose }: Props) => {
  const [addUser] = useAddUserMutation();

  const initialValues: UserFormValues = {
    email: "",
    name: "",
    phone: "",
    password: "Password1!",
    userType: "ADMIN",
    state: "",
    city: "",
    pincode: "",
    address1: "",
    address2: "",

  };

  const validationSchema = object().shape({
    name: string().required("Please enter full name"),
    email: string().email().required("Please enter email"),
    password: string().required("Please enter password"),
    phone: string().required("Please enter phone"),
    userType: string().required("Please enter userType"),
    state: string().required("Please enter state"),
    city: string().required("Please enter city"),
    pincode: string().required("Please enter pincode"),
    address1: string().required("Please enter address1"),
    address2: string().required("Please enter address2"),
    // userType: string().required("Please enter user type"),
  });

  const handleSubmit = (
    values: UserFormValues,
    { resetForm, setSubmitting }: FormikHelpers<UserFormValues>
  ) => {
    setTimeout(() => {
      addUser(values)
        .then((res: any) => {

          if (res?.data?.status) {
            showToast("success", res?.data?.message);
            onClose();
            resetForm();
          } else {
            if (res?.error) {
              showToast("error", res?.error?.data?.message);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Formik<UserFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <UserFormLayout formikProps={formikProps} onClose={onClose} type="ADD" />
        </Form>
      )}
    </Formik>
  );
};

export default AddUserFormWrapper;
