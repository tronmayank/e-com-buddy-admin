export type Faq = {
  _id: string;
  question: string;
  answer: string;
  __v: number;
};

// Form values for Formik
export type FaqFormValues = {
  faqList: Faq[]; // Use full Faq type so Formik layout can access _id, __v
};
