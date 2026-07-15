/**
 * Service factory — swap `USE_MOCK` to false (or set EXPO_PUBLIC_USE_MOCK=false in .env)
 * to switch from mock data to the real API without touching any screen code.
 */
import { MockProductService } from "./MockProductService";
import { ApiProductService } from "./ApiProductService";
import { IProductService } from "./IProductService";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK !== "false";

export const ProductService: IProductService = USE_MOCK
  ? new MockProductService()
  : new ApiProductService();

// Re-export the interface so consumers can type-check against it
export type {
  IProductService,
  ProductFiltersInput,
  ProductsPage,
} from "./IProductService";
