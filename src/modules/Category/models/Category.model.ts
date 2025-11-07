// src/models/Category.model.ts

// Full category data from API
export type Category = {
  _id: string;
  categoryName: string;
  image: string;       // URL to category image
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Form values for creating/updating a category
export type CategoryFormValues = {
  categoryName: string;
  image: string;
};

// Pagination response type for category list
export type CategoryPaginationResponse = {
  data: Category[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};
