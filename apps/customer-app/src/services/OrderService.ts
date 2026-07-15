import { MockOrderService } from "./MockOrderService";
import { ApiOrderService } from "./ApiOrderService";
import { IOrderService } from "./IOrderService";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK !== "false";

export const OrderService: IOrderService = USE_MOCK
  ? new MockOrderService()
  : new ApiOrderService();

export type { IOrderService, PlaceOrderRequest } from "./IOrderService";
