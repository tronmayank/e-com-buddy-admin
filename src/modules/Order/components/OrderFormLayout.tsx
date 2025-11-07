"use client";

import { FormikProps, FieldArray } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMSelect from "src/components/atoms/FormElements/ATMSelect/ATMSelect";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import ATMCircularProgress from "src/components/atoms/ATMCircularProgress/ATMCircularProgress";
import { OrderFormValues, UpdateOrderFormValues, PaymentType, PaymentStatus, OrderStatus } from "../models/Order.model";
import ATMTextArea from "src/components/atoms/FormElements/ATMTextArea/ATMTextArea";
import { useFetchData } from "src/hooks/useFetchData";
import { useGetProductsQuery } from "src/modules/Product/service/ProductServices";
import { useState } from "react";

type Props<T> = {
  formikProps: FormikProps<T>;
  onClose: () => void;
  type: "ADD" | "EDIT";
  isLoading?: boolean;
};

const OrderFormLayout = <T extends OrderFormValues | UpdateOrderFormValues>({
  formikProps,
  onClose,
  type,
  isLoading,
}: Props<T>) => {
  const {
    values,
    setFieldValue,
    isSubmitting,
    handleBlur,
  } = formikProps;
  console.log("values", values)
  const [searchQuery, setSearcQuery] = useState("")
  const [varients, setVarients] = useState([])
  const { data, totalData, totalPages } = useFetchData(
    useGetProductsQuery,
    {
      body: {
        limit: 20,
        page: 1,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["title", "categoryId"]),
        isPaginationRequired: true,
      },
    }
  );

  // const productOptions = data?.map((ele) => { value:ele?._id , l })

  return (
    <MOLFormDialog
      title={type === "ADD" ? "Add Order" : "Update Order"}
      onClose={onClose}
      isSubmitting={isSubmitting}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <ATMCircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-y-5 max-h-[75vh] overflow-y-auto">

          {/* Order Number */}
          {/* <ATMTextField
            name="orderNumber"
            type="number"
            value={(values as any).orderNumber || ""}
            onChange={(e) => setFieldValue("orderNumber", Number(e.target.value))}
            label="Order Number"
            placeholder="Enter order number"
            onBlur={handleBlur}
          /> */}

          {/* Coupon & Discounts */}




          {/* Billing Details */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">Billing Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <ATMTextField
                name="billingDetails.name"
                value={(values as any).billingDetails?.name || ""}
                onChange={(e) => setFieldValue("billingDetails.name", e.target.value)}
                label="Full Name"
                placeholder="Enter name"
                onBlur={handleBlur}
              />
              <ATMTextField
                name="billingDetails.phone"
                value={(values as any).billingDetails?.phone || ""}
                onChange={(e) => setFieldValue("billingDetails.phone", e.target.value)}
                label="Phone"
                placeholder="Enter phone number"
                onBlur={handleBlur}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <ATMTextField
                name="billingDetails.state"
                value={(values as any).billingDetails?.state || ""}
                onChange={(e) => setFieldValue("billingDetails.state", e.target.value)}
                label="State"
                placeholder="Enter state"
                onBlur={handleBlur}
              />
              <ATMTextField
                name="billingDetails.city"
                value={(values as any).billingDetails?.city || ""}
                onChange={(e) => setFieldValue("billingDetails.city", e.target.value)}
                label="City"
                placeholder="Enter city"
                onBlur={handleBlur}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <ATMTextField
                name="billingDetails.pincode"
                value={(values as any).billingDetails?.pincode || ""}
                onChange={(e) => setFieldValue("billingDetails.pincode", e.target.value)}
                label="Pincode"
                placeholder="Enter pincode"
                onBlur={handleBlur}
              />

            </div>
            <ATMTextArea
              name="billingDetails.address1"
              value={(values as any).billingDetails?.address1 || ""}
              onChange={(e) => setFieldValue("billingDetails.address1", e.target.value)}
              label="Address 1"
              variant="default"
              placeholder="Enter address line 1"
              onBlur={handleBlur}
            />
            <ATMTextArea
              name="billingDetails.address2"
              value={(values as any).billingDetails?.address2 || ""}
              onChange={(e) => setFieldValue("billingDetails.address2", e.target.value)}
              label="Address 2"
              placeholder="Enter address line 2"
              onBlur={handleBlur}
            />

            <ATMTextArea
              name="billingDetails.orderNote"
              value={(values as any).billingDetails?.orderNote || ""}
              onChange={(e) => setFieldValue("billingDetails.orderNote", e.target.value)}
              label="Order Note"
              placeholder="Additional notes (optional)"
              onBlur={handleBlur}
            />
          </div>

          {/* Shipping & Order Amount */}
          <div className="grid grid-cols-2 gap-3">
            <ATMTextField
              name="shippingCharges"
              type="number"
              value={(values as any).shippingCharges}
              onChange={(e) => setFieldValue("shippingCharges", Number(e.target.value))}
              label="Shipping Charges"
              placeholder="Enter shipping charges"
              onBlur={handleBlur}
            />
            {/* <ATMTextField
              name="couponName"
              value={(values as any).couponName || ""}
              onChange={(e) => setFieldValue("couponName", e.target.value)}
              label="Coupon Name"
              placeholder="Enter coupon name"
              onBlur={handleBlur}
            /> */}

            {/* <ATMTextField
              name="orderAmount"
              type="number"
              value={(values as any).orderAmount}
              onChange={(e) => setFieldValue("orderAmount", Number(e.target.value))}
              label="Order Amount"
              placeholder="Enter order amount"
              onBlur={handleBlur}
            /> */}
          </div>
          {/* Payment & Order Status */}
          <div className="grid grid-cols-3 gap-3 border-t pt-4">
            <ATMSelect
              name="paymentType"
              label="Payment Type"
              valueAccessKey='value'
              value={(values as any).paymentType}
              onChange={(val: any) => setFieldValue("paymentType", val?.value)}
              options={[
                { label: "Cash on Delivery", value: PaymentType.cod },
                { label: "Online Payment", value: PaymentType.online },
              ]}
            />

            <ATMSelect
              name="paymentStatus"
              label="Payment Status"
              valueAccessKey='value'
              value={(values as any).paymentStatus}
              onChange={(val: any, actionMeta: any) => {
                console.log(val, actionMeta)
                setFieldValue("paymentStatus", val?.value || "")
              }}
              options={[
                { label: "Pending", value: PaymentStatus.PENDING },
                { label: "Confirmed", value: PaymentStatus.CONFIRM },
                { label: "Canceled", value: PaymentStatus.CANCELED },
              ]}
            />

            <ATMSelect
              name="orderStatus"
              label="Order Status"
              valueAccessKey='value'
              value={(values as any).orderStatus}
              onChange={(val: any) => setFieldValue("orderStatus", val?.value)}
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
          {/* Products Field Array */}
          <FieldArray
            name="products"
            render={(arrayHelpers) => (
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">Products</h3>
                {(values as any).products?.map((product: any, index: number) => (
                  <div key={index} className="border p-3 rounded-lg bg-gray-50 mb-3 flex flex-col gap-2">
                    {/* <ATMTextField
                      name={`products[${index}].title`}
                      value={product.title}
                      onChange={(e) => setFieldValue(`products[${index}].title`, e.target.value)}
                      label="Product Title"
                      placeholder="Enter product title"
                      onBlur={handleBlur}
                    /> */}
                    <ATMSelect
                      name={`products[${index}].title`}
                      label="Product Title"
                      placeholder="Enter product title"
                      // valueAccessKey='value'
                      value={values?.products?.[index]?.title || null}

                      onInputChange={(value) => { setSearcQuery(value) }}
                      onChange={(val: any) => {
                        setVarients(val?.variant)
                        setFieldValue(`products[${index}].title`, val?.title)
                      }
                      }
                      valueAccessKey='title'
                      getOptionLabel={(option) => option?.title}
                      // value={(values as any).orderStatus}
                      // onChange={(val: any) => setFieldValue("orderStatus", val?._id)}
                      options={data}
                    />
                    <ATMSelect
                      name={`products.[${index}].variantName`}
                      label="Product Title"
                      placeholder="Enter product title"
                      // valueAccessKey='value'
                      value={values?.products?.[index]?.variantName || null}

                      onInputChange={(value) => { setSearcQuery(value) }}
                      onChange={(val: any) => {
                        setFieldValue(`products[${index}].variantName`, val?.name)
                        setFieldValue(`products[${index}].description`, val?.description)
                        setFieldValue(`products[${index}].size`, val?.size)
                        setFieldValue(`products[${index}].salePrice`, val?.salePrice)

                      }}
                      valueAccessKey='name'
                      getOptionLabel={(option) => option?.name}
                      // value={(values as any).orderStatus}
                      // onChange={(val: any) => setFieldValue("orderStatus", val?._id)}
                      options={varients}
                    />
                    <ATMTextArea
                      disabled
                      name={`products[${index}].description`}
                      value={product.description}
                      onChange={(e) => setFieldValue(`products[${index}].description`, e.target.value)}
                      label="Description"
                      placeholder="Enter description"
                      onBlur={handleBlur}
                    />
                    <div className="grid grid-cols-3 gap-3">
                      {/* <ATMTextField
                        name={`products[${index}].variantName`}
                        value={product.variantName}
                        onChange={(e) => setFieldValue(`products[${index}].variantName`, e.target.value)}
                        label="Variant Name"
                        placeholder="e.g. Small - Red"
                        onBlur={handleBlur}
                      /> */}
                      <ATMTextField
                        disabled
                        name={`products[${index}].size`}
                        value={product.size || ""}
                        onChange={(e) => setFieldValue(`products[${index}].size`, e.target.value)}
                        label="Size"
                        placeholder="e.g. M, L"
                        onBlur={handleBlur}
                      />
                      <ATMTextField

                        name={`products[${index}].salePrice`}
                        type="number"
                        value={product.salePrice}
                        onChange={(e) => setFieldValue(`products[${index}].salePrice`, Number(e.target.value))}
                        label="Sale Price"
                        placeholder="Enter sale price"
                        onBlur={handleBlur}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="text-sm text-red-600 underline"
                    >
                      Remove Product
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({
                      title: "",
                      description: "",
                      variantName: "",
                      size: "",
                      salePrice: 0,
                    })
                  }
                  className="text-blue-600 text-sm underline"
                >
                  + Add Product
                </button>
              </div>
            )}
          />


        </div>
      )}
    </MOLFormDialog>
  );
};

export default OrderFormLayout;
