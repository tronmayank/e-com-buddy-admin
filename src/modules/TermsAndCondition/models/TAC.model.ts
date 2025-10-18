// src/models/TermsAndConditions.model.ts

export type TermsAndConditions = {
  _id: string;
  tacData: string;  // HTML string for terms and conditions content
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Form values for Formik
export type TacFormValues = {
  tacData: string; // For editing in a form
};
