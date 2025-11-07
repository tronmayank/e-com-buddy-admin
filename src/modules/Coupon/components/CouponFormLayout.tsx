"use client";

import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import { CouponFormValues, UpdateCouponFormValues } from "../models/Coupon.model";
import ATMSelect from "src/components/atoms/FormElements/ATMSelect/ATMSelect";

type Props<T> = {
  formikProps: FormikProps<T>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const CouponFormLayout = <T extends CouponFormValues | UpdateCouponFormValues>({
  formikProps,
  onClose,
  type,
  isLoading,
}: Props<T>) => {
  const { values, setFieldValue, isSubmitting, handleBlur, errors, touched } = formikProps;

  const isCouponFormValues = (v: any): v is CouponFormValues =>
    "type" in v && "amountOrPercent" in v && "useCount" in v && "expiry" in v;

  return (
    <MOLFormDialog
      title={type === "ADD" ? "Add Coupon" : "Update Coupon"}
      onClose={onClose}
      isSubmitting={isSubmitting}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[185px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {/* Coupon Name */}
          <ATMTextField
            name="couponName"
            value={(values as any).couponName}
            onChange={(e) => setFieldValue("couponName", e.target.value)}
            label="Coupon Name"
            placeholder="Enter coupon name"
            onBlur={handleBlur}
          />
          {/* {touched.couponName && errors.couponName && (
            <p className="text-red-500 text-sm mt-1">{errors.couponName as string}</p>
          )} */}

          {/* ADD mode extra fields */}
          {type === "ADD" && isCouponFormValues(values) && (
            <>
              {/* Coupon Type */}
              <ATMSelect
                name="type"
                label="Coupon Type"
                value={values.type}
                onChange={(newValue: any) => setFieldValue("type", newValue?.value)}
                options={[
                  { label: "FLAT", value: "FLAT" },
                  { label: "PERCENT", value: "PERCENT" },
                ]}
                valueAccessKey="value"
                placeholder="Select Type"
                isTouched={(touched as any).type}
                isValid={!(errors as any).type}
                onBlur={handleBlur}
              />

              {/* Amount / Percent */}
              <ATMTextField
                name="amountOrPercent"
                type="number"
                value={values.amountOrPercent}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (values.type === "PERCENT") val = Math.min(val, 100);
                  if (val < 1) val = 1;
                  setFieldValue("amountOrPercent", val);
                }}
                label={values.type === "PERCENT" ? "Percent (%)" : "Amount"}
                placeholder={values.type === "PERCENT" ? "Enter percent (1-100)" : "Enter amount"}
                onBlur={handleBlur}
              />
              {/* {(touched as any).amountOrPercent && (errors as any).amountOrPercent && (
                <p className="text-red-500 text-sm mt-1">{(errors as any).amountOrPercent}</p>
              )} */}

              {/* Use Count */}
              <ATMTextField
                name="useCount"
                type="number"
                value={values.useCount}
                onChange={(e) => setFieldValue("useCount", Number(e.target.value))}
                label="Use Count"
                placeholder="Enter use count"
                onBlur={handleBlur}
              />
              {/* {(touched as any).useCount && (errors as any).useCount && (
                <p className="text-red-500 text-sm mt-1">{(errors as any).useCount}</p>
              )} */}

              {/* Expiry */}
              <ATMTextField
                name="expiry"
                type="date"
                value={values.expiry}
                onChange={(e) => setFieldValue("expiry", e.target.value)}
                label="Expiry Date"
                placeholder="Select expiry date"
                onBlur={handleBlur}
              />
              {/* {(touched as any).expiry && (errors as any).expiry && (
                <p className="text-red-500 text-sm mt-1">{(errors as any).expiry}</p>
              )} */}
            </>
          )}
        </div>
      )}
    </MOLFormDialog>
  );
};

export default CouponFormLayout;
