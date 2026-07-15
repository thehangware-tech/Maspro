// These are simulated backend services. Since we are using Zustand for local state,
// these would typically sync with the backend. For now, they just resolve.

export class CartService {
  static async syncCart(items: any[]): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
  }
}

export class WishlistService {
  static async syncWishlist(productIds: string[]): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
  }
}
