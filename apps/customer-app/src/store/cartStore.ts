import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, Product } from "../types";

/** Stored per-item so we can detect stale prices after re-launch */
export interface CartItemWithSnapshot extends CartItem {
  priceAtAdd: number;
}

interface CartState {
  items: CartItemWithSnapshot[];
  savedForLater: CartItemWithSnapshot[];
  appliedCoupon: string | null;
  couponStatus: "idle" | "valid" | "invalid" | "expired" | "min_order_not_met";

  addItem: (
    product: Product,
    quantity?: number,
    size?: string,
    color?: string,
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  saveForLater: (itemId: string) => void;
  moveToCart: (itemId: string) => void;
  removeSavedItem: (itemId: string) => void;

  getSubtotal: () => number;
  getTotalItems: () => number;
  getPriceChangedItems: () => CartItemWithSnapshot[];

  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
}

export const getCartTotals = (
  items: CartItemWithSnapshot[],
  appliedCoupon: string | null,
) => {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const discount = appliedCoupon ? Math.floor(subtotal * 0.1) : 0; // 10% mock discount
  const afterDiscount = subtotal - discount;
  const tax = Math.floor(afterDiscount * 0.18); // 18% GST
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 50;
  const total = subtotal === 0 ? 0 : afterDiscount + tax + shipping;
  return { subtotal, discount, shipping, tax, total };
};

const CART_STORE_VERSION = 1;

const cartStoreImpl = (set: any, get: any): CartState => ({
  items: [],
  savedForLater: [],
  appliedCoupon: null,
  couponStatus: "idle",

  addItem: (product, quantity = 1, size, color) =>
    set((state: CartState) => {
      const existing = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }
      const newItem: CartItemWithSnapshot = {
        id: `cart_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        product,
        quantity,
        size,
        color,
        priceAtAdd: product.price,
      };
      return { items: [...state.items, newItem] };
    }),

  removeItem: (itemId) =>
    set((state: CartState) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),

  updateQuantity: (itemId, newQuantity) =>
    set((state: CartState) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item,
      ),
    })),

  clearCart: () =>
    set({
      items: [],
      savedForLater: [],
      appliedCoupon: null,
      couponStatus: "idle",
    }),

  saveForLater: (itemId) =>
    set((state: CartState) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return {};
      return {
        items: state.items.filter((i) => i.id !== itemId),
        savedForLater: [...state.savedForLater, item],
      };
    }),

  moveToCart: (itemId) =>
    set((state: CartState) => {
      const item = state.savedForLater.find((i) => i.id === itemId);
      if (!item) return {};
      return {
        savedForLater: state.savedForLater.filter((i) => i.id !== itemId),
        items: [...state.items, item],
      };
    }),

  removeSavedItem: (itemId) =>
    set((state: CartState) => ({
      savedForLater: state.savedForLater.filter((i) => i.id !== itemId),
    })),

  getSubtotal: () =>
    get().items.reduce(
      (total: number, item: CartItemWithSnapshot) =>
        total + item.product.price * item.quantity,
      0,
    ),

  getTotalItems: () =>
    get().items.reduce(
      (total: number, item: CartItemWithSnapshot) => total + item.quantity,
      0,
    ),

  /** Returns items where the current price differs from the price when added */
  getPriceChangedItems: () =>
    get().items.filter(
      (item: CartItemWithSnapshot) => item.priceAtAdd !== item.product.price,
    ),

  applyCoupon: (code) => {
    // Mock validation — replace with real API call in Module 2
    const validCodes: Record<string, typeof CartState.prototype.couponStatus> =
      {
        MASPRO10: "valid",
        EXPIRED: "expired",
      };
    const status = validCodes[code.toUpperCase()] ?? "invalid";
    set({
      appliedCoupon: status === "valid" ? code : null,
      couponStatus: status,
    });
  },

  removeCoupon: () => set({ appliedCoupon: null, couponStatus: "idle" }),
});

export const useCartStore = create<CartState>()(
  devtools(
    persist(cartStoreImpl, {
      name: "maspro-cart-v1",
      version: CART_STORE_VERSION,
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (persisted: any, version: number) => {
        // v0 → v1: items didn't have priceAtAdd — backfill it
        if (version < 1) {
          const state = persisted as CartState;
          return {
            ...state,
            items: state.items.map((item: any) => ({
              ...item,
              priceAtAdd: item.priceAtAdd ?? item.product?.price ?? 0,
            })),
          };
        }
        return persisted as CartState;
      },
    }),
    { name: "CartStore", enabled: __DEV__ },
  ),
);
