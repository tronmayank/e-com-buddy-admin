// Product.model.ts

export type Product = {
  _id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  variant: ProductVariant[];
  tags: string[];
  deliveryTimeline: string;
  shippingCharges: number;
  images: string[];
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Variant structure for each product
export type ProductVariant = {
  _id?: string;
  name: string;
  size: string;
  description: string;
  mrp: number;
  discountPercent: number;
  stockCount: number;
};

// Form values for adding a product
export type ProductFormValues = {
  title: string;
  description: string;
  categoryId: string;
  variant: ProductVariantFormValues[];
  tags?: string[];
  deliveryTimeline: string;
  shippingCharges: number;
  images: string[];
  isActive?: boolean;
};

export type UpdateProductFormValues = ProductFormValues & {
  _id: string;
};


// Variant form values (used within ProductFormValues)
export type ProductVariantFormValues = {
  name: string;
  size: string;
  description: string;
  mrp: number;
  discountPercent: number;
  stockCount: number;
};

// Form values for updating a product

// Enum for product status if needed (optional but good for UI filters)
export enum ProductStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}
