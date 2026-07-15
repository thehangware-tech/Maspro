import { Product } from "../types";

export interface ProductFiltersInput {
  category?: string | null;
  subCategory?: string | null;
  brand?: string | null;
  searchQuery?: string;
  sort?: string;
  maxPrice?: number | null;
  minRating?: number | null;
  page?: number;
  pageSize?: number;
}

export interface ProductsPage {
  items: Product[];
  totalCount: number;
  hasNextPage: boolean;
}

/** Contract that both MockProductService and ApiProductService must satisfy */
export interface IProductService {
  getProducts(filters?: ProductFiltersInput): Promise<Product[]>;
  getProductsPaginated(filters?: ProductFiltersInput): Promise<ProductsPage>;
  getProductById(id: string): Promise<Product | undefined>;
  getRelatedProducts(product: Product): Promise<Product[]>;
  getProductsByIds(ids: string[]): Promise<Product[]>;
}
