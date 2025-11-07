// Order.model.ts

// ----------------------
// Product (within Order)
// ----------------------
export type OrderProduct = {
  _id?: string;
  title: string;
  description: string;
  variantName: string;
  size?: string;
  salePrice: number;
};

// ----------------------
// Billing Details
// ----------------------
export type BillingDetails = {
  name: string;
  phone: string;
  state: string;
  city: string;
  pincode: string;
  address1: string;
  address2: string;
  orderNote?: string;
};

// ----------------------
// Core Order Type
// ----------------------
export type Order = {
  _id: string;
  orderNumber: number;
  products: OrderProduct[];
  orderTotal: number;
  userId?: string | null;
  couponName?: string;
  discountAmount: number;
  shippingCharges: number;
  orderAmount: number;
  billingDetails: BillingDetails;
  paymentType: PaymentType;
  paymentStatus?: PaymentStatus;
  transactionId?: string;
  metaData?: string;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

// ----------------------
// Enums (based on your definitions)
// ----------------------
export enum PaymentType {
  cod = "COD",
  online = "ONLINE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  CONFIRM = "CONFIRM",
  CANCELED = "CANCELED",
  NONE = "",
}

export enum OrderStatus {
  NEW_ORDER = "NEW_ORDER",
  ORDER_CONFIRMED = "ORDER_CONFIRMED",
  IN_TRANSIT = "IN_TRANSIT",
  DILIVERED = "DILIVERED",
  RETURNED = "RETURNED",
  CANCELLED = "CANCELLED",
}

// ----------------------
// Form Values
// ----------------------
export type OrderFormValues = {
  products: OrderProduct[];
  // orderTotal: number;
  userId?: string | null;
  // couponName?: string;
  shippingCharges: number;
  billingDetails: BillingDetails;
  // discountAmount: number;
  paymentType: PaymentType;
  paymentStatus?: PaymentStatus;
  // transactionId?: string;
  // metaData?: string;
  orderStatus: OrderStatus;
  // orderAmount: number;
};
export type UpdateOrderFormValues = {
  _id?: string;
  billingDetails?: BillingDetails;
  orderStatus?: OrderStatus;
  products?: OrderProduct[];
};


// ----------------------
// Optional Enum (for Filters/UI)
// ----------------------
export enum OrderFilterEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}
