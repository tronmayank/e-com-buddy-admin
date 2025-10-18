// src/models/PrivacyAndPolicy.model.ts

// Full data type returned by API
export type PrivacyAndPolicy = {
  _id: string;
  papData: string;   // HTML string for Privacy and Policy content
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Form values type for Formik
export type PapFormValues = {
  papData: string;   // For editing in a form
};
