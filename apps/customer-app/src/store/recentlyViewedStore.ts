import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../types";

const MAX_RECENTLY_VIEWED = 10;

interface RecentlyViewedState {
  products: Product[];
  addProduct: (product: Product) => void;
  clearHistory: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      products: [],

      addProduct: (product) =>
        set((state) => {
          const filtered = state.products.filter((p) => p.id !== product.id);
          return {
            products: [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED),
          };
        }),

      clearHistory: () => set({ products: [] }),
    }),
    {
      name: "maspro-recently-viewed-v1",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
