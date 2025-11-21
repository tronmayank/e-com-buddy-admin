"use client";

import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMSelect from "src/components/atoms/FormElements/ATMSelect/ATMSelect";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import {
    OrderFormValues,
    UpdateOrderFormValues,

    OrderStatus,
} from "../models/Order.model";

type Props<T> = {
    formikProps: FormikProps<T>;
    onClose: () => void;
    type: "ADD" | "EDIT";
    isLoading?: boolean;
};

const EditOrderFormLayout = <
    T extends OrderFormValues | UpdateOrderFormValues
>({
    formikProps,
    onClose,
    type,
    isLoading,
}: Props<T>) => {
    const { values, setFieldValue, isSubmitting, handleBlur } = formikProps;

    return (
        <MOLFormDialog
            title={type === "ADD" ? "Add Order" : "Update Order"}
            onClose={onClose}
            isSubmitting={isSubmitting}
            size="medium"
        >
            {isLoading ? (
                <div className="flex justify-center items-center h-[200px]">
                    <ATMCircularProgress />
                </div>
            ) : (
                <div className="flex flex-col gap-y-5 max-h-[75vh] overflow-y-auto">

                    {/* PAYMENT + ORDER STATUS */}
                    <div className="grid grid-cols-3 gap-3 border-t pt-4">


                        <ATMSelect
                            name="orderStatus"
                            label="Order Status"
                            valueAccessKey="value"
                            value={(values as any).orderStatus}
                            onChange={(val: any) => {
                                setFieldValue("orderStatus", val ? val.value : "");
                            }}

                            options={[
                                { label: "New Order", value: OrderStatus.NEW_ORDER },
                                { label: "Confirmed", value: OrderStatus.ORDER_CONFIRMED },
                                { label: "In Transit", value: OrderStatus.IN_TRANSIT },
                                { label: "Delivered", value: OrderStatus.DILIVERED },
                                { label: "Returned", value: OrderStatus.RETURNED },
                                { label: "Cancelled", value: OrderStatus.CANCELLED },
                            ]}
                        />

                    </div>
                    {/* BILLING DETAILS */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-lg mb-2">
                            Billing Details
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            <ATMTextField
                                name="billingDetails.name"
                                value={(values as any).billingDetails?.name || ""}
                                onChange={(e) =>
                                    setFieldValue("billingDetails.name", e.target.value)
                                }
                                label="Full Name"
                                placeholder="Enter name"
                                onBlur={handleBlur}
                            />

                            <ATMTextField
                                name="billingDetails.phone"
                                value={(values as any).billingDetails?.phone || ""}
                                onChange={(e) =>
                                    setFieldValue("billingDetails.phone", e.target.value)
                                }
                                label="Phone"
                                placeholder="Enter phone number"
                                onBlur={handleBlur}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <ATMTextField
                                name="billingDetails.state"
                                value={(values as any).billingDetails?.state || ""}
                                onChange={(e) =>
                                    setFieldValue("billingDetails.state", e.target.value)
                                }
                                label="State"
                                placeholder="Enter state"
                                onBlur={handleBlur}
                            />

                            <ATMTextField
                                name="billingDetails.city"
                                value={(values as any).billingDetails?.city || ""}
                                onChange={(e) =>
                                    setFieldValue("billingDetails.city", e.target.value)
                                }
                                label="City"
                                placeholder="Enter city"
                                onBlur={handleBlur}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <ATMTextField
                                name="billingDetails.pincode"
                                value={(values as any).billingDetails?.pincode || ""}
                                onChange={(e) =>
                                    setFieldValue("billingDetails.pincode", e.target.value)
                                }
                                label="Pincode"
                                placeholder="Enter pincode"
                                onBlur={handleBlur}
                            />
                        </div>

                        <ATMTextArea
                            name="billingDetails.address1"
                            value={(values as any).billingDetails?.address1 || ""}
                            onChange={(e) =>
                                setFieldValue("billingDetails.address1", e.target.value)
                            }
                            label="Address 1"
                            placeholder="Enter address"
                            onBlur={handleBlur}
                        />

                        <ATMTextArea
                            name="billingDetails.address2"
                            value={(values as any).billingDetails?.address2 || ""}
                            onChange={(e) =>
                                setFieldValue("billingDetails.address2", e.target.value)
                            }
                            label="Address 2"
                            placeholder="Enter address line 2"
                            onBlur={handleBlur}
                        />

                        <ATMTextArea
                            name="billingDetails.orderNote"
                            value={(values as any).billingDetails?.orderNote || ""}
                            onChange={(e) =>
                                setFieldValue("billingDetails.orderNote", e.target.value)
                            }
                            label="Order Note"
                            placeholder="Add a note (optional)"
                            onBlur={handleBlur}
                        />
                    </div>



                </div>
            )}
        </MOLFormDialog>
    );
};

export default EditOrderFormLayout;
