export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: string;
  state: string;
  city: string;
  pincode: string;
  address1: string;
  address2: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export enum UserEnum {
  Admin = "ADMIN",
  Employee = "EMPLOYEE",
  superAdmin = "SUPERADMIN",
}

export type UserFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType?: string;
  state: string;
  city: string;
  pincode: string;
  address1: string;
  address2: string;

};
