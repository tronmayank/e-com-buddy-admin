
import { useState } from "react";
import UserListing from "./UserListing";
import { User } from "../../models/User.model";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { setIsOpenAddDialog, setIsOpenEditDialog } from "../../slice/UserSlice";
import AddUserFormWrapper from "../Add/AddUserFormWrapper";
import EditUserFormWrapper from "../Edit/EditUserFormWrapper";
import { useFetchData } from "src/hooks/useFetchData";
import { useFilterPagination } from "src/hooks/useFilterPagination";
import { useGetUserQuery } from "../../service/UserServices";

type Props = {};

const UserListingWrapper = (props: Props) => {

  const [id, setId] = useState<string>("");
  const { isOpenAddDialog, isOpenEditDialog } = useSelector((state: RootState) => state?.user);

  const dispatch = useDispatch<AppDispatch>();


  // api
  const { searchQuery, limit, page } = useFilterPagination();
  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetUserQuery,
    {
      body: {
        limit,
        page,
        searchValue: searchQuery,
        searchIn: JSON.stringify(["name", "email"]),
        isPaginationRequired: true,
      },
    }
  );


  const tableHeaders: TableHeader<User>[] = [

    {
      fieldName: "email",
      headerName: "Email",
      flex: "flex-[1_1_0%]",
      renderCell: (row: any) => {
        return (
          <div>
            <p><b>Name</b> : {row?.name}</p>
            <p><b>Email</b> : {row?.email}</p>


          </div>
        )
      }
    },
    {
      fieldName: "userType",
      headerName: "User Type",
      flex: "flex-[1_1_0%]"
    },
    {
      fieldName: "phone",
      headerName: "Phone",
      flex: "flex-[1_1_0%]"
    },
    {
      fieldName: "phone",
      headerName: "Address",
      flex: "flex-[1_1_0%]",
      renderCell: (row: any) => {
        return (
          <div>
            <p><b>State</b> : {row?.state}</p>
            <p><b>City</b> : {row?.city}</p>
            <p><b>Pincode</b> : {row?.pincode}</p>
            <p><b>Address 1</b> : {row?.address1}</p>
            <p><b>Address 2</b> : {row?.address2}</p>

          </div>
        )
      }
    },

  ];

  return (
    <>
      <UserListing
        tableHeaders={tableHeaders}
        rowData={data as User[]}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: totalData,
          totalPages: totalPages,
        }}
        isLoading={isLoading}
        // onDelete={handleDelete}
        onEdit={(value) => {
          dispatch(setIsOpenEditDialog(true));
          setId(value?._id);
        }}
      />

      {isOpenAddDialog && (
        <AddUserFormWrapper
          onClose={() => dispatch(setIsOpenAddDialog(false))}
        />
      )}

      {isOpenEditDialog && (
        <EditUserFormWrapper
          id={id}
          onClose={() => {
            dispatch(setIsOpenEditDialog(false));
          }}
        />
      )}

    </>
  );
};

export default UserListingWrapper;

