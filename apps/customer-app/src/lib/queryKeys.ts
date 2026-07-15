import { SortOption } from "../store/filterStore";

// ─── Product Query Keys ───────────────────────────────────────────────────────
export interface ProductFilters {
  category?: string | null;
  subCategory?: string | null;
  brand?: string | null;
  searchQuery?: string;
  sort?: SortOption;
  maxPrice?: number | null;
  minRating?: number | null;
  page?: number;
}

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  related: (categoryId: string) =>
    [...productKeys.all, "related", categoryId] as const,
  byIds: (ids: string[]) =>
    [...productKeys.all, "byIds", ids.join(",")] as const,
};

// ─── Category Query Keys ──────────────────────────────────────────────────────
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
};

// ─── Order Query Keys ─────────────────────────────────────────────────────────
export const orderKeys = {
  all: ["orders"] as const,
  lists: (userId: string) => [...orderKeys.all, "list", userId] as const,
  detail: (orderId: string) => [...orderKeys.all, "detail", orderId] as const,
};
