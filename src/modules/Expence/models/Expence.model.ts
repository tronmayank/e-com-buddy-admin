// Expense.model.ts

export type Expense = {
  _id: string;
  title: string;
  description: string;
  amount: number;
  receipt: string; // URL or file path
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  __v: number;
};

// For Add Expense Form
export type ExpenseFormValues = {
  title: string;
  description: string;
  amount: number;
  receipt?: string; // optional upload
};

// For Update Expense Form
export type UpdateExpenseFormValues = {
  title?: string;
  description?: string;
  amount?: number;
  receipt?: string;
};
