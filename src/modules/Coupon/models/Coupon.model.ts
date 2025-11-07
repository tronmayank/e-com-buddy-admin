// Coupon.model.ts

export type Coupon = {
  _id: string;
  couponName: string;
  type: "FLAT" | "PERCENT"; // you can extend if more types
  amountOrPercent: number;
  useCount: number;
  remainingCount: number;
  expiry: string; // ISO date string
  influencerId?: string | null;
  influencerCutAmount: number;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CouponFormValues = {
  couponName: string;
  type: "FLAT" | "PERCENT";
  amountOrPercent: number;
  useCount: number;
  expiry: string; // date string in yyyy-mm-dd
  influencerId?: string | null;
  influencerCutAmount?: number;
  isActive?: boolean;
};

export type UpdateCouponFormValues = {
  couponName: string;

};

export enum CouponTypeEnum {
  FLAT = "FLAT",
  PERCENT = "PERCENT",
}
