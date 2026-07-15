import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type SortOption =
  "Popular" | "Price: Low → High" | "Price: High → Low" | "Newest" | "Rating";

export interface CategoryFilterState {
  subCategory: string | null;
  sort: SortOption;
  brand: string | null;
  maxPrice: number | null;
  minRating: number | null;
}

const DEFAULT_CATEGORY_FILTERS: CategoryFilterState = {
  subCategory: null,
  sort: "Popular",
  brand: null,
  maxPrice: null,
  minRating: null,
};

interface FilterState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  category: string | null;
  setCategory: (cat: string | null) => void;

  subCategory: string | null;
  setSubCategory: (sub: string | null) => void;

  brand: string | null;
  setBrand: (brand: string | null) => void;

  maxPrice: number | null;
  setMaxPrice: (price: number | null) => void;

  minRating: number | null;
  setMinRating: (rating: number | null) => void;

  sort: SortOption;
  setSort: (sort: SortOption) => void;

  /** Per-category remembered filters so returning to a category restores context */
  categoryFilters: Record<string, CategoryFilterState>;
  saveFiltersForCategory: (catId: string) => void;
  restoreFiltersForCategory: (catId: string) => void;

  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      category: null,
      setCategory: (cat) => {
        // When switching categories, auto-restore saved filters for the new category
        const savedFilters = cat
          ? (get().categoryFilters[cat] ?? DEFAULT_CATEGORY_FILTERS)
          : DEFAULT_CATEGORY_FILTERS;
        set({
          category: cat,
          subCategory: savedFilters.subCategory,
          sort: savedFilters.sort,
          brand: savedFilters.brand,
          maxPrice: savedFilters.maxPrice,
          minRating: savedFilters.minRating,
        });
      },

      subCategory: null,
      setSubCategory: (sub) => set({ subCategory: sub }),

      brand: null,
      setBrand: (brand) => set({ brand }),

      maxPrice: null,
      setMaxPrice: (maxPrice) => set({ maxPrice }),

      minRating: null,
      setMinRating: (minRating) => set({ minRating }),

      sort: "Popular",
      setSort: (sort) => set({ sort }),

      categoryFilters: {},

      saveFiltersForCategory: (catId) => {
        const state = get();
        set({
          categoryFilters: {
            ...state.categoryFilters,
            [catId]: {
              subCategory: state.subCategory,
              sort: state.sort,
              brand: state.brand,
              maxPrice: state.maxPrice,
              minRating: state.minRating,
            },
          },
        });
      },

      restoreFiltersForCategory: (catId) => {
        const saved = get().categoryFilters[catId] ?? DEFAULT_CATEGORY_FILTERS;
        set({
          subCategory: saved.subCategory,
          sort: saved.sort,
          brand: saved.brand,
          maxPrice: saved.maxPrice,
          minRating: saved.minRating,
        });
      },

      clearFilters: () =>
        set({
          searchQuery: "",
          category: null,
          subCategory: null,
          brand: null,
          maxPrice: null,
          minRating: null,
          sort: "Popular",
        }),
    }),
    {
      name: "maspro-filters-v1",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist per-category filter memory, not active transient filter state
      partialize: (state) => ({ categoryFilters: state.categoryFilters }),
    },
  ),
);
