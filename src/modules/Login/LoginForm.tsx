import { FormikProps } from "formik";
import { LoginFormInitialValues } from "./LoginFormWrapper";
import ATMTextField from "../../components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMPasswordField from "../../components/atoms/FormElements/ATMPasswordField/ATMPasswordField";
import { ATMButton } from "../../components/atoms/ATMButton/ATMButton";

type Props = {
  formikProps: FormikProps<LoginFormInitialValues>;
};

const LoginForm = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, errors, touched } =
    formikProps;

  return (
    <div className="flex flex-col items-center justify-start h-screen 
  bg-gradient-to-r from-[#d51243] via-[#ff4d6d] to-[#ff758f] relative">

      {/* Project Title */}
      <h1 className="text-6xl md:text-6xl font-extrabold text-white mt-20 drop-shadow-lg">
        Nira Sooti
      </h1>
      <h5 className="text-2xl md:text-2xl font-extrabold text-white mt-4 drop-shadow-lg">Crafted in khadi</h5>

      {/* Login Card */}
      <div className="flex flex-col gap-6 w-full max-w-[500px] p-8 bg-white rounded-2xl shadow-2xl mt-auto mb-24">
        <div className="flex flex-col gap-2">
          <i className="font-medium">Welcome!</i>
          <div className="text-xl font-bold">Login to Nira Sooti</div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Email Input */}
          <ATMTextField
            name="email"
            value={values.email}
            onChange={(e) => setFieldValue("email", e.target.value)}
            label="Email"
            placeholder="Enter email"
            onBlur={handleBlur}
            isTouched={touched?.email}
            errorMessage={errors?.email}
            isValid={!errors?.email}
          />

          {/* Password Input */}
          <ATMPasswordField
            name="password"
            value={values.password}
            placeholder="Enter password"
            onChange={(e) => setFieldValue("password", e.target.value)}
            label="Password"
            onBlur={handleBlur}
            isTouched={touched?.password}
            errorMessage={errors?.password}
            isValid={!errors?.password}
          />
        </div>

        <div>
          <ATMButton isLoading={isSubmitting} type="submit" extraClasses="font-semibold">
            Login
          </ATMButton>
        </div>
      </div>
    </div>


  );
};

export default LoginForm;
