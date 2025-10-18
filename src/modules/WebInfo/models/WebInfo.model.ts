export type WebInfo = {
  _id: string;


  // New fields
  logo: string;
  bannerImages: string[];
  leftFooterInfo: string;
  copyRightInfo: string;
  socialInfo: {
    name: string;
    link: string;
  }[];
  keyWords: string[];
  __v: number;
};

export enum WebInfoEnum {
  Admin = "ADMIN",
  Employee = "EMPLOYEE",
  superAdmin = "SUPERADMIN",
}

export type WebInfoFormValues = {


  // New fields for form
  logo: string;
  bannerImages: string[];
  leftFooterInfo: string;
  copyRightInfo: string;
  socialInfo: {
    name: string;
    link: string;
  }[];
  keyWords: string[];
};
