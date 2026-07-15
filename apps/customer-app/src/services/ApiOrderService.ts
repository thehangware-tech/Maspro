import { apiClient } from "../lib/apiClient";
import { IOrderService, PlaceOrderRequest } from "./IOrderService";
import { Order } from "../types";

export class ApiOrderService implements IOrderService {
  async placeOrder(request: PlaceOrderRequest): Promise<Order> {
    return apiClient.post<Order>("/orders", request);
  }

  async getOrders(userId: string): Promise<Order[]> {
    return apiClient.get<Order[]>("/orders");
  }

  async getOrderById(orderId: string): Promise<Order | undefined> {
    return apiClient.get<Order>(`/orders/${orderId}`);
  }

  async cancelOrder(orderId: string, reason: string): Promise<Order> {
    return apiClient.post<Order>(`/orders/${orderId}/cancel`, { reason });
  }

  async returnOrder(
    orderId: string,
    items: string[],
    reason: string,
  ): Promise<Order> {
    return apiClient.post<Order>(`/orders/${orderId}/return`, {
      items,
      reason,
    });
  }

  async validatePincode(
    pincode: string,
  ): Promise<{ serviceable: boolean; estimatedDays?: number }> {
    return apiClient.get<{ serviceable: boolean; estimatedDays?: number }>(
      `/serviceability?pincode=${pincode}`,
    );
  }
}
