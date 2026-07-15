import { apiClient } from "../lib/apiClient";
import { Product } from "../types";
import {
  IProductService,
  ProductFiltersInput,
  ProductsPage,
} from "./IProductService";

/**
 * Real API implementation of IProductService.
 * TODO: Implement each endpoint once the backend is ready.
 * Each method has the correct shape — just replace the stub body.
 */
export class ApiProductService implements IProductService {
  async getProducts(filters?: ProductFiltersInput): Promise<Product[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.set("category", filters.category);
    if (filters?.subCategory) params.set("subCategory", filters.subCategory);
    if (filters?.brand) params.set("brand", filters.brand);
    if (filters?.searchQuery) params.set("q", filters.searchQuery);
    if (filters?.sort) params.set("sort", filters.sort);
    if (filters?.maxPrice != null)
      params.set("maxPrice", String(filters.maxPrice));
    if (filters?.minRating != null)
      params.set("minRating", String(filters.minRating));
    const qs = params.toString();
    return apiClient.get<Product[]>(`/products${qs ? `?${qs}` : ""}`);
  }

  async getProductsPaginated(
    filters?: ProductFiltersInput,
  ): Promise<ProductsPage> {
    const params = new URLSearchParams();
    if (filters?.page) params.set("page", String(filters.page));
    if (filters?.pageSize) params.set("pageSize", String(filters.pageSize));
    if (filters?.category) params.set("category", filters.category);
    // TODO: add remaining filters
    return apiClient.get<ProductsPage>(
      `/products/paginated?${params.toString()}`,
    );
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return apiClient.get<Product>(`/products/${id}`);
  }

  async getRelatedProducts(product: Product): Promise<Product[]> {
    return apiClient.get<Product[]>(`/products/${product.id}/related`);
  }

  async getProductsByIds(ids: string[]): Promise<Product[]> {
    return apiClient.post<Product[]>("/products/batch", { ids });
  }
}
