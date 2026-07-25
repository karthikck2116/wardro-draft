import type { Money } from "@/types/commerce";

export type CartAccessoryRecommendation = {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  description: string;
  image?: string;
  price: Money;
  compatibleWith: string[];
};

export type CartSelectedAccessory = {
  id: string;
  title: string;
  price: number;
};

export type CartLine = {
  id: string;
  title: string;
  variant: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image?: string;
  currencyCode?: "INR";
  kind?: "product" | "accessory";
  productHandle?: string;
  parentLineId?: string;
  selectedAccessories?: CartSelectedAccessory[];
  compatibleAccessories?: CartAccessoryRecommendation[];
};

export type BundleItem = {
  variantId: string;
  title: string;
  price: number;
  image?: string;
};

export type CartBundle = {
  id: string;
  title: string;
  items: BundleItem[];
  originalPrice: number;
  bundlePrice: number;
  badge?: string;
};
