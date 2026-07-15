import { MOCK_PRODUCTS } from "../data/mockData";
import { Product } from "../types";
import {
  IProductService,
  ProductFiltersInput,
  ProductsPage,
} from "./IProductService";

const PAGE_SIZE = 12;

function applyFilters(
  products: Product[],
  filters?: ProductFiltersInput,
): Product[] {
  let results = [...products];

  if (filters?.category) {
    results = results.filter((p) => p.categoryId === filters.category);
  }
  if (filters?.subCategory) {
    results = results.filter((p) => p.subCategory === filters.subCategory);
  }
  if (filters?.brand) {
    results = results.filter((p) => p.brand === filters.brand);
  }
  if (filters?.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryId.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q),
    );
  }
  if (filters?.maxPrice != null) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters?.minRating != null) {
    results = results.filter((p) => p.rating >= filters.minRating!);
  }

  // Sort
  if (filters?.sort === "Price: Low → High") {
    results.sort((a, b) => a.price - b.price);
  } else if (filters?.sort === "Price: High → Low") {
    results.sort((a, b) => b.price - a.price);
  } else if (filters?.sort === "Newest") {
    results.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
  } else if (filters?.sort === "Rating") {
    results.sort((a, b) => b.rating - a.rating);
  } else {
    results.sort((a, b) =>
      a.isPopular === b.isPopular ? 0 : a.isPopular ? -1 : 1,
    );
  }

  return results;
}

export class MockProductService implements IProductService {
  async getProducts(filters?: ProductFiltersInput): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return applyFilters(MOCK_PRODUCTS, filters);
  }

  async getProductsPaginated(
    filters?: ProductFiltersInput,
  ): Promise<ProductsPage> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const page = filters?.page ?? 1;
    const pageSize = filters?.pageSize ?? PAGE_SIZE;
    const all = applyFilters(MOCK_PRODUCTS, filters);
    const start = (page - 1) * pageSize;
    const items = all.slice(start, start + pageSize);
    return {
      items,
      totalCount: all.length,
      hasNextPage: start + pageSize < all.length,
    };
  }

  async getProductById(id: string): Promise<Product | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return MOCK_PRODUCTS.find((p) => p.id === id);
  }

  async getRelatedProducts(product: Product): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return MOCK_PRODUCTS.filter(
      (p) => p.categoryId === product.categoryId && p.id !== product.id,
    )
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
  }

  async getProductsByIds(ids: string[]): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return MOCK_PRODUCTS.filter((p) => ids.includes(p.id));
  }
}
