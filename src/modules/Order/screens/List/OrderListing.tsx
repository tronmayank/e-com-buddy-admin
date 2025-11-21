import { IconPlus } from "@tabler/icons-react";
import ATMPageHeader from "src/components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "src/components/atoms/ATMPagination/ATMPagination";
import MOLFilterBar from "src/components/molecules/MOLFilterBar/MOLFilterBar";
import MOLTable, { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { Order } from "../../models/Order.model";
import { Form, Formik } from "formik";
import ATMSelect from "src/components/atoms/FormElements/ATMSelect/ATMSelect";
import { ATMButton } from "src/components/atoms/ATMButton/ATMButton";

type Props = {
  onAddNew: () => void;
  rowData: Order[];
  tableHeaders: TableHeader<Order>[];
  isLoading: boolean;
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
  onEdit?: (item: Order) => void;
  onDelete?: (item: Order, closeDialog: () => void) => void;
  setOrderStatus: any
};

const OrderListing = ({
  onAddNew,
  tableHeaders,
  rowData,
  isLoading,
  filterPaginationData: { totalCount, totalPages },
  onEdit,
  onDelete,
  setOrderStatus
}: Props) => {

  const filterValues = [
    { label: "All", value: "" },
    { label: "NEW_ORDER", value: "NEW_ORDER" },
    { label: "ORDER_CONFIRMED", value: "ORDER_CONFIRMED" },
    { label: "IN_TRANSIT", value: "IN_TRANSIT" },
    { label: "DILIVERED", value: "DILIVERED" },
    { label: "RETURNED", value: "RETURNED" },
    { label: "CANCELLED", value: "CANCELLED" },
  ];
  // Filter out null/undefined rows for safety
  const safeRowData = (rowData || []).filter(Boolean);

  return (
    <div className="flex flex-col h-full gap-2">
      <ATMPageHeader
        heading="ORDERS"
        buttonProps={{
          label: "Add",
          icon: IconPlus,
          onClick: onAddNew,
        }}
      />

      <div className="flex flex-col overflow-auto border rounded border-slate-300 h-screen">
        {/* Table Toolbar */}
        <div className="flex items-center gap-28 p-4">
          <MOLFilterBar />
          {/* Dropdown (ATMSelect) */}
          <Formik
            initialValues={{ OrderStatus: { label: 'All', value: "" } }}
            // validationSchema={Yup.object({
            //   OrderStatus: Yup.string().required("Acknowledgment is required"),
            // })}
            onSubmit={(values) => {



              setOrderStatus(values?.OrderStatus?.value as any)
            }}
          >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => (
              <Form className="flex items-center gap-4" >
                <div className="w-64">
                  <ATMSelect
                    name="Order status"
                    value={values.OrderStatus}
                    onChange={(newValue) => setFieldValue("OrderStatus", newValue)}
                    label=""
                    options={filterValues}
                    variant="outlined"
                    valueAccessKey="value"
                  />
                </div>
                <ATMButton onClick={() => handleSubmit()}>
                  Submit
                </ATMButton>
              </Form>
            )}
          </Formik>

          {/* MOLFilterBar - Now aligned side by side with the dropdown */}

        </div>
        <div className="flex-1 overflow-auto">
          <MOLTable<Order>
            tableHeaders={tableHeaders}
            data={safeRowData}
            getKey={(item) => item?._id || Math.random().toString()}
            onEdit={onEdit}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        <ATMPagination
          totalPages={totalPages}
          rowCount={totalCount}
          rows={safeRowData}
        />
      </div>
    </div>
  );
};

export default OrderListing;
