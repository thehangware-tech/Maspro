export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  original: number;
  discount: number;
  rating: number;
  reviews: number;
  emoji: string;
  bg: string;
  inStock: boolean;
  stockCount?: number; // undefined = unlimited
  categoryId: string;
  subCategory: string;
  isNew: boolean;
  isPopular: boolean;
  colors?: string[];
  sizes?: string[];
  description: string;
  images?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export type OrderStatus =
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Return Requested"
  | "Returned";

export interface StatusHistoryEntry {
  status: OrderStatus;
  timestamp: string; // ISO
  message?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string; // ISO
  estimatedDelivery?: string; // ISO
  awbNumber?: string;
  courierName?: string;
  statusHistory: StatusHistoryEntry[];
  addressId: string;
  paymentMethod: string;
  idempotencyKey: string;
}
