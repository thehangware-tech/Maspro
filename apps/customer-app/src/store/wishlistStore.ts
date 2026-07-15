import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WishlistState {
  productIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  devtools(
    persist(
      (set, get) => ({
        productIds: [],

        toggleWishlist: (productId) =>
          set((state) => {
            if (state.productIds.includes(productId)) {
              return {
                productIds: state.productIds.filter((id) => id !== productId),
              };
            }
            return { productIds: [...state.productIds, productId] };
          }),

        isInWishlist: (productId) => get().productIds.includes(productId),

        clearWishlist: () => set({ productIds: [] }),
      }),
      {
        name: "maspro-wishlist-v1",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
    { name: "WishlistStore", enabled: __DEV__ },
  ),
);
