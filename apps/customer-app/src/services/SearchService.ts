import { ProductService } from "./ProductService";
import { Product } from "../types";

export class SearchService {
  static async searchProducts(query: string): Promise<Product[]> {
    return ProductService.getProducts({ searchQuery: query });
  }

  static async getSuggestions(query: string): Promise<string[]> {
    if (!query) return [];
    const products = await this.searchProducts(query);
    // Return unique names or brands matching the query
    const suggestions = new Set<string>();

    products.forEach((p) => {
      if (p.name.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(p.name);
      } else if (p.brand.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(p.brand);
      } else if (p.subCategory.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(p.subCategory);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }
}
