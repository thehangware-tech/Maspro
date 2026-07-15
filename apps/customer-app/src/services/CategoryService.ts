import { CATEGORIES } from "../data/mockData";
import { Category } from "../types";

export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return CATEGORIES;
  }
}
