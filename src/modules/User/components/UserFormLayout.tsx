import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import { UserFormValues } from "../models/User.model";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import ATMPasswordField from "src/components/atoms/FormElements/ATMPasswordField/ATMPasswordField";

type Props = {
  formikProps: FormikProps<UserFormValues>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const UserFormLayout = ({ formikProps, onClose, type, isLoading }: Props) => {
  const {
    values,
    setFieldValue,
    isSubmitting,
    handleBlur,
    // touched,
    errors
  } = formikProps;
  console.log(errors, "-----")

  return (
    <MOLFormDialog
      title={type === "ADD" ? "Add User" : "Update User"}
      onClose={onClose}
      isSubmitting={isSubmitting}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">

          <ATMTextField
            name="name"
            value={values.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
            label="Full name"
            placeholder="Enter name"
            onBlur={handleBlur}
          />

          <ATMTextField
            name="email"
            value={values.email}
            onChange={(e) => setFieldValue("email", e.target.value)}
            label="Email"
            placeholder="Enter email"
            onBlur={handleBlur}
          />

          <ATMTextField
            name="phone"
            value={values.phone}
            onChange={(e) => setFieldValue("phone", e.target.value)}
            label="Mobile Number"
            placeholder="Enter mobile number"
            onBlur={handleBlur}
          />

          {
            type === "ADD" ? <ATMTextField
              name="userType"
              value={values.userType as any}
              onChange={(e) => setFieldValue("userType", e.target.value)}
              label="User Type"
              placeholder="Enter user type"
              onBlur={handleBlur}
            />
              : null
          }

          <ATMTextField
            name="state"
            value={values.state}
            onChange={(e) => setFieldValue("state", e.target.value)}
            label="State"
            placeholder="Enter state"
            onBlur={handleBlur}
          />

          <ATMTextField
            name="city"
            value={values.city}
            onChange={(e) => setFieldValue("city", e.target.value)}
            label="City"
            placeholder="Enter city"
            onBlur={handleBlur}
          />

          <ATMTextField
            name="pincode"
            value={values.pincode}
            onChange={(e) => setFieldValue("pincode", e.target.value)}
            label="Pincode"
            placeholder="Enter pincode"
            onBlur={handleBlur}
          />

          <ATMTextField
            name="address1"
            value={values.address1}
            onChange={(e) => setFieldValue("address1", e.target.value)}
            label="Address Line 1"
            placeholder="Enter address line 1"
            onBlur={handleBlur}
          />

          <ATMTextField
            name="address2"
            value={values.address2}
            onChange={(e) => setFieldValue("address2", e.target.value)}
            label="Address Line 2"
            placeholder="Enter address line 2"
            onBlur={handleBlur}
          />

          {type === "ADD" && (
            <ATMPasswordField
              name="password"
              value={values.password || ""}
              placeholder="Enter password"
              onChange={(e) => setFieldValue("password", e.target.value)}
              label="Password"
              onBlur={handleBlur}
            />
          )}
        </div>
      )}
    </MOLFormDialog>
  );
};

export default UserFormLayout;
