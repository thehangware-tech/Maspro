import { CartItem, Order, OrderStatus } from "../types";

export interface PlaceOrderRequest {
  items: CartItem[];
  addressId: string;
  paymentMethod: string;
  idempotencyKey: string;
}

export interface IOrderService {
  placeOrder(request: PlaceOrderRequest): Promise<Order>;
  getOrders(userId: string): Promise<Order[]>;
  getOrderById(orderId: string): Promise<Order | undefined>;
  cancelOrder(orderId: string, reason: string): Promise<Order>;
  returnOrder(orderId: string, items: string[], reason: string): Promise<Order>;
  validatePincode(
    pincode: string,
  ): Promise<{ serviceable: boolean; estimatedDays?: number }>;
}
